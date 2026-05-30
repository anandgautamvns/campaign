pipeline {
    agent any

    environment {
        IMAGE_NAME      = 'campaign'
        IMAGE_TAG       = "${env.BUILD_NUMBER}"
        REGISTRY        = credentials('docker-registry-url')  // e.g. registry.example.com
        REGISTRY_CREDS  = 'docker-registry-creds'             // Jenkins credential ID
        DEPLOY_SSH_CRED = 'deploy-server-ssh'                 // SSH key credential ID
        DEPLOY_HOST     = credentials('deploy-host')          // e.g. user@prod.example.com
    }

    options {
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    env.GIT_COMMIT_SHORT = sh(
                        script: "git rev-parse --short HEAD",
                        returnStdout: true
                    ).trim()
                    env.FULL_IMAGE = "${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}-${GIT_COMMIT_SHORT}"
                }
            }
        }

        stage('Install') {
            agent {
                docker {
                    image 'node:22-alpine'
                    args '-u root'
                    reuseNode true
                }
            }
            steps {
                sh 'npm ci --prefer-offline'
            }
        }

        stage('Lint') {
            agent {
                docker {
                    image 'node:22-alpine'
                    args '-u root'
                    reuseNode true
                }
            }
            steps {
                sh 'npm run lint'
            }
        }

        stage('Build') {
            agent {
                docker {
                    image 'node:22-alpine'
                    args '-u root'
                    reuseNode true
                }
            }
            steps {
                sh 'npm run build'
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }

        stage('Docker Build & Push') {
            steps {
                script {
                    docker.withRegistry("https://${REGISTRY}", "${REGISTRY_CREDS}") {
                        def img = docker.build("${FULL_IMAGE}", "--target runner .")
                        img.push()
                        // Also tag as latest on main branch
                        if (env.BRANCH_NAME == 'main') {
                            img.push('latest')
                        }
                    }
                }
            }
        }

        stage('Deploy') {
            when {
                branch 'main'
            }
            steps {
                sshagent(credentials: ["${DEPLOY_SSH_CRED}"]) {
                    sh """
                        ssh -o StrictHostKeyChecking=no ${DEPLOY_HOST} '
                            docker pull ${FULL_IMAGE} &&
                            docker stop campaign-app || true &&
                            docker rm campaign-app || true &&
                            docker run -d \\
                                --name campaign-app \\
                                --restart unless-stopped \\
                                -p 80:80 \\
                                ${FULL_IMAGE}
                        '
                    """
                }
            }
        }
    }

    post {
        always {
            // Clean up dangling images on the Jenkins agent
            sh 'docker image prune -f || true'
        }
        success {
            echo "Build ${BUILD_NUMBER} deployed successfully: ${FULL_IMAGE}"
        }
        failure {
            echo "Build ${BUILD_NUMBER} failed. Check the logs above."
        }
    }
}

/*
 * CI/CD Pipeline — campaign (React + Vite → Vercel)
 *
 * Flow (every branch):  Checkout → Install → Type Check → Lint → Build
 * Flow (main only):     … → Deploy to Vercel (production)
 *
 * Docker is used as the build environment inside Jenkins so the Node
 * version is locked and isolated from whatever the Jenkins agent has.
 * Vercel hosts the final static output; no Docker image is pushed.
 *
 * ─── Jenkins prerequisites ────────────────────────────────────────────
 *  Plugins:   GitHub, Docker Pipeline, AnsiColor
 *  Docker:    Must be installed and accessible on the Jenkins agent
 *
 * ─── GitHub webhook (auto-trigger on push) ────────────────────────────
 *  GitHub repo → Settings → Webhooks → Add webhook
 *    Payload URL : http://<jenkins-host>/github-webhook/
 *    Content type: application/json
 *    Event       : Just the push event
 *
 * ─── Credentials to add in Jenkins (Manage Jenkins → Credentials) ─────
 *  ID                  Kind          Where to get it
 *  vercel-token        Secret Text   vercel.com → Account Settings → Tokens
 *  vercel-org-id       Secret Text   vercel.com → Team Settings → General (Team ID)
 *  vercel-project-id   Secret Text   vercel.com → Project → Settings → General (Project ID)
 */

pipeline {
    agent any

    // ── Trigger: auto-run on every push to any branch ─────────────────
    triggers {
        githubPush()
    }

    // ── Vercel credentials (injected as env vars, never logged) ───────
    environment {
        VERCEL_TOKEN      = credentials('vercel-token')
        VERCEL_ORG_ID     = credentials('vercel-org-id')
        VERCEL_PROJECT_ID = credentials('vercel-project-id')
    }

    options {
        timeout(time: 15, unit: 'MINUTES')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '20'))
        ansiColor('xterm')
    }

    stages {

        // ── 1. Checkout ────────────────────────────────────────────────
        stage('Checkout') {
            steps {
                checkout scm
                script {
                    env.SHORT_SHA = sh(
                        script: 'git rev-parse --short HEAD',
                        returnStdout: true
                    ).trim()
                    echo "Branch: ${env.BRANCH_NAME}  |  Commit: ${env.SHORT_SHA}"
                }
            }
        }

        // ── 2. Install ─────────────────────────────────────────────────
        // node:22-alpine mirrors the Node version Vercel uses by default.
        // npm ci is strict (fails if package-lock.json is out of sync).
        stage('Install') {
            agent {
                docker {
                    image 'node:22-alpine'
                    args  '-u root'
                    reuseNode true
                }
            }
            steps {
                sh 'npm ci --prefer-offline'
            }
        }

        // ── 3. Type Check ──────────────────────────────────────────────
        // Vite intentionally skips TS errors at build time; this catches them.
        stage('Type Check') {
            agent {
                docker {
                    image 'node:22-alpine'
                    args  '-u root'
                    reuseNode true
                }
            }
            steps {
                sh 'npx tsc --noEmit'
            }
        }

        // ── 4. Lint ────────────────────────────────────────────────────
        stage('Lint') {
            agent {
                docker {
                    image 'node:22-alpine'
                    args  '-u root'
                    reuseNode true
                }
            }
            steps {
                sh 'npm run lint'
            }
        }

        // ── 5. Build ───────────────────────────────────────────────────
        // Verifies the Vite build succeeds before we ever hit Vercel.
        // Archives dist/ as a Jenkins artifact (downloadable from the UI).
        stage('Build') {
            agent {
                docker {
                    image 'node:22-alpine'
                    args  '-u root'
                    reuseNode true
                }
            }
            steps {
                sh 'npm run build'
                archiveArtifacts artifacts: 'dist/**', fingerprint: true
            }
        }

        // ── 6. Deploy to Vercel ────────────────────────────────────────
        // Runs only when the push is to (or merged into) main.
        // VERCEL_TOKEN / ORG_ID / PROJECT_ID are injected by Jenkins
        // credentials — the CLI picks them up as environment variables.
        stage('Deploy to Vercel') {
            when {
                branch 'main'
            }
            agent {
                docker {
                    image 'node:22-alpine'
                    args  '-u root'
                    reuseNode true
                }
            }
            steps {
                script {
                    // --prod  → production deployment (not a preview)
                    // --yes   → skip interactive prompts
                    def deployUrl = sh(
                        script: '''
                            npx vercel \
                                --prod \
                                --yes \
                                --token "$VERCEL_TOKEN"
                        ''',
                        returnStdout: true
                    ).trim()

                    echo "Deployed to: ${deployUrl}"
                    env.DEPLOY_URL = deployUrl
                }
            }
        }
    }

    // ── Post-build ─────────────────────────────────────────────────────
    post {
        success {
            script {
                if (env.BRANCH_NAME == 'main') {
                    echo "DEPLOYED  build #${BUILD_NUMBER}  (${env.SHORT_SHA})  → ${env.DEPLOY_URL}"
                } else {
                    echo "BUILD OK  build #${BUILD_NUMBER}  (${env.SHORT_SHA})  branch: ${env.BRANCH_NAME}"
                }
            }
        }
        failure {
            echo "FAILED  build #${BUILD_NUMBER}  (${env.SHORT_SHA})  branch: ${env.BRANCH_NAME}"
            // Uncomment to send email on failure:
            // mail to:      'team@example.com',
            //      subject: "Campaign build #${BUILD_NUMBER} failed [${env.BRANCH_NAME}]",
            //      body:    "Commit: ${env.SHORT_SHA}\nSee: ${BUILD_URL}"
        }
        always {
            // Clean up any dangling Docker images created during this build
            sh 'docker image prune -f || true'
        }
    }
}

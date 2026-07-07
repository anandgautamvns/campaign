import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import Icon from '../../components/ui/Icon'
import { profileData } from '../../mockData/profile'
import './ProfilePage.css'

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

const ProfilePage = () => {
  return (
    <div className="profile-page">
      <Navbar />

      <main className="profile-page__main">
        <div className="profile-page__container">
          <Link to="/" className="profile-page__back-link">
            <Icon name="back-arrow" size={16} />
            Back to plans
          </Link>

          {/* Header card */}
          <section className="profile-page__header-card">
            <div className="profile-page__avatar">{initials(profileData.name)}</div>
            <div className="profile-page__header-info">
              <h1 className="profile-page__name">{profileData.name}</h1>
              <p className="profile-page__handle">{profileData.handle} &middot; {profileData.role}</p>
              <p className="profile-page__bio">{profileData.bio}</p>
            </div>
            <div className="profile-page__plan-badge">
              <span className="profile-page__plan-tag">CURRENT PLAN</span>
              <span className="profile-page__plan-name">{profileData.plan}</span>
            </div>
          </section>

          {/* Stats grid */}
          <section className="profile-page__stats">
            {profileData.stats.map((stat) => (
              <div key={stat.label} className="profile-page__stat-card">
                <span className="profile-page__stat-value">{stat.value}</span>
                <span className="profile-page__stat-label">{stat.label}</span>
              </div>
            ))}
          </section>

          <div className="profile-page__layout">
            {/* Contact details */}
            <section className="profile-page__card">
              <h2 className="profile-page__card-title">Contact Details</h2>
              <dl className="profile-page__detail-list">
                <div className="profile-page__detail-row">
                  <dt>Email</dt>
                  <dd>{profileData.email}</dd>
                </div>
                <div className="profile-page__detail-row">
                  <dt>Phone</dt>
                  <dd>{profileData.phone}</dd>
                </div>
                <div className="profile-page__detail-row">
                  <dt>Location</dt>
                  <dd>{profileData.location}</dd>
                </div>
                <div className="profile-page__detail-row">
                  <dt>Company</dt>
                  <dd>{profileData.company}</dd>
                </div>
                <div className="profile-page__detail-row">
                  <dt>Member Since</dt>
                  <dd>{profileData.memberSince}</dd>
                </div>
              </dl>
            </section>

            {/* Recent campaigns */}
            <section className="profile-page__card">
              <h2 className="profile-page__card-title">Recent Campaigns</h2>
              <div className="profile-page__campaign-list">
                {profileData.campaigns.map((campaign) => (
                  <div key={campaign.id} className="profile-page__campaign-row">
                    <div className="profile-page__campaign-info">
                      <span className="profile-page__campaign-name">{campaign.name}</span>
                      <span className="profile-page__campaign-id">{campaign.id}</span>
                    </div>
                    <span className="profile-page__campaign-budget">{campaign.budget}</span>
                    <span className="profile-page__campaign-date">{campaign.date}</span>
                    <span
                      className={`profile-page__status-badge profile-page__status-badge--${campaign.status.toLowerCase()}`}
                    >
                      {campaign.status}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

export default ProfilePage

import {  useCallback, useState } from 'react'
import './Navbar.css'
import Icon from '../ui/Icon'


const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path
      d="M7 1L8.18 5.18L12 7L8.18 8.82L7 13L5.82 8.82L2 7L5.82 5.18L7 1Z"
      fill="#1E293B"
      stroke="#1E293B"
      strokeWidth="0.5"
      strokeLinejoin="round"
    />
  </svg>
)

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  },[setSearchQuery])

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <div className="navbar__search">
          <input
            type="text"
            className="navbar__search-input"
            placeholder="Find influencers to collaborate with"
            aria-label="Search"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
            onChange={handleSearchChange}
            value={searchQuery}
          />
          <span className="navbar__search-icon">
            <Icon name='search' size={16} color='#9CA3AF' />
          </span>
        </div>

        <div className="navbar__actions">
          <button className="navbar__btn-upgrade" type="button">
            <SparkleIcon />
            Upgrade
          </button>

          <button className="navbar__btn-create" type="button">
            <Icon name='plus' size={16} color='white' />
            Create Campaign
          </button>

          <button className="navbar__avatar" type="button" aria-label="User profile">
            <Icon name='user' size={20} color='white' />
          </button>

          <button className="navbar__menu" type="button" aria-label="Open menu">
            <Icon name='menu' size={20} color='#374151' />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar

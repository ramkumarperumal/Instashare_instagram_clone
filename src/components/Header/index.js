import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import {FaSearch} from 'react-icons/fa'
import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'

import './index.css'

class Header extends Component {
  state = {
    searchInput: '',
    activeTab: '',
    showSmItem: false,
    showSmSearch: false,
  }

  componentDidMount() {
    const {active} = this.props
    this.setState({activeTab: active})
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchButton = () => {
    const {searchInput} = this.state
    const {searchPost} = this.props
    searchPost(searchInput)
  }

  onClickHamBurgerIcon = () => {
    this.setState({showSmItem: true, showSmSearch: false})
  }

  onClickClose = () => {
    this.setState({showSmItem: false, showSmSearch: false})
  }

  showSearch = () => {
    this.setState({showSmItem: false, showSmSearch: true})
  }

  changeActiveHome = () => {
    this.setState({activeTab: 'home'})
  }

  changeActiveProfile = () => {
    this.setState({activeTab: 'profile'})
  }

  onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  render() {
    const {activeTab, showSmItem, showSmSearch} = this.state
    const activeHomeClass =
      activeTab === 'home' ? 'header-nav-item-highlight' : ''
    const activeProfileClass =
      activeTab === 'profile' ? 'header-nav-item-highlight' : ''

    return (
      <>
        <div className="header-container">
          <Link className="link" to="/">
            <div className="logo-name-container">
              <img
                className="header-logo"
                src="https://res.cloudinary.com/dynbs55bk/image/upload/v1687784143/login_page_logo_pqqgc8.png"
                alt="website logo"
              />
              <h1 className="header-title">Insta Share</h1>
            </div>
          </Link>
          <ul className="header-item-container-md">
            <li className="header-search-container">
              <input
                onChange={this.changeSearchInput}
                placeholder="Search Caption"
                className="header-input"
                type="search"
              />
              <button
                onClick={this.onClickSearchButton}
                className="header-search-btn"
                type="button"
              >
                <FaSearch className="header-search-icon" />
              </button>
            </li>
            <Link className="link" to="/">
              <li className="header-item-md" onClick={this.changeActiveHome}>
                <p className={`header-nav-item ${activeHomeClass}`}>Home</p>
              </li>
            </Link>
            <Link className="link" to="/my-profile">
              <li className="header-item-md" onClick={this.changeActiveProfile}>
                <p className={`header-nav-item ${activeProfileClass}`}>
                  Profile
                </p>
              </li>
            </Link>

            <li>
              <button
                onClick={this.onClickLogout}
                type="button"
                className="header-logout-btn"
              >
                Logout
              </button>
            </li>
          </ul>

          <button
            onClick={this.onClickHamBurgerIcon}
            type="button"
            className="header-hamburger-btn"
          >
            <GiHamburgerMenu className="header-hamburger-icon" />
          </button>
        </div>
        {showSmItem && (
          <ul className="header-item-container-sm">
            <Link className="link" to="/">
              <li onClick={this.changeActiveHome} className="header-item-sm">
                <p className={`header-item-para-sm ${activeHomeClass}`}>Home</p>
              </li>
            </Link>
            <li onClick={this.showSearch} className="header-item-sm">
              <p className="header-item-para-sm">Search</p>
            </li>
            <Link className="link" to="/my-profile">
              <li onClick={this.changeActiveProfile} className="header-item-sm">
                <p className={`header-item-para-sm ${activeProfileClass}`}>
                  Profile
                </p>
              </li>
            </Link>
            <li className="header-item-sm">
              <button
                onClick={this.onClickLogout}
                type="button"
                className="header-logout-btn"
              >
                Logout
              </button>
            </li>
            <li>
              <button
                onClick={this.onClickClose}
                className="header-close-btn"
                type="button"
              >
                <AiFillCloseCircle className="header-close-icon" />
              </button>
            </li>
          </ul>
        )}
        {showSmSearch && (
          <div className="header-search-sm-container">
            <input
              onChange={this.changeSearchInput}
              className="header-search-sm"
              type="search"
              placeholder="Search Caption"
            />
            <button
              onClick={this.onClickSearchButton}
              className="header-search-btn"
              type="button"
            >
              <FaSearch className="header-search-icon" />
            </button>
          </div>
        )}
      </>
    )
  }
}

export default withRouter(Header)

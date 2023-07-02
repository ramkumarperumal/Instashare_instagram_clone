import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginPage extends Component {
  state = {username: '', password: '', errorMsg: ''}

  changeUsername = event => {
    this.setState({username: event.target.value})
  }

  changePassword = event => {
    this.setState({password: event.target.value})
  }

  onLogin = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const data = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    }

    const response = await fetch(url, options)
    const responseData = await response.json()

    if (response.ok) {
      Cookies.set('jwt_token', responseData.jwt_token, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({errorMsg: responseData.error_msg})
    }
  }

  render() {
    const {username, password, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <img
          className="login-image"
          src="https://res.cloudinary.com/dynbs55bk/image/upload/v1687783918/login_page_img_md_opz8wr.png"
          alt="website login"
        />
        <form onSubmit={this.onLogin} className="login-form-container">
          <img
            className="login-form-icon"
            src="https://res.cloudinary.com/dynbs55bk/image/upload/v1687784143/login_page_logo_pqqgc8.png"
            alt="website logo"
          />
          <h1 className="login-heading">Insta Share</h1>
          <div className="login-input-container">
            <label htmlFor="username" className="login-form-label">
              USERNAME
            </label>
            <input
              value={username}
              onChange={this.changeUsername}
              id="username"
              className="login-form-input"
              type="text"
            />
          </div>
          <div className="login-input-container login-input-container-pw">
            <label htmlFor="password" className="login-form-label">
              PASSWORD
            </label>
            <input
              value={password}
              onChange={this.changePassword}
              id="password"
              className="login-form-input"
              type="password"
            />
          </div>
          {errorMsg.length > 0 ? (
            <p className="login-error-msg-para">{errorMsg}</p>
          ) : (
            ''
          )}
          <button className="login-form-button" type="submit">
            Login
          </button>
        </form>
      </div>
    )
  }
}

export default LoginPage

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import ProfileItem from '../ProfileItem'
import './index.css'

const apiStatusConstant = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN PROGRESS',
  initial: 'INITIAL',
}

class UserProfile extends Component {
  state = {profile: {}, apiStatus: apiStatusConstant.initial}

  componentDidMount() {
    this.getProfile()
  }

  getProfile = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/insta-share/users/${id}`
    const options = {
      headers: {method: 'GET', Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(url, options)
    const responseData = await response.json()
    console.log(responseData)
    if (response.ok) {
      const updatedData = {
        id: responseData.user_details.id,
        userId: responseData.user_details.user_id,
        userName: responseData.user_details.user_name,
        profilePic: responseData.user_details.profile_pic,
        followersCount: responseData.user_details.followers_count,
        followingCount: responseData.user_details.following_count,
        userBio: responseData.user_details.user_bio,
        posts: responseData.user_details.posts,
        postsCount: responseData.user_details.posts_count,
        stories: responseData.user_details.stories,
      }
      this.setState({
        profile: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  onClickRetry = () => {
    this.getProfile()
  }

  renderProfileSuccess = () => {
    const {profile} = this.state

    return <ProfileItem profileData={profile} />
  }

  renderProfileFailure = () => (
    <div className="profile-failure-container">
      <img
        className="profile-failure-img"
        src="https://res.cloudinary.com/dynbs55bk/image/upload/v1687941100/failure-img_rziqtk.png"
        alt="failure view"
      />
      <p className="profile-failure-heading">
        Something went wrong. Please try again
      </p>
      <button
        onClick={this.onClickRetry}
        type="button"
        className="profile-failure-button"
      >
        Try again
      </button>
    </div>
  )

  renderProfile = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderProfileSuccess()
      case apiStatusConstant.failure:
        return this.renderProfileFailure()
      case apiStatusConstant.inProgress:
        return (
          <div className="loader-container">
            <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
          </div>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header active="profile" />
        {this.renderProfile()}
      </>
    )
  }
}

export default UserProfile

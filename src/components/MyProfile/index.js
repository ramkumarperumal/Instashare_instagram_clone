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

class MyProfile extends Component {
  state = {myProfile: {}, apiStatus: apiStatusConstant.initial}

  componentDidMount() {
    this.getMyProfile()
  }

  getMyProfile = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/insta-share/my-profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const responseData = await response.json()
    if (response.ok) {
      const {profile} = responseData
      const updatedData = {
        id: profile.id,
        userId: profile.user_id,
        userName: profile.user_name,
        profilePic: profile.profile_pic,
        followersCount: profile.followers_count,
        followingCount: profile.following_count,
        userBio: profile.user_bio,
        posts: profile.posts,
        postsCount: profile.posts_count,
        stories: profile.stories,
      }
      this.setState({
        myProfile: updatedData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  onClickRetry = () => {
    this.getMyProfile()
  }

  renderMyProfileSuccess = () => {
    const {myProfile} = this.state

    return <ProfileItem myProfile profileData={myProfile} />
  }

  renderMyProfileFailure = () => (
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

  renderMyProfile = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstant.success:
        return this.renderMyProfileSuccess()
      case apiStatusConstant.failure:
        return this.renderMyProfileFailure()
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
        {this.renderMyProfile()}
      </>
    )
  }
}

export default MyProfile

import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Header from '../Header'
import StoryItem from '../StoryItem'
import PostItem from '../PostItem'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  failure: 'FAILURE',
  success: 'SUCCESS',
  inProgress: 'IN PROGRESS',
}

class Home extends Component {
  state = {
    userStories: [],
    userPost: [],
    apiStatusStory: apiStatusConstant.initial,
    apiStatusPost: apiStatusConstant.initial,
    likedPost: [],
    searchInput: '',
  }

  componentDidMount() {
    this.getHomeStory()
    this.getHomePost()
  }

  searchPost = value => {
    this.setState({searchInput: value}, this.getHomePost)
  }

  getHomeStory = async () => {
    this.setState({apiStatusStory: apiStatusConstant.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const storyUrl = 'https://apis.ccbp.in/insta-share/stories'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const responseStory = await fetch(storyUrl, options)
    const responseStoryData = await responseStory.json()
    if (responseStory.ok) {
      const updatedStoryData = responseStoryData.users_stories.map(each => ({
        userId: each.user_id,
        userName: each.user_name,
        storyUrl: each.story_url,
      }))
      this.setState({
        userStories: updatedStoryData,
        apiStatusStory: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatusStory: apiStatusConstant.failure})
    }
  }

  getHomePost = async () => {
    this.setState({apiStatusPost: apiStatusConstant.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput} = this.state

    const postUrl = `https://apis.ccbp.in/insta-share/posts?search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const responsePost = await fetch(postUrl, options)
    const responsePostData = await responsePost.json()
    if (responsePost.ok) {
      const updatedPostData = responsePostData.posts.map(each => ({
        userId: each.user_id,
        userName: each.user_name,
        profilePic: each.profile_pic,
        postId: each.post_id,
        likesCount: each.likes_count,
        createdAt: each.created_at,
        postDetails: {
          caption: each.post_details.caption,
          imageUrl: each.post_details.image_url,
        },
        comments: each.comments.map(each1 => ({
          userId: each1.user_id,
          userName: each1.user_name,
          comment: each1.comment,
        })),
      }))
      this.setState({
        userPost: updatedPostData,
        apiStatusPost: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatusPost: apiStatusConstant.failure})
    }
  }

  onClickTryAgain = () => {
    this.getHomePost()
  }

  onClickTryAgainStory = () => {
    this.getHomeStory()
  }

  likePost = id => {
    const {likedPost} = this.state
    if (likedPost.includes(id)) {
      const updatedLikedPost = likedPost.filter(each => each !== id)

      this.setState({likedPost: updatedLikedPost})
    } else {
      this.setState(prevState => ({likedPost: [...prevState.likedPost, id]}))
    }
  }

  renderHomeSearch = () => {
    const {userPost, likedPost} = this.state

    return userPost.length > 0 ? (
      <>
        <div className="home-success-container">
          <h1 className="home-search-heading">Search Results</h1>
          <ul className="home-post-container">
            {userPost.map(each => (
              <PostItem
                isLiked={likedPost.includes(each.postId)}
                likePost={this.likePost}
                key={each.postId}
                postData={each}
              />
            ))}
          </ul>
        </div>
      </>
    ) : (
      <div className="home-no-search-container">
        <img
          className="home-no-search-img"
          src="https://res.cloudinary.com/dynbs55bk/image/upload/v1687939387/no-search-result_y9fet0.png"
          alt="search not found"
        />
        <h1 className="home-no-search-heading">Search Not Found</h1>
        <p className="home-no-search-para">
          Try different keyword or search again
        </p>
      </div>
    )
  }

  renderHomeSuccess = () => {
    const {
      userStories,
      userPost,
      likedPost,
      searchInput,
      apiStatusStory,
    } = this.state

    return searchInput.length > 0 ? (
      this.renderHomeSearch()
    ) : (
      <div className="home-success-container">
        {apiStatusStory === apiStatusConstant.success ? (
          <ul className="home-story-container">
            <StoryItem userStories={userStories} />
          </ul>
        ) : (
          <div className="home-failure-story-container">
            <img
              className="home-failure-img"
              src="https://res.cloudinary.com/dynbs55bk/image/upload/v1687942097/failure-img_zecbjz.png"
              alt="failure view"
            />
            <p className="home-failure-para">
              Something went wrong. Please try again
            </p>
            <button
              className="home-failure-btn"
              onClick={this.onClickTryAgainStory}
              type="button"
            >
              Try again
            </button>
          </div>
        )}

        <ul className="home-post-container">
          {userPost.map(each => (
            <PostItem
              isLiked={likedPost.includes(each.postId)}
              likePost={this.likePost}
              key={each.postId}
              postData={each}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderHomeFailure = () => {
    const {userStories, apiStatusStory} = this.state

    return (
      <>
        {apiStatusStory === apiStatusConstant.success ? (
          <ul className="home-story-container">
            <StoryItem userStories={userStories} />
          </ul>
        ) : (
          <div className="home-failure-story-container">
            <img
              className="home-failure-img"
              src="https://res.cloudinary.com/dynbs55bk/image/upload/v1687942097/failure-img_zecbjz.png"
              alt="failure view"
            />
            <p className="home-failure-para">
              Something went wrong. Please try again
            </p>
            <button
              className="home-failure-btn"
              onClick={this.onClickTryAgainStory}
              type="button"
            >
              Try again
            </button>
          </div>
        )}
        <div className="home-failure-container">
          <img
            className="home-failure-img"
            src="https://res.cloudinary.com/dynbs55bk/image/upload/v1687942097/failure-img_zecbjz.png"
            alt="failure view"
          />
          <p className="home-failure-para">
            Something went wrong. Please try again
          </p>
          <button
            className="home-failure-btn"
            onClick={this.onClickTryAgain}
            type="button"
          >
            Try again
          </button>
        </div>
      </>
    )
  }

  renderHomePage = () => {
    const {apiStatusPost} = this.state

    switch (apiStatusPost) {
      case apiStatusConstant.success:
        return this.renderHomeSuccess()
      case apiStatusConstant.failure:
        return this.renderHomeFailure()
      case apiStatusConstant.inProgress:
        return (
          <div className="home-loader-container">
            <div className="loader-container1">
              <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
            </div>
            <div className="loader-container2">
              <Loader type="TailSpin" color="#4094EF" height={50} width={50} />
            </div>
          </div>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header searchPost={this.searchPost} active="home" />

        {this.renderHomePage()}
      </>
    )
  }
}

export default Home

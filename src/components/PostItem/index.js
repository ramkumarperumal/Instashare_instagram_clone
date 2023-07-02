import {Link} from 'react-router-dom'
import {BsHeart} from 'react-icons/bs'
import {FaRegComment} from 'react-icons/fa'
import {BiShareAlt} from 'react-icons/bi'
import {FcLike} from 'react-icons/fc'
import Cookies from 'js-cookie'
import './index.css'

const PostItem = props => {
  const {isLiked, postData, likePost} = props
  const {
    userId,
    userName,
    profilePic,
    postId,
    likesCount,
    createdAt,
    postDetails,
    comments,
  } = postData
  const {caption, imageUrl} = postDetails

  const onClickLikeBtn = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/insta-share/posts/${postId}/like`
    const data = {like_status: !isLiked}

    const options = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(data),
    }
    const response = await fetch(url, options)
    const responseData = await response.json()
    console.log(responseData)
    if (response.ok) {
      likePost(postId)
    }
  }

  return (
    <li className="post-item-container">
      <div className="post-item-profile-container">
        <img
          className="post-item-profile-pic"
          src={profilePic}
          alt="post author profile"
        />
        <Link className="link" to={`/users/${userId}`}>
          <h1 className="post-item-username">{userName}</h1>
        </Link>
      </div>
      <img className="post-item-post-img" src={imageUrl} alt="post" />
      <div className="post-item-caption-container">
        <ul className="post-item-btn-container">
          <li onClick={onClickLikeBtn} className="post-item-btn-item">
            <button type="button" className="post-item-btn">
              {isLiked ? (
                <FcLike className="post-item-btn-icon" />
              ) : (
                <BsHeart className="post-item-btn-icon" />
              )}
            </button>
          </li>
          <li className="post-item-btn-item">
            <button type="button" className="post-item-btn">
              <FaRegComment className="post-item-btn-icon" />
            </button>
          </li>
          <li className="post-item-btn-item">
            <button type="button" className="post-item-btn">
              <BiShareAlt className="post-item-btn-icon" />
            </button>
          </li>
        </ul>
        <p className="post-item-like-para">
          {isLiked ? likesCount + 1 : likesCount} likes
        </p>
        <p className="post-item-caption-para">{caption}</p>
        <ul className="post-item-comments-container">
          {comments.map(each => (
            <li key={each.userId} className="post-item-comment-item">
              <p className="post-item-comment-para">
                <span className="post-item-comment-span">{each.userName}</span>{' '}
                {each.comment}
              </p>
            </li>
          ))}
        </ul>
        <p className="post-item-created-at-para">{createdAt}</p>
      </div>
    </li>
  )
}

export default PostItem

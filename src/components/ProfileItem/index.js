import {BsGrid3X3} from 'react-icons/bs'
import {BiCamera} from 'react-icons/bi'
import './index.css'

const ProfileItem = props => {
  const {profileData, myProfile} = props
  const {
    userName,
    profilePic,
    followersCount,
    followingCount,
    userBio,
    posts,
    postsCount,
    stories,
  } = profileData

  return (
    <div className="profile-item-container">
      <h1 className="profile-item-name-sm">{userName}</h1>
      <div className="profile-item-card-container">
        <img
          className="profile-item-profile-img"
          src={profilePic}
          alt={myProfile ? 'my profile' : 'user profile'}
        />
        <div className="profile-item-card-name-container">
          <h1 className="profile-item-card-name-md">{userName}</h1>
          <div className="profile-item-card-follower-container">
            <div className="profile-item-card-follow-item">
              <p className="profile-item-card-follow-span">{postsCount}</p>
              <p className="profile-item-card-follow-para"> posts</p>
            </div>
            <div className="profile-item-card-follow-item">
              <p className="profile-item-card-follow-span">{followersCount}</p>
              <p className="profile-item-card-follow-para"> followers</p>
            </div>
            <div className="profile-item-card-follow-item">
              <p className="profile-item-card-follow-span">{followingCount}</p>
              <p className="profile-item-card-follow-para"> following</p>
            </div>
          </div>
          <div className="profile-item-card-bio-container-md">
            <h1 className="profile-item-card-username">{userName}</h1>
            <p className="profile-item-card-bio">{userBio}</p>
          </div>
        </div>
      </div>
      <div className="profile-item-card-bio-container-sm">
        <p className="profile-item-card-username">{userName}</p>
        <p className="profile-item-card-bio">{userBio}</p>
      </div>
      <ul className="profile-item-story-container">
        {stories.map(each => (
          <li className="profile-item-story-item" key={each.id}>
            <img
              className="profile-item-story-img"
              src={each.image}
              alt={myProfile ? 'my story' : 'user story'}
            />
          </li>
        ))}
      </ul>
      <hr className="profile-item-hr" />
      <div className="profile-item-post-name-container">
        <BsGrid3X3 className="profile-item-grid-icon" />
        <h1 className="profile-item-post-name">Posts</h1>
      </div>
      {posts.length > 0 ? (
        <ul className="profile-item-post-container">
          {posts.map(each => (
            <li className="profile-item-post-item" key={each.id}>
              <img
                className="profile-item-post-item-img"
                src={each.image}
                alt={myProfile ? 'my post' : 'user post'}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="profile-item-no-post-container">
          <div className="profile-item-no-post-icon-container">
            <BiCamera className="profile-item-no-post-icon" />
          </div>
          <h1 className="profile-item-no-post-para">No Posts Yet</h1>
        </div>
      )}
    </div>
  )
}

export default ProfileItem

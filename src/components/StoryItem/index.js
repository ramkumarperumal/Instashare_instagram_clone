import Slider from 'react-slick'
import './index.css'

const StoryItem = props => {
  const {userStories} = props

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  }

  return (
    <Slider className="slick-container" {...settings}>
      {userStories.map(each => {
        const {userId, userName, storyUrl} = each
        return (
          <li key={userId} className="story-item-container">
            <img className="story-item-img" src={storyUrl} alt="user story" />
            <p className="story-item-para">{userName}</p>
          </li>
        )
      })}
    </Slider>
  )
}

export default StoryItem

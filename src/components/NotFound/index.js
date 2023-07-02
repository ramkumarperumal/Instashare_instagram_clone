import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      className="not-found-img"
      src="https://res.cloudinary.com/dynbs55bk/image/upload/v1687940908/not-found_zfgblf.png"
      alt="page not found"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-para">
      we are sorry, the page you requested could not be found. Please go back to
      the homepage.
    </p>
    <Link className="link" to="/">
      <button className="not-found-button" type="button">
        Home Page
      </button>
    </Link>
  </div>
)

export default NotFound

import {Route, Switch} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './components/LoginPage'
import Home from './components/Home'
import MyProfile from './components/MyProfile'
import UserProfile from './components/UserProfile'
import NotFound from './components/NotFound'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginPage} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/my-profile" component={MyProfile} />
    <ProtectedRoute exact path="/users/:id" component={UserProfile} />
    <Route component={NotFound} />
  </Switch>
)

export default App

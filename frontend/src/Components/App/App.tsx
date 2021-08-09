import { useEffect, useState } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Home from '../../Page/Home'
import Logout from '../../Page/Logout'
import NotFound from '../../Page/NotFound'
import Profile from '../../Page/Profile'
import Search from '../../Page/Search'
import SignIn from '../../Page/SignIn'
import SignUp from '../../Page/SignUp'
import Content from '../Content/Content'
import Header from '../Header/Header'

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('login') === 'true')
  }, [])

  return (
    <BrowserRouter>
      <Header login={isLoggedIn} />
      <Content>
        <Switch>
          <Route exact component={Home} path="/" />
          <Route exact component={Search} path="/search/:search" />

          <Route
            exact
            component={() => <SignUp setLogin={setIsLoggedIn} />}
            path="/auth/signup"
          />
          <Route
            exact
            component={() => <SignIn setLogin={setIsLoggedIn} />}
            path="/auth/signin"
          />
          <Route
            exact
            component={() => <Logout setLogin={setIsLoggedIn} />}
            path="/auth/logout"
          />
          <Route exact component={Profile} path="/profile/:id" />

          <Route exact path="/404" component={NotFound} />
          <Redirect from="*" to="/404" />
        </Switch>
      </Content>
    </BrowserRouter>
  )
}

export default App

import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import Home from '../../Page/Home'
import NotFound from '../../Page/NotFound'
import Search from '../../Page/Search'
import SignIn from '../../Page/SignIn'
import SignUp from '../../Page/SignUp'
import Header from '../Header/Header'

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Switch>
        <Route exact component={Home} path="/" />
        <Route exact component={Search} path="/search/:search" />

        <Route exact component={SignUp} path="/auth/signup" />
        <Route exact component={SignIn} path="/auth/signin" />

        <Route exact path="/404" component={NotFound} />
        <Redirect from="*" to="/404" />
      </Switch>
    </BrowserRouter>
  )
}

export default App

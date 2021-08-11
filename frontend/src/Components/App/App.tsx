import { useEffect, useState } from 'react'
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { getLang } from '../../lang/lang'
import Home from '../../Page/Home'
import Logout from '../../Page/Logout'
import NotFound from '../../Page/NotFound'
import Profile from '../../Page/Profile'
import Search from '../../Page/Search'
import SignIn from '../../Page/SignIn'
import SignUp from '../../Page/SignUp'
import Content from '../Content/Content'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import { Lang } from '../Header/LangSwitch/LangSwitch'

const App = () => {
  const isLang = (str: string): str is Lang => {
    return ['ko', 'en'].includes(str)
  }

  let defaultLang: Lang = 'en'
  if (isLang(localStorage.getItem('lang') || '')) {
    defaultLang = localStorage.getItem('lang') as Lang
  } else {
    localStorage.setItem('lang', 'en')
  }

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [lang, setLang] = useState<Lang>(defaultLang)

  const switchLang = (lang: Lang) => {
    localStorage.setItem('lang', lang)
    setLang(lang)
  }

  useEffect(() => {
    setIsLoggedIn(localStorage.getItem('login') === 'true')
  }, [])

  const { header, footer } = getLang(lang)

  return (
    <BrowserRouter>
      <Header
        login={isLoggedIn}
        lang={lang}
        switchLang={switchLang}
        headerLang={header}
      />
      <Content>
        <Switch>
          <Route exact component={() => <Home />} path="/" />
          <Route exact component={() => <Search />} path="/search/:search" />

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
          <Route exact component={() => <Profile />} path="/profile/:id" />

          <Route exact path="/404" component={() => <NotFound />} />
          <Redirect from="*" to="/404" />
        </Switch>
      </Content>
      <Footer footerLang={footer} />
    </BrowserRouter>
  )
}

export default App

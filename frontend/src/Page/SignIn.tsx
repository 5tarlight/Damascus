import axios from 'axios'
import { createRef, Dispatch, FC, memo, SetStateAction, useState } from 'react'
import { useHistory } from 'react-router'
import AuthBox from '../Components/Auth/AuthBox/AuthBox'
import AuthBtn from '../Components/Auth/AuthBtn/AuthBtn'
import AuthInput from '../Components/Auth/AuthInput/AuthInput'
import AuthMessage from '../Components/Auth/AuthInput/AuthMesssage/AuthMessage'
import AuthTitle from '../Components/Auth/AuthTitle/AuthTitle'
import AuthLinkBox from '../Components/Auth/AuthLinkBox/AuthLinkBox'
import AuthLink from '../Components/Auth/AuthLink/AuthLink'
import { server } from '../config'
import { applyLocalStorage, emailRegexp, pwRegexp } from '../util'
import { OAuthContainer } from '../Components/Auth/OAuthButton/OAuthButton'
import { AuthLang } from '../lang/lang'

interface Props {
  setLogin: Dispatch<SetStateAction<boolean>>
  lang: AuthLang
}

interface SignInResponse {
  email: string
  id: string
  suc: boolean
  username: string
  admin: Bit
  bio: string
  profile: string
  email_verify: Bit
}

const SignIn: FC<Props> = ({
  setLogin,
  lang: {
    email: emailText,
    password,
    searchEmail,
    searchPassword,
    signup,
    signin,
    notValidEmail,
    notValidPassword,
    loginFailed,
  },
}) => {
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')

  const emailRef = createRef<HTMLDivElement>()
  const pwRef = createRef<HTMLDivElement>()
  const resultRef = createRef<HTMLDivElement>()

  const history = useHistory()

  const handleChnage = (dispatch: Dispatch<SetStateAction<string>>) => {
    return (str: string) => {
      dispatch(str)
    }
  }

  const handleClick = () => {
    if (!emailRegexp.test(email)) {
      emailRef.current?.classList.add('show')
      pwRef.current?.classList.remove('show')
      resultRef.current?.classList.remove('show')
    } else if (!pwRegexp.test(pw)) {
      emailRef.current?.classList.remove('show')
      pwRef.current?.classList.add('show')
      resultRef.current?.classList.remove('show')
    } else {
      emailRef.current?.classList.remove('show')
      pwRef.current?.classList.remove('show')
      resultRef.current?.classList.remove('show')

      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    const data = {
      email,
      password: pw,
    }

    try {
      const result = await axios.post<SignInResponse>(
        `http://${server}/api/auth/signin`,
        data
      )

      if (result.data.suc) {
        // Sign in success
        const user: User = {
          id: result.data.id,
          bio: result.data.bio,
          email: result.data.email,
          profile: result.data.profile,
          admin: result.data.admin,
          email_verify: result.data.email_verify,
          username: result.data.username,
        }

        applyLocalStorage(user)
        setLogin(true)
        history.push('/')
      } else {
        // already exists
        resultRef.current?.classList.add('show')
      }
    } catch (err) {
      console.error(err)
      resultRef.current?.classList.add('show')
    }
  }

  return (
    <AuthBox>
      <AuthTitle text={signin} />
      <AuthInput
        value={email}
        handleChnage={handleChnage(setEmail)}
        placeholder={emailText}
        password="email"
        handleSubmit={handleClick}
      />
      <AuthMessage value={notValidEmail} reff={emailRef} />
      <AuthInput
        value={pw}
        handleChnage={handleChnage(setPw)}
        placeholder={password}
        password="password"
        handleSubmit={handleClick}
      />
      <AuthMessage value={notValidPassword} reff={pwRef} />
      <AuthMessage value={loginFailed} reff={resultRef} />
      <AuthBtn value={signin} handleClick={handleClick} />
      <OAuthContainer />
      <AuthLinkBox>
        <AuthLink value={signup} to="/auth/signup" />
        <AuthLink value={searchEmail} to="/auth/searchemail" />
        <AuthLink value={searchPassword} to="/auth/searchpw" />
      </AuthLinkBox>
    </AuthBox>
  )
}

export default memo(SignIn)

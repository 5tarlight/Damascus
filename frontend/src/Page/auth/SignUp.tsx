import axios from 'axios'
import { createRef, Dispatch, FC, memo, SetStateAction, useState } from 'react'
import { useHistory } from 'react-router'
import AuthBox from '../../Components/Auth/AuthBox/AuthBox'
import AuthBtn from '../../Components/Auth/AuthBtn/AuthBtn'
import AuthInput from '../../Components/Auth/AuthInput/AuthInput'
import AuthMessage from '../../Components/Auth/AuthInput/AuthMesssage/AuthMessage'
import AuthTitle from '../../Components/Auth/AuthTitle/AuthTitle'
import AuthLink from '../../Components/Auth/AuthLink/AuthLink'
import AuthLinkBox from '../../Components/Auth/AuthLinkBox/AuthLinkBox'
import { server } from '../../config'
import {
  applyLocalStorage,
  emailRegexp,
  pwRegexp,
  usernameExp,
} from '../../util'
import { OAuthContainer } from '../../Components/Auth/OAuthButton/OAuthButton'
import { AuthLang } from '../../lang/lang'

interface Props {
  setLogin: Dispatch<SetStateAction<boolean>>
  lang: AuthLang
}

interface SignUpResponse {
  email: string
  id: string
  suc: boolean
  username: string
  admin: Bit
}

const SignUp: FC<Props> = ({
  setLogin,
  lang: {
    signup,
    signin,
    email: emailText,
    password,
    confirmPassword,
    username: usernameText,
    notValidEmail,
    emailAlreadyTaken,
    notValidPassword,
    notValidUsername,
    confirmPasswordFail,
  },
}) => {
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [pwCon, setPwCon] = useState('')
  const [username, SetUsername] = useState('')
  const history = useHistory()

  const emailRef = createRef<HTMLDivElement>()
  const pwRef = createRef<HTMLDivElement>()
  const pwConRef = createRef<HTMLDivElement>()
  const usernameRef = createRef<HTMLDivElement>()
  const resultRef = createRef<HTMLDivElement>()

  const handleChnage = (dispatch: Dispatch<SetStateAction<string>>) => {
    return (str: string) => {
      dispatch(str)
    }
  }

  const handleClick = () => {
    if (!emailRegexp.test(email)) {
      emailRef.current?.classList.add('show')
      pwRef.current?.classList.remove('show')
      pwConRef.current?.classList.remove('show')
      usernameRef.current?.classList.remove('show')
      resultRef.current?.classList.remove('show')
    } else if (!pwRegexp.test(pw)) {
      emailRef.current?.classList.remove('show')
      pwRef.current?.classList.add('show')
      pwConRef.current?.classList.remove('show')
      usernameRef.current?.classList.remove('show')
      resultRef.current?.classList.remove('show')
    } else if (pw !== pwCon) {
      emailRef.current?.classList.remove('show')
      pwRef.current?.classList.remove('show')
      pwConRef.current?.classList.add('show')
      usernameRef.current?.classList.remove('show')
      resultRef.current?.classList.remove('show')
    } else if (!username.trim() || !usernameExp.test(username)) {
      emailRef.current?.classList.remove('show')
      pwRef.current?.classList.remove('show')
      pwConRef.current?.classList.remove('show')
      usernameRef.current?.classList.add('show')
      resultRef.current?.classList.remove('show')
    } else {
      emailRef.current?.classList.remove('show')
      pwRef.current?.classList.remove('show')
      pwConRef.current?.classList.remove('show')
      usernameRef.current?.classList.remove('show')
      resultRef.current?.classList.remove('show')
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    const data = {
      email,
      password: pw,
      username,
    }

    try {
      const result = await axios.post<SignUpResponse>(
        `http://${server}/api/auth/signup`,
        data
      )

      if (result.data.suc) {
        // Sign up success
        const user: User = {
          id: result.data.id,
          email: result.data.email,
          username: result.data.username,
          admin: result.data.admin,
          email_verify: {
            data: [0],
            type: 'Buffer',
          },
          bio: '',
          profile: '',
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
      <AuthTitle text={signup} />
      <AuthInput
        value={email}
        handleChnage={handleChnage(setEmail)}
        placeholder={emailText}
        password="email"
        handleSubmit={handleClick}
      />
      <AuthMessage value={notValidEmail} reff={emailRef} />
      <AuthMessage value={emailAlreadyTaken} reff={resultRef} />
      <AuthInput
        value={pw}
        handleChnage={handleChnage(setPw)}
        placeholder={password}
        password="password"
        handleSubmit={handleClick}
      />
      <AuthMessage value={notValidPassword} reff={pwRef} />
      <AuthInput
        value={pwCon}
        handleChnage={handleChnage(setPwCon)}
        placeholder={confirmPassword}
        password="password"
        handleSubmit={handleClick}
      />
      <AuthMessage value={confirmPasswordFail} reff={pwConRef} />
      <AuthInput
        value={username}
        handleChnage={handleChnage(SetUsername)}
        placeholder={usernameText}
        password="text"
        handleSubmit={handleClick}
      />
      <AuthMessage value={notValidUsername} reff={usernameRef} />
      <AuthBtn value={signup} handleClick={handleClick} />

      <OAuthContainer />
      <AuthLinkBox>
        <AuthLink value={signin} to="/auth/signin" />
      </AuthLinkBox>
    </AuthBox>
  )
}

export default memo(SignUp)

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

interface Props {
  setLogin: Dispatch<SetStateAction<boolean>>
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

const SignIn: FC<Props> = ({ setLogin }) => {
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
      <AuthTitle text="로그인" />
      <AuthInput
        value={email}
        handleChnage={handleChnage(setEmail)}
        placeholder="이메일"
        password="email"
        handleSubmit={handleClick}
      />
      <AuthMessage value="유효하지 않은 이메일입니다." reff={emailRef} />
      <AuthInput
        value={pw}
        handleChnage={handleChnage(setPw)}
        placeholder="비밀번호"
        password="password"
        handleSubmit={handleClick}
      />
      <AuthMessage
        value="8자리 이상, 특수문자를 포함해야 합니다."
        reff={pwRef}
      />
      <AuthMessage
        value="이메일이나 비밀번호가 일치하지 않습니다."
        reff={resultRef}
      />
      <AuthBtn value="로그인" handleClick={handleClick} />
      <OAuthContainer />
      <AuthLinkBox>
        <AuthLink value="회원가입" to="/auth/signup" />
        <AuthLink value="아이디 찾기" to="/auth/searchid" />
        <AuthLink value="비밀번호 찾기" to="/auth/searchpw" />
      </AuthLinkBox>
    </AuthBox>
  )
}

export default memo(SignIn)

import axios from 'axios'
import { createRef, Dispatch, FC, memo, SetStateAction, useState } from 'react'
import { useHistory } from 'react-router'
import AuthBox from '../Components/Auth/AuthBox/AuthBox'
import AuthBtn from '../Components/Auth/AuthBtn/AuthBtn'
import AuthInput from '../Components/Auth/AuthInput/AuthInput'
import AuthMessage from '../Components/Auth/AuthInput/AuthMesssage/AuthMessage'
import AuthTitle from '../Components/Auth/AuthTitle/AuthTitle'
import AuthLink from '../Components/Auth/AuthLink/AuthLink'
import AuthLinkBox from '../Components/Auth/AuthLinkBox/AuthLinkBox'
import { server } from '../config'
import { applyLocalStorage, emailRegexp, pwRegexp, usernameExp } from '../util'
import { OAuthContainer } from '../Components/Auth/OAuthButton/OAuthButton'

interface Props {
  setLogin: Dispatch<SetStateAction<boolean>>
}

interface SignUpResponse {
  email: string
  id: string
  suc: boolean
  username: string
  admin: Bit
}

const SignUp: FC<Props> = ({ setLogin }) => {
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
      <AuthTitle text="회원가입" />
      <AuthInput
        value={email}
        handleChnage={handleChnage(setEmail)}
        placeholder="이메일"
        password="email"
        handleSubmit={handleClick}
      />
      <AuthMessage value="유효하지 않은 이메일입니다." reff={emailRef} />
      <AuthMessage value="사용중인 이메일입니다." reff={resultRef} />
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
      <AuthInput
        value={pwCon}
        handleChnage={handleChnage(setPwCon)}
        placeholder="비밀번호 확인"
        password="password"
        handleSubmit={handleClick}
      />
      <AuthMessage value="비밀번호가 일치하지 않습니다." reff={pwConRef} />
      <AuthInput
        value={username}
        handleChnage={handleChnage(SetUsername)}
        placeholder="이름"
        password="text"
        handleSubmit={handleClick}
      />
      <AuthMessage value="사용할 수 없는 이름입니다." reff={usernameRef} />
      <AuthBtn value="회원가입" handleClick={handleClick} />

      <OAuthContainer />
      <AuthLinkBox>
        <AuthLink value="로그인" to="/auth/signin" />
      </AuthLinkBox>
    </AuthBox>
  )
}

export default memo(SignUp)

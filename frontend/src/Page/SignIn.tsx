import { createRef, Dispatch, FC, SetStateAction, useState } from 'react'
import AuthBox from '../Components/Auth/AuthBox/AuthBox'
import AuthBtn from '../Components/Auth/AuthBtn/AuthBtn'
import AuthInput from '../Components/Auth/AuthInput/AuthInput'
import AuthMessage from '../Components/Auth/AuthInput/AuthMesssage/AuthMessage'
import AuthTitle from '../Components/Auth/AuthTitle/AuthTitle'

interface Props {
  setLogin: Dispatch<SetStateAction<boolean>>
}

const SignIn: FC<Props> = ({ setLogin }) => {
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')

  const emailRef = createRef<HTMLDivElement>()
  const pwRef = createRef<HTMLDivElement>()

  const handleChnage = (dispatch: Dispatch<SetStateAction<string>>) => {
    return (str: string) => {
      dispatch(str)
    }
  }

  const emailRegexp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  const pwRegexp = /^([a-zA-Z0-9!@#$%^&*\-_]{8,})$/

  const handleClick = () => {
    if (!emailRegexp.test(email)) {
      emailRef.current?.classList.add('show')
      pwRef.current?.classList.remove('show')
    } else if (!pwRegexp.test(pw)) {
      emailRef.current?.classList.remove('show')
      pwRef.current?.classList.add('show')
    } else {
      emailRef.current?.classList.remove('show')
      pwRef.current?.classList.remove('show')
      console.log('submit')
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
      <AuthBtn value="로그인" handleClick={handleClick} />
    </AuthBox>
  )
}

export default SignIn

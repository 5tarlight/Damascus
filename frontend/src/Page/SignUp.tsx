import { createRef, Dispatch, FC, memo, SetStateAction, useState } from 'react'
import AuthBox from '../Components/Auth/AuthBox/AuthBox'
import AuthBtn from '../Components/Auth/AuthBtn/AuthBtn'
import AuthInput from '../Components/Auth/AuthInput/AuthInput'
import AuthMessage from '../Components/Auth/AuthInput/AuthMesssage/AuthMessage'
import AuthTitle from '../Components/Auth/AuthTitle/AuthTitle'

const SignUp: FC<{}> = () => {
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [pwCon, setPwCon] = useState('')
  const [username, SetUsername] = useState('')

  const emailRef = createRef<HTMLDivElement>()
  const pwRef = createRef<HTMLDivElement>()
  const pwConRef = createRef<HTMLDivElement>()
  const usernameRef = createRef<HTMLDivElement>()

  const handleChnage = (dispatch: Dispatch<SetStateAction<string>>) => {
    return (str: string) => {
      dispatch(str)
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
      />
      <AuthMessage value="유효하지 않은 이메일입니다." reff={emailRef} />
      <AuthInput
        value={pw}
        handleChnage={handleChnage(setPw)}
        placeholder="비밀번호"
        password="password"
      />
      <AuthMessage
        value="6자리 이상, 특수문자를 포함해야 합니다."
        reff={pwRef}
      />
      <AuthInput
        value={pwCon}
        handleChnage={handleChnage(setPwCon)}
        placeholder="비밀번호 확인"
        password="password"
      />
      <AuthMessage value="비밀번호가 일치하지 않습니다." reff={pwConRef} />
      <AuthInput
        value={username}
        handleChnage={handleChnage(SetUsername)}
        placeholder="이름"
        password="text"
      />
      <AuthMessage
        value="사용할 수 없는 문자나 이름입니다."
        reff={usernameRef}
      />
      <AuthBtn value="회원가입" />
    </AuthBox>
  )
}

export default memo(SignUp)

import { Dispatch, FC, memo, SetStateAction, useState } from 'react'
import AuthBox from '../Components/Auth/AuthBox/AuthBox'
import AuthInput from '../Components/Auth/AuthInput/AuthInput'
import AuthTitle from '../Components/Auth/AuthTitle/AuthTitle'

const SignUp: FC<{}> = () => {
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [pwCon, setPwCon] = useState('')
  const [username, SetUsername] = useState('')

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
      <AuthInput
        value={pw}
        handleChnage={handleChnage(setPw)}
        placeholder="비밀번호"
        password="password"
      />
      <AuthInput
        value={pwCon}
        handleChnage={handleChnage(setPwCon)}
        placeholder="비밀번호 확인"
        password="password"
      />
      <AuthInput
        value={username}
        handleChnage={handleChnage(SetUsername)}
        placeholder="이름"
        password="text"
      />
    </AuthBox>
  )
}

export default memo(SignUp)

import { Dispatch, FC, memo, SetStateAction, useState } from 'react'
import AuthBox from '../Components/Auth/AuthBox/AuthBox'
import AuthInput from '../Components/Auth/AuthInput/AuthInput'
import AuthTitle from '../Components/Auth/AuthTitle/AuthTitle'

const SignUp: FC<{}> = () => {
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')

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
    </AuthBox>
  )
}

export default memo(SignUp)

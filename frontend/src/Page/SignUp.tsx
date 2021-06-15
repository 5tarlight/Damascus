import { FC } from 'react'
import AuthBox from '../Components/Auth/AuthBox/AuthBox'
import AuthTitle from '../Components/Auth/AuthTitle/AuthTitle'

const SignUp: FC<{}> = () => (
  <AuthBox>
    <AuthTitle text="회원가입" />
  </AuthBox>
)
export default SignUp

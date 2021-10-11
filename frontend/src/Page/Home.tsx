import { FC, memo } from 'react'
import { useTitle } from 'react-use'
import HomeTitle from '../Components/Home/HomeTItle/HomeTitle'

const Home: FC<{}> = () => {
  useTitle('Damascus')

  return <HomeTitle />
}

export default memo(Home)

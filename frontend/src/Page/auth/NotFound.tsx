import { FC } from 'react'
import { useTitle } from 'react-use'
import Error404 from '../../Components/Error404/Error404'

const NotFound: FC<{}> = () => {
  useTitle('Damascus - Error 404')
  return <Error404 />
}

export default NotFound

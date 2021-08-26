import { FC } from 'react'
import { useParams } from 'react-router'

interface Props {}

interface ProfileParam {
  id: string
}

const UserProfile: FC<Props> = () => {
  const { id } = useParams<ProfileParam>()

  return <></>
}

export default UserProfile

import { FC, memo } from 'react'
import { useParams } from 'react-router'
import ProfileSec from '../Components/Profile/ProfileSec/ProfileSec'

interface ProfileParam {
  id: string
}

const Profile: FC<{}> = () => {
  const id = parseInt(useParams<ProfileParam>().id)

  return <ProfileSec userId={id} />
}

export default memo(Profile)

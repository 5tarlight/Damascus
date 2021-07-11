import { FC, memo } from 'react'
import { useParams } from 'react-router'
import ProfileSec from '../Components/Profile/ProfileSec/ProfileSec'
import ProfileTable from '../Components/Profile/ProfileTable/ProfileTable'

interface ProfileParam {
  id: string
}

const Profile: FC<{}> = () => {
  const id = parseInt(useParams<ProfileParam>().id)

  return (
    <ProfileTable>
      <ProfileSec userId={id} />
    </ProfileTable>
  )
}

export default memo(Profile)

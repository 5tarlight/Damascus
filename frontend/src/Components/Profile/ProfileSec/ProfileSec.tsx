import axios from 'axios'
import { FC, memo, useEffect, useState } from 'react'

import ProfileDesc from './ProfileDesc/ProfileDesc'
import ProfileDiv from './ProfileDiv/ProfileDiv'
import { server } from '../../../config'

interface Props {
  userId: number
}

interface ProfileState {
  id: number
  email: string
  username: string
  admin: boolean
  profile: string
  bio: string
}

interface ProfileResponse {
  email: string
  id: number
  username: string
  admin: {
    data: Array<0 | 1>
    type: 'Buffer'
  }
  profile: string
  bio: string
}

const ProfileSec: FC<Props> = ({ userId }) => {
  const [profile, setProfile] = useState<ProfileState>()
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    axios
      .get<ProfileResponse[]>(
        `http://${server}/api/auth/getuserbyid?id=${userId}`
      )
      .then(res => {
        if (res.status !== 200 || res.data.length < 1) {
          setFailed(true)
          setLoaded(true)
        } else {
          console.dir(res.data)
          const {
            id,
            email,
            username,
            admin: { data },
            profile,
            bio,
          } = res.data[0]
          console.dir(data)
          setProfile({
            id,
            email,
            username,
            admin: data[0] === 1,
            profile,
            bio,
          })
          setLoaded(true)
          setFailed(false)
        }
      })
      .catch(err => {
        setFailed(true)
        setLoaded(true)
      })
  }, [userId])

  return (
    <ProfileDiv failed={failed} loaded={loaded}>
      <ProfileDesc
        admin={profile?.admin}
        email={profile?.email}
        id={profile?.id || -1}
        username={profile?.username}
        profile={profile?.profile}
        bio={profile?.bio}
      />
    </ProfileDiv>
  )
}

export default memo(ProfileSec)

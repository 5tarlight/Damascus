import axios from 'axios'
import { FC, useEffect, useState } from 'react'

import ProfileDesc from './ProfileDesc/ProfileDesc'
import ProfileDiv from './ProfileDiv/ProfileDiv'
import { server } from '../../../config'
import { parseBit } from '../../../util'

interface Props {
  userId: string
}

interface ProfileState {
  id: string
  email: string
  username: string
  admin: boolean
  profile: string
  bio: string
  email_verify: boolean
}

interface ProfileResponse {
  email: string
  id: string
  username: string
  admin: Bit
  profile: string
  bio: string
  email_verify: Bit
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
          const { id, email, username, admin, profile, bio, email_verify } =
            res.data[0]
          setProfile({
            id,
            email,
            username,
            admin: parseBit(admin) === 'true',
            profile,
            bio,
            email_verify: parseBit(email_verify) === 'true',
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
        id={profile?.id || ''}
        username={profile?.username}
        profile={profile?.profile}
        bio={profile?.bio}
        email_verify={profile?.email_verify}
      />
    </ProfileDiv>
  )
}

export default ProfileSec

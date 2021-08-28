import axios from 'axios'
import { FC, memo, useEffect, useState } from 'react'
import styled from 'styled-components'
import { server } from '../../config'
import { UserLang } from '../../lang/lang'
import { isCurrentUser, parseBit } from '../../util'
import UserProfileImg from './UserProfileImg'

interface Props {
  id: string
  lang: UserLang
}

export interface ProfileState {
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

const Loading = styled.div`
  font-size: 25px;
`

const Failure = styled.div`
  font-size: 25px;
`

const ProfileContainer = styled.div`
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  border: 1px solid #e7e7e7;
  margin-top: 20px;
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.009),
    0 6.7px 5.3px rgba(0, 0, 0, 0.018), 0 12.5px 10px rgba(0, 0, 0, 0.026),
    0 22.3px 17.9px rgba(0, 0, 0, 0.034), 0 41.8px 33.4px rgba(0, 0, 0, 0.041),
    0 100px 80px rgba(0, 0, 0, 0.04);
  min-height: 400px;
`

const UserProfileContainer: FC<Props> = ({
  id,
  lang: { failedToLoad, loading },
}) => {
  const [profile, setProfile] = useState<ProfileState>()
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const isOwner = isCurrentUser(id)

  useEffect(() => {
    axios
      .get<ProfileResponse[]>(`http://${server}/api/auth/getuserbyid?id=${id}`)
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
  }, [id])

  return (
    <ProfileContainer>
      {!loaded ? (
        <Loading>{loading}</Loading>
      ) : failed ? (
        <Failure>{failedToLoad}</Failure>
      ) : (
        <>
          <UserProfileImg id={id} isOwner={isOwner} />
        </>
      )}
    </ProfileContainer>
  )
}

export default memo(UserProfileContainer)

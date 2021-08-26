import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { server } from '../../config'
import { UserLang } from '../../lang/lang'
import { parseBit } from '../../util'

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
  margin-left: auto;
  margin-right: auto;
  font-size: 25px;
  align-items: center;
`

const UserProfileContainer: FC<Props> = ({
  id,
  lang: { failedToLoad, loading },
}) => {
  const [profile, setProfile] = useState<ProfileState>()
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)

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
    <>
      {!loaded ? (
        <Loading>{loading}</Loading>
      ) : failed ? (
        <div>{failedToLoad}</div>
      ) : (
        <div>Success</div>
      )}
    </>
  )
}

export default UserProfileContainer

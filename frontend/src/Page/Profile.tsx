import axios from 'axios'
import { FC, memo, useEffect, useState } from 'react'
import { useParams } from 'react-router'
import ProfileDiv from '../Components/Profile/ProfileDiv/ProfileDiv'
import { server } from '../config'

interface ProfileState {
  id: number
  email: string
  username: string
  admin: boolean
}

interface ProfileParam {
  id: string
}

interface ProfileResponse {
  email: string
  id: number
  username: string
  admin: {
    data: Array<0 | 1>
    type: 'Buffer'
  }
}

const Profile: FC<{}> = () => {
  const [profile, setProfile] = useState<ProfileState>()
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const id = parseInt(useParams<ProfileParam>().id)

  useEffect(() => {
    axios
      .get<ProfileResponse[]>(`http://${server}/api/auth/getuserbyid?id=${id}`)
      .then(res => {
        if (res.status !== 200 || res.data.length < 1) {
          setFailed(true)
          setLoaded(true)
        } else {
          const {
            id,
            email,
            username,
            admin: { data },
          } = res.data[0]
          setProfile({
            id,
            email,
            username,
            admin: data[0] === 1,
          })
          setLoaded(true)
          setFailed(false)
        }
      })
  }, [id])

  return (
    <ProfileDiv failed={failed} loaded={loaded}>
      <h1>{profile?.username}</h1>
      <h2>{profile?.email}</h2>
      {profile?.admin ? <h3>관리자</h3> : null}
    </ProfileDiv>
  )
}

export default memo(Profile)

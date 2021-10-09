import axios from 'axios'
import { FC, memo, useEffect, useState } from 'react'
import styled from 'styled-components'
import { server } from '../../config'
import { UserLang } from '../../lang/lang'
import { isCurrentUser, parseBit } from '../../util'
import ProfileText from './ProfileText'
import UserProfileImg from './UserProfileImg'
import { UpdateResult } from '../Profile/ProfileSec/ProfileDesc/ProfileDesc'
import { useTitle } from 'react-use'

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

const TextField = styled.div`
  margin-left: 350px;
`

const UserProfileContainer: FC<Props> = ({
  id,
  lang,
  lang: {
    failedToLoad,
    loading,
    bioPlace,
    emailPlace,
    usernamePlace,
    profilePlace,
  },
}) => {
  const [profile, setProfile] = useState<ProfileState>()
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const isOwner = isCurrentUser(id)

  useTitle(`Damascus - ${profile?.username}'s Profile'`)

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

  const getBody = (type: string, value: string) => {
    return {
      id: localStorage.getItem('id'),
      update: type,
      value: value,
    }
  }
  const handleResponse = (res: UpdateResult) => {
    if (res.msg === 'success') {
      const { email, username, admin, bio, profile } = res.user[0]
      localStorage.setItem('email', email)
      localStorage.setItem('username', username)
      localStorage.setItem('bio', bio)
      localStorage.setItem('profile', profile)
      localStorage.setItem('admin', parseBit(admin))
      window.location.reload()
    } else {
      alert(res.msg)
    }
  }

  const handleUsernameChange = async (value: string) => {
    const result = await axios.post<UpdateResult>(
      `http://${server}/api/auth/update`,
      getBody('username', value)
    )
    handleResponse(result.data)
  }
  const handleEmailChange = async (value: string) => {
    const result = await axios.post<UpdateResult>(
      `http://${server}/api/auth/update`,
      getBody('email', value)
    )
    handleResponse(result.data)
  }
  const handleBioChange = async (value: string) => {
    const result = await axios.post<UpdateResult>(
      `http://${server}/api/auth/update`,
      getBody('bio', value)
    )
    handleResponse(result.data)
  }
  const handleProfileChange = async (value: string) => {
    const result = await axios.post<UpdateResult>(
      `http://${server}/api/auth/update`,
      getBody('profile', value)
    )
    handleResponse(result.data)
  }

  return (
    <ProfileContainer>
      {!loaded ? (
        <Loading>{loading}</Loading>
      ) : failed ? (
        <Failure>{failedToLoad}</Failure>
      ) : (
        <>
          <UserProfileImg id={id} isOwner={isOwner} />
          <TextField>
            <ProfileText
              editable={isOwner}
              lang={lang}
              type="username"
              placeholder={usernamePlace}
              value={profile?.username || ''}
              handleChange={handleUsernameChange}
              admin={profile?.admin}
            />
            <ProfileText
              editable={isOwner}
              lang={lang}
              type="email"
              placeholder={emailPlace}
              value={profile?.email || ''}
              email_verify={profile?.email_verify}
              handleChange={handleEmailChange}
            />
            <ProfileText
              editable={isOwner}
              lang={lang}
              type="bio"
              placeholder={bioPlace}
              value={profile?.bio || ''}
              handleChange={handleBioChange}
            />
            <ProfileText
              editable={isOwner}
              lang={lang}
              type="profile"
              placeholder={profilePlace}
              value={profile?.profile || ''}
              handleChange={handleProfileChange}
            />
          </TextField>
        </>
      )}
    </ProfileContainer>
  )
}

export default memo(UserProfileContainer)

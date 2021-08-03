import { FC } from 'react'
import styles from './ProfileDesc.scss'
import classNames from 'classnames/bind'
import ProfileImg from '../ProfileImg/ProfileImg'
import EditableTxt from '../../EditableTxt/EditableTxt'
import { isCurrentUser, parseBit } from '../../../../util'
import axios from 'axios'
import { server } from '../../../../config'

const cx = classNames.bind(styles)

interface UpdateResult {
  msg: string
  user: User[]
}

interface Props {
  username?: string
  admin?: boolean
  email?: string
  id?: number
  profile?: string
  bio?: string
}

const ProfileDesc: FC<Props> = ({
  admin = false,
  email,
  username,
  id,
  profile,
  bio,
}) => {
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
    <div className={cx('profile-desc')}>
      <ProfileImg id={id || -1} />
      <EditableTxt
        value={username || ''}
        // handleChange={e => {}}
        placeholder="username"
        isOwner={isCurrentUser(id!)}
        type="username"
        handleSubmit={handleUsernameChange}
      />
      {/* <div>{id}</div> */}
      <EditableTxt
        value={email || ''}
        placeholder="email"
        isOwner={isCurrentUser(id!)}
        type="email"
        handleSubmit={handleEmailChange}
      />
      <EditableTxt
        value={bio || '상태'}
        placeholder="bio"
        isOwner={isCurrentUser(id!)}
        handleSubmit={handleBioChange}
      />
      <EditableTxt
        value={profile || '프로필'}
        placeholder="profile"
        isOwner={isCurrentUser(id!)}
        handleSubmit={handleProfileChange}
      />
      {admin ? <div>관리자</div> : null}
    </div>
  )
}

export default ProfileDesc

import { FC } from 'react'
import styles from './ProfileDesc.scss'
import classNames from 'classnames/bind'
import ProfileImg from '../ProfileImg/ProfileImg'
import EditableTxt from '../../EditableTxt/EditableTxt'
import {
  emailRegexp,
  isCurrentUser,
  parseBit,
  usernameExp,
} from '../../../../util'
import axios from 'axios'
import { server } from '../../../../config'

const cx = classNames.bind(styles)

interface UpdateResult {
  msg: string
  id?: string
  email?: string
  username?: string
  admin?: Bit
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
      const { email, username, admin } = res
      localStorage.setItem('email', email || '')
      localStorage.setItem('username', username || '')
      localStorage.setItem('admin', parseBit(admin))
      window.location.reload()
    } else {
      alert(res.msg)
    }
  }

  const handleUsernameChange = async (value: string) => {
    if (!usernameExp.test(value)) {
      alert('잘못된 이름입니다.') // TODO alert -> text
      return
    }
    const result = await axios.post<UpdateResult>(
      `http://${server}/api/auth/update`,
      getBody('username', value)
    )
    handleResponse(result.data)
  }
  const handleEmailChange = async (value: string) => {
    if (!emailRegexp.test(value)) {
      alert('잘못된 이메일입니다.') // TODO alert -> text
      return
    }
    const result = await axios.post<UpdateResult>(
      `http://${server}/api/auth/update`,
      getBody('email', value)
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
      <div>profile: {profile}</div>
      <div>bio: {bio}</div>
      {admin ? <div>관리자</div> : null}
    </div>
  )
}

export default ProfileDesc

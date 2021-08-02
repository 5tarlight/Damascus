import { FC } from 'react'
import styles from './ProfileDesc.scss'
import classNames from 'classnames/bind'
import ProfileImg from '../ProfileImg/ProfileImg'
import EditableTxt from '../../EditableTxt/EditableTxt'
import { isCurrentUser } from '../../../../util'

const cx = classNames.bind(styles)

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
  const handleUsernameChange = (value: string) => {}
  const handleEmailChange = (value: string) => {}

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

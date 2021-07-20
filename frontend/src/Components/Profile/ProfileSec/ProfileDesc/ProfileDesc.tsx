import { FC, memo } from 'react'
import styles from './ProfileDesc.scss'
import classNames from 'classnames/bind'
import ProfileImg from '../ProfileImg/ProfileImg'
import EditableTxt from '../../EditableTxt/EditableTxt'

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
  const isOwner = parseInt(localStorage.getItem('id') || '-1') === id

  return (
    <div className={cx('profile-desc')}>
      <ProfileImg id={id || -1} />
      <EditableTxt
        value={username || ''}
        handleChange={e => {}}
        placeholder="username"
        isOwner={isOwner}
      />
      <div>{id}</div>
      <div>{email}</div>
      <div>profile: {profile}</div>
      <div>bio: {bio}</div>
      {admin ? <div>관리자</div> : null}
    </div>
  )
}

export default memo(ProfileDesc)

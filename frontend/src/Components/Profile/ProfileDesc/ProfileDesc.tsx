import { FC } from 'react'
import styles from './ProfileDesc.scss'
import classNames from 'classnames/bind'
import ProfileImg from '../ProfileImg/ProfileImg'

const cx = classNames.bind(styles)

interface Props {
  username?: string
  admin?: boolean
  email?: string
  id?: number
}

const ProfileDesc: FC<Props> = ({ admin = false, email, username, id }) => {
  return (
    <div className={cx('profile-desc')}>
      <ProfileImg id={id || -1} />
      <div>
        {username}({id})
      </div>
      <div>{email}</div>
      {admin ? <div>관리자</div> : null}
    </div>
  )
}

export default ProfileDesc
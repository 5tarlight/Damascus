import { FC } from 'react'
import styles from './ProfileIcon.scss'
import classNames from 'classnames/bind'
import profileIcon from './profile.png'

const cx = classNames.bind(styles)

const ProfileIcon: FC<{}> = () => {
  return (
    <>
      <div className={cx('profile-icon')}>
        <img src={profileIcon} alt="profile" />
      </div>
    </>
  )
}

export default ProfileIcon

import { FC } from 'react'
import styles from './ProfileTable.scss'
import classNames from 'classnames/bind'
import ProfileMenu from '../ProfileMenu/ProfileMenu'

const cx = classNames.bind(styles)

const ProfileTable: FC<{}> = ({ children }) => {
  return (
    <div className={cx('profile-table')}>
      <div className={cx('profile-menu-sec')}>
        <ProfileMenu />
      </div>
      <div className={cx('profile-content-sec')}>{children}</div>
    </div>
  )
}

export default ProfileTable

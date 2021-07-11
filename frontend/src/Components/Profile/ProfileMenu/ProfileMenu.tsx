import { FC } from 'react'
import styles from './ProfileMenu.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface Props {}

const ProfileMenu: FC<Props> = () => {
  return <div className={cx('profile-menu')}>Menu!</div>
}

export default ProfileMenu

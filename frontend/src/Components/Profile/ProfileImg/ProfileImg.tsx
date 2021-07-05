import { FC } from 'react'
import styles from './ProfileImg.scss'
import classNames from 'classnames/bind'
import ProfileIcon from '../../Header/ProfileDropdown/ProfileIcon/profile.png'

const cx = classNames.bind(styles)

interface Props {
  id: number
}

const ProfileImg: FC<Props> = () => {
  return (
    <img className={cx('profile-img')} src={ProfileIcon} alt="profile img" />
  )
}

export default ProfileImg

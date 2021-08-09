import { FC, RefObject } from 'react'
import styles from './ProfileDropdown.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface Props {
  refer: RefObject<HTMLDivElement>
  login: boolean
}

const ProfileDropdown: FC<Props> = ({ refer, login }) => {
  return (
    <div className={cx('dropdown')} ref={refer}>
      Dropdown
    </div>
  )
}

export default ProfileDropdown

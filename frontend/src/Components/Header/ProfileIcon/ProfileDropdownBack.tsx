import { FC, RefObject } from 'react'
import styles from './ProfileDropdownBack.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface Props {
  refer: RefObject<HTMLDivElement>
  handleHide(): void
}

const ProfileDropdownBack: FC<Props> = ({ refer, handleHide }) => {
  return (
    <div
      className={cx('dropdown-background')}
      ref={refer}
      onClick={handleHide}
    ></div>
  )
}

export default ProfileDropdownBack

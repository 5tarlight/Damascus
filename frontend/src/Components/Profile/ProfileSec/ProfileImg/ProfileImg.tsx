import { createRef, FC, memo } from 'react'
import styles from './ProfileImg.scss'
import classNames from 'classnames/bind'
import ProfileIcon from '../../../Header/ProfileDropdown/ProfileIcon/profile.png'

const cx = classNames.bind(styles)

interface Props {
  id: number
}

const ProfileImg: FC<Props> = () => {
  const inputFile = createRef<HTMLInputElement>()

  return (
    <div>
      <input
        type="file"
        ref={inputFile}
        style={{ display: 'none' }}
        accept="image/*"
      />
      <img
        className={cx('profile-img')}
        src={ProfileIcon}
        alt="profile img"
        onClick={e => {
          e.preventDefault()
          e.stopPropagation()
          inputFile.current?.click()
        }}
      />
    </div>
  )
}

export default memo(ProfileImg)

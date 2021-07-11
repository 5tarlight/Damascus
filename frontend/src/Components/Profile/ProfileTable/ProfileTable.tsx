import { Dispatch, FC, SetStateAction } from 'react'
import styles from './ProfileTable.scss'
import classNames from 'classnames/bind'
import ProfileMenu from '../ProfileMenu/ProfileMenu'
import { ProfileMenuProps, ProfileMenuType } from '../../../Page/Profile'
import ProfileMenuItem from '../ProfileMenu/ProfileMenuItem/ProfileMenuItem'

const cx = classNames.bind(styles)

interface Props {
  items: ProfileMenuProps[]
  setCurMenu: Dispatch<SetStateAction<ProfileMenuType>>
  curMenu: ProfileMenuType
}

const ProfileTable: FC<Props> = ({ items, setCurMenu, curMenu, children }) => {
  const profileItems = items.map(({ id, value }) => (
    <ProfileMenuItem item={{ id, value }} setCurMenu={setCurMenu} key={id} />
  ))

  return (
    <div className={cx('profile-table')}>
      <div className={cx('profile-menu-sec')}>
        <ProfileMenu>{profileItems}</ProfileMenu>
      </div>
      <div className={cx('profile-content-sec')}>{children}</div>
    </div>
  )
}

export default ProfileTable

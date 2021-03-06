import { Dispatch, FC, SetStateAction } from 'react'
import styles from './ProfileTable.scss'
import classNames from 'classnames/bind'
import ProfileMenu from '../ProfileMenu/ProfileMenu'
import { ProfileMenuProps, ProfileMenuType } from '../../../Page/auth/Profile'
import ProfileMenuItem from '../ProfileMenu/ProfileMenuItem/ProfileMenuItem'
import ProfileSec from '../ProfileSec/ProfileSec'
import ManagePostSec from '../ManagePostSec/ManagePostSec'
import SettingSec from '../SettingSec/SettingSec'
import { isCurrentUser } from '../../../util'

const cx = classNames.bind(styles)

interface Props {
  items: ProfileMenuProps[]
  setCurMenu: Dispatch<SetStateAction<ProfileMenuType>>
  curMenu: ProfileMenuType
  userId: string
}

const ProfileTable: FC<Props> = ({ items, setCurMenu, curMenu, userId }) => {
  const profileItems = items.map(({ id, value }) => {
    if ((id === 'manage-post' || id === 'setting') && !isCurrentUser(userId))
      return null

    return (
      <ProfileMenuItem item={{ id, value }} setCurMenu={setCurMenu} key={id} />
    )
  })

  return (
    <div className={cx('profile-table')}>
      <div className={cx('profile-menu-sec')}>
        <ProfileMenu>{profileItems}</ProfileMenu>
      </div>
      <div className={cx('profile-content-sec')}>
        {(() => {
          switch (curMenu) {
            case 'profile':
              return <ProfileSec userId={userId} />
            case 'manage-post':
              return <ManagePostSec />
            case 'setting':
              return <SettingSec />
          }
        })()}
      </div>
    </div>
  )
}

export default ProfileTable

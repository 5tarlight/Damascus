import { Dispatch, FC, memo, SetStateAction } from 'react'
import styles from './ProfileMenuItem.scss'
import classNames from 'classnames/bind'
import { ProfileMenuProps, ProfileMenuType } from '../../../../Page/Profile'

const cx = classNames.bind(styles)

interface Props {
  item: ProfileMenuProps
  setCurMenu: Dispatch<SetStateAction<ProfileMenuType>>
}

const ProfileMenuItem: FC<Props> = ({ item: { id, value }, setCurMenu }) => (
  <div className={cx('profile-menu-item')} onClick={() => setCurMenu(id)}>
    {value}
  </div>
)

export default memo(ProfileMenuItem)

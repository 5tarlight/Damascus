import { FC, memo } from 'react'
import Logo from './Logo/Logo'
import styles from './Header.scss'
import classNames from 'classnames/bind'
import HeaderSearch from './HeaderSearch/HeaderSearch'
import ProfileIcon from './ProfileDropdown/ProfileIcon/ProfileIcon'

const cx = classNames.bind(styles)

const Header: FC<{}> = () => (
  <div className={cx('header')}>
    <Logo />
    <nav>
      <ul className={cx('item-list')}>
        <HeaderSearch />
      </ul>
    </nav>
    <nav>
      <ul className={cx('item-list')}>
        <ProfileIcon />
      </ul>
    </nav>
  </div>
)

export default memo(Header)

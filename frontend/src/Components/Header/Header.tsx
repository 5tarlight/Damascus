import { FC, memo } from 'react'
import Logo from './Logo/Logo'
import styles from './Header.scss'
import classNames from 'classnames/bind'
import SearchBox from './HeaderSearch2/SearchBox'
// import HeaderSearch from './HeaderSearch/HeaderSearch'
import ProfileIcon from './ProfileIcon/ProfileIcon'

const cx = classNames.bind(styles)

interface Props {
  login: boolean
}

const Header: FC<Props> = ({ login }) => (
  <div className={cx('header')}>
    <Logo />
    <SearchBox />
    <ProfileIcon login={login} />
    {/* <nav>
      <ul className={cx('item-list')}>
        <HeaderSearch />
      </ul>
    </nav>
    <nav>
      <ul className={cx('item-list')}>
        <ProfileIcon login={login} />
      </ul>
    </nav> */}
  </div>
)

export default memo(Header)

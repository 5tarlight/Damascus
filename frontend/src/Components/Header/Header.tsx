import { FC } from 'react'
import Logo from './Logo/Logo'
import styles from './Header.scss'
import classNames from 'classnames/bind'
import HeaderItem from './HeaderItem/HeaderItem'

const cx = classNames.bind(styles)

const Header: FC<{}> = () => (
  <div className={cx('header')}>
    <Logo />
    <div>
      <HeaderItem text='커미션' to='/commisions' />
    </div>
    <div>
      Login
    </div>
  </div>
)

export default Header

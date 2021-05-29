import { FC } from 'react'
import Logo from './Logo/Logo'
import styles from './Header.scss'
import classNames from 'classnames/bind'
import HeaderItem from './HeaderItem/HeaderItem'
import HeaderAuthItem from './HeaderAuthItem/HeaderAuthItem'

const cx = classNames.bind(styles)

const Header: FC<{}> = () => (
  <div className={cx('header')}>
    <Logo />
    <div>
      <ul className={cx('item-list')}>
        <li><HeaderItem text='커미션' to='/commisions' /></li>
        <li><HeaderItem text='커미션' to='/commisions' /></li>
      </ul>
    </div>
    <nav>
      <ul className={cx('item-list')}>
        <li><HeaderAuthItem text='로그인' to='/auth/login' /></li>
        <li><HeaderAuthItem text='회원가입' to='/auth/signup' /></li>
      </ul>
    </nav>
  </div>
)

export default Header

import { FC } from 'react'
import Logo from './Logo/Logo'
import styles from './Header.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const Header: FC<{}> = () => (
  <div className={cx('header')}>
    <Logo />
  </div>
)

export default Header

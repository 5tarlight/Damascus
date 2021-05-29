import { FC } from 'react'
import logo from './logo.png'
import styles from './Logo.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const Logo: FC<{}> = () => (
  <img src={logo} alt='DAMASCUS' className={cx('img-logo')} />
)

export default Logo

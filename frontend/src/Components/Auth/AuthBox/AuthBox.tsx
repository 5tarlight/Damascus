import { FC } from 'react'
import styles from './AuthBox.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const AuthBox: FC<{}> = ({ children }) => (
  <div className={cx('auth-container')}>
    <div className={cx('auth-box')}>{children}</div>
  </div>
)

export default AuthBox

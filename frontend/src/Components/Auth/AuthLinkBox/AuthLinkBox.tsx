import { FC } from 'react'
import styles from './AuthLinkBox.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const AuthLinkBox: FC<{}> = ({ children }) => {
  return <div className={cx('auth-link-box')}>{children}</div>
}

export default AuthLinkBox

import { FC, memo } from 'react'
import styles from './AuthTitle.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface Props {
  text: string
}

const AuthTitle: FC<Props> = ({ text }) => (
  <div className={cx('auth-title')}>{text}</div>
)

export default memo(AuthTitle)

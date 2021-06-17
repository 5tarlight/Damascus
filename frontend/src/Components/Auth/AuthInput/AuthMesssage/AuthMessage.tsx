import { FC, RefObject } from 'react'
import styles from './AuthMessage.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface Props {
  value: string
  reff: RefObject<HTMLDivElement>
}

const AuthMessage: FC<Props> = ({ value, reff }) => (
  <div className={cx('auth-message')} ref={reff}>
    {value}
  </div>
)

export default AuthMessage

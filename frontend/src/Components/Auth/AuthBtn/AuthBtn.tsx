import { FC, memo } from 'react'
import styles from './AuthBtn.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface Props {
  value: string
}

const AuthBtn: FC<Props> = ({ value }) => {
  return (
    <button className={cx('auth-btn')} type="submit">
      {value}
    </button>
  )
}

export default memo(AuthBtn)

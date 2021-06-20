import { FC, memo } from 'react'
import styles from './AuthBtn.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface Props {
  value: string
  handleClick(): any
}

const AuthBtn: FC<Props> = ({ value, handleClick }) => {
  return (
    <button
      className={cx('auth-btn')}
      type="submit"
      onClick={e => {
        e.preventDefault()
        handleClick()
      }}
    >
      {value}
    </button>
  )
}

export default memo(AuthBtn)

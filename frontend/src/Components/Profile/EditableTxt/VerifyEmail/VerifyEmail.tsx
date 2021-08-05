import { FC, memo } from 'react'
import styles from './VerifyEmail.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface Props {
  handleClick(): void
}

const VerifyEmail: FC<Props> = ({ handleClick }) => {
  return (
    <div
      className={cx('verify-email')}
      onClick={event => {
        event.stopPropagation()
        event.preventDefault()
        handleClick()
      }}
    >
      인증하기
    </div>
  )
}

export default memo(VerifyEmail)

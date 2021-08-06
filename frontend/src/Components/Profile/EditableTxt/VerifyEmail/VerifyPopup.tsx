import { FC, RefObject } from 'react'
import styles from './VerifyPopup.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface Props {
  refer: RefObject<HTMLDivElement>
  handleHide(): void
  handleSuccess(): void
}

const VerifyPopup: FC<Props> = ({ refer, handleHide }) => {
  return (
    <div
      ref={refer}
      className={cx('verify-popup')}
      onClick={event => {
        event.preventDefault()
        event.stopPropagation()
      }}
    >
      <div
        className={cx('popup-exit')}
        onClick={event => {
          event.preventDefault()
          event.stopPropagation()
          handleHide()
        }}
      >
        x
      </div>
      인증코드 6자리를 입력하세요
      <input className={cx('verify-input')} />
    </div>
  )
}

export default VerifyPopup

import { ChangeEvent, FC, RefObject } from 'react'
import styles from './VerifyPopup.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

interface Props {
  refer: RefObject<HTMLDivElement>
  handleHide(): void
  handleSuccess(): void
  sendingEmail: boolean
  email: string
  err: boolean
  checkCode(code: number): boolean
  active: boolean
}

const VerifyPopup: FC<Props> = ({
  refer,
  handleHide,
  sendingEmail,
  email,
  err,
  checkCode,
  handleSuccess,
  active,
}) => {
  if (err) {
    alert('오류가 발생했습니다.')
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event

    if (value.length === 6 && checkCode(parseInt(value))) {
      handleSuccess()
      handleHide()
    }
  }

  return (
    <div
      ref={refer}
      className={cx('verify-popup', { active })}
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
      <div>
        {sendingEmail
          ? email + '로 이메일이 발송되었습니다.'
          : '이메일 발송중...'}
      </div>
      인증코드 6자리를 입력하세요.
      <input className={cx('verify-input')} onChange={handleChange} />
    </div>
  )
}

export default VerifyPopup

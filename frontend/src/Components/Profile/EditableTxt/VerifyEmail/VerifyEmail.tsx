import { createRef, FC, memo } from 'react'
import styles from './VerifyEmail.scss'
import classNames from 'classnames/bind'
import VerifyPopup from './VerifyPopup'

const cx = classNames.bind(styles)

interface Props {
  handleSuccess(): void
}

const VerifyEmail: FC<Props> = ({ handleSuccess }) => {
  const popup = createRef<HTMLDivElement>()

  const handleShow = () => (popup.current!.style.display = 'block')
  const handleHide = () => (popup.current!.style.display = 'none')

  return (
    <>
      <VerifyPopup
        refer={popup}
        handleHide={handleHide}
        handleSuccess={handleSuccess}
      />
      <div
        className={cx('verify-email')}
        onClick={event => {
          event.stopPropagation()
          event.preventDefault()
          handleShow()
        }}
      >
        인증하기
      </div>
    </>
  )
}

export default memo(VerifyEmail)

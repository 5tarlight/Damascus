import { createRef, FC, memo, useEffect, useState } from 'react'
import styles from './VerifyEmail.scss'
import classNames from 'classnames/bind'
import VerifyPopup from './VerifyPopup'
import axios from 'axios'
import { server } from '../../../../config'

const cx = classNames.bind(styles)

interface Props {
  handleSuccess(): void
}

interface VerifyRes {
  msg: string
  succcess: string
  verify: number
}

const VerifyEmail: FC<Props> = ({ handleSuccess }) => {
  const popup = createRef<HTMLDivElement>()
  let emailSent = false
  const [sendingEmail, setSending] = useState(false)
  const [code, setCode] = useState(-1)
  const [err, setErr] = useState(false)
  const email = localStorage.getItem('email') || ''
  const [isActive, setIsActive] = useState(false)

  const handleShow = () => {
    popup.current!.style.display = 'block'
    setIsActive(true)
  }
  const handleHide = () => {
    popup.current!.style.display = 'none'
    setIsActive(false)
  }

  const sendEmail = async () => {
    if (emailSent) {
      // Block sending multiple emails
      setSending(true)
      return
    }

    const res = await axios.post<VerifyRes>(
      `http://${server}/api/auth/verifyemail`,
      { email }
    )

    if (res.data.succcess !== undefined && !res.data.succcess) {
      setErr(true)
    }

    emailSent = true
    setSending(true)
    setCode(res.data.verify)
  }

  const checkCode = (input: number) => input === code

  return (
    <>
      <VerifyPopup
        refer={popup}
        handleHide={handleHide}
        handleSuccess={handleSuccess}
        sendingEmail={sendingEmail}
        email={email}
        err={err}
        checkCode={checkCode}
        active={isActive}
      />
      <div
        className={cx('verify-email')}
        onClick={event => {
          event.stopPropagation()
          event.preventDefault()
          sendEmail()
          handleShow()
        }}
      >
        인증하기
      </div>
    </>
  )
}

export default memo(VerifyEmail)

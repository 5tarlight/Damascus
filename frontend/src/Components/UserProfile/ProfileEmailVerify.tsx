import { createRef, FC, useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { server } from '../../config'
import VerifyPopup from '../Profile/EditableTxt/VerifyEmail/VerifyPopup'

interface Props {
  handleSuccess(): void
}

interface VerifyRes {
  msg: string
  success: string
  verify: number
}

const Verify = styled.div`
  color: blue;
  text-decoration: underline;
  display: inline;
  margin-left: 1rem;
  font-style: normal;
`

const ProfileEmailVerify: FC<Props> = ({ handleSuccess }) => {
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

    if (res.data.success !== undefined && !res.data.success) {
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
      <Verify
        onClick={event => {
          event.stopPropagation()
          event.preventDefault()
          sendEmail()
          handleShow()
        }}
      >
        인증하기
      </Verify>
    </>
  )
}

export default ProfileEmailVerify

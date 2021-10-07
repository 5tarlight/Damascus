import { FC, useEffect, memo, SetStateAction, Dispatch } from 'react'
import { useHistory } from 'react-router'

interface Props {
  setLogin: Dispatch<SetStateAction<boolean>>
}

const Logout: FC<Props> = ({ setLogin }) => {
  const history = useHistory()

  useEffect(() => {
    localStorage.setItem('login', 'false')
    localStorage.setItem('id', '')
    localStorage.setItem('email', '')
    localStorage.setItem('username', '')
    localStorage.setItem('admin', '')
    localStorage.setItem('bio', '')
    localStorage.setItem('profile', '')
    localStorage.setItem('email_verify', '')
    setLogin(false)

    history.push('/')
  }, [history, setLogin])

  return <></>
}

export default memo(Logout)

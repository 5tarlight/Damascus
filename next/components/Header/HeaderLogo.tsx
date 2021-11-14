import { NextPage } from 'next'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const Logo = styled.h1`
  margin-left: 1rem;
  cursor: pointer;
  user-select: none;
`

const HeaderLogo: NextPage = () => {
  const router = useRouter()

  return (
    <Logo
      onClick={e => {
        e.preventDefault()
        router.push('/')
      }}
    >
      DAMASCUS
    </Logo>
  )
}

export default HeaderLogo

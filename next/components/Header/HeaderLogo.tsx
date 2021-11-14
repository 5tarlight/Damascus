import { NextPage } from 'next'
import { useRouter } from 'next/router'
import styled from 'styled-components'

const Logo = styled.h1`
  cursor: pointer;
  user-select: none;
  width: 200px;
  display: inline-block;
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

import { NextPage } from 'next'
import styled from 'styled-components'
import HeaderLogo from './HeaderLogo'

interface Props {}

const Container = styled.header`
  margin: 0px;
  width: 100%;
  background-color: #fcfcfc;
  height: 60px;
  /* border-bottom: 1px solid #f1f1f1;
  box-shadow: 0px 2px 4px -1px rgba(0, 0, 0, 0.2); */
`

const Header: NextPage<Props> = () => {
  return (
    <Container>
      <HeaderLogo />
    </Container>
  )
}

export default Header

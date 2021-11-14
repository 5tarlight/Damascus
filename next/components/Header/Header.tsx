import { NextPage } from 'next'
import { HeaderContainer, HeaderContent } from './Header.style'
import HeaderLogo from './HeaderLogo'

interface Props {}

const Header: NextPage<Props> = () => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <HeaderLogo />
      </HeaderContent>
    </HeaderContainer>
  )
}

export default Header

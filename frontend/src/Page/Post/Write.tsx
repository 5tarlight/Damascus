import { FC } from 'react'
import styled from 'styled-components'
import WriteTitle from '../../Components/Write/WriteTitle'
import { WriteLang } from '../../lang/lang'

interface Props {
  lang: WriteLang
}

const Container = styled.div`
  width: 90%;
  height: 100%;
  margin: 20px auto 0px auto;
  min-height: 80vh;
`

const Write: FC<Props> = ({ lang: { titlePlace } }) => {
  return (
    <Container>
      <WriteTitle titlePlace={titlePlace} />
    </Container>
  )
}

export default Write

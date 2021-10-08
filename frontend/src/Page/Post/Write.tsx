import { FC, useState } from 'react'
import { useTitle } from 'react-use'
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
  const [title, setTitle] = useState('')
  useTitle(`Damascus - ${title ? title : 'Write'}`)

  return (
    <Container>
      <WriteTitle titlePlace={titlePlace} value={title} setValue={setTitle} />
    </Container>
  )
}

export default Write

import { FC, useState } from 'react'
import { useTitle } from 'react-use'
import styled from 'styled-components'
import Description from '../../Components/Write/Description'
import TagInput from '../../Components/Write/TagInput'
import WriteEditor from '../../Components/Write/WriteEditor'
import WriteSubmit from '../../Components/Write/WriteSubmit'
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

const Write: FC<Props> = ({
  lang: { titlePlace, tagPlace, descriptionPlace, contentPlace, submit },
}) => {
  const [title, setTitle] = useState('')
  const [tag, setTag] = useState([] as string[])
  const [tagV, setTagV] = useState('')
  const [content, setContent] = useState('')
  const [description, setDescription] = useState('')

  useTitle(`Damascus - ${title ? title : 'Write'}`)

  return (
    <Container>
      <WriteTitle titlePlace={titlePlace} value={title} setValue={setTitle} />
      <TagInput
        inputV={tagV}
        setInputV={setTagV}
        tags={tag}
        setTags={list => setTag(list.filter(v => v))}
        tagPlace={tagPlace}
      />
      <WriteEditor
        value={content}
        setValue={setContent}
        contentPlace={contentPlace}
      />
      <Description
        placeholder={descriptionPlace}
        value={description}
        setValue={setDescription}
      />
      <WriteSubmit submit={submit} />
    </Container>
  )
}

export default Write

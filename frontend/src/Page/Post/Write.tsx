import axios from 'axios'
import { FC, useState } from 'react'
import { useHistory } from 'react-router'
import { useTitle } from 'react-use'
import styled from 'styled-components'
import Description from '../../Components/Write/Description'
import TagInput from '../../Components/Write/TagInput'
import WriteEditor from '../../Components/Write/WriteEditor'
import WriteSubmit from '../../Components/Write/WriteSubmit'
import WriteTitle from '../../Components/Write/WriteTitle'
import { server } from '../../config'
import { WriteLang } from '../../lang/lang'
import { tagSep } from '../../util'

interface Props {
  lang: WriteLang
}

interface WriteRes {
  id: number
}

const Container = styled.div`
  width: 90%;
  height: 100%;
  margin: 20px auto 0px auto;
  min-height: 80vh;
`

const Write: FC<Props> = ({
  lang: {
    titlePlace,
    tagPlace,
    descriptionPlace,
    contentPlace,
    submit,
    tempSave,
  },
}) => {
  const [title, setTitle] = useState('')
  const [tag, setTag] = useState([] as string[])
  const [tagV, setTagV] = useState('')
  const [content, setContent] = useState('')
  const [description, setDescription] = useState('')

  useTitle(`Damascus - ${title ? title : 'Write'}`)
  const history = useHistory()

  const handleSubmit = async (publish: boolean) => {
    const res = await axios.post<WriteRes>(
      'http://' + server + '/api/post/write',
      {
        author: localStorage.getItem('id') || '-1',
        title,
        tag: tag.join(tagSep),
        content,
        description,
        published: publish,
      }
    )

    if (res.status === 400) {
      alert('Post already Exists')
    } else if (res.status === 401) {
      alert('Please logout and login again')
    }

    history.push(`/${localStorage.getItem('id')}/${res.data.id}`)
  }

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
      <WriteSubmit
        submit={submit}
        tempSave={tempSave}
        willPublish={true}
        handleSubmit={handleSubmit}
      />
      <WriteSubmit
        submit={submit}
        tempSave={tempSave}
        willPublish={false}
        handleSubmit={handleSubmit}
      />
    </Container>
  )
}

export default Write

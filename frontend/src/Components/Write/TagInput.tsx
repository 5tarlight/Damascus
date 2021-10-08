import { FC } from 'react'
import styled from 'styled-components'
import Tag from './Tag'

interface Props {
  inputV: string
  setInputV: (value: string) => void
  tags: string[]
  setTags: (tags: string[]) => void
  tagPlace: string
}

const Input = styled.input`
  display: inline-flex;
  border: none;
  min-width: 15rem;
  max-width: 100%;
  height: 2rem;

  &:focus {
    outline: none;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
`

const TagInput: FC<Props> = ({
  tagPlace,
  inputV,
  setInputV,
  setTags,
  tags,
}) => {
  const remove = (tag: string) => {
    setTags(tags.filter(t => t !== tag))
  }
  const tagComs = tags.map((tag, i) => (
    <Tag key={i} value={tag} handleClick={remove} />
  ))

  return (
    <Wrapper>
      {tagComs}
      <Input
        value={inputV}
        onChange={({ target: { value } }) => setInputV(value)}
        onKeyPress={({ key }) => {
          if (key === 'Enter') {
            setTags([...tags, inputV])
            setInputV('')
          }
        }}
        placeholder={tagPlace}
      />
    </Wrapper>
  )
}

export default TagInput

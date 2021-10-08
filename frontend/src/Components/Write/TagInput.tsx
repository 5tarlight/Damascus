import { FC } from 'react'
import styled from 'styled-components'
import Tag from './Tag'

interface Props {
  value: string
  setValue: (value: string) => void
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

const TagInput: FC<Props> = ({ value, setValue, tagPlace }) => {
  const token = value.split(' ')
  const lastToken = token.pop() || ''
  let filtered = Array.from(new Set(token))
  console.log(filtered, value)

  const remove = (remove: string) => {
    filtered = filtered.filter(tag => tag !== remove && tag !== '')
    setValue(
      lastToken
        ? `${filtered.join(' ')} ${lastToken}`.trimLeft()
        : `${filtered.join(' ')} `.trimLeft()
    )
    console.log(filtered, value)
  }

  const tags = filtered.map((tag, index) => {
    filtered.push(tag)
    return tag ? <Tag value={tag} key={index} handleClick={remove} /> : null
  })

  return (
    <Wrapper>
      {tags}
      <Input
        value={lastToken}
        onChange={({ target: { value } }) =>
          setValue(`${filtered.join(' ')} ${value}`.trimLeft())
        }
        placeholder={tagPlace}
      />
    </Wrapper>
  )
}

export default TagInput

import { FC } from 'react'
import styled from 'styled-components'

interface Props {
  titlePlace: string
  value: string
  setValue: (value: string) => void
}

const Input = styled.input`
  border: none;
  border-bottom: 5px solid #dbdbdb;
  font-size: 2rem;
  width: 100%;

  &:focus {
    outline: none;
  }
`

const WriteTitle: FC<Props> = ({ titlePlace, value, setValue }) => {
  return (
    <Input
      value={value}
      placeholder={titlePlace}
      onChange={({ target: { value } }) => setValue(value)}
    />
  )
}

export default WriteTitle

import { FC } from 'react'
import styled from 'styled-components'

interface Props {
  titlePlace: string
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

const WriteTitle: FC<Props> = ({ titlePlace }) => {
  return <Input placeholder={titlePlace} />
}

export default WriteTitle

import { FC } from 'react'
import styled from 'styled-components'

interface Props {
  value: string
  setValue: (value: string) => void
  placeholder: string
}

const Input = styled.textarea`
  width: 100%;
  resize: none;
  height: 8rem;
  margin-bottom: 5rem;
`

const Description: FC<Props> = ({ value, setValue, placeholder }) => {
  return (
    <Input
      value={value}
      onChange={({ target: { value } }) => {
        if (value.length <= 300) setValue(value)
      }}
      placeholder={placeholder}
    />
  )
}

export default Description

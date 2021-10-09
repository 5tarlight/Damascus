import { FC } from 'react'
import styled from 'styled-components'

interface Props {
  value: string
  setValue: (value: string) => void
  contentPlace: string
}

const Editor = styled.textarea`
  width: 100%;
  overflow-y: auto;
  min-height: 60vh;
  margin-top: 10px;
  resize: none;
  border: none;

  &:focus {
    outline: none;
  }
`

const WriteEditor: FC<Props> = ({ value, setValue, contentPlace }) => {
  return (
    <Editor
      onChange={({ target: { value } }) => setValue(value)}
      placeholder={contentPlace}
    >
      {value}
    </Editor>
  )
}

export default WriteEditor

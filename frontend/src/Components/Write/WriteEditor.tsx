import { FC } from 'react'
import styled from 'styled-components'

interface Props {
  value: string
  setValue: (value: string) => void
}

const Editor = styled.textarea`
  width: 100%;
  overflow-y: auto;
  min-height: 60vh;
  margin-top: 10px;
  resize: none;
`

const WriteEditor: FC<Props> = ({ value, setValue }) => {
  return (
    <Editor onChange={({ target: { value } }) => setValue(value)}>
      {value}
    </Editor>
  )
}

export default WriteEditor

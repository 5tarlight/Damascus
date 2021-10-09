import { FC } from 'react'
import styled from 'styled-components'

interface Props {
  willPublish: boolean
  submit: string
  tempSave: string
  handleSubmit: (publish: boolean) => void
}

const Button = styled.button`
  background-color: #f5f5f5;
  border: 1px solid #d3d3d3;
  border-radius: 3px;
  color: #333;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  height: 30px;
  margin-top: 10px;
  padding: 0 10px;
  margin-bottom: 3rem;
  font-size: 1.2rem;
`

const WriteSubmit: FC<Props> = ({
  willPublish,
  submit,
  tempSave,
  handleSubmit,
}) => {
  if (willPublish)
    return <Button onClick={() => handleSubmit(willPublish)}>{submit}</Button>
  else
    return <Button onClick={() => handleSubmit(willPublish)}>{tempSave}</Button>
}

export default WriteSubmit

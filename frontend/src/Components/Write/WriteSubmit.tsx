import { FC } from 'react'
import styled from 'styled-components'

interface Props {
  submit: string
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

const WriteSubmit: FC<Props> = ({ submit }) => {
  return <Button>{submit}</Button>
}

export default WriteSubmit

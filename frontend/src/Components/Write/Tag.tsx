import { FC } from 'react'
import styled from 'styled-components'

interface Props {
  value: string
  handleClick: (value: string) => void
}

const Container = styled.div`
  display: inline-flex;
  background-color: rgb(247, 226, 199);
  align-items: center;
  height: 2rem;
  border-radius: 2rem;
  color: rgb(116, 110, 36);
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 1rem;

  &:hover {
    cursor: pointer;
  }
`

const Tag: FC<Props> = ({ value, handleClick }) => {
  return (
    <Container
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        handleClick(value)
      }}
    >
      {value}
    </Container>
  )
}

export default Tag

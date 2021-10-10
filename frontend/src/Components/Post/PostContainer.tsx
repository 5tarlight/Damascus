import { FC } from 'react'
import styled from 'styled-components'

interface Props {
  postid: string
}

const PostContainer: FC<Props> = ({ postid }) => {
  return <div>{postid}</div>
}

export default PostContainer

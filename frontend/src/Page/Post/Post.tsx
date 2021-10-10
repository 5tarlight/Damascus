import { FC } from 'react'
import { useParams } from 'react-router'
import PostContainer from '../../Components/Post/PostContainer'

interface Props {}

interface PostParam {
  postid: string
}

const Post: FC<Props> = () => {
  const { postid } = useParams<PostParam>()
  return <PostContainer postid={postid} />
}

export default Post

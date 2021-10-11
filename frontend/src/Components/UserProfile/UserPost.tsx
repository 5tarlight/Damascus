import axios from 'axios'
import { FC, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import { server } from '../../config'

interface Props {
  author: string
}

interface PostProps {
  id: number
  title: string
  tag: string[]
  description: string
}

interface Res {
  message: string
  posts: PostProps[]
}

const Wrapper = styled.div`
  margin-top: 200px;
  display: flex;
`

const PostWrapper = styled.div`
  width: calc(50% - 2rem);
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 4%) 0px 4px 16px 0px;
  transition: box-shadow 0.25s ease-in 0s, transform 0.25s ease-in 0s;
  margin: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 5px;

  &:hover {
    cursor: pointer;
  }
`
const PostTitle = styled.div`
  text-overflow: ellipsis;
  border-bottom: 1px solid #ccc;
  font-size: 1.5rem;
  font-weight: bolder;
`

const Description = styled.div`
  height: 100px;
`

const Post: FC<PostProps> = ({ title, tag, id, description }) => {
  const history = useHistory()

  return (
    <PostWrapper
      onClick={e => {
        e.preventDefault()
        e.stopPropagation()
        history.push(`/post/${id}`)
      }}
    >
      <PostTitle>{title}</PostTitle>
      <Description>{description}</Description>
    </PostWrapper>
  )
}

const UserPost: FC<Props> = ({ author }) => {
  const [posts, setPosts] = useState<PostProps[]>([])

  useEffect(() => {
    let mounted = true
    axios
      .get<Res>(`http://${server}/api/post/user?author=${author}`)
      .then(res => {
        if (mounted) {
          setPosts(res.data.posts)
        }
      })
    return () => {
      mounted = false
    }
  }, [author])

  return (
    <Wrapper>
      {posts.map(({ id, tag, description, title }, i) => (
        <Post
          key={i}
          id={id}
          tag={tag}
          description={description}
          title={title}
        />
      ))}
    </Wrapper>
  )
}

export default UserPost

import axios from 'axios'
import { FC, useState, useEffect } from 'react'
import { useHistory } from 'react-router'
import { useTitle } from 'react-use'
import styled from 'styled-components'
import { server } from '../../config'
import { tagSep } from '../../util'
import Tag from '../Write/Tag'

interface Props {
  postid: string
}

interface PostRes {
  message: string
  id: number
  author: string
  username: string
  title: string
  tag: string
  content: string
  description: string
  like: number
  published: boolean
  created_at: string
  updated_at: string
}

const Container = styled.div`
  width: 90%;
  margin: 3rem auto 3rem auto;
`

const Title = styled.h1`
  font-size: 4rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`

const Description = styled.p`
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: #a5a5a5;
  font-style: italic;
`

const Author = styled.a`
  margin-top: 1rem;

  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`

const Article = styled.div`
  margin-top: 1rem;
`

const PostContainer: FC<Props> = ({ postid }) => {
  const history = useHistory()
  const [loading, setLoading] = useState(true)
  const [err, setErr] = useState(false)
  const [post, setPost] = useState<PostRes>({
    author: '',
    content: '',
    description: '',
    id: -1,
    like: -1,
    message: '',
    published: false,
    tag: '',
    title: '',
    username: '',
    created_at: '',
    updated_at: '',
  })

  useTitle(`Damascus${post.title ? ` - ${post.title}` : ''}`)

  useEffect(() => {
    let mounted = true
    const id = parseInt(postid)
    if (isNaN(id)) {
      setErr(true)
      return
    }

    axios
      .post<PostRes>(`http://${server}/api/post/postid`, {
        id: id,
      })
      .then(res => {
        if (mounted) {
          if (res.status === 400) {
            setErr(true)
            return
          }

          setPost(res.data)
          setLoading(false)
        }
      })

    return () => {
      mounted = false
    }
  }, [postid])

  return err ? (
    <div>Unabled to load post {postid}</div>
  ) : loading ? (
    <div>loading...</div>
  ) : (
    <Container>
      <Title>{post.title}</Title>
      <Description>{post.description}</Description>
      <div>
        {post.tag.split(tagSep).map((v, i) => (
          <Tag
            value={v}
            key={i}
            handleClick={() => history.push(`/tag/${v}`)}
          />
        ))}
      </div>
      <Article>{post.content}</Article>
      <Author
        onClick={e => {
          e.preventDefault()
          e.stopPropagation()
          history.push(`/user/${post.author}`)
        }}
      >
        {post.username} ({post.updated_at})
      </Author>
    </Container>
  )
}

export default PostContainer

import axios from 'axios'
import { FC, useState, useEffect } from 'react'
import styled from 'styled-components'
import { server } from '../../config'

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

const PostContainer: FC<Props> = ({ postid }) => {
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
      {post.title} {post.username}
    </Container>
  )
}

export default PostContainer

import styled from 'styled-components'
import { useParams } from 'react-router'
import { usePagePost } from '../../hooks'

import { BigPostCard } from '../molecules'

const Container = styled.div``

export default function PostOrg({ user }) {
  const { postId } = useParams()
  const { post } = usePagePost(postId)

  return (
    <Container>
      {post && post.id && user ? <BigPostCard post={post} user={user} /> : null}
    </Container>
  )
}

import styled from 'styled-components'
import { useParams } from 'react-router'
import { usePagePost, usePostComments } from '../../hooks'

import { Comments } from '.'
import { BigPostCard } from '../molecules'

const Container = styled.div``

export default function PostOrg({ user }) {
  const { postId } = useParams()
  const { post, setPost } = usePagePost(postId)
  const { comments, setComments } = usePostComments(postId)

  return (
    <Container>
      {post && post.id && user ? (
        <>
          <BigPostCard post={post} setPost={setPost} user={user} />
          <Comments
            post={post}
            user={user}
            comments={comments}
            setComments={setComments}
            setPost={setPost}
          />
        </>
      ) : null}
    </Container>
  )
}

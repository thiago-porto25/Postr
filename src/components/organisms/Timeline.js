import styled from 'styled-components'
import { PostCard } from '../molecules'

const Container = styled.section`
  width: 100%;
  min-height: 100vh;
`

export default function Timeline({ posts, isOnProfile }) {
  return (
    <Container>
      {posts &&
        posts.map((post) => (
          <PostCard isOnProfile={isOnProfile} post={post} key={post.id} />
        ))}
    </Container>
  )
}

import styled from 'styled-components'
import { parseTimestamp } from '../../utils/parseTimestamp'

const Container = styled.section`
  width: 100%;
  min-height: 100vh;
`

export default function Timeline({ posts, user }) {
  return (
    <Container>
      {posts
        ? posts.map((post) => (
            <div key={post.id}>
              {post.content} {parseTimestamp(post.createdAt)}
            </div>
          ))
        : null}
    </Container>
  )
}

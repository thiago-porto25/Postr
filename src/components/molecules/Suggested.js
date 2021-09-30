import styled from 'styled-components'
import { FollowUserCard } from '.'

const Container = styled.article`
  width: 100%;
  height: 100%;
  background-color: var(--xxLightGrey);
  border-radius: 10px;
  padding: 1rem 0;

  .suggested-title {
    font-size: 19px;
    font-family: 'Ubuntu', sans-serif;
    margin-top: 0;
    padding: 0 1.5rem;
  }
`

export default function Suggested() {
  const user = {
    username: 'testeraffd',
    name: 'thiago protofsfdsfdsdf',
  }

  return (
    <Container>
      <h1 className="suggested-title">Suggested follows</h1>
      <FollowUserCard suggestedUser={user} />
      <FollowUserCard suggestedUser={user} />
      <FollowUserCard suggestedUser={user} />
    </Container>
  )
}

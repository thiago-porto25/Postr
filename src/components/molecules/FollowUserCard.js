import styled from 'styled-components'
import { RegularButton } from '../atoms'
import { UserInfo } from '.'
import { Link } from 'react-router-dom'

const Container = styled.div`
  width: calc(100% - 3rem);
  height: calc(100% - 2rem);
  display: flex;
  align-items: center;
  padding: 1rem 1.5rem;
  transition: 100ms ease;

  &:hover {
    background-color: var(--xLightGrey);
  }

  a {
    display: inherit;
    width: 80%;
    text-decoration: none;
  }

  .suggested-follow-btn-container {
    width: 5rem;
    position: relative;
    z-index: 3;
  }
`

export default function FollowUserCard({ suggestedUser }) {
  const handleFollowClick = (e) => {
    e.stopPropagation()
  }

  return (
    <Container>
      <Link to={`/p/${suggestedUser.username}`}>
        <UserInfo userNeeded={suggestedUser} />
      </Link>
      <div className="suggested-follow-btn-container">
        <RegularButton onClick={handleFollowClick} color="black">
          Follow
        </RegularButton>
      </div>
    </Container>
  )
}

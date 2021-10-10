import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FollowButton } from '../atoms'
import { UserInfo } from '.'
import { followUser } from '../../services/followServices'

const Container = styled.div`
  width: calc(100% - 3rem);
  height: calc(100% - 2rem);
  display: flex;
  justify-content: space-between;
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

export default function FollowUserCard({ suggestedUser, user, isOn, setIsOn }) {
  const handleFollow = async (e) => {
    e.stopPropagation()

    await followUser(user.id, suggestedUser.id)
  }

  const handleLinkClick = () => {
    if (isOn) setIsOn(false)
  }

  return (
    <Container>
      <Link onClick={handleLinkClick} to={`/p/${suggestedUser.username}`}>
        <UserInfo userNeeded={suggestedUser} />
      </Link>
      <div className="suggested-follow-btn-container">
        <FollowButton isFollowing={false} onClick={handleFollow}>
          Follow
        </FollowButton>
      </div>
    </Container>
  )
}

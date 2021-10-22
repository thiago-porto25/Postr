import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FollowButton } from '../atoms'
import { UserInfo } from '.'
import { followUser, unFollowUser } from '../../services/followServices'

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

export default function FollowUserCard({
  suggestedUser,
  setProfileUser,
  profileUser,
  user,
  isOn,
  setIsOn,
}) {
  const [hoverUnfollow, setHoverUnfollow] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)

  const handleFollow = async (e) => {
    e.stopPropagation()

    if (setProfileUser) {
      setProfileUser((prev) => {
        if (profileUser.id === user.id) {
          return { ...prev, following: [...prev.following, suggestedUser.id] }
        }

        return prev
      })
    }

    await followUser(user.id, suggestedUser.id, setIsFollowing)
  }

  const handleUnFollow = async (e) => {
    e.stopPropagation()

    if (setProfileUser) {
      setProfileUser((prev) => {
        if (profileUser.id === user.id) {
          return {
            ...prev,
            following: prev.following.filter(
              (item) => item !== suggestedUser.id
            ),
          }
        }

        return prev
      })
    }

    await unFollowUser(user.id, suggestedUser.id, setIsFollowing)
  }

  const handleLinkClick = () => {
    if (isOn) setIsOn(false)
  }

  useEffect(() => {
    if (user?.following.includes(suggestedUser?.id)) setIsFollowing(true)
  }, [suggestedUser, user])

  return (
    <Container>
      <Link onClick={handleLinkClick} to={`/p/${suggestedUser.username}`}>
        <UserInfo userNeeded={suggestedUser} />
      </Link>
      <div className="suggested-follow-btn-container">
        {!isFollowing ? (
          user &&
          user.id !== suggestedUser.id && (
            <FollowButton isFollowing={false} onClick={handleFollow}>
              Follow
            </FollowButton>
          )
        ) : (
          <FollowButton
            onMouseEnter={() => setHoverUnfollow(true)}
            onMouseLeave={() => setHoverUnfollow(false)}
            isHoveringUnfollow={hoverUnfollow}
            isFollowing={true}
            onClick={handleUnFollow}
          >
            {hoverUnfollow ? 'Unfollow' : 'Following'}
          </FollowButton>
        )}
      </div>
    </Container>
  )
}

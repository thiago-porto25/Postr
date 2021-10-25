import { useContext, useState, useEffect } from 'react'
import UserContext from '../../context/userContext'

import styled from 'styled-components'

import { ProfileInfo, ProfileNav } from '../molecules'
import {
  LoggedUserAvatar,
  ProfileBg,
  FollowButton,
  RegularButton,
} from '../atoms'

import { followUser, unFollowUser } from '../../services/followServices'

const Container = styled.div`
  position: relative;

  .profile-bg-container {
    width: 100%;
    height: 12rem;
  }

  .profile-buttons-container {
    height: 4.3rem;
    display: flex;
    align-items: center;
    justify-content: right;
    gap: 2rem;
    box-sizing: border-box;
    padding: 0 1rem;

    .profile-edit-button {
      margin-top: 1rem;
      height: 3rem;

      button {
        padding: 0.5rem 1rem;
      }
    }
  }

  .profile-follow-button {
    height: fit-content;
    display: flex;
    align-items: center;
    gap: 1rem;

    button {
      padding: 0.5rem 0.5rem;
    }

    .profile-follow {
      width: 6rem;
    }
  }

  .profile-avatar-container {
    background-color: var(--xLightGrey);
    border-radius: 50%;
    position: absolute;
    top: 7rem;
    left: 1rem;
    box-sizing: border-box;
    padding: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 500px) {
      top: 8.5rem;
    }
  }

  .profile-info-container {
    box-sizing: border-box;
    padding: 0 1.5rem;
  }
`

export default function ProfileHeader({
  profileUser,
  setProfileUser,
  setIsOnLikes,
  isOnLikes,
  setIsOnFollows,
  setIsEditingProfile,
}) {
  const [hoverUnfollow, setHoverUnfollow] = useState(false)
  const [isFollowing, setIsFollowing] = useState(false)
  const { user, setUser } = useContext(UserContext)

  const handleFollow = async () => {
    await followUser(user.id, profileUser.id, setIsFollowing)

    if (setUser) {
      setUser((prev) => ({
        ...prev,
        following: [...prev.following, profileUser.id],
      }))
    }
    if (setProfileUser) {
      setProfileUser((prev) => ({
        ...prev,
        followers: [...prev.followers, user.id],
      }))
    }
  }
  const handleUnFollow = async () => {
    await unFollowUser(user.id, profileUser.id, setIsFollowing)

    if (setUser) {
      setUser((prev) => ({
        ...prev,
        following: prev.following.filter((item) => item !== profileUser.id),
      }))
    }
    if (setProfileUser) {
      setProfileUser((prev) => ({
        ...prev,
        followers: prev.followers.filter((item) => item !== user.id),
      }))
    }
  }

  useEffect(() => {
    if (user?.following.includes(profileUser?.id)) setIsFollowing(true)
  }, [user, profileUser])

  return (
    <Container>
      <div className="profile-bg-container">
        <ProfileBg user={profileUser} />
      </div>

      <div className="profile-buttons-container">
        {user?.username === profileUser?.username ? (
          <div className="profile-edit-button">
            <RegularButton
              onClick={() => setIsEditingProfile(true)}
              color="white-grey"
            >
              Edit Profile
            </RegularButton>
          </div>
        ) : (
          <div className="profile-follow-button">
            {isFollowing ? (
              <FollowButton
                onMouseEnter={() => setHoverUnfollow(true)}
                onMouseLeave={() => setHoverUnfollow(false)}
                isHoveringUnfollow={hoverUnfollow}
                isFollowing={true}
                onClick={handleUnFollow}
              >
                {hoverUnfollow ? 'Unfollow' : 'Following'}
              </FollowButton>
            ) : (
              <div className="profile-follow">
                <FollowButton onClick={handleFollow} isFollowing={false}>
                  Follow
                </FollowButton>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="profile-avatar-container">
        <LoggedUserAvatar size="extra-larger" user={profileUser} />
      </div>

      <div className="profile-info-container">
        <ProfileInfo setIsOnFollows={setIsOnFollows} user={profileUser} />
      </div>

      <ProfileNav
        setIsOn={setIsOnLikes}
        isOn={isOnLikes}
        first="Posts"
        second="Likes"
      />
    </Container>
  )
}

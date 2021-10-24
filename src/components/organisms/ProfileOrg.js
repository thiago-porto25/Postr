import styled from 'styled-components'
import { ProfileHeader, Timeline, EditProfileModal } from '.'
import { NoPosts } from '../molecules'
import { useState } from 'react'

const Container = styled.div``

export default function ProfileOrg({
  profileUser,
  setUser,
  setProfileUser,
  profilePosts,
  setProfilePosts,
  setLikedPosts,
  likedPosts,
  setIsOnFollows,
  authUser,
}) {
  const [isOnLikes, setIsOnLikes] = useState(false)
  const [isEditingProfile, setIsEditingProfile] = useState(false)

  return (
    <>
      <Container>
        <ProfileHeader
          profileUser={profileUser}
          setProfileUser={setProfileUser}
          isOnLikes={isOnLikes}
          setIsOnLikes={setIsOnLikes}
          setIsOnFollows={setIsOnFollows}
          setIsEditingProfile={setIsEditingProfile}
        />

        {!isOnLikes ? (
          profilePosts.length > 0 ? (
            <Timeline
              profileUser={profileUser}
              setPosts={setProfilePosts}
              setLikedPosts={setLikedPosts}
              isOnProfile={true}
              posts={profilePosts}
            />
          ) : (
            <NoPosts>This user has no Posts!</NoPosts>
          )
        ) : likedPosts.length > 0 ? (
          <Timeline
            profileUser={profileUser}
            setPosts={setProfilePosts}
            setLikedPosts={setLikedPosts}
            posts={likedPosts}
          />
        ) : (
          <NoPosts>This user has no liked Posts!</NoPosts>
        )}
      </Container>

      {isEditingProfile && (
        <EditProfileModal
          setIsEditingProfile={setIsEditingProfile}
          authUser={authUser}
          setUser={setUser}
          setProfileUser={setProfileUser}
          setProfilePosts={setProfilePosts}
          setLikedPosts={setLikedPosts}
        />
      )}
    </>
  )
}

import styled from 'styled-components'
import { ProfileHeader, Timeline, EditProfileModal } from '.'
import { NoPosts } from '../molecules'
import { useState } from 'react'

const Container = styled.div``

export default function ProfileOrg({
  user,
  profilePosts,
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
          profileUser={user}
          isOnLikes={isOnLikes}
          setIsOnLikes={setIsOnLikes}
          setIsOnFollows={setIsOnFollows}
          setIsEditingProfile={setIsEditingProfile}
        />

        {!isOnLikes ? (
          profilePosts.length > 1 ? (
            <Timeline isOnProfile={true} posts={profilePosts} />
          ) : (
            <NoPosts>This user has no Posts!</NoPosts>
          )
        ) : likedPosts.length > 1 ? (
          <Timeline posts={likedPosts} />
        ) : (
          <NoPosts>This user has no liked Posts!</NoPosts>
        )}
      </Container>

      {isEditingProfile && (
        <EditProfileModal
          setIsEditingProfile={setIsEditingProfile}
          authUser={authUser}
        />
      )}
    </>
  )
}

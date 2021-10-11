import styled from 'styled-components'
import { ProfileHeader, Timeline } from '.'
import { NoPosts } from '../molecules'
import { useState } from 'react'

const Container = styled.div``

export default function ProfileOrg({
  user,
  profilePosts,
  likedPosts,
  setIsOnFollows,
}) {
  const [isOnLikes, setIsOnLikes] = useState(false)

  return (
    <Container>
      <ProfileHeader
        profileUser={user}
        isOnLikes={isOnLikes}
        setIsOnLikes={setIsOnLikes}
        setIsOnFollows={setIsOnFollows}
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
  )
}

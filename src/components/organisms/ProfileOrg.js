import styled from 'styled-components'
import { ProfileHeader, Timeline } from '.'
import { useState } from 'react'

const Container = styled.div``

export default function ProfileOrg({ user, profilePosts, likedPosts }) {
  const [isOnLikes, setIsOnLikes] = useState(false)

  return (
    <Container>
      <ProfileHeader
        profileUser={user}
        isOnLikes={isOnLikes}
        setIsOnLikes={setIsOnLikes}
      />

      {!isOnLikes ? (
        <Timeline isOnProfile={true} posts={profilePosts} />
      ) : (
        <Timeline posts={likedPosts} />
      )}
    </Container>
  )
}

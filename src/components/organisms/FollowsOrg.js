import styled from 'styled-components'
import { ProfileNav, FollowUserCard } from '../molecules'
import {
  getProfileFollowers,
  getProfileFollowing,
} from '../../services/followServices'
import { useEffect, useState } from 'react'

const Container = styled.div``

export default function FollowsOrg({
  user,
  profileUser,
  setProfileUser,
  setIsOnFollows,
  isOnFollows,
}) {
  const [isOnFollowers, setIsOnFollowers] = useState(false)
  const [following, setFollowing] = useState([])
  const [followers, setFollowers] = useState([])

  useEffect(() => {
    const getFollows = async () => {
      if (profileUser.followers[0]) {
        const receivedFollowers = await getProfileFollowers(
          profileUser.followers
        )
        setFollowers(receivedFollowers)
      }
      if (profileUser.following[0]) {
        const receivedFollowing = await getProfileFollowing(
          profileUser.following
        )
        setFollowing(receivedFollowing)
      }
    }

    if (isOnFollows) getFollows()
  }, [profileUser, isOnFollows])

  return (
    <Container>
      <ProfileNav
        isOn={isOnFollowers}
        setIsOn={setIsOnFollowers}
        first="Following"
        second="Followers"
      />

      {isOnFollowers
        ? followers.map((item) => (
            <FollowUserCard
              key={item.id}
              user={user}
              profileUser={profileUser}
              setProfileUser={setProfileUser}
              suggestedUser={item}
              setIsOn={setIsOnFollows}
              isOn={isOnFollows}
            />
          ))
        : following.map((item) => (
            <FollowUserCard
              key={item.id}
              user={user}
              profileUser={profileUser}
              setProfileUser={setProfileUser}
              suggestedUser={item}
              setIsOn={setIsOnFollows}
              isOn={isOnFollows}
            />
          ))}
    </Container>
  )
}

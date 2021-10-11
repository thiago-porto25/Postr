import { LoggedInLayout } from '../layouts'
import { ProfileOrg, FollowsOrg } from '../organisms'
import { SimpleHeader, LoadingPage } from '../molecules'

import { useContext, useEffect, useState } from 'react'
import UserContext from '../../context/userContext'

import * as ROUTES from '../../constants/routes'

import { useProfilePosts, useProfileLikedPosts } from '../../hooks'
import { useParams } from 'react-router'
import { findUserByUsername } from '../../services/authServices'

export default function ProfileTemplate() {
  const [isOnFollows, setIsOnFollows] = useState(false)
  const [profileUser, setProfileUser] = useState()
  const { username } = useParams()

  const { user } = useContext(UserContext)
  const { posts: profilePosts } = useProfilePosts(profileUser?.id)
  const { posts: likedPosts } = useProfileLikedPosts(profileUser?.id)

  useEffect(() => {
    const getUser = async () => {
      const response = await findUserByUsername(username)

      setProfileUser(response)
    }

    if (username) getUser()
  }, [username])

  return (
    <LoggedInLayout
      setIsOnFollows={setIsOnFollows}
      isOnFollows={isOnFollows}
      user={user}
      showSearchBar={true}
      showSuggestion={true}
    >
      {!isOnFollows ? (
        <>
          <SimpleHeader
            withPosts={true}
            postsNumber={profilePosts.length}
            withArrow={true}
            arrowLink={ROUTES.HOME}
          >
            {profileUser?.name}
          </SimpleHeader>

          {profileUser ? (
            <ProfileOrg
              user={profileUser}
              likedPosts={likedPosts}
              profilePosts={profilePosts}
              setIsOnFollows={setIsOnFollows}
            />
          ) : (
            <LoadingPage />
          )}
        </>
      ) : (
        <>
          <SimpleHeader
            withArrow={true}
            arrowLink={`/p/${username}`}
            withOnClick={true}
            OnClick={setIsOnFollows}
          >
            Following/Followers
          </SimpleHeader>

          <FollowsOrg
            user={user}
            profileUser={profileUser}
            setIsOnFollows={setIsOnFollows}
            isOnFollows={isOnFollows}
          />
        </>
      )}
    </LoggedInLayout>
  )
}

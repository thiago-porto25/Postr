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

  const { user, setUser } = useContext(UserContext)
  const { posts: profilePosts, setPosts: setProfilePosts } = useProfilePosts(
    profileUser?.id
  )
  const { posts: likedPosts, setPosts: setLikedPosts } = useProfileLikedPosts(
    profileUser?.id
  )

  useEffect(() => {
    const getUser = async () => {
      const response = await findUserByUsername(username)

      setProfileUser(response)
      document.title = `${response.name.split(' ')[0]} (@${
        response.username
      }) | Postr`
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
      profileUser={profileUser}
      setProfileUser={setProfileUser}
      setProfilePosts={setProfilePosts}
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
              profileUser={profileUser}
              setProfileUser={setProfileUser}
              setUser={setUser}
              authUser={user}
              setProfilePosts={setProfilePosts}
              setLikedPosts={setLikedPosts}
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
            setProfileUser={setProfileUser}
            setIsOnFollows={setIsOnFollows}
            isOnFollows={isOnFollows}
          />
        </>
      )}
    </LoggedInLayout>
  )
}

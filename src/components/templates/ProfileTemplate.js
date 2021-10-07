import { LoggedInLayout } from '../layouts'
import { ProfileOrg } from '../organisms'
import { SimpleHeader } from '../molecules'
import { useContext, useEffect, useState } from 'react'
import UserContext from '../../context/userContext'
import * as ROUTES from '../../constants/routes'
import { useProfilePosts } from '../../hooks'
import { useParams } from 'react-router'
import { findUserByUsername } from '../../services/authServices'

export default function ProfileTemplate() {
  const [profileUser, setProfileUser] = useState()
  const { username } = useParams()

  const { user } = useContext(UserContext)
  const { posts } = useProfilePosts(profileUser?.id)

  useEffect(() => {
    const getUser = async () => {
      const response = await findUserByUsername(username)

      setProfileUser(response)
    }

    if (username) getUser()
  }, [username])

  return (
    <LoggedInLayout user={user} showSearchBar={true} showSuggestion={true}>
      <SimpleHeader
        withPosts={true}
        postsNumber={posts.length}
        withArrow={true}
        arrowLink={ROUTES.HOME}
      >
        {profileUser?.name}
      </SimpleHeader>

      <ProfileOrg user={profileUser} posts={posts} />
    </LoggedInLayout>
  )
}

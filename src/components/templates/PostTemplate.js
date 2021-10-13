import { LoggedInLayout } from '../layouts'
import { PostOrg } from '../organisms'
import { SimpleHeader } from '../molecules'

import { useContext } from 'react'
import UserContext from '../../context/userContext'

import * as ROUTES from '../../constants/routes'

export default function PostTemplate() {
  const { user } = useContext(UserContext)

  return (
    <LoggedInLayout user={user} showSearchBar={true} showSuggestion={true}>
      <SimpleHeader withArrow={true} arrowLink={ROUTES.HOME}>
        Post
      </SimpleHeader>
      <PostOrg user={user} />
    </LoggedInLayout>
  )
}

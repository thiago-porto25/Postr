import { useContext } from 'react'
import UserContext from '../../context/userContext'
import { LoggedInLayout } from '../layouts'
import { Timeline, PostBox } from '../organisms'
import { SimpleHeader } from '../molecules'

export default function HomeTemplate() {
  const { user } = useContext(UserContext)
  return (
    <LoggedInLayout user={user} showSearchBar={true} showSuggestion={true}>
      <SimpleHeader>Homepage</SimpleHeader>
      <PostBox user={user} />
      <Timeline user={user} />
    </LoggedInLayout>
  )
}

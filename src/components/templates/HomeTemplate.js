import { useContext } from 'react'
import UserContext from '../../context/userContext'
import { LoggedInLayout } from '../layouts'
import { Timeline, PostBox } from '../organisms'

export default function HomeTemplate() {
  const { user } = useContext(UserContext)
  return (
    <LoggedInLayout user={user} showSearchBar={true} showSuggestion={true}>
      <PostBox user={user} />
      <Timeline user={user} />
    </LoggedInLayout>
  )
}

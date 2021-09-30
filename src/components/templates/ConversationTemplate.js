import { LoggedInLayout } from '../layouts'
import { useContext } from 'react'
import UserContext from '../../context/userContext'

export default function ConversationTemplate() {
  const { user } = useContext(UserContext)

  return (
    <LoggedInLayout
      user={user}
      showSearchBar={true}
      showSuggestion={true}
    ></LoggedInLayout>
  )
}

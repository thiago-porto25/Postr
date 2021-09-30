import { LoggedInLayout } from '../layouts'
import { useContext } from 'react'
import UserContext from '../../context/userContext'

export default function SearchTemplate() {
  const { user } = useContext(UserContext)

  return (
    <LoggedInLayout
      user={user}
      showFilter={true}
      showSuggestion={true}
    ></LoggedInLayout>
  )
}

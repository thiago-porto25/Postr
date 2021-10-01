import { LoggedInLayout } from '../layouts'
import { SettingsOrg } from '../organisms'
import { SimpleHeader } from '../molecules'
import { useContext } from 'react'
import UserContext from '../../context/userContext'

export default function SettingsTemplate() {
  const { user } = useContext(UserContext)

  return (
    <LoggedInLayout user={user} showSearchBar={true} showSuggestion={true}>
      <SimpleHeader>Settings</SimpleHeader>
      <SettingsOrg user={user} />
    </LoggedInLayout>
  )
}

import { LoggedInLayout } from '../layouts'

export default function SettingsTemplate() {
  return (
    <LoggedInLayout showSearchBar={true} showSuggestion={true}></LoggedInLayout>
  )
}

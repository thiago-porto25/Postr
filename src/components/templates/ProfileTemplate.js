import { LoggedInLayout } from '../layouts'

export default function ProfileTemplate() {
  return (
    <LoggedInLayout showSearchBar={true} showSuggestion={true}></LoggedInLayout>
  )
}

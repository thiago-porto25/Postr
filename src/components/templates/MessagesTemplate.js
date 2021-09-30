import { LoggedInLayout } from '../layouts'

export default function MessagesTemplate() {
  return (
    <LoggedInLayout showSearchBar={true} showSuggestion={true}></LoggedInLayout>
  )
}

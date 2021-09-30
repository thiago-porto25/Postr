import { LoggedInLayout } from '../layouts'

export default function ConversationTemplate() {
  return (
    <LoggedInLayout showSearchBar={true} showSuggestion={true}></LoggedInLayout>
  )
}

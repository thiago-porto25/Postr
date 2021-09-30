import { LoggedInLayout } from '../layouts'

export default function PostTemplate() {
  return (
    <LoggedInLayout showSearchBar={true} showSuggestion={true}></LoggedInLayout>
  )
}

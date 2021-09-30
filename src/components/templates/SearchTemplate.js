import { LoggedInLayout } from '../layouts'

export default function SearchTemplate() {
  return (
    <LoggedInLayout showFilter={true} showSuggestion={true}></LoggedInLayout>
  )
}

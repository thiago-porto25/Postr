import { LoggedInLayout } from '../layouts'
import { Timeline } from '../organisms'

export default function HomeTemplate() {
  return (
    <LoggedInLayout showSearchBar={true} showSuggestion={true}>
      <Timeline />
    </LoggedInLayout>
  )
}

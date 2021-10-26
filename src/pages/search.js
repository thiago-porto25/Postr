import { useEffect } from 'react'
import { SearchTemplate } from '../components/templates'

export default function Search() {
  useEffect(() => {
    document.title = 'Search | Postr'
  }, [])
  return <SearchTemplate />
}

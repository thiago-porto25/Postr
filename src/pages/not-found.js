import { useEffect } from 'react'
import { NotFoundTemplate } from '../components/templates'

export default function NotFound() {
  useEffect(() => {
    document.title = '404 | Not found'
  }, [])
  return <NotFoundTemplate />
}

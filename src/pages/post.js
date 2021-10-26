import { useEffect } from 'react'
import { PostTemplate } from '../components/templates'

export default function Post() {
  useEffect(() => {
    document.title = 'Post | Postr'
  }, [])
  return <PostTemplate />
}

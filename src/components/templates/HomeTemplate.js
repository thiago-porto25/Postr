import { useContext } from 'react'
import UserContext from '../../context/userContext'
import { LoggedInLayout } from '../layouts'
import { Timeline, PostBox } from '../organisms'
import { NoPosts, SimpleHeader } from '../molecules'
import { useFollowedPosts } from '../../hooks'

export default function HomeTemplate() {
  const { user } = useContext(UserContext)
  const { posts } = useFollowedPosts(user)

  return (
    <LoggedInLayout user={user} showSearchBar={true} showSuggestion={true}>
      <SimpleHeader>Homepage</SimpleHeader>
      <PostBox user={user} />
      {posts.length > 0 ? (
        <Timeline posts={posts} />
      ) : (
        <NoPosts>Follow someone to see their Posts!</NoPosts>
      )}
    </LoggedInLayout>
  )
}

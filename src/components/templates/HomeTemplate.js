import { useContext } from 'react'
import UserContext from '../../context/userContext'
import { LoggedInLayout } from '../layouts'
import { Timeline, PostBox } from '../organisms'
import { SimpleHeader, Suggested } from '../molecules'
import styled from 'styled-components'
import { useFollowedPosts } from '../../hooks'

const SuggestedContainer = styled.div`
  width: 100%;
`

export default function HomeTemplate() {
  const { user } = useContext(UserContext)
  const { posts } = useFollowedPosts(user)

  return (
    <LoggedInLayout user={user} showSearchBar={true} showSuggestion={true}>
      <SimpleHeader>Homepage</SimpleHeader>
      <PostBox user={user} />
      {user && (
        <SuggestedContainer>
          <Suggested bg="white" bottomBorder="border-grey" />
        </SuggestedContainer>
      )}
      <Timeline user={user} posts={posts} />
    </LoggedInLayout>
  )
}

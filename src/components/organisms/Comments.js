import { useState } from 'react'
import styled from 'styled-components'
import { CommentCard, CreateCommentBox } from '../molecules'

const Container = styled.div``

export default function Comments({ post, user }) {
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleComment = () => {}

  return (
    <Container>
      <CreateCommentBox
        value={inputValue}
        setValue={setInputValue}
        isLoading={isLoading}
        handleClick={handleComment}
        user={user}
      />
      <CommentCard />
    </Container>
  )
}

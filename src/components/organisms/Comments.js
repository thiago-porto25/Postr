import { useState } from 'react'
import styled from 'styled-components'
import { CommentCard, CreateCommentBox } from '../molecules'
import { createComment } from '../../services/commentServices'

const Container = styled.div``

export default function Comments({ post, user }) {
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleComment = async () => {
    setIsLoading(true)
    await createComment(post.id, user.id, inputValue)
    setIsLoading(false)
    setInputValue('')
  }

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

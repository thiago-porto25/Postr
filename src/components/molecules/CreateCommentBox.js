import styled from 'styled-components'
import { LoggedUserAvatar, RegularButton } from '../atoms'

const Container = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 0.8rem;
  align-items: center;
  height: 5rem;
  gap: 1rem;
  border-bottom: 1px solid var(--xLightGrey);

  .comment-button-container {
    button {
      padding: 0.5rem 1rem;

      @media (max-width: 400px) {
        font-size: 14px;
        padding: 0.5rem 0.5rem;
      }
    }
  }
`

const Input = styled.input`
  width: 75%;
  height: 2rem;
  border: none;
  outline: none;
  font-size: 19px;

  &::-webkit-input-placeholder {
    text-overflow: ellipsis;
  }
  &::-moz-placeholder {
    text-overflow: ellipsis;
  }
  &:-ms-input-placeholder {
    text-overflow: ellipsis;
  }
  &:-moz-placeholder {
    text-overflow: ellipsis;
  }
`

export default function CreateCommentBox({
  user,
  value,
  setValue,
  handleClick,
  isLoading,
}) {
  const isDisabled = value.length < 1 || value.length > 80 || isLoading

  return (
    <Container>
      <LoggedUserAvatar user={user} size="larger" />
      <Input
        type="text"
        placeholder="Post a comment..."
        maxLength="80"
        minLength="1"
        value={value}
        onChange={({ target }) => setValue(target.value)}
      />
      <div className="comment-button-container">
        <RegularButton
          disabled={isDisabled}
          onClick={handleClick}
          isLoading={isLoading}
          color="blue"
        >
          Comment
        </RegularButton>
      </div>
    </Container>
  )
}

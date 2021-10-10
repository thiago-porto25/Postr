import styled from 'styled-components'

const Button = styled.button`
  font-family: 'Roboto', sans-serif;
  padding: 5px 10px;
  border-radius: 30px;
  width: 100%;
  border: 1px solid var(--primary);
  font-weight: bold;
  transition: 150ms ease;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    user-select: none;
    pointer-events: none;
  }

  &.not-following {
    background-color: var(--black);
    color: var(--white);
    border: 1px solid var(--black);

    &:hover {
      background-color: var(--xDarkGrey);
    }
  }

  &.following {
    min-width: 6rem;
    background-color: var(--white);
    color: var(--black);
    border: 1px solid var(--lightGrey);

    &:hover {
      background-color: var(--xLightGrey);
    }
  }

  &.unfollow {
    &:hover {
      color: var(--error);
      background-color: var(--errorLight);
    }
  }
`

export default function FollowButton({
  isFollowing,
  isHoveringUnfollow,
  children,
  ...rest
}) {
  return (
    <Button
      className={`${isFollowing ? 'following' : 'not-following'} ${
        isHoveringUnfollow ? 'unfollow' : ''
      }`}
      {...rest}
    >
      {children}
    </Button>
  )
}

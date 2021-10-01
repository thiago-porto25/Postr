import styled from 'styled-components'

const Image = styled.img`
  object-fit: cover;
  border-radius: 50%;

  &.small {
    height: 35px;
    width: 35px;
  }

  &.large {
    height: 45px;
    width: 45px;
  }
`

export default function LoggedUserAvatar({ size, user }) {
  return (
    <Image
      className={size}
      src={
        user
          ? `/images/avatars/${user.avatarPhotoUrl}.jpg`
          : '/images/avatars/default-avatar.png'
      }
      alt={user?.name}
    />
  )
}

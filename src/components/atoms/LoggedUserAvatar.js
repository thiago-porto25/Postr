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

  &.larger {
    height: 50px;
    width: 50px;
  }

  &.extra-larger {
    height: 133px;
    width: 133px;

    @media (max-width: 500px) {
      width: 100px;
      height: 100px;
    }
  }
`

export default function LoggedUserAvatar({ size, user }) {
  return (
    <Image
      className={size}
      src={
        user?.avatarPhotoUrl
          ? `/images/avatars/${user.avatarPhotoUrl}.jpg`
          : '/images/avatars/default-avatar.png'
      }
      alt={user?.name}
    />
  )
}

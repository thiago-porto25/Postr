import styled from 'styled-components'

const Background = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const Default = styled.div`
  background-color: var(--lightGrey);
  width: 100%;
  height: 100%;
`

export default function ProfileBg({ user }) {
  return user && user.backgroundPhotoUrl ? (
    <Background
      src={`/images/backgrounds/${user.backgroundPhotoUrl}.jpg`}
      alt={user?.name}
    />
  ) : (
    <Default />
  )
}

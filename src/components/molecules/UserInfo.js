import styled from 'styled-components'

const Card = styled.section`
  width: 100%;
  height: 100%;
  display: flex;

  .user-info-image {
    height: 45px;
    width: 45px;
    object-fit: cover;
    border-radius: 50%;
  }

  .user-info-naming {
    width: 100%;
    margin-left: 5%;
    display: inline-block;
    overflow-x: hidden;

    h2 {
      width: 100%;
      max-width: 150px;
      color: var(--black);
      font-size: 16px;
      margin: 0;
      overflow-x: hidden;
    }

    sub {
      width: 100%;
      font-size: 15px;
      color: var(--darkGrey);
    }
  }
`

export default function UserInfo({ userNeeded }) {
  return (
    <Card>
      <img
        className="user-info-image"
        src={
          userNeeded?.avatarPhotoUrl
            ? `/images/avatars/${userNeeded.avatarPhotoUrl}.jpg`
            : 'images/avatars/default-avatar.png'
        }
        alt={userNeeded?.name}
      />
      <div className="user-info-naming">
        <h2>{userNeeded?.name || 'Testeasdmaksdmkasasdasdasdasdasd'}</h2>
        <sub>{`@${userNeeded?.username}` || '@test'}</sub>
      </div>
    </Card>
  )
}

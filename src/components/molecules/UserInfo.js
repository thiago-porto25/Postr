import styled from 'styled-components'

const Card = styled.section`
  width: 100%;
  height: 100%;
  display: flex;

  .user-info-image {
    height: 45px;
    min-width: 45px !important;
    width: 45px;
    object-fit: cover;
    border-radius: 50%;
  }

  .image-large {
    height: 120px;
    width: 120px;
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
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    sub {
      width: 100%;
      font-size: 15px;
      color: var(--darkGrey);
    }
  }

  .naming-large {
    width: max-content;
    padding-right: 1rem;

    h2 {
      font-size: 25px;
      width: max-content;
      max-width: none;
      text-overflow: unset;
    }

    sub {
      width: fit-content;
      font-size: 20px;
    }
  }
`

export default function UserInfo({ userNeeded, large }) {
  return (
    <Card>
      <img
        className={large ? 'user-info-image image-large' : 'user-info-image'}
        src={
          userNeeded?.avatarPhotoUrl
            ? `/images/avatars/${userNeeded.avatarPhotoUrl}.jpg`
            : '/images/avatars/default-avatar.png'
        }
        alt={userNeeded?.name}
      />
      <div
        className={large ? 'user-info-naming naming-large' : 'user-info-naming'}
      >
        <h2>{userNeeded && userNeeded.name}</h2>
        <sub>@{userNeeded && userNeeded.username}</sub>
      </div>
    </Card>
  )
}

import styled from 'styled-components'

const Card = styled.section`
  width: 90%;
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
    overflow: hidden;

    h2 {
      width: 100%;
      max-width: 150px;
      color: var(--black);
      font-size: 16px;
      margin: 0;
      overflow: hidden;
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
    padding-right: 1rem;
    width: 300px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;

    @media (max-width: 460px) {
      width: 200px;

      h2 {
        font-size: 20px !important;
        max-width: 200px !important;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }

    @media (max-width: 380px) {
      width: 130px;

      h2 {
        max-width: 130px !important;
      }
    }

    h2 {
      font-size: 20px;
      text-overflow: ellipsis !important;
      max-width: 300px;
      font-size: 25px;
      width: max-content;
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

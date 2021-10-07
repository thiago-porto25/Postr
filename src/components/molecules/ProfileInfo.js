import styled from 'styled-components'
import { RiCakeFill, RiCalendar2Line } from 'react-icons/ri'

const Container = styled.div`
  .name-and-username-container {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    .profile-name {
      font-size: 20px;
    }

    .profile-username {
      font-size: 17px;
      font-weight: normal;
      color: var(--darkGrey);
    }

    * {
      margin: 0;
    }
  }

  .bio {
    font-size: 15px;
    text-align: justify;
  }

  .dates-container {
    color: var(--darkGrey);
    font-size: 15px;
    display: flex;
    gap: 1rem;

    p {
      display: flex;
      gap: 0.4rem;
      align-items: center;
      margin: 0;
    }

    svg {
      font-size: 18px;
    }
  }

  .follow-info-container {
    display: flex;
    gap: 1rem;
    font-size: 15px;

    span {
      font-weight: bold;
      color: var(--black);
      margin-right: 0.3rem;
    }

    p {
      color: var(--darkGrey);
    }
  }
`

export default function ProfileInfo({ user }) {
  const parseBirthday = (rawDate) => {
    return new Date(rawDate).toLocaleDateString('en-US', {
      timeZone: 'UTC',
    })
  }

  const parseTimestamp = (timestamp) => {
    return timestamp.toDate().toLocaleDateString('en-US', { timeZone: 'UTC' })
  }

  return (
    <Container>
      <div className="name-and-username-container">
        <h2 className="profile-name">{user?.name}</h2>
        <h4 className="profile-username">@{user?.username}</h4>
      </div>

      <p className="bio">
        {user?.bio} kasdlasdklamsdlkmaskldm klamsdklams adklams ams damskaldm
        aklsm dklams dklasm dklasm dklams dklam sdkla smdkla
      </p>

      <div className="dates-container">
        <p>
          <RiCakeFill /> Born in {parseBirthday(user?.birthday)}
        </p>
        <p>
          <RiCalendar2Line /> Joined Postr in {parseTimestamp(user?.createdAt)}
        </p>
      </div>

      <div className="follow-info-container">
        <p>
          <span>{user?.following.length}</span> Seguindo
        </p>
        <p>
          <span>{user?.followers.length}</span> Seguidores
        </p>
      </div>
    </Container>
  )
}

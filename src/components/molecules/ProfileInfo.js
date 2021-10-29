import styled from 'styled-components'
import { RiCakeFill, RiCalendar2Line } from 'react-icons/ri'
import { parseTimestamp } from '../../utils/parseTimestamp'

const Container = styled.div`
  .name-and-username-container {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;

    .profile-name {
      font-size: 20px;
      width: 90%;
      overflow-x: hidden;
      text-overflow: ellipsis;
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
    word-wrap: break-word;
  }

  .dates-container {
    color: var(--darkGrey);
    font-size: 15px;
    display: flex;
    gap: 1rem;

    @media (max-width: 500px) {
      flex-direction: column;
    }

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
      cursor: pointer;
      color: var(--darkGrey);
    }
  }
`

export default function ProfileInfo({ user, setIsOnFollows }) {
  const parseBirthday = (rawDate) => {
    return new Date(rawDate).toLocaleDateString('en-US', {
      timeZone: 'UTC',
    })
  }

  return (
    <Container>
      <div className="name-and-username-container">
        <h2 className="profile-name">{user?.name}</h2>
        <h4 className="profile-username">@{user?.username}</h4>
      </div>

      <p className="bio">{user?.bio}</p>

      <div className="dates-container">
        {user?.birthday && (
          <p>
            <RiCakeFill /> Born in {parseBirthday(user?.birthday)}
          </p>
        )}
        <p>
          <RiCalendar2Line /> Joined Postr in{' '}
          {user && user.createdAt ? parseTimestamp(user?.createdAt) : null}
        </p>
      </div>

      <div className="follow-info-container">
        <p onClick={() => setIsOnFollows(true)}>
          <span>{user?.following?.length}</span> Following
        </p>
        <p onClick={() => setIsOnFollows(true)}>
          <span>{user?.followers?.length}</span> Followers
        </p>
      </div>
    </Container>
  )
}

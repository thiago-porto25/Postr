import { useContext, useState } from 'react'
import styled from 'styled-components'
import UserContext from '../../context/userContext'
import { LoggedUserAvatar, ProfileBg, RegularButton } from '../atoms'
import { ProfileInfo, ProfileNav } from '../molecules'
import { BiEnvelope } from 'react-icons/bi'

const Container = styled.div`
  position: relative;

  .profile-bg-container {
    width: 100%;
    height: 12rem;
  }

  .profile-buttons-container {
    height: 4.3rem;
    display: flex;
    align-items: center;
    justify-content: right;
    gap: 2rem;
    box-sizing: border-box;
    padding: 0 1rem;

    .profile-edit-button {
      margin-top: 1rem;
      height: 3rem;

      button {
        padding: 0.5rem 1rem;
      }
    }
  }

  .profile-follow-button {
    height: fit-content;
    display: flex;
    align-items: center;
    gap: 1rem;

    button {
      padding: 0.5rem 0.5rem;
    }

    .profile-message-button {
      border-radius: 50%;
      height: 2rem;
      width: 3.2rem;
      border: 1px solid var(--lightGrey);
      background-color: var(--white);
      color: var(--black);
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
      cursor: pointer;
      transition: 150ms ease;

      &:hover {
        background-color: var(--xxLightGrey);
      }
    }

    .profile-follow {
      width: 6rem;
    }
  }

  .profile-avatar-container {
    background-color: var(--xLightGrey);
    border-radius: 50%;
    position: absolute;
    top: 7rem;
    left: 1rem;
    box-sizing: border-box;
    padding: 0.3rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .profile-info-container {
    box-sizing: border-box;
    padding: 0 1.5rem;
  }
`

export default function ProfileHeader({
  profileUser,
  setIsOnLikes,
  isOnLikes,
}) {
  const [hoverUnfollow, setHoverUnfollow] = useState(false)
  const { user } = useContext(UserContext)

  return (
    <Container>
      <div className="profile-bg-container">
        <ProfileBg user={profileUser} />
      </div>

      <div className="profile-buttons-container">
        {user?.username === profileUser?.username ? (
          <div className="profile-edit-button">
            <RegularButton color="white-grey">Edit Profile</RegularButton>
          </div>
        ) : (
          <div className="profile-follow-button">
            {user?.following.includes(profileUser?.id) ? (
              <>
                <div className="profile-message-button">
                  <BiEnvelope />
                </div>

                <RegularButton
                  onMouseEnter={() => setHoverUnfollow(true)}
                  onMouseLeave={() => setHoverUnfollow(false)}
                  isUnfollow={true}
                  color="white-grey"
                >
                  {hoverUnfollow ? 'Unfollow' : 'Following'}
                </RegularButton>
              </>
            ) : (
              <div className="profile-follow">
                <RegularButton color="black">Follow</RegularButton>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="profile-avatar-container">
        <LoggedUserAvatar size="extra-larger" user={profileUser} />
      </div>

      <div className="profile-info-container">
        <ProfileInfo user={profileUser} />
      </div>

      <ProfileNav setIsOnLikes={setIsOnLikes} isOnLikes={isOnLikes} />
    </Container>
  )
}

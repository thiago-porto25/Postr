import styled from 'styled-components'
import { LoggedUserAvatar, ProfileBg } from '../atoms'
import { ProfileInfo, ProfileNav } from '../molecules'

const Container = styled.div`
  position: relative;

  .profile-bg-container {
    width: 100%;
    height: 12rem;
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
    margin-top: 4.3rem;
    box-sizing: border-box;
    padding: 0 1.5rem;
  }
`

export default function ProfileHeader({
  profileUser,
  setIsOnLikes,
  isOnLikes,
}) {
  return (
    <Container>
      <div className="profile-bg-container">
        <ProfileBg user={profileUser} />
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

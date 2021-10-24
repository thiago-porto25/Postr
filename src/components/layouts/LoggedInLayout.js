import styled from 'styled-components'
import { LeftBar, RightBar, PostBoxModal } from '../organisms'
import { useState } from 'react'

const Container = styled.main`
  height: 100vh;
  width: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  display: grid;
  grid-template-columns: 24fr 45fr 33fr;

  @media (max-width: 1200px) {
    grid-template-columns: 14fr 53fr 35fr;
  }

  @media (max-width: 1000px) {
    display: flex;
  }

  .layout-left-sidebar-container {
    box-shadow: 1px 1px 1px #aaaaaa11;

    @media (max-width: 1000px) {
      width: 20%;
    }

    .inner-left-bar {
      position: fixed;
      z-index: 10;
      top: 0.5rem;
      left: 3rem;
      width: 15%;

      @media (max-width: 1200px) {
        left: 5%;
        width: fit-content;
      }
    }
  }
  .layout-main-section-container {
    border-right: 1px solid var(--xLightGrey);
    border-left: 1px solid var(--xLightGrey);

    @media (max-width: 1000px) {
      width: 100%;
      max-width: 550px;
      margin: 0 auto;
      margin-left: 4%;
    }
  }
  .layout-right-sidebar-container {
    box-shadow: 1px 1px 1px #aaaaaa11;

    @media (max-width: 1000px) {
      display: none;
    }

    .inner-right-bar {
      position: fixed;
      top: 0.5rem;
      right: 0.5rem;
      width: 32%;

      @media (max-width: 1200px) {
        right: 0;
        width: 37%;
      }
    }
  }
`

export default function LoggedInLayout({
  showSearchBar,
  showSuggestion,
  user,
  isOnFollows,
  setIsOnFollows,
  setProfileUser,
  profileUser,
  setProfilePosts,
  children,
}) {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <Container>
        <div className="layout-left-sidebar-container">
          <div className="inner-left-bar">
            <LeftBar
              isOnFollows={isOnFollows}
              setIsOnFollows={setIsOnFollows}
              setOpenModal={setOpenModal}
              user={user}
            />
          </div>
        </div>

        <div className="layout-main-section-container">{children}</div>

        <div className="layout-right-sidebar-container">
          <div className="inner-right-bar">
            <RightBar
              showSearchBar={showSearchBar}
              showSuggestion={showSuggestion}
              setProfileUser={setProfileUser}
              profileUser={profileUser}
            />
          </div>
        </div>
      </Container>

      {openModal && (
        <PostBoxModal
          user={user}
          profileUser={profileUser}
          setProfilePosts={setProfilePosts}
          setOpenModal={setOpenModal}
        />
      )}
    </>
  )
}

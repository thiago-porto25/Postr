import styled from 'styled-components'
import { LeftBar, RightBar, PostBoxModal } from '../organisms'
import { MobileNav } from '../molecules'
import { BigButton } from '../atoms'
import { useState } from 'react'

const Container = styled.main`
  min-height: 100vh;
  width: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
  display: flex;

  @media (max-width: 660px) {
    &::-webkit-scrollbar {
      display: none;
    }

    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .layout-left-sidebar-container {
    width: 24%;

    @media (max-width: 1200px) {
      max-width: 184px;
      min-width: 120px;
    }

    @media (max-width: 660px) {
      display: none;
    }

    .inner-left-bar {
      position: fixed;
      z-index: 10;
      top: 0.5rem;
      left: 3rem;
      width: 15%;

      @media (max-width: 1200px) {
        width: fit-content;

        left: 4%;
      }

      @media (max-width: 700px) {
        left: 4%;
      }
    }
  }
  .layout-main-section-container {
    box-shadow: 1px 1px 1px #aaaaaa11;
    border-right: 1px solid var(--xLightGrey);
    border-left: 1px solid var(--xLightGrey);
    width: 44%;

    @media (max-width: 1200px) {
      max-width: 578px;
      min-width: 550px;
    }

    @media (max-width: 1100px) {
      width: 100%;
      max-width: 550px;
      min-width: auto;
      margin: 0 auto;
      margin-left: 4%;
    }

    @media (max-width: 700px) {
      margin: 0 auto;
    }
  }
  .layout-right-sidebar-container {
    width: 32%;
    box-shadow: 1px 1px 1px #aaaaaa11;

    @media (max-width: 1200px) {
      max-width: 423px;
      min-width: 400px;
    }

    @media (max-width: 1100px) {
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

  .home-post-box {
    @media (max-width: 660px) {
      display: none;
    }
  }

  .mobile-post {
    display: none;
    position: fixed;
    bottom: 4rem;
    right: 1rem;

    button {
      padding: 0;
    }

    @media (max-width: 1200px) {
      button {
        width: fit-content;
        padding: 0.9rem;

        span {
          display: none;
        }
      }
      .post {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 25px;
      }
    }

    @media (max-width: 660px) {
      display: block;
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

        <div className="mobile-post">
          <BigButton onClick={() => setOpenModal(true)} color="blue">
            Post
          </BigButton>
        </div>

        <MobileNav
          isOnFollows={isOnFollows}
          setIsOnFollows={setIsOnFollows}
          user={user}
        />
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

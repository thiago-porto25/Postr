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

  .layout-left-sidebar-container {
    border-right: 1px solid var(--xLightGrey);
    box-shadow: 1px 1px 1px #aaaaaa11;

    .inner-left-bar {
      position: fixed;
      top: 0.5rem;
      left: 3rem;
      width: 15%;
    }
  }
  .layout-main-section-container {
  }
  .layout-right-sidebar-container {
    border-left: 1px solid var(--xLightGrey);
    box-shadow: 1px 1px 1px #aaaaaa11;

    .inner-right-bar {
      position: fixed;
      top: 0.5rem;
      right: 0.5rem;
      width: 32%;
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

import styled from 'styled-components'
import { LeftBar, RightBar, PostBoxModal } from '../organisms'
import { useState } from 'react'

const Container = styled.main`
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: grid;
  grid-template-columns: 24fr 45fr 33fr;

  .layout-left-sidebar-container {
    border-right: 1px solid var(--xLightGrey);
    box-shadow: 1px 1px 1px #aaaaaa11;
    padding: 0.5rem 3rem;
  }
  .layout-main-section-container {
  }
  .layout-right-sidebar-container {
    border-left: 1px solid var(--xLightGrey);
    box-shadow: 1px 1px 1px #aaaaaa11;
  }
`

export default function LoggedInLayout({
  showSearchBar,
  showSuggestion,
  showFilter,
  user,
  children,
}) {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <Container>
        <div className="layout-left-sidebar-container">
          <LeftBar setOpenModal={setOpenModal} user={user} />
        </div>

        <div className="layout-main-section-container">{children}</div>

        <div className="layout-right-sidebar-container">
          <RightBar
            showFilter={showFilter}
            showSearchBar={showSearchBar}
            showSuggestion={showSuggestion}
          />
        </div>
      </Container>

      {openModal && <PostBoxModal user={user} setOpenModal={setOpenModal} />}
    </>
  )
}

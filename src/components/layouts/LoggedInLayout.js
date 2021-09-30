import styled from 'styled-components'
import { LeftBar, RightBar } from '../organisms'

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

export default function LoggedInLayout({ children }) {
  return (
    <Container>
      <div className="layout-left-sidebar-container">
        <LeftBar />
      </div>
      <div className="layout-main-section-container">{children}</div>
      <div className="layout-right-sidebar-container">
        <RightBar />
      </div>
    </Container>
  )
}

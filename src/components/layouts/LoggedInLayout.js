import styled from 'styled-components'
import { LeftBar, RightBar } from '../organisms'

const Container = styled.main`
  height: 100vh;
  width: 100%;
  overflow: hidden;
  display: grid;
  grid-template-columns: 2fr 4fr 2fr;
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

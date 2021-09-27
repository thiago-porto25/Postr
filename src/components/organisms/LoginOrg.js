import styled from 'styled-components'
import { Logo, AuthTitle } from '../atoms'

const Container = styled.section``

export default function LoginOrg() {
  return (
    <Container>
      <div className="login-logo-container">
        <Logo />
      </div>

      <div className="login-auth-title-container">
        <AuthTitle></AuthTitle>
      </div>
    </Container>
  )
}

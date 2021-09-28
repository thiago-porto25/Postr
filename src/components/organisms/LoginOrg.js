import styled from 'styled-components'
import { Logo, AuthTitle, AuthLink, Dot, AuthMessage } from '../atoms'
import { LoginForm } from '../molecules'
import * as ROUTES from '../../constants/routes'
import { useState } from 'react'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  height: 100%;
  width: 100%;

  .login-logo-container {
    height: 40px;
    width: 40px;
  }

  .login-links-container {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;
  }
`

export default function LoginOrg() {
  const [error, setError] = useState()

  return (
    <Container>
      <div className="login-logo-container">
        <Logo />
      </div>

      <div className="login-auth-title-container">
        <AuthTitle>Log In to Postr</AuthTitle>
      </div>

      <div className="login-form-container">
        <LoginForm setMessage={setError} />
      </div>

      <div className="login-links-container">
        <AuthLink to={ROUTES.RESET_PASSWORD}>Forgot Password?</AuthLink>
        <Dot />
        <AuthLink to={ROUTES.SIGNUP}>Sign up for Postr</AuthLink>
      </div>

      {error && (
        <div className="login-error-container">
          <AuthMessage type="error" text={error} />
        </div>
      )}
    </Container>
  )
}

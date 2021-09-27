import styled from 'styled-components'
import { Logo, AuthTitle, AuthLink, AuthMessage } from '../atoms'
import { SignupForm } from '../molecules'
import * as ROUTES from '../../constants/routes'
import { useState } from 'react'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  height: 100%;
  width: 100%;

  .signup-logo-container {
    height: 40px;
    width: 40px;
  }

  .signup-links-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .signup-error-container {
    margin-top: -1rem;
  }
`

export default function SignupOrg() {
  const [error, setError] = useState()

  return (
    <Container>
      <div className="signup-logo-container">
        <Logo />
      </div>

      <div className="signup-auth-title-container">
        <AuthTitle>Sign Up for Postr</AuthTitle>
      </div>

      <div className="signup-form-container">
        <SignupForm setMessage={setError} />
      </div>

      <div className="signup-links-container">
        <AuthLink to={ROUTES.LOGIN}>Log In to Postr</AuthLink>
      </div>

      {error && (
        <div className="signup-error-container">
          <AuthMessage type="error" text={error} />
        </div>
      )}
    </Container>
  )
}

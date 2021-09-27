import styled from 'styled-components'
import { Logo, AuthTitle, AuthLink, AuthMessage } from '../atoms'
import { ResetPasswordForm } from '../molecules'
import * as ROUTES from '../../constants/routes'
import { useState } from 'react'

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
  height: 100%;
  width: 100%;

  .reset-logo-container {
    height: 40px;
    width: 40px;
  }

  .reset-links-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export default function LoginOrg() {
  const [error, setError] = useState({ type: '', text: '' })

  return (
    <Container>
      <div className="reset-logo-container">
        <Logo />
      </div>

      <div className="reset-auth-title-container">
        <AuthTitle>Reset Password</AuthTitle>
      </div>

      <div className="reset-form-container">
        <ResetPasswordForm setError={setError} />
      </div>

      <div className="reset-links-container">
        <AuthLink to={ROUTES.LOGIN}>Log In to Postr</AuthLink>
      </div>

      {error && (
        <div className="reset-error-container">
          <AuthMessage type={error.type} text={error.text} />
        </div>
      )}
    </Container>
  )
}

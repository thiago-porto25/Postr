import { useState } from 'react'
import styled from 'styled-components'
import { AuthMessage, SettingsButton } from '../atoms'
import { UserInfo, SimpleHeader } from '../molecules'
import {
  logoutWithFirebase,
  sendResetPasswordWithFirebase,
} from '../../services/authServices'
import * as ROUTES from '../../constants/routes'
import { Link, useHistory } from 'react-router-dom'

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--xxLightGrey);

  a {
    text-decoration: none;
    width: 100%;
    cursor: pointer;
  }

  .settings-delete-container,
  .settings-reset-container,
  .settings-info-container,
  .settings-logout-container {
    width: 100%;
    display: flex;
    height: 4rem;

    justify-content: center;
  }

  .settings-user-info-container {
    width: 100%;
    padding: 2rem 1rem;
    box-sizing: border-box;

    section {
      display: flex;
      justify-content: center;
    }
  }

  .settings-error {
    margin-top: 2rem;
  }
`

export default function SettingsOrg({ user }) {
  const [message, setMessage] = useState({
    type: '',
    text: '',
  })
  const history = useHistory()

  const handleLogout = () => {
    logoutWithFirebase({ setMessage })
  }

  const handleReset = async () => {
    await sendResetPasswordWithFirebase({ email: user.email, setMessage })
    history.push(ROUTES.SETTINGS_RESET)
  }

  return (
    <Container>
      <SimpleHeader>Settings</SimpleHeader>

      <div className="settings-user-info-container">
        <UserInfo userNeeded={user} large={true} />
      </div>

      <Link to={ROUTES.SETTINGS_EDIT}>
        <div className="settings-info-container">
          <SettingsButton>Change my information</SettingsButton>
        </div>
      </Link>

      <div onClick={handleReset} className="settings-reset-container">
        <SettingsButton>Reset my password</SettingsButton>
      </div>

      <div onClick={handleLogout} className="settings-logout-container">
        <SettingsButton isDelete={true}>Logout of account</SettingsButton>
      </div>

      <Link to={ROUTES.SETTINGS_DELETE}>
        <div className="settings-delete-container">
          <SettingsButton isDelete={true}>Delete account</SettingsButton>
        </div>
      </Link>

      {message && (
        <div className="settings-error">
          <AuthMessage type={message.type} text={message.text} />
        </div>
      )}
    </Container>
  )
}

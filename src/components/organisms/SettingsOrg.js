import { useState } from 'react'
import styled from 'styled-components'
import { AuthMessage, SettingsButton } from '../atoms'
import { UserInfo, SimpleHeader } from '../molecules'
import {
  logoutWithFirebase,
  sendResetPasswordWithFirebase,
} from '../../services/authServices'

const Container = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

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
    background-color: var(--xxLightGrey);
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

export default function SettingsOrg({
  user,
  setEditInfoSection,
  setResetSection,
  setDeleteSection,
}) {
  const [message, setMessage] = useState({
    type: '',
    text: '',
  })

  const handleLogout = () => {
    logoutWithFirebase({ setMessage })
  }

  const handleReset = async () => {
    await sendResetPasswordWithFirebase({ email: user.email, setMessage })

    setResetSection(true)
  }

  return (
    <Container>
      <SimpleHeader>Settings</SimpleHeader>

      <div className="settings-user-info-container">
        <UserInfo userNeeded={user} large={true} />
      </div>

      <div
        onClick={() => setEditInfoSection(true)}
        className="settings-info-container"
      >
        <SettingsButton>Change my information</SettingsButton>
      </div>

      <div onClick={handleReset} className="settings-reset-container">
        <SettingsButton>Reset my password</SettingsButton>
      </div>

      <div onClick={handleLogout} className="settings-logout-container">
        <SettingsButton isDelete={true}>Logout of account</SettingsButton>
      </div>

      <div
        onClick={() => setDeleteSection(true)}
        className="settings-delete-container"
      >
        <SettingsButton isDelete={true}>Delete account</SettingsButton>
      </div>

      {message && (
        <div className="settings-error">
          <AuthMessage type={message.type} text={message.text} />
        </div>
      )}
    </Container>
  )
}

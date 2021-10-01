import { useState } from 'react'
import styled from 'styled-components'
import { AuthMessage } from '../atoms'
import { UserInfo } from '../molecules'

const Container = styled.div`
  width: 100%;
  display: flex;
  gap: 3rem;
  flex-direction: column;
  align-items: center;

  .settings-delete-container,
  .settings-reset-container {
    width: 95%;
    display: flex;
    justify-content: center;
  }

  .settings-user-info-container {
    margin-top: 2rem;
    width: 100%;

    &:first-child {
      width: fit-content;
    }
  }

  .settings-reset-container,
  .settings-delete-container {
    button {
      border: none;
      background-color: var(--xxLightGrey);
      width: 100%;
      height: 4rem;
      cursor: pointer;
      transition: 150ms ease;
    }
  }

  .settings-reset-container {
    button {
      color: var(--primary);

      &:hover {
        background-color: var(--xLightGrey);
      }
    }
  }

  .settings-delete-container {
    button {
      color: var(--error);

      &:hover {
        background-color: var(--errorLight);
      }
    }
  }
`

export default function SettingsOrg({ user }) {
  const [message, setMessage] = useState({ type: '', text: '' })

  return (
    <Container>
      <div className="settings-user-info-container">
        <UserInfo userNeeded={user} large={true} />
      </div>

      <div className="settings-reset-container">
        <button>Reset my password</button>
      </div>

      <div className="settings-delete-container">
        <button>Delete account</button>
      </div>

      {message && (
        <div className="settings-error">
          <AuthMessage type={message.type} text={message.text} />
        </div>
      )}
    </Container>
  )
}

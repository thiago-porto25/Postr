import { useState } from 'react'
import styled from 'styled-components'

import { SettingsButton, AuthMessage } from '../atoms'
import { SimpleHeader } from '../molecules'

import * as ROUTES from '../../constants/routes'
import { deleteUserFromDb } from '../../services/authServices'

const Inner = styled.div`
  .delete-texts-container {
    box-sizing: border-box;
    padding: 0 1rem;

    h2,
    h3,
    h4 {
      color: var(--xDarkGrey);
    }

    h2 {
      font-size: 20px;
    }

    h3,
    h4 {
      font-size: 18px;
    }

    ul {
      color: var(--darkGrey);
      font-size: 17px;
      list-style: square;
    }
  }

  .final-delete-button-container {
    height: 4rem;
    margin-bottom: 2rem;
  }
`

export default function DeleteAccount({ user }) {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleDelete = async () => {
    if (isLoading) return

    try {
      setIsLoading(true)
      await deleteUserFromDb(user)
    } catch (error) {
      console.error(error.message)
      setError(error.message)
    }
    setIsLoading(false)
  }

  return (
    <div>
      <SimpleHeader withArrow={true} arrowLink={ROUTES.SETTINGS}>
        Delete Account
      </SimpleHeader>
      <Inner>
        <div className="delete-texts-container">
          <h2>Are you sure you want to delete your account?</h2>

          <h3>If you delete you account:</h3>

          <ul>
            <li>All your posts will be gone.</li>
            <li>All your comments will be gone.</li>
            <li>All your likes and reposts will be gone.</li>
          </ul>

          <h4>There's no way back!</h4>
        </div>

        <div onClick={handleDelete} className="final-delete-button-container">
          <SettingsButton isLoading={isLoading} isDelete={true}>
            I'm sure I want to delete my account!
          </SettingsButton>
        </div>

        {error && <AuthMessage type="error" text={error} />}
      </Inner>
    </div>
  )
}

import { useState } from 'react'
import styled from 'styled-components'
import { BigButton, SpecialInput } from '../atoms'
import { sendResetPasswordWithFirebase } from '../../services/authServices'

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;

  button:last-of-type {
    margin-top: 1.5rem;
  }

  .reset-special-input-container {
    height: 3rem;
  }
`

export default function ResetPasswordForm({ setMessage }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState('')

  const isDisabled = email.length > 7 && !loading ? false : true

  const handleSubmit = async (e) => {
    e.preventDefault()

    setLoading(true)

    await sendResetPasswordWithFirebase({
      email,
      setEmail,
      setMessage,
    })

    setLoading(false)
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div className="reset-special-input-container">
        <SpecialInput
          type="email"
          placeholder="E-mail"
          maxLength="40"
          minLength="8"
          inputValue={email}
          setInputValue={setEmail}
        />
      </div>

      <BigButton
        isLoading={loading}
        disabled={isDisabled}
        type="submit"
        color="blue"
      >
        Reset Password
      </BigButton>
    </Form>
  )
}

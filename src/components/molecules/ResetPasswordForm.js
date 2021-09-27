import { useState } from 'react'
import styled from 'styled-components'
import { BigButton, SpecialInput } from '../atoms'

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

export default function ResetPasswordForm({ setError }) {
  const [email, setEmail] = useState('')

  const isDisabled = email.length > 7 ? false : true

  const handleSubmit = (e) => {
    e.preventDefault()
    setError({
      type: 'success',
      text: 'E-mail sent successfully! Check your inbox for the reset link!',
    })
    setEmail('')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div className="reset-special-input-container">
        <SpecialInput
          type="email"
          placeholder="E-mail"
          inputValue={email}
          setInputValue={setEmail}
        />
      </div>

      <BigButton disabled={isDisabled} type="submit" color="blue">
        Reset Password
      </BigButton>
    </Form>
  )
}

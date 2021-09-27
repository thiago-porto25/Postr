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

  .login-special-input-container {
    height: 3rem;
  }
`

export default function LoginForm({ setError }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const isDisabled = email.length > 7 && password.length > 5 ? false : true

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('Testing testing my friend')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div className="login-special-input-container">
        <SpecialInput
          type="email"
          placeholder="E-mail"
          inputValue={email}
          setInputValue={setEmail}
        />
      </div>
      <div className="login-special-input-container">
        <SpecialInput
          type="password"
          placeholder="Password"
          inputValue={password}
          setInputValue={setPassword}
        />
      </div>

      <BigButton disabled={isDisabled} type="submit" color="blue">
        Log in
      </BigButton>
    </Form>
  )
}

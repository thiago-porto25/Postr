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

  .signup-special-input-container {
    height: 3rem;
  }
`

export default function SignupForm({ setMessage }) {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')

  const isDisabled =
    email.length > 7 &&
    password.length > 5 &&
    name.length > 2 &&
    username.length > 2 &&
    passwordConfirmation === password
      ? false
      : true

  const handleSubmit = (e) => {
    e.preventDefault()
    setMessage('Testing testing my friend. ')
    setUsername('')
    setEmail('')
    setPassword('')
    setPasswordConfirmation('')
  }

  return (
    <Form onSubmit={handleSubmit}>
      <div className="signup-special-input-container">
        <SpecialInput
          type="text"
          placeholder="Name"
          inputValue={name}
          setInputValue={setName}
        />
      </div>

      <div className="signup-special-input-container">
        <SpecialInput
          type="text"
          placeholder="Username"
          inputValue={username}
          setInputValue={setUsername}
        />
      </div>

      <div className="signup-special-input-container">
        <SpecialInput
          type="email"
          placeholder="E-mail"
          inputValue={email}
          setInputValue={setEmail}
        />
      </div>

      <div className="signup-special-input-container">
        <SpecialInput
          type="password"
          placeholder="Password"
          inputValue={password}
          setInputValue={setPassword}
        />
      </div>

      <div className="signup-special-input-container">
        <SpecialInput
          type="password"
          placeholder="Confirm password"
          inputValue={passwordConfirmation}
          setInputValue={setPasswordConfirmation}
        />
      </div>

      <BigButton disabled={isDisabled} type="submit" color="blue">
        Sign up
      </BigButton>
    </Form>
  )
}

import styled from 'styled-components'
import { RegularButton, SpecialInput, AuthMessage } from '../atoms'
import { SimpleHeader } from '../molecules'
import * as ROUTES from '../../constants/routes'
import { useEffect, useState } from 'react'
import { saveChangesToUser } from '../../services/authServices'

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem 0;
  box-sizing: border-box;

  form {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    box-sizing: border-box;

    @media (max-width: 450px) {
      width: 80%;
    }

    input {
      border: 1px solid var(--lightGrey);

      &:focus {
        border: 1px solid var(--primary);
      }
    }
  }
`

const ButtonContainer = styled.div`
  margin: 0 auto;
  width: 6rem;
`

export default function EditInfo({ user }) {
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [birthday, setBirthday] = useState('')
  const [isLoading, setIsLoading] = useState('')
  const [message, setMessage] = useState({ type: '', text: '' })

  const isDisabled =
    (name === user.name &&
      username === user.username &&
      birthday === user.birthday) ||
    isLoading

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isLoading) return

    setIsLoading(true)
    setMessage({ type: '', text: '' })

    await saveChangesToUser({
      birthday,
      name,
      username,
      user,
      setMessage,
      setName,
      setUsername,
      setBirthday,
    })

    setIsLoading(false)
  }

  useEffect(() => {
    if (user) {
      setName(user.name)
      setUsername(user.username)
      setBirthday(user.birthday)
    }
  }, [user])

  return (
    <>
      <SimpleHeader withArrow={true} arrowLink={ROUTES.SETTINGS}>
        Edit Account Information
      </SimpleHeader>

      <Inner>
        <form onSubmit={handleSubmit}>
          <SpecialInput
            type="text"
            placeholder="Name"
            maxLength="30"
            minLength="3"
            inputValue={name}
            setInputValue={setName}
          />

          <SpecialInput
            type="text"
            placeholder="Username"
            maxLength="18"
            minLength="2"
            inputValue={username}
            setInputValue={setUsername}
          />

          <SpecialInput
            type="date"
            placeholder="Date of birth"
            inputValue={birthday}
            setInputValue={setBirthday}
          />

          <ButtonContainer>
            <RegularButton
              isLoading={isLoading}
              disabled={isDisabled}
              color="blue"
            >
              Save
            </RegularButton>
          </ButtonContainer>
        </form>
      </Inner>

      {message.text && <AuthMessage text={message.text} type={message.type} />}
    </>
  )
}

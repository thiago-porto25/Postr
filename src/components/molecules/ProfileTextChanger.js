import styled from 'styled-components'
import { SpecialInput } from '../atoms'

const Container = styled.div`
  box-sizing: border-box;
  padding: 0 2.3rem;
  padding-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .profile-change-input-container {
    position: relative;

    .chars-number {
      visibility: hidden;
      position: absolute;
      top: 5px;
      right: 10px;
      color: var(--darkGrey);
      font-size: 13px;
      font-weight: 500;
      transition: 200ms solid ease;
    }

    .change-profile {
      border: 1px solid var(--lightGrey);
      height: 4rem;
    }

    span {
      left: 10px;
      top: 20px;
      font-size: 18px;
    }

    &:focus-within > .chars-number {
      visibility: visible;
    }

    input:focus + span,
    textarea:focus + span,
    input:not(:focus):valid + span,
    textarea:not(:focus):valid + span,
    input:not([value='']) + span,
    textarea:not([value='']) + span {
      font-size: 15px !important;
    }
  }
`

export default function ProfileTextChanger({ name, bio, setName, setBio }) {
  return (
    <Container>
      <div className="profile-change-input-container">
        <SpecialInput
          className="name-input change-profile"
          inputValue={name ? name : ''}
          setInputValue={setName}
          placeholder="Name"
          minLength="3"
          maxLength="30"
          required
        />

        <div className="chars-number">{name.length}/30</div>
      </div>

      <div className="profile-change-input-container">
        <SpecialInput
          className="bio-input change-profile"
          inputValue={bio ? bio : ''}
          setInputValue={setBio}
          placeholder="Bio"
          isTextarea={true}
          maxLength="160"
        />

        <div className="chars-number">{bio.length}/160</div>
      </div>
    </Container>
  )
}

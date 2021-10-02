import { useRef, useState } from 'react'
import styled from 'styled-components'
import { LoggedUserAvatar, RegularButton } from '../atoms'
import { CircularProgressbar } from 'react-circular-progressbar'
import { GrEmoji } from 'react-icons/gr'
import 'react-circular-progressbar/dist/styles.css'

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 14fr;
  width: 100%;
  min-height: 9rem;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  border-bottom: 1px solid var(--xLightGrey);

  .box-avatar-container {
    height: 100%;
    padding-left: 5px;
    padding-top: 5px;
    box-sizing: border-box;
  }

  .box-post-container {
    padding-top: 0.5rem;
    box-sizing: border-box;
    height: 100%;

    .box-input-container {
      width: 100%;
      border-bottom: 1px solid var(--xLightGrey);
    }

    .box-options-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 3rem;
      margin-top: 1rem;

      .box-emoji-container {
        color: var(--primary);
        border-radius: 50%;
        padding: 10px 12px;
        cursor: pointer;
        transition: 150ms ease;

        &:hover {
          background-color: var(--xLightGrey);
        }

        svg {
          width: 23px;
          height: 23px;
        }
      }

      .box-counter-container {
        width: 30px;
        height: 30px;
      }

      .box-post-button-container {
        width: 5.5rem;

        button {
          padding: 0.5rem 1rem;
        }
      }
    }
  }
`

const Textarea = styled.textarea`
  width: 98%;
  border: none;
  outline: none;
  resize: none;
  padding-top: 0.5rem;
  min-height: 32px;
  max-height: 400px;

  font-family: 'Roboto', sans-serif;
  font-size: 20px;

  &::placeholder {
    font-family: 'Roboto', sans-serif;
    font-size: 20px;
  }
`

export default function PostBox({ user }) {
  const [postValue, setPostValue] = useState('')
  const textareaRef = useRef(null)

  const isDisabled =
    postValue.length >= 1 && postValue.length <= 180 ? false : true

  const autoSize = () => {
    textareaRef.current.style.height = '32px'
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
  }

  return (
    <Container>
      <div className="box-avatar-container">
        <LoggedUserAvatar size="larger" user={user} />
      </div>

      <div className="box-post-container">
        <div className="box-input-container">
          <Textarea
            ref={textareaRef}
            rows="1"
            placeholder="What's happening?"
            minLength="1"
            maxLength="180"
            value={postValue}
            onChange={({ target }) => {
              setPostValue(target.value)
              autoSize()
            }}
          />
        </div>

        <div className="box-options-container">
          <div className="box-emoji-container">
            <GrEmoji className="box-emoji" />
          </div>

          <div className="box-counter-container">
            <CircularProgressbar maxValue={180} value={postValue.length} />
          </div>

          <div className="box-post-button-container">
            <RegularButton disabled={isDisabled} color="blue">
              Post
            </RegularButton>
          </div>
        </div>
      </div>
    </Container>
  )
}

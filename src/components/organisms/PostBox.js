import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { LoggedUserAvatar, RegularButton } from '../atoms'

import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'

import { GrEmoji } from 'react-icons/gr'
import { createPost } from '../../services/postServices'
import { Link } from 'react-router-dom'

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 14fr;
  width: 100%;
  min-height: 9rem;
  padding: 0.5rem 1rem;
  box-sizing: border-box;
  border-bottom: 1px solid var(--xLightGrey);
  position: relative;

  .box-avatar-container {
    height: 100%;
    padding-left: 5px;
    padding-top: 5px;
    box-sizing: border-box;

    * {
      cursor: pointer;
    }
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

export default function PostBox({
  user,
  setOpenModal,
  profileUser,
  setProfilePosts,
  ...rest
}) {
  const [postValue, setPostValue] = useState('')
  const [emojiOpen, setEmojiOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const textareaRef = useRef(null)

  const handlePost = async () => {
    setLoading(true)
    await createPost({
      user,
      postValue,
      setPostValue,
      setLoading,
      profileUser,
      setProfilePosts,
    })
    setLoading(false)

    if (setOpenModal) setOpenModal(false)
  }

  const autoSize = () => {
    textareaRef.current.style.height = '32px'
    textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
  }

  const handleEmoji = (e) => {
    setPostValue((prev) => prev + e.native)
  }

  useEffect(() => {
    function close() {
      if (emojiOpen) setEmojiOpen(false)
    }

    window.addEventListener('click', close)

    return () => window.removeEventListener('click', close)
  }, [emojiOpen])

  const isDisabled =
    postValue.length >= 1 && postValue.length <= 180 && !loading ? false : true

  return (
    <Container {...rest}>
      <div className="box-avatar-container">
        <Link to={`/p/${user?.username}`}>
          <LoggedUserAvatar size="larger" user={user} />
        </Link>
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
          <div
            onClick={() => setEmojiOpen((prev) => !prev)}
            className="box-emoji-container"
          >
            <GrEmoji className="box-emoji" />
          </div>

          <div className="box-counter-container">
            <CircularProgressbar maxValue={180} value={postValue.length} />
          </div>

          <div className="box-post-button-container">
            <RegularButton
              isLoading={loading}
              onClick={handlePost}
              disabled={isDisabled}
              color="blue"
            >
              Post
            </RegularButton>
          </div>
        </div>
      </div>
      {emojiOpen && (
        <div onClick={(e) => e.stopPropagation()}>
          <Picker
            onSelect={handleEmoji}
            style={{ position: 'absolute', bottom: '-280%', zIndex: '10' }}
          />
        </div>
      )}
    </Container>
  )
}

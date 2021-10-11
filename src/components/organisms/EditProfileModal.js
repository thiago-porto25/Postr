import { useEffect, useState } from 'react'

import styled from 'styled-components'
import { IoClose } from 'react-icons/io5'
import { Picker, ProfileTextChanger } from '../molecules'
import { RegularButton } from '../atoms'
import { Modal } from '../bosons'

import avatarData from '../../utils/avatars'
import backgroundsData from '../../utils/backgrounds'

const Container = styled.div`
  height: 85vh !important;
  overflow: hidden;

  .edit-profile {
    display: flex;
    justify-content: space-between;
    width: 100%;
    box-sizing: border-box;

    .button-container {
      width: 5rem;
    }
  }
`

const Inner = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  width: 100%;
  height: 90%;
  box-sizing: border-box;
  padding-top: 1.5rem;
`

export default function EditProfileModal({ setIsEditingProfile, authUser }) {
  const [avatar, setAvatar] = useState('')
  const [background, setBackground] = useState('')
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')

  console.log(name)

  const isDisabled = name.length <= 2

  useEffect(() => {
    if (authUser) {
      setAvatar(authUser.avatarPhotoUrl)
      setBackground(authUser.backgroundPhotoUrl)
      setName(authUser.name)
      setBio(authUser.bio)
    }
  }, [authUser])

  return (
    <Modal onClick={() => setIsEditingProfile(false)}>
      <Container
        onClick={(e) => e.stopPropagation()}
        className="modal-post-box-container"
      >
        <div className="modal-post-box-header edit-profile">
          <div
            onClick={() => setIsEditingProfile(false)}
            className="modal-close-post-box"
          >
            <IoClose />
          </div>

          <div className="button-container">
            <RegularButton disabled={isDisabled} color="black">
              Save
            </RegularButton>
          </div>
        </div>

        <Inner>
          <Picker
            title="Select your avatar:"
            imagesData={avatarData}
            type="avatars"
            picked={avatar}
            setPicked={setAvatar}
          />

          <Picker
            title="Select you profile background:"
            imagesData={backgroundsData}
            type="backgrounds"
            picked={background}
            setPicked={setBackground}
          />

          <ProfileTextChanger
            name={name}
            bio={bio}
            setName={setName}
            setBio={setBio}
          />
        </Inner>
      </Container>
    </Modal>
  )
}

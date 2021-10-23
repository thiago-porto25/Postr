import { useEffect, useState } from 'react'

import styled from 'styled-components'
import { IoClose } from 'react-icons/io5'
import { Picker, ProfileTextChanger } from '../molecules'
import { RegularButton } from '../atoms'
import { Modal } from '../bosons'

import { saveProfileChanges } from '../../services/firebase'

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

export default function EditProfileModal({
  setIsEditingProfile,
  authUser,
  setUser,
  setProfileUser,
  setProfilePosts,
  setLikedPosts,
}) {
  const [avatar, setAvatar] = useState('')
  const [background, setBackground] = useState('')
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = async () => {
    if (isLoading) return
    if (
      avatar === authUser.avatarPhotoUrl &&
      background === authUser.backgroundPhotoUrl &&
      name === authUser.name &&
      bio === authUser.bio
    ) {
      return
    }

    setIsLoading(true)

    await saveProfileChanges(authUser, { avatar, background, name, bio })

    setUser((prev) => ({
      ...prev,
      avatarPhotoUrl: avatar,
      backgroundPhotoUrl: background,
      name: name,
      bio: bio,
    }))

    setProfileUser((prev) => ({
      ...prev,
      avatarPhotoUrl: avatar,
      backgroundPhotoUrl: background,
      name: name,
      bio: bio,
    }))

    setProfilePosts((prev) => {
      const withoutUserPosts = prev.filter(
        (post) => post.creatorId !== authUser.id
      )
      const userPosts = prev
        .filter((post) => post.creatorId === authUser.id)
        .map((post) => ({ ...post, creatorAvatar: avatar, creatorName: name }))

      const shuffledPosts = [...withoutUserPosts, ...userPosts]

      return shuffledPosts.sort((a, b) => b.createdAt - a.createdAt)
    })

    setLikedPosts((prev) => {
      const withoutUserPosts = prev.filter(
        (post) => post.creatorId !== authUser.id
      )
      const userPosts = prev
        .filter((post) => post.creatorId === authUser.id)
        .map((post) => ({ ...post, creatorAvatar: avatar, creatorName: name }))

      const shuffledPosts = [...withoutUserPosts, ...userPosts]

      return shuffledPosts.sort((a, b) => b.createdAt - a.createdAt)
    })

    setIsLoading(false)

    setIsEditingProfile(false)
  }

  useEffect(() => {
    if (authUser) {
      setAvatar(authUser.avatarPhotoUrl)
      setBackground(authUser.backgroundPhotoUrl)
      setName(authUser.name)
      setBio(authUser.bio)
    }
  }, [authUser])

  const isDisabled = name.length <= 2 || isLoading

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
            <RegularButton
              onClick={handleSave}
              disabled={isDisabled}
              color="black"
              isLoading={isLoading}
            >
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

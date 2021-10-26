import styled from 'styled-components'
import { BsThreeDots } from 'react-icons/bs'
import { BiTrash } from 'react-icons/bi'
import { SettingsButton } from '../atoms'

import { useEffect, useState } from 'react'

const Container = styled.div`
  position: absolute;
  top: 5px;
  right: 10px;
  cursor: pointer;

  .options-icon-container {
    box-sizing: border-box;
    padding: 0.5rem;
    border-radius: 50%;
    transition: 200ms ease;
    width: 32px;
    height: 32px;
    color: var(--darkGrey);

    &:hover {
      background-color: var(--lightGrey);
    }
  }

  .options-drop-down {
    background-color: var(--white);
    position: absolute;
    left: -400%;
    width: 10rem;
    height: 2rem;
    z-index: 99;
    border: 1px solid var(--xxLightGrey);
    box-shadow: 0px 0px 5px #00000055;

    &:hover {
      border: 1px solid var(--errorLight);
    }

    * {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
    }

    svg {
      margin-left: -0.8rem;
    }
  }
`

export default function Options({ destroy }) {
  const [dropDownOpen, setDropDownOpen] = useState(false)

  const handleDelete = async () => {
    await destroy()
  }

  useEffect(() => {
    const closeDropDown = () => {
      setDropDownOpen(false)
    }

    if (dropDownOpen) window.addEventListener('click', closeDropDown)

    return () => window.removeEventListener('click', closeDropDown)
  }, [dropDownOpen])

  return (
    <Container onClick={(e) => e.stopPropagation()}>
      <div
        onClick={() => setDropDownOpen((prev) => !prev)}
        className="options-icon-container"
      >
        <BsThreeDots />
      </div>
      {dropDownOpen && (
        <div onClick={handleDelete} className="options-drop-down">
          <SettingsButton isDelete={true}>
            <BiTrash /> Delete
          </SettingsButton>
        </div>
      )}
    </Container>
  )
}

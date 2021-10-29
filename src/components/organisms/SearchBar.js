import styled from 'styled-components'
import { IoSearchOutline } from 'react-icons/io5'
import { useEffect, useRef, useState } from 'react'
import { useHistory } from 'react-router'
import * as ROUTES from '../../constants/routes'

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  background-color: var(--xLightGrey);
  border: 1px solid var(--xLightGrey);
  padding: 0.8rem 1rem;
  border-radius: 30px;
  transition: 100ms ease;
  box-sizing: border-box;
  cursor: text;

  @media (max-width: 450px) {
    width: 83%;
    padding: 0.5rem 0.5rem;
  }

  &:focus-within {
    background-color: transparent;
    border: 1px solid var(--primary);

    svg {
      color: var(--primary);
    }
  }

  svg {
    color: var(--darkGrey);
    width: 20px;
    height: 20px;
  }
`

const Input = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  padding: 0 0.3rem;
  font-size: 14px;

  &::placeholder {
    font-family: 'Ubuntu', sans-serif;
    font-weight: 500;
  }
`

export default function SearchBar({ searchTerm, setSearchTerm, noRedirect }) {
  const [searchValue, setSearchValue] = useState('')
  const inputRef = useRef(null)
  const history = useHistory()

  const handleSearch = () => {
    setSearchTerm(searchValue)
    if (!noRedirect) history.push(ROUTES.SEARCH)
  }

  useEffect(() => {
    if (searchTerm) setSearchValue(searchTerm)
  }, [searchTerm])

  return (
    <Container onClick={() => inputRef.current.focus()}>
      <IoSearchOutline />

      <Input
        aria-label="Search a user by his username"
        ref={inputRef}
        type="text"
        maxLength="50"
        value={searchValue}
        onChange={({ target: { value } }) =>
          setSearchValue(value.toLowerCase())
        }
        placeholder="Search an username"
        onKeyDown={(e) => {
          if ((e.code === 'Enter' || e.which === 13) && searchValue) {
            handleSearch()
          }
        }}
      />
    </Container>
  )
}

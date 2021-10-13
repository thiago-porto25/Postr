import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { SearchBar, SearchResult } from '.'
import { ProfileNav } from '../molecules'
import { ReturnArrow } from '../atoms'

import * as ROUTES from '../../constants/routes'

const Container = styled.div`
  .search-page-header {
    .search-bar-container {
      display: flex;
      align-items: center;
      gap: 1rem;
      box-sizing: border-box;
      padding: 0.4rem 1rem;

      .search-header-arrow {
        border-radius: 50%;
        transition: 150ms ease;
        padding: 0.2rem;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        color: var(--black);
        width: 35px;
        height: 30px;

        svg {
          height: 30px;
          width: 30px;
        }

        &:hover {
          background-color: var(--xLightGrey);
        }
      }
    }
  }
`

export default function SearchOrg({ searchTerm, setSearchTerm, user }) {
  const [result, setResult] = useState()

  useEffect(() => {
    return () => setSearchTerm('')
  }, [setSearchTerm])

  return (
    <Container>
      <div className="search-page-header">
        <div className="search-bar-container">
          <ReturnArrow to={ROUTES.HOME} className="search-header-arrow" />

          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            noRedirect={true}
          />
        </div>
        <ProfileNav first="People" isSingle={true} />
      </div>
      <div className="search-page-results">
        <SearchResult
          user={user}
          searchTerm={searchTerm}
          result={result}
          setResult={setResult}
        />
      </div>
    </Container>
  )
}

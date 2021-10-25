import { useEffect } from 'react'
import styled from 'styled-components'

import { FollowUserCard } from '../molecules'

import { getSearchResult } from '../../services/firebase'

const Container = styled.div`
  .search-message {
    color: var(--darkGrey);
    font-size: 20px;
    text-align: center;
    padding-top: 2rem;
  }
`

export default function SearchResult({ searchTerm, result, setResult, user }) {
  useEffect(() => {
    const receiveResult = async () => {
      const response = await getSearchResult(searchTerm)
      setResult(response)
    }

    if (searchTerm) receiveResult()
  }, [searchTerm, setResult])

  return (
    <Container>
      {result && result[0] ? (
        result.map((item) => (
          <FollowUserCard key={item.id} suggestedUser={item} user={user} />
        ))
      ) : result === undefined ? (
        <div className="search-message">
          <p>Search for an username!</p>
        </div>
      ) : (
        <div className="search-message">
          <p>There were no results for you search!</p>
        </div>
      )}
    </Container>
  )
}

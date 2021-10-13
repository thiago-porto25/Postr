import { useContext } from 'react'
import SearchContext from '../../context/searchContext'
import styled from 'styled-components'

import { SearchBar } from '.'
import { Suggested } from '../molecules'

const Container = styled.section`
  display: flex;
  gap: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;

  .rightbar-search-container,
  .rightbar-suggested-container,
  .rightbar-filter-container {
    width: 80%;
  }
`

export default function RightBar({
  showSearchBar,
  showSuggestion,
  setProfileUser,
  profileUser,
}) {
  const { searchTerm, setSearchTerm } = useContext(SearchContext)

  return (
    <Container>
      {showSearchBar && (
        <div className="rightbar-search-container">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </div>
      )}

      {showSuggestion && (
        <div className="rightbar-suggested-container">
          <Suggested
            setProfileUser={setProfileUser}
            profileUser={profileUser}
          />
        </div>
      )}
    </Container>
  )
}

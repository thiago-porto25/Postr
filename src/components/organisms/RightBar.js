import styled from 'styled-components'
import { Suggested, SearchFilters } from '../molecules'
import { SearchBar } from '.'

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
  showFilter,
}) {
  return (
    <Container>
      {showSearchBar && (
        <div className="rightbar-search-container">
          <SearchBar />
        </div>
      )}

      {showFilter && (
        <div className="rightbar-filter-container">
          <SearchFilters />
        </div>
      )}

      {showSuggestion && (
        <div className="rightbar-suggested-container">
          <Suggested />
        </div>
      )}
    </Container>
  )
}

import styled from 'styled-components'
import { Suggested } from '../molecules'
import { SearchBar } from '.'

const Container = styled.section`
  display: flex;
  gap: 2rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;

  .rightbar-search-container {
    width: 80%;
  }
  .rightbar-suggested-container {
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

      {showSuggestion && (
        <div className="rightbar-suggested-container">
          <Suggested />
        </div>
      )}
    </Container>
  )
}

import styled from 'styled-components'

const Container = styled.article`
  background-color: var(--xxLightGrey);
  border-radius: 10px;
  font-family: 'Ubuntu', sans-serif;
  padding: 1rem 0;

  .filter-title {
    font-size: 20px;
    margin-top: 0;
    padding: 0 1.5rem;
  }

  .filter-subtitle {
    font-weight: bold;
    padding: 0 1.5rem;
    font-size: 16px;
  }

  .filter-option {
    display: flex;
    justify-content: space-between;
    margin: 0 1.5rem;
    font-size: 14px;
  }
`

export default function SearchFilters({ type }) {
  const handleRadio = (e) => {
    console.log(e.target.value)
  }

  return (
    <Container>
      <h2 className="filter-title">Search Filters</h2>

      <p className="filter-subtitle">People</p>

      <div onChange={handleRadio}>
        <div className="filter-option">
          <label>Anyone</label>
          <input
            name="people"
            value="anyone"
            defaultChecked={true}
            type="radio"
          />
        </div>

        <br />

        <div className="filter-option">
          <label>People you follow</label>
          <input name="people" value="follow" type="radio" />
        </div>
      </div>

      <p className="filter-subtitle">Order by</p>

      {type === 'post' ? (
        <div onChange={handleRadio}>
          <div className="filter-option">
            <label>Most liked</label>
            <input
              name="liked"
              value="most"
              defaultChecked={true}
              type="radio"
            />
          </div>

          <br />

          <div className="filter-option">
            <label>Least liked</label>
            <input name="liked" value="least" type="radio" />
          </div>
        </div>
      ) : (
        <div onChange={handleRadio}>
          <div className="filter-option">
            <label>Most followed</label>
            <input
              name="followed"
              value="most"
              defaultChecked={true}
              type="radio"
            />
          </div>

          <br />

          <div className="filter-option">
            <label>Least followed</label>
            <input name="followed" value="least" type="radio" />
          </div>
        </div>
      )}
    </Container>
  )
}

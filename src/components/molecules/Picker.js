import styled from 'styled-components'

const Container = styled.div`
  label {
    font-weight: bold;
    font-size: 20px;
    padding-left: 2.3rem;
  }

  .all-images-container {
    width: 100%;
    display: grid;
    justify-items: center;
    grid-template-columns: repeat(auto-fit, 90px);
    column-gap: 3rem;
    row-gap: 1rem;
    justify-content: center;
    padding: 1.5rem 1.2rem;
    box-sizing: border-box;
  }

  .picker-image-container {
    cursor: pointer;
    width: 90px;
    height: 90px;
    border: 4px solid var(--lightGrey);
    transition: filter 200ms ease;

    &:hover {
      filter: brightness(85%);
    }

    &.selected {
      border: 4px solid var(--primary);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
`

export default function Picker({ title, imagesData, type, setPicked, picked }) {
  return (
    <Container>
      <label>{title}</label>

      <div className="all-images-container">
        {imagesData.map((item) => (
          <div
            onClick={() => setPicked(item)}
            key={item + new Date()}
            className={`picker-image-container ${
              item === picked ? 'selected' : ''
            }`}
          >
            <img src={`/images/${type}/${item}.jpg`} alt={item} />
          </div>
        ))}
      </div>
    </Container>
  )
}

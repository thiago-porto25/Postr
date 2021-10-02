import styled from 'styled-components'
import { BsArrowLeftShort } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Container = styled.header`
  border-bottom: 1px solid var(--xLightGrey);
  width: 100%;
  box-sizing: border-box;
  padding: 0.5rem 1rem;
  height: 3.3rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  h1 {
    margin: 0;
    font-size: 20px;
  }

  .header-arrow-container {
    border-radius: 50%;
    transition: 150ms ease;
    padding: 0.2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: var(--black);

    svg {
      height: 30px;
      width: 30px;
    }

    &:hover {
      background-color: var(--xLightGrey);
    }
  }
`

export default function SimpleHeader({
  withArrow,
  arrowLink,
  withPosts,
  children,
}) {
  return (
    <Container>
      {withArrow && (
        <Link to={arrowLink} className="header-arrow-container">
          <BsArrowLeftShort />
        </Link>
      )}
      <h1>{children}</h1>
    </Container>
  )
}

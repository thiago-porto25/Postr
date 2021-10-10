import styled from 'styled-components'
import { Spinner } from './'

const Button = styled.button`
  font-family: 'Roboto', sans-serif;
  padding: 5px 10px;
  border-radius: 30px;
  width: 100%;
  border: 1px solid var(--primary);
  font-weight: bold;
  transition: 150ms ease;
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    user-select: none;
    pointer-events: none;
  }

  &.regular-blue {
    background-color: var(--primary);
    color: var(--white);
    border: 1px solid var(--primary);

    &:hover {
      background-color: var(--primaryLight);
    }
  }

  &.regular-black {
    background-color: var(--black);
    color: var(--white);
    border: 1px solid var(--black);

    &:hover {
      background-color: var(--xDarkGrey);
    }
  }

  &.regular-white {
    background-color: var(--white);
    color: var(--primary);
    border: 1px solid var(--primary);

    &:hover {
      background-color: var(--xLightGrey);
    }
  }

  &.regular-white-grey {
    background-color: var(--white);
    color: var(--black);
    border: 1px solid var(--lightGrey);

    &:hover {
      background-color: var(--xLightGrey);
    }
  }

  .spinner-container {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
  }
`

export default function RegularButton({ children, color, isLoading, ...rest }) {
  return (
    <Button {...rest} className={`regular-${color} `}>
      {isLoading ? (
        <div className="spinner-container">
          <Spinner />
        </div>
      ) : (
        children
      )}
    </Button>
  )
}

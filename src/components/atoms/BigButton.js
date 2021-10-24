import styled from 'styled-components'
import { Spinner } from './'
import { RiAddBoxFill } from 'react-icons/ri'

const Button = styled.button`
  font-family: 'Roboto', sans-serif;
  padding: 10px 25px;
  border-radius: 40px;
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

  &.btn-blue {
    background-color: var(--primary);
    color: var(--white);
    border: 1px solid var(--primary);

    &:hover {
      background-color: var(--primaryLight);
    }
  }

  &.btn-black {
    background-color: var(--black);
    color: var(--white);
    border: 1px solid var(--black);

    &:hover {
      background-color: var(--xDarkGrey);
    }
  }

  &.btn-white {
    background-color: var(--white);
    color: var(--primary);
    border: 1px solid var(--primary);

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

  .post {
    display: none;
  }
`

export default function BigButton({ children, color, isLoading, ...rest }) {
  return (
    <Button {...rest} className={`btn-${color}`}>
      {isLoading ? (
        <div className="spinner-container">
          <Spinner />
        </div>
      ) : (
        <>
          <div className="post">
            <RiAddBoxFill />
          </div>
          <span>{children}</span>
        </>
      )}
    </Button>
  )
}

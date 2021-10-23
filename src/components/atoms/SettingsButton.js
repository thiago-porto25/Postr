import styled from 'styled-components'
import { Spinner } from '.'

const Button = styled.button`
  cursor: pointer;
  transition: 150ms ease;
  background-color: var(--white);
  border: none;
  width: 100%;
  height: 100%;
  color: var(--primary);

  &:hover {
    background-color: var(--xLightGrey);
  }

  &:disabled {
    background-color: var(--errorLight);
    pointer-events: none;
  }

  &.delete-account {
    color: var(--error);

    &:hover {
      background-color: var(--errorLight);
    }
  }

  .spinner-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    * {
      width: 28px;
      height: 28px;
      border-top: 4px solid var(--errorLight);
      border-right: 4px solid var(--errorLight);
      border-bottom: 4px solid var(--errorLight);
      border-left: 4px solid var(--error);
    }
  }
`

export default function SettingsButton({ isDelete, isLoading, children }) {
  return (
    <Button disabled={isLoading} className={isDelete && 'delete-account'}>
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

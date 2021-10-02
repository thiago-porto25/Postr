import styled from 'styled-components'

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

  &.delete-account {
    color: var(--error);

    &:hover {
      background-color: var(--errorLight);
    }
  }
`

export default function SettingsButton({ isDelete, children }) {
  return <Button className={isDelete && 'delete-account'}>{children}</Button>
}

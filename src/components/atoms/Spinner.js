import styled from 'styled-components'

const Loader = styled.div`
  background: transparent;
  width: 14px;
  height: 14px;
  border-top: 2px solid rgba(255, 255, 255, 0.3);
  border-right: 2px solid rgba(255, 255, 255, 0.3);
  border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  border-left: 2px solid #fff;
  border-radius: 50%;
  animation: spin 1s ease infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`
export default function Spinner() {
  return <Loader></Loader>
}

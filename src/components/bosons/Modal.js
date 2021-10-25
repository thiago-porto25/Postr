import styled from 'styled-components'

const ModalBackground = styled.div`
  width: 100%;
  height: 100%;
  background-color: #00000044;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  z-index: 99;

  .modal-post-box-container {
    margin-top: 2rem;
    background-color: var(--white);
    height: fit-content;
    max-width: 600px;
    width: 90%;
    border-radius: 20px;

    textarea {
      min-height: 96px;
    }

    .emoji-mart {
      bottom: -210% !important;

      @media (max-width: 600px) {
        bottom: -212% !important;
        left: 0% !important;
      }
    }

    .modal-post-box-header {
      height: 3rem;
      border-bottom: 1px solid var(--xLightGrey);
      color: var(--xDarkGrey);
      display: flex;
      align-items: center;
      padding: 0 0.8rem;

      .modal-close-post-box {
        padding: 0.2rem 0.3rem;
        transition: 150ms ease;
        border-radius: 50%;
        cursor: pointer;

        &:hover {
          background-color: var(--xLightGrey);
        }
      }

      svg {
        font-size: 23px;
      }
    }
  }
`
export default function Modal({ children, ...rest }) {
  return <ModalBackground {...rest}>{children}</ModalBackground>
}

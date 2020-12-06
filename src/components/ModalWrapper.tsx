import React from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import { theme } from "../components/Theme";
import { ActiveModalsType, useModal } from "../context/ModalContext";

const ModalUnderlay = styled.div`
  text-align: center;
  padding-top: 2rem;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1040;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
`;

const ModalWrapperWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1050;
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  outline: 0;
`;

const ModalDivWrapper = styled.div`
  z-index: 100;
  background-color: ${theme.colors.white};
  position: relative;
  margin: 1.75rem auto;
  border-radius: 3px;
  max-width: 600px;
  padding: 2rem;
  opacity: 1;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ModalCloseButton = styled.button`
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 1;
  color: #000;
  opacity: 0.3;
  cursor: pointer;
  border: none;
`;

type ModalType = {
  children: any;
  modalId: ActiveModalsType;
};

const ModalWrapper: React.FC<ModalType> = ({ children, modalId }) => {
  const { setActiveModal, activeModal } = useModal();

  return activeModal === modalId
    ? ReactDOM.createPortal(
        <React.Fragment>
          <ModalUnderlay>
            <ModalOverlay>
              <ModalWrapperWrapper
                aria-modal
                aria-hidden
                tabIndex={-1}
                role="dialog"
              >
                <ModalDivWrapper>
                  <ModalHeader>
                    <ModalCloseButton
                      type="button"
                      className="modal-close-button"
                      data-dismiss="modal"
                      aria-label="Close"
                      onClick={() => setActiveModal("")}
                    >
                      <span aria-hidden="true">&times;</span>
                    </ModalCloseButton>
                  </ModalHeader>
                  {children}
                </ModalDivWrapper>
              </ModalWrapperWrapper>
            </ModalOverlay>
          </ModalUnderlay>
        </React.Fragment>,
        document.body
      )
    : null;
};

export default ModalWrapper;

import { cloneElement, createContext, useContext, useState } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { HiXMark } from 'react-icons/hi2';
import { useOutsideClick } from '@/hooks/useOutsideClick';

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

Modal.propTypes = {
  children: PropTypes.any,
};
function Modal({ children }) {
  const [openName, setOpenName] = useState('');

  const open = setOpenName;
  const close = () => setOpenName('');

  return (
    <ModalContext.Provider value={{ openName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

Open.propTypes = {
  opensWindowName: PropTypes.string,
  children: PropTypes.any,
};
function Open({ opensWindowName, children }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => open(opensWindowName) });
}

Window.propTypes = {
  name: PropTypes.string,
  children: PropTypes.any,
};
function Window({ name, children }) {
  const { openName, close } = useContext(ModalContext);

  const ref = useOutsideClick(close);

  if (name !== openName) return null;
  // createPortal => Modal still lives as a child of component that it was initialized from, but is rendered directly in the body in DOM structure
  // This solves most potential CSS problems (specifically overflow: hidden) which can happen with reusability
  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <HiXMark />
        </Button>
        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}
Modal.Open = Open;
Modal.Window = Window;

export default Modal;

import styled from 'styled-components';

interface ModalContentProps {
  type?: string;
  name?: string;
  value?: string;
  className?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
}

interface ModalHeaderButton {
  $purple?: boolean;
  $header?: boolean;
}

interface ModalButtonProps {
  className?: string;
  $purple?: boolean;
}

export const ModalOverlay = styled.div`
  position: fixed;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background-color: #000;

  z-index: 1;
  opacity: 0.4;
`;
export const ModalContentBlock = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 45rem;
  padding: 4rem 5rem;
  border-radius: 1rem;

  background-color: #ffffff;

  z-index: 3;

  @media (max-width: 376px) {
    width: 300px;
    padding: 30px 40px;
  }
`;
export const ModalTitle = styled.h3`
  display: block;
  font-size: 2rem;
  font-weight: bold;

  color: #424242;
`;
export const ModalSubTitle = styled.p`
  margin-bottom: 0.8rem;

  color: #616161;

  font-size: 1.3rem;
  font-weight: bold;
`;
export const ModalContentInput = styled.input<ModalContentProps>`
  width: 100%;
  padding: 1rem 1.5rem;
  border: 1px solid #d9d9d9;
  border-radius: 0.4rem;
  margin-bottom: 2.2rem;

  background-color: #fefefe;
  color: #424242;

  font-size: 1.4rem;

  &:focus {
    outline: none;
  }
`;
export const ModalContentTextarea = styled.textarea<ModalContentProps>`
  width: 100%;
  height: 10rem;
  padding: 1rem 1.5rem;
  border: 1px solid #d9d9d9;
  border-radius: 0.4rem;
  margin-bottom: 2.2rem;

  background-color: #fefefe;
  color: #424242;

  font-size: 1.4rem;

  &:focus {
    outline: none;
  }

  @media (max-width: 376px) {
    margin-bottom: 16px;
  }
`;
export const ModalContentP = styled.p`
  width: 100%;
  padding: 1rem 1.5rem;
  border: 1px solid #d9d9d9;
  border-radius: 0.4rem;
  margin-bottom: 3rem;

  background-color: #fefefe;
  color: #424242;

  font-size: 1.4rem;
`;
export const ModalButtonBlock = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 1.5rem;
  padding-top: 2rem;
`;
export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 5rem;
`;
export const ModalHeaderButton = styled.button<ModalHeaderButton>`
  padding: 0.6rem 1rem;
  border: none;
  border-radius: 4px;

  background-color: #5c469c;
  color: #fff;

  font-size: 1.2rem;
  font-weight: bold;
`;
export const ModalButton = styled.button<ModalButtonProps>`
  padding: 1rem 2rem;
  border: ${(props) => (props.$purple ? 'none' : '1px solid #d9d9d9')};
  border-radius: 4px;

  background-color: ${(props) => (props.$purple ? '#7353ea' : 'white')};
  color: ${(props) => (props.$purple ? '#fff' : '#616161')};

  font-size: 1.5rem;
  font-weight: bold;
`;

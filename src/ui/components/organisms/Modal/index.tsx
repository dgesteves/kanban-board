import { Dispatch, ReactNode, SetStateAction, useRef } from 'react';
import useOnClickOutside from '../../../../hooks/useOnClickOutside';
import {
  StyledModal,
  StyledModalHeader,
  StyledModalOverlay,
  StyledModalTitle,
} from './styles';
import Button from '../../atoms/Button';
import { CloseIcon } from '../../../icons/CloseIcon';

export default function Modal({
  children,
  setIsModalOpen,
  title,
}: {
  children: ReactNode | undefined;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
}) {
  const ref = useRef(null);

  useOnClickOutside(ref, () => setIsModalOpen(false));

  return (
    <StyledModalOverlay>
      <StyledModal ref={ref}>
        <StyledModalHeader>
          <StyledModalTitle>{title}</StyledModalTitle>
          <Button
            onClick={() => setIsModalOpen(false)}
            size="medium"
            variant="icon"
          >
            <CloseIcon size={16} />
          </Button>
        </StyledModalHeader>
        {children}
      </StyledModal>
    </StyledModalOverlay>
  );
}

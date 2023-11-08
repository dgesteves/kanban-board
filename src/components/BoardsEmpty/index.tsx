import { StyledCircle, StyledEmptyState, StyledEmptyStateText } from './styles';
import Button from '../../ui/components/atoms/Button';
import { Dispatch, SetStateAction } from 'react';

export default function BoardsEmpty({
  setIsModalOpen,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <StyledCircle>
        <StyledCircle>
          <StyledCircle />
          <StyledCircle />
        </StyledCircle>
      </StyledCircle>
      <StyledEmptyState>
        <StyledEmptyStateText>
          Looks like you don't have any kanban boards created currently, stat by
          creating a new board.
        </StyledEmptyStateText>
        <Button
          dataCy="create-board-button-empty-state"
          onClick={() => setIsModalOpen(true)}
          variant="secondary"
        >
          Create New Board
        </Button>
      </StyledEmptyState>
    </>
  );
}

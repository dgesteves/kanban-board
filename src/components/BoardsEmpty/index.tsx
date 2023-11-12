import { StyledCircle, StyledEmptyState, StyledEmptyStateText } from './styles';
import Button from '../../ui/components/atoms/Button';
import { Dispatch, SetStateAction, useCallback } from 'react';

export default function BoardsEmpty({
  setIsModalOpen,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const handleClick = useCallback(() => {
    setIsModalOpen(true);
  }, [setIsModalOpen]);

  return (
    <>
      <StyledCircle>
        <StyledCircle>
          <StyledCircle />
          <StyledCircle />
        </StyledCircle>
      </StyledCircle>
      <StyledEmptyState>
        <StyledEmptyStateText data-cy="empty-boards-text">
          Looks like you don't have any kanban boards created currently, start
          by creating a new board.
        </StyledEmptyStateText>
        <Button
          dataCy="create-board-button-empty-state"
          onClick={handleClick}
          variant="secondary"
        >
          Create New Board
        </Button>
      </StyledEmptyState>
    </>
  );
}

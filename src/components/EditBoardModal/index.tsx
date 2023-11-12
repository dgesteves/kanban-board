import Modal from '../../ui/components/organisms/Modal';
import {
  ChangeEvent,
  KeyboardEvent,
  Dispatch,
  SetStateAction,
  useState,
  useCallback,
} from 'react';
import { StyledContentWrap, StyledLabel, StyledModalActions } from './styles';
import Button from '../../ui/components/atoms/Button';
import Input from '../../ui/components/atoms/Input';
import { updateBoard } from '../../services/board';
import { IBoard } from '../../types';

function EditBoardModal({
  setIsModalOpen,
  board,
  setBoards,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  board: IBoard;
  setBoards: Dispatch<SetStateAction<IBoard[]>>;
}) {
  const [boardTitle, setBoardTitle] = useState<string>(board.title);

  const handleEditClick = useCallback(() => {
    if (boardTitle.trim() === '') {
      return;
    }

    updateBoard({ ...board, title: boardTitle })
      .then((res) => {
        setBoards((prev) =>
          prev.map((board) => (board.id === res.id ? res : board))
        );
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error('Error updating board:', error);
      });
  }, [board, boardTitle, setBoards, setIsModalOpen]);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setBoardTitle(e.target.value);
    },
    [setBoardTitle]
  );

  const handleInputKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      e.key === 'Enter' && handleEditClick();
    },
    [handleEditClick]
  );

  const handleCancelClick = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  return (
    <Modal setIsModalOpen={setIsModalOpen} title="Rename Board">
      <StyledContentWrap>
        <StyledLabel>Board Title</StyledLabel>
        <Input
          value={boardTitle}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          type="text"
          placeholder={'Rename Board...'}
        />
      </StyledContentWrap>
      <StyledModalActions>
        <Button onClick={handleCancelClick} variant="secondary">
          Cancel
        </Button>
        <Button onClick={handleEditClick}>Save</Button>
      </StyledModalActions>
    </Modal>
  );
}

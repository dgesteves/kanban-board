import Modal from '../../ui/components/organisms/Modal';
import {
  ChangeEvent,
  KeyboardEvent,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import { StyledContentWrap, StyledLabel, StyledModalActions } from './styles';
import Button from '../../ui/components/atoms/Button';
import Input from '../../ui/components/atoms/Input';
import { updateBoard } from '../../services/board';
import { IBoard } from '../../types';

export default function EditBoardModal({
  setIsModalOpen,
  board,
  setBoards,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  board: IBoard;
  setBoards: Dispatch<SetStateAction<IBoard[]>>;
}) {
  const [boardTitle, setBoardTitle] = useState<string>('');

  const onEdit = () => {
    if (boardTitle === '') {
      return;
    }

    updateBoard({ ...board, title: boardTitle }).then((res) => {
      setBoards((prev) =>
        prev.map((board) => (board.id === res.id ? res : board))
      );
      setIsModalOpen(false);
    });
  };

  return (
    <Modal setIsModalOpen={setIsModalOpen} title="Rename Board">
      <StyledContentWrap>
        <StyledLabel>Board Title</StyledLabel>
        <Input
          value={boardTitle}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setBoardTitle(e.target.value)
          }
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
            e.key === 'Enter' && onEdit()
          }
          type="text"
          placeholder={'Rename Board...'}
        />
      </StyledContentWrap>
      <StyledModalActions>
        <Button onClick={() => setIsModalOpen(false)} variant="secondary">
          Cancel
        </Button>
        <Button onClick={onEdit}>Save</Button>
      </StyledModalActions>
    </Modal>
  );
}

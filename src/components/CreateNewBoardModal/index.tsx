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
import { createBoard } from '../../services/board';
import { IBoard, IColumn } from '../../types';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

export default function CreateNewBoardModal({
  setIsModalOpen,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const [boardTitle, setBoardTitle] = useState<string>('');

  const defaultColumns: IColumn[] = [
    {
      id: uuid(),
      title: 'To Do',
      color: 'systemPurple',
      cards: [],
    },
    {
      id: uuid(),
      title: 'In Progress',
      color: 'systemGray',
      cards: [],
    },
    {
      id: uuid(),
      title: 'Done',
      color: 'systemGreen',
      cards: [],
    },
  ];

  const onCreate = () => {
    if (boardTitle === '') {
      return;
    }

    const board: IBoard = {
      title: boardTitle,
      columns: defaultColumns,
    };

    createBoard(board).then((res) => {
      setIsModalOpen(false);
      navigate(`/board/${res.id}`);
    });
  };

  return (
    <Modal setIsModalOpen={setIsModalOpen} title="Create New Board">
      <StyledContentWrap>
        <StyledLabel>Board Title</StyledLabel>
        <Input
          value={boardTitle}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setBoardTitle(e.target.value)
          }
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
            e.key === 'Enter' && onCreate()
          }
          type="text"
          placeholder={'Give your board a unique name...'}
        />
      </StyledContentWrap>
      <StyledModalActions>
        <Button onClick={() => setIsModalOpen(false)} variant="secondary">
          Cancel
        </Button>
        <Button onClick={onCreate}>Create</Button>
      </StyledModalActions>
    </Modal>
  );
}

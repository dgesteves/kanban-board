import Modal from '../../ui/components/organisms/Modal';
import {
  ChangeEvent,
  KeyboardEvent,
  Dispatch,
  SetStateAction,
  useState,
  useMemo,
  useCallback,
} from 'react';
import { StyledContentWrap, StyledLabel, StyledModalActions } from './styles';
import Button from '../../ui/components/atoms/Button';
import Input from '../../ui/components/atoms/Input';
import { createBoard } from '../../services/board';
import { IBoard, IColumn } from '../../types';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

function CreateNewBoardModal({
  setIsModalOpen,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const [boardTitle, setBoardTitle] = useState<string>('');

  const defaultColumns: IColumn[] = useMemo(
    () => [
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
    ],
    []
  );

  const handleCreateClick = useCallback(() => {
    if (boardTitle.trim() === '') {
      return;
    }

    const board: IBoard = {
      title: boardTitle,
      columns: defaultColumns,
    };

    createBoard(board)
      .then((res) => {
        setIsModalOpen(false);
        navigate(`/board/${res.id}`);
      })
      .catch((error) => {
        console.error('Error creating board:', error);
      });
  }, [boardTitle, defaultColumns, navigate, setIsModalOpen]);

  const handleInputChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setBoardTitle(e.target.value);
    },
    [setBoardTitle]
  );

  const handleInputKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      e.key === 'Enter' && handleCreateClick();
    },
    [handleCreateClick]
  );

  const handleCancelClick = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  return (
    <Modal setIsModalOpen={setIsModalOpen} title="Create New Board">
      <StyledContentWrap>
        <StyledLabel>Board Title</StyledLabel>
        <Input
          value={boardTitle}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          type="text"
          placeholder={'Give your board a unique name...'}
        />
      </StyledContentWrap>
      <StyledModalActions>
        <Button onClick={handleCancelClick} variant="secondary">
          Cancel
        </Button>
        <Button
          dataCy="create-board-modal-create-button"
          onClick={handleCreateClick}
        >
          Create
        </Button>
      </StyledModalActions>
    </Modal>
  );
}

import Modal from '../../ui/components/organisms/Modal';
import {
  ChangeEvent,
  KeyboardEvent,
  Dispatch,
  SetStateAction,
  useState,
  useCallback,
  useMemo,
} from 'react';
import { StyledContentWrap, StyledLabel, StyledModalActions } from './styles';
import Button from '../../ui/components/atoms/Button';
import Input from '../../ui/components/atoms/Input';
import { createBoard, updateBoard } from '../../services/board';
import { IBoard, IColumn } from '../../types';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_COLUMNS } from '../../constants/columns';

export default function BoardModal({
  setIsModalOpen,
  board,
  setBoards,
  mode,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  board?: IBoard;
  setBoards: Dispatch<SetStateAction<IBoard[]>>;
  mode: 'create' | 'edit';
}) {
  const navigate = useNavigate();
  const [boardTitle, setBoardTitle] = useState<string>(board?.title || '');

  const columns: IColumn[] = useMemo(
    () => (mode === 'create' ? DEFAULT_COLUMNS : board?.columns || []),
    [mode, board]
  );

  const handleAction = useCallback(() => {
    if (boardTitle.trim() === '') {
      return;
    }

    const boardAction = mode === 'edit' ? updateBoard : createBoard;
    const newBoard: IBoard = {
      title: boardTitle,
      columns,
    };

    boardAction(newBoard)
      .then((res) => {
        setBoards((prev) =>
          mode === 'edit'
            ? prev.map((b) => (b.id === res.id ? res : b))
            : [...prev, res]
        );
        setIsModalOpen(false);
        navigate(`/board/${res.id}`);
      })
      .catch((error) => {
        console.error(`Error ${mode}ing board:`, error);
      });
  }, [boardTitle, mode, columns, setBoards, setIsModalOpen, navigate]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setBoardTitle(e.target.value);
  }, []);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      e.key === 'Enter' && handleAction();
    },
    [handleAction]
  );

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  return (
    <Modal
      setIsModalOpen={setIsModalOpen}
      title={mode === 'create' ? 'Create Board' : 'Edit Board'}
    >
      <StyledContentWrap>
        <StyledLabel>Board Title</StyledLabel>
        <Input
          value={boardTitle}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder={`Enter a title for this board...`}
        />
      </StyledContentWrap>
      <StyledModalActions>
        <Button onClick={handleCancel} variant="secondary">
          Cancel
        </Button>
        <Button onClick={handleAction}>
          {mode === 'create' ? 'Create' : 'Save'}
        </Button>
      </StyledModalActions>
    </Modal>
  );
}

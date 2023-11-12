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
  setBoards?: Dispatch<SetStateAction<IBoard[]>>;
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

    const newBoard: IBoard = board
      ? { ...board, title: boardTitle }
      : {
          title: boardTitle,
          columns,
        };

    const boardAction = mode === 'edit' ? updateBoard : createBoard;

    boardAction(newBoard)
      .then((res) => {
        if (mode === 'edit' && setBoards) {
          setBoards((prev) => prev.map((b) => (b.id === res.id ? res : b)));
        }
        setIsModalOpen(false);
        if (mode === 'create') {
          navigate(`/board/${res.id}`);
        }
      })
      .catch((error) =>
        console.error(
          `Error ${mode === 'edit' ? 'updating' : 'creating'} board: ${error}`
        )
      );
  }, [boardTitle, columns, mode, board, setBoards, setIsModalOpen, navigate]);

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
        <Button
          dataCy={
            mode === 'create'
              ? 'create-board-button-modal'
              : 'save-board-button-modal'
          }
          onClick={handleAction}
        >
          {mode === 'create' ? 'Create' : 'Save'}
        </Button>
      </StyledModalActions>
    </Modal>
  );
}

import Modal from '../../ui/components/organisms/Modal';
import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import {
  StyledColorPicker,
  StyledContentWrap,
  StyledLabel,
  StyledModalActions,
} from './styles';
import Button from '../../ui/components/atoms/Button';
import Input from '../../ui/components/atoms/Input';
import { Color, IBoard, IColumn } from '../../types';
import Checkbox from '../../ui/components/atoms/Checkbox';
import { createColumn, updateColumn } from '../../services/column';
import { COLORS, DEFAULT_COLOR } from '../../constants/colors';

export default function ColumnModal({
  setIsModalOpen,
  board,
  setBoard,
  column,
  mode,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  board: IBoard;
  setBoard: Dispatch<SetStateAction<IBoard>>;
  column?: IColumn;
  mode: 'create' | 'edit';
}) {
  const [modalColumn, setModalColumn] = useState<IColumn>(
    column || {
      title: '',
      color: DEFAULT_COLOR,
      cards: [],
    }
  );
  const [color, setColor] = useState<Color>(
    (column?.color as Color) || DEFAULT_COLOR
  );

  const handleAction = useCallback(() => {
    if (modalColumn.title.trim() === '') {
      return;
    }

    const newColumn: IColumn = {
      ...modalColumn,
      color,
    };

    const columnAction = mode === 'edit' ? updateColumn : createColumn;

    columnAction(board.id || '', newColumn)
      .then((res) => {
        setBoard((prev) => ({
          ...prev,
          columns:
            mode === 'edit'
              ? prev.columns.map((col) => (col.id === res.id ? res : col))
              : [...prev.columns, res],
        }));
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error(`Failed to ${mode} column:`, error);
      });
  }, [board.id, modalColumn, setBoard, setIsModalOpen, mode, color]);

  const handleCancelClick = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleAction();
      }
    },
    [handleAction]
  );

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setModalColumn((prev) => ({ ...prev, title: e.target.value }));
  }, []);

  return (
    <Modal
      setIsModalOpen={setIsModalOpen}
      title={mode === 'edit' ? 'Edit Column' : 'Create Column'}
    >
      <StyledContentWrap>
        <StyledLabel>Column Title</StyledLabel>
        <Input
          value={modalColumn.title}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder={'Enter a title for this column...'}
        />
        <StyledLabel>Column Color</StyledLabel>
        <StyledColorPicker>
          {COLORS.map((c) => (
            <Checkbox
              key={c}
              onClick={() => setColor(c)}
              color={c}
              checked={color === c}
            />
          ))}
        </StyledColorPicker>
      </StyledContentWrap>
      <StyledModalActions>
        <Button onClick={handleCancelClick} variant="secondary">
          Cancel
        </Button>
        <Button onClick={handleAction}>
          {mode === 'edit' ? 'Save' : 'Create'}
        </Button>
      </StyledModalActions>
    </Modal>
  );
}

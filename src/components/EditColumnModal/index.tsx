import Modal from '../../ui/components/organisms/Modal';
import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
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
import { updateColumn } from '../../services/column';

export default function EditColumnModal({
  setIsModalOpen,
  board,
  setBoard,
  column,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  board: IBoard;
  setBoard: Dispatch<SetStateAction<IBoard>>;
  column: IColumn;
}) {
  const colors: Color[] = [
    'dataFuchsia',
    'dataTangerine',
    'dataSea',
    'dataLemon',
    'dataEmerald',
    'dataMustard',
    'systemRed',
    'systemGreen',
    'systemGray',
    'systemPurple',
  ];
  const [editColumn, setEditColumn] = useState<IColumn>(column);
  const [color, setColor] = useState<Color>(column.color as Color);
  const onEdit = () => {
    if (column.title === '') {
      return;
    }

    const newColumn: IColumn = {
      ...column,
      title: editColumn.title,
      color,
    };

    updateColumn(board.id || '', newColumn).then((res) => {
      setBoard((prev) => ({
        ...prev,
        columns: prev.columns.map((column) =>
          column.id === res.id ? res : column
        ),
      }));
      setIsModalOpen(false);
    });
  };

  return (
    <Modal setIsModalOpen={setIsModalOpen} title="Edit Column">
      <StyledContentWrap>
        <StyledLabel>Column Title</StyledLabel>
        <Input
          value={editColumn.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEditColumn((prev) => ({ ...prev, title: e.target.value }))
          }
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
            e.key === 'Enter' && onEdit()
          }
          type="text"
          placeholder={'Enter a title for this column...'}
        />
        <StyledLabel>Column Color</StyledLabel>
        <StyledColorPicker>
          {colors.map((c) => (
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
        <Button onClick={() => setIsModalOpen(false)} variant="secondary">
          Cancel
        </Button>
        <Button onClick={onEdit}>Save</Button>
      </StyledModalActions>
    </Modal>
  );
}

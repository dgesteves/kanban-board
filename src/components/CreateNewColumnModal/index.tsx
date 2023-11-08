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
import { createColumn } from '../../services/column';

export default function CreateNewColumnModal({
  setIsModalOpen,
  board,
  setBoard,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  board: IBoard;
  setBoard: Dispatch<SetStateAction<IBoard>>;
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
  const [column, setColumn] = useState<IColumn>({
    title: '',
    color: 'dataTangerine',
    cards: [],
  });
  const [color, setColor] = useState<Color>('dataTangerine');
  const onCreate = () => {
    if (column.title === '') {
      return;
    }

    const newColumn: IColumn = {
      ...column,
      color,
    };

    createColumn(board.id || '', newColumn).then((res) => {
      setBoard((prev) => ({
        ...prev,
        columns: [...prev.columns, res],
      }));
      setIsModalOpen(false);
    });
  };

  return (
    <Modal setIsModalOpen={setIsModalOpen} title="Create New Column">
      <StyledContentWrap>
        <StyledLabel>Column Title</StyledLabel>
        <Input
          value={column.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setColumn((prev) => ({ ...prev, title: e.target.value }))
          }
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
            e.key === 'Enter' && onCreate()
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
        <Button onClick={onCreate}>Create</Button>
      </StyledModalActions>
    </Modal>
  );
}

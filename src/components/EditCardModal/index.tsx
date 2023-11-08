import Modal from '../../ui/components/organisms/Modal';
import { v4 as uuid } from 'uuid';
import {
  ChangeEvent,
  Dispatch,
  KeyboardEvent,
  SetStateAction,
  useState,
} from 'react';
import {
  StyledContentWrap,
  StyledLabel,
  StyledModalActions,
  StyledColorPicker,
  StyledCategoriesInput,
  StyledCategoriesWrap,
} from './styles';
import Button from '../../ui/components/atoms/Button';
import Input from '../../ui/components/atoms/Input';
import { Color, IBoard, ICard, ICategory, IColumn } from '../../types';
import { updateCard } from '../../services/card';
import Checkbox from '../../ui/components/atoms/Checkbox';
import Badge from '../../ui/components/atoms/Badge';
import TextArea from '../../ui/components/atoms/TextArea';

export default function EditCardModal({
  setIsModalOpen,
  board,
  setBoard,
  column,
  card,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  board: IBoard;
  setBoard: Dispatch<SetStateAction<IBoard>>;
  column: IColumn;
  card: ICard;
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
  const [color, setColor] = useState<Color>('dataFuchsia');
  const [EditCard, setEditCard] = useState<ICard>(card);
  const [category, setCategory] = useState<ICategory>({
    title: '',
    color: 'dataFuchsia',
  });

  const onEdit = () => {
    if (EditCard.title === '' || EditCard.description === '') {
      return;
    }

    updateCard(board.id || '', column.id || '', EditCard).then(() => {
      setBoard((prev) => ({
        ...prev,
        columns: prev.columns.map((col) => ({
          ...col,
          cards: col.cards.map((c) => (c.id === EditCard.id ? EditCard : c)),
        })),
      }));
      setIsModalOpen(false);
    });
  };

  const onCategoryCreate = () => {
    if (category.title === '') {
      return;
    }

    const newCategory = {
      ...category,
      id: uuid(),
      color,
    };

    setEditCard((prev) => ({
      ...prev,
      categories: [...(prev.categories || []), newCategory],
    }));
    setCategory((prev) => ({
      ...prev,
      title: '',
      color: '',
    }));
  };

  return (
    <Modal setIsModalOpen={setIsModalOpen} title="Edit Card">
      <StyledContentWrap>
        <StyledLabel>Card Title</StyledLabel>
        <Input
          value={EditCard.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEditCard((prev) => ({ ...prev, title: e.target.value }))
          }
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
            e.key === 'Enter' && onEdit()
          }
          type="text"
          placeholder={'Enter a card title...'}
        />
        <StyledLabel>Card Description</StyledLabel>
        <TextArea
          rows="8"
          value={EditCard.description}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEditCard((prev) => ({ ...prev, description: e.target.value }))
          }
          type="text"
          placeholder={'Enter a card description...'}
        />
        <StyledLabel>Card Categories</StyledLabel>
        <StyledCategoriesInput>
          <Input
            value={category.title}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCategory((prev) => ({ ...prev, title: e.target.value }))
            }
            type="text"
            placeholder={'Add a category...'}
          />
          <Button onClick={onCategoryCreate} variant="tertiary" size="medium">
            Add Category
          </Button>
        </StyledCategoriesInput>
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
        <StyledCategoriesWrap>
          {EditCard?.categories?.map((cat) => (
            <Badge key={cat.id} color={cat.color}>
              {cat.title}
            </Badge>
          ))}
        </StyledCategoriesWrap>
        <StyledLabel>Card Due Date</StyledLabel>
        <Input
          value={EditCard.dueDate}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEditCard((prev) => ({ ...prev, dueDate: e.target.value }))
          }
          type="date"
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

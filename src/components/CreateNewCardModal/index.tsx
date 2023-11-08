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
import { createCard } from '../../services/card';
import Checkbox from '../../ui/components/atoms/Checkbox';
import Badge from '../../ui/components/atoms/Badge';
import TextArea from '../../ui/components/atoms/TextArea';

export default function CreateNewCardModal({
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
  const [color, setColor] = useState<Color>('dataFuchsia');
  const [card, setCard] = useState<ICard>({
    title: '',
    description: '',
    categories: [],
    dueDate: '',
  });
  const [category, setCategory] = useState<ICategory>({
    title: '',
    color: 'dataFuchsia',
  });

  const onCreate = () => {
    if (card.title === '' || card.description === '') {
      return;
    }

    createCard(board.id || '', column.id || '', card).then((res) => {
      setBoard((prev) => ({
        ...prev,
        columns: prev.columns.map((col) => {
          if (col.id === column.id) {
            return {
              ...col,
              cards: [...col.cards, res],
            };
          }
          return col;
        }),
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

    setCard((prev) => ({
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
    <Modal setIsModalOpen={setIsModalOpen} title="Create New Card">
      <StyledContentWrap>
        <StyledLabel>Card Title</StyledLabel>
        <Input
          value={card.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCard((prev) => ({ ...prev, title: e.target.value }))
          }
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
            e.key === 'Enter' && onCreate()
          }
          type="text"
          placeholder={'Enter a card title...'}
        />
        <StyledLabel>Card Description</StyledLabel>
        <TextArea
          rows="8"
          value={card.description}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCard((prev) => ({ ...prev, description: e.target.value }))
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
          {card?.categories?.map((cat) => (
            <Badge key={cat.id} color={cat.color}>
              {cat.title}
            </Badge>
          ))}
        </StyledCategoriesWrap>
        <StyledLabel>Card Due Date</StyledLabel>
        <Input
          value={card.dueDate}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setCard((prev) => ({ ...prev, dueDate: e.target.value }))
          }
          type="date"
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

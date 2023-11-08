import {
  StyledCardsWrap,
  StyledColumn,
  StyledColumnActions,
  StyledColumnColor,
  StyledColumnHeader,
  StyledColumnTitle,
} from './styles';
import Badge from '../../ui/components/atoms/Badge';
import Button from '../../ui/components/atoms/Button';
import { EditIcon } from '../../ui/icons/EditIcon';
import { TrashIcon } from '../../ui/icons/TrashIcon';
import {
  Dispatch,
  MouseEvent,
  SetStateAction,
  useState,
  DragEvent,
} from 'react';
import { IBoard, IColumn } from '../../types';
import { deleteColumn } from '../../services/column';
import EditColumnModal from '../EditColumnModal';
import CreateNewCardModal from '../CreateNewCardModal';
import Card from '../Card';
import { createCard, deleteCard } from '../../services/card';

export default function Column({
  column,
  setBoard,
  board,
}: {
  column: IColumn;
  setBoard: Dispatch<SetStateAction<IBoard>>;
  board: IBoard;
}) {
  const [isHover, setIsHover] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCardModalOpen, setIsCardModalOpen] = useState(false);
  const onEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const onDelete = (e: MouseEvent<HTMLButtonElement>, id: string) => {
    e.stopPropagation();
    deleteColumn(id, board.id || '').then(() => {
      setBoard((prev) => ({
        ...prev,
        columns: prev.columns.filter((column) => column.id !== id),
      }));
    });
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const cardId = e.dataTransfer.getData('cardId');
    const columnId = e.dataTransfer.getData('columnId');

    const card = board.columns
      .flatMap((column) => column.cards)
      .find((card) => card.id === cardId);

    if (columnId === column.id || card === undefined) {
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

      deleteCard(board.id || '', columnId, cardId).then(() => {
        setBoard((prev) => ({
          ...prev,
          columns: prev.columns.map((column) => ({
            ...column,
            cards: column.cards.filter((c) => c.id !== cardId),
          })),
        }));
      });
    });
  };

  return (
    <StyledColumn>
      <StyledColumnHeader
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
      >
        <StyledColumnActions>
          <StyledColumnColor color={column.color} />
          <StyledColumnTitle>{column.title}</StyledColumnTitle>
        </StyledColumnActions>
        <Badge color="systemGray">{column.cards.length}</Badge>
        {isHover && (
          <StyledColumnActions>
            <Button onClick={onEdit} variant="icon" size="medium">
              <EditIcon size={16} />
            </Button>
            <Button
              onClick={(e) => onDelete(e, column.id || '')}
              variant="icon"
              size="medium"
            >
              <TrashIcon size={16} color="#FF344C" />
            </Button>
          </StyledColumnActions>
        )}
      </StyledColumnHeader>
      <StyledCardsWrap onDrop={onDrop} onDragOver={onDragOver}>
        {column.cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            column={column}
            board={board}
            setBoard={setBoard}
          />
        ))}
      </StyledCardsWrap>
      <Button
        onClick={() => setIsCardModalOpen(true)}
        variant="primary"
        size="medium"
        fullWidth
      >
        Create New Card
      </Button>
      {isModalOpen && (
        <EditColumnModal
          setIsModalOpen={setIsModalOpen}
          board={board}
          setBoard={setBoard}
          column={column}
        />
      )}
      {isCardModalOpen && (
        <CreateNewCardModal
          setIsModalOpen={setIsCardModalOpen}
          board={board}
          setBoard={setBoard}
          column={column}
        />
      )}
    </StyledColumn>
  );
}

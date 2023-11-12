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
import Card from '../Card';
import { createCard, deleteCard } from '../../services/card';
import CardModal from '../CardModal';
import ColumnModal from '../ColumnModal';

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

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  const handleEditClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleDeleteClick = async (
    e: MouseEvent<HTMLButtonElement>,
    id: string
  ) => {
    e.stopPropagation();
    try {
      await deleteColumn(id, board.id || '');
      setBoard((prev) => ({
        ...prev,
        columns: prev.columns.filter((column) => column.id !== id),
      }));
    } catch (error) {
      console.error('Error deleting column:', error);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleCreateClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsCardModalOpen(true);
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const cardId = e.dataTransfer.getData('cardId');
    const columnId = e.dataTransfer.getData('columnId');

    const card = board.columns
      .flatMap((column) => column.cards)
      .find((card) => card.id === cardId);

    if (columnId === column.id || card === undefined) {
      return;
    }

    try {
      const res = await createCard(board.id || '', column.id || '', card);
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

      await deleteCard(board.id || '', columnId, cardId);
      setBoard((prev) => ({
        ...prev,
        columns: prev.columns.map((column) => ({
          ...column,
          cards: column.cards.filter((c) => c.id !== cardId),
        })),
      }));
    } catch (error) {
      console.error('Error moving card:', error);
    }
  };

  return (
    <StyledColumn>
      <StyledColumnHeader
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <StyledColumnActions>
          <StyledColumnColor color={column.color} />
          <StyledColumnTitle>{column.title}</StyledColumnTitle>
        </StyledColumnActions>
        <Badge color="systemGray">{column.cards.length}</Badge>
        {isHover && (
          <StyledColumnActions>
            <Button onClick={handleEditClick} variant="icon" size="medium">
              <EditIcon size={16} />
            </Button>
            <Button
              onClick={(e) => handleDeleteClick(e, column.id as string)}
              variant="icon"
              size="medium"
            >
              <TrashIcon size={16} color="#FF344C" />
            </Button>
          </StyledColumnActions>
        )}
      </StyledColumnHeader>
      <StyledCardsWrap
        data-cy="column drop zone"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
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
        onClick={handleCreateClick}
        variant="primary"
        size="medium"
        fullWidth
      >
        Create New Card
      </Button>
      {isModalOpen && (
        <ColumnModal
          setIsModalOpen={setIsModalOpen}
          board={board}
          setBoard={setBoard}
          column={column}
          mode={'edit'}
        />
      )}
      {isCardModalOpen && (
        <CardModal
          setIsModalOpen={setIsCardModalOpen}
          board={board}
          setBoard={setBoard}
          column={column}
          mode={'create'}
        />
      )}
    </StyledColumn>
  );
}

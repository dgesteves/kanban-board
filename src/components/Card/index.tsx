import {
  StyledCard,
  StyledCardCategories,
  StyledCardDescription,
  StyledCardHeader,
  StyledCardTitle,
  StyledDueDate,
  StyledDueDateText,
} from './styles';
import Badge from '../../ui/components/atoms/Badge';
import { IBoard, ICard, IColumn } from '../../types';
import Button from '../../ui/components/atoms/Button';
import { EditIcon } from '../../ui/icons/EditIcon';
import { TrashIcon } from '../../ui/icons/TrashIcon';
import {
  Dispatch,
  DragEvent,
  MouseEvent,
  SetStateAction,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { deleteCard } from '../../services/card';
import CardModal from '../CardModal';

export default function Card({
  card,
  column,
  board,
  setBoard,
}: {
  card: ICard;
  column: IColumn;
  board: IBoard;
  setBoard: Dispatch<SetStateAction<IBoard>>;
}) {
  const [isHover, setIsHover] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = async () => {
    try {
      await deleteCard(board.id || '', column.id || '', card.id || '');
      setBoard((prev) => ({
        ...prev,
        columns: prev.columns.map((column) => ({
          ...column,
          cards: column.cards.filter((c) => c.id !== card.id),
        })),
      }));
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  const handleEditClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsModalOpen(true);
  }, []);

  const isDateInPast = useCallback((date: Date): boolean => {
    const today = new Date();
    return date < today;
  }, []);

  const isCardDue = useCallback(
    (dueDate: string): boolean => {
      const date = new Date(dueDate);
      return isDateInPast(date);
    },
    [isDateInPast]
  );

  const cardDue = useMemo(
    () => isCardDue(card.dueDate || ''),
    [card.dueDate, isCardDue]
  );

  const renderCardDescription = () => {
    const descriptionArray = card.description.split('\n');
    return (
      <StyledCardDescription>
        <span>Description: </span>
        {descriptionArray.map((line, index) => (
          <span key={index}>
            {line}
            {index !== descriptionArray.length - 1 && <br />}
          </span>
        ))}
      </StyledCardDescription>
    );
  };

  const handleDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('cardId', card.id || '');
    e.dataTransfer.setData('columnId', column.id || '');
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsHover(true);
  };

  const handleMouseLeave = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setIsHover(false);
  };

  return (
    <>
      <StyledCard
        data-cy="card-to-drag"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        due={cardDue}
        draggable
        onDragStart={handleDragStart}
      >
        <StyledCardHeader>
          <StyledCardTitle>Title: {card.title}</StyledCardTitle>
          {isHover && (
            <>
              <Button onClick={handleEditClick} variant="icon" size="medium">
                <EditIcon size={16} />
              </Button>
              <Button onClick={handleDeleteClick} variant="icon" size="medium">
                <TrashIcon size={16} color="#FF344C" />
              </Button>
            </>
          )}
        </StyledCardHeader>
        {card.description && renderCardDescription()}
        {card.dueDate && (
          <StyledDueDate>
            <StyledDueDateText>
              {isCardDue(card.dueDate) ? 'Due date was: ' : 'Due date is: '}
              {card.dueDate}
            </StyledDueDateText>
          </StyledDueDate>
        )}
        {card.categories && (
          <StyledCardCategories>
            {card?.categories?.map((category) => (
              <Badge key={category.id} color={category.color}>
                {category.title}
              </Badge>
            ))}
          </StyledCardCategories>
        )}
      </StyledCard>
      {isModalOpen && (
        <CardModal
          setIsModalOpen={setIsModalOpen}
          board={board}
          column={column}
          setBoard={setBoard}
          card={card}
          mode={'edit'}
        />
      )}
    </>
  );
}

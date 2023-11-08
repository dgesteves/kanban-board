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
  useState,
} from 'react';
import { deleteCard } from '../../services/card';
import EditCardModal from '../EditCardModal';

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

  const onDelete = () => {
    deleteCard(board.id || '', column.id || '', card.id || '').then(() => {
      setBoard((prev) => ({
        ...prev,
        columns: prev.columns.map((column) => ({
          ...column,
          cards: column.cards.filter((c) => c.id !== card.id),
        })),
      }));
    });
  };

  const onEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const isDateInPast = (date: Date): boolean => {
    const today = new Date();
    return date < today;
  };

  const isCardDue = (dueDate: string): boolean => {
    const date = new Date(dueDate);
    return isDateInPast(date);
  };

  const renderCardDescription = () => {
    const descriptionArray = card.description.split('\n');
    return (
      <StyledCardDescription>
        {descriptionArray.map((line, index) => (
          <span key={index}>
            {line}
            {index !== descriptionArray.length - 1 && <br />}
          </span>
        ))}
      </StyledCardDescription>
    );
  };

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('cardId', card.id || '');
    e.dataTransfer.setData('columnId', column.id || '');
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <>
      <StyledCard
        onMouseEnter={(e) => {
          e.stopPropagation();
          setIsHover(true);
        }}
        onMouseLeave={(e) => {
          e.stopPropagation();
          setIsHover(false);
        }}
        due={isCardDue(card.dueDate || '')}
        draggable
        onDragStart={onDragStart}
      >
        <StyledCardHeader>
          <StyledCardTitle>{card.title}</StyledCardTitle>
          {isHover && (
            <>
              <Button onClick={onEdit} variant="icon" size="medium">
                <EditIcon size={16} />
              </Button>
              <Button onClick={onDelete} variant="icon" size="medium">
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
        <EditCardModal
          setIsModalOpen={setIsModalOpen}
          board={board}
          column={column}
          setBoard={setBoard}
          card={card}
        />
      )}
    </>
  );
}

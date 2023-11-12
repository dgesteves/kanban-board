import {
  StyledBadgeWrap,
  StyledBoardName,
  StyledCard,
  StyledFooter,
  StyledImageWrap,
} from './styles';
import Button from '../../ui/components/atoms/Button';
import { EditIcon } from '../../ui/icons/EditIcon';
import { TrashIcon } from '../../ui/icons/TrashIcon';
import Badge from '../../ui/components/atoms/Badge';
import { Color, IBoard } from '../../types';
import { MouseEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Board({
  board,
  handleEdit,
  handleDelete,
}: {
  board: IBoard;
  handleEdit: (board: IBoard) => void;
  handleDelete: (boardId: string) => void;
}) {
  const [isOnHover, setIsOnHover] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleCardClick = useCallback(() => {
    navigate(`/board/${board.id}`);
  }, [board.id, navigate]);

  const handleMouseEnter = useCallback(() => {
    setIsOnHover(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsOnHover(false);
  }, []);

  const handleDeleteClick = async (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      handleDelete(board.id as string);
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  };

  const handleEditClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    try {
      handleEdit(board);
    } catch (error) {
      console.error('Error opening edit modal:', error);
    }
  };

  return (
    <StyledCard
      onClick={handleCardClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <StyledImageWrap>
        {isOnHover && (
          <>
            <Button onClick={handleEditClick} variant="icon" size="medium">
              <EditIcon size={16} />
            </Button>
            <Button onClick={handleDeleteClick} variant="icon" size="medium">
              <TrashIcon size={16} color="#FF344C" />
            </Button>
          </>
        )}
      </StyledImageWrap>
      <StyledFooter>
        <StyledBoardName>{board.title}</StyledBoardName>
        <StyledBadgeWrap>
          {board.columns.map((col) => (
            <Badge key={col.id} color={col.color as Color}>
              {`${col.title} ${col.cards.length}`}
            </Badge>
          ))}
        </StyledBadgeWrap>
      </StyledFooter>
    </StyledCard>
  );
}

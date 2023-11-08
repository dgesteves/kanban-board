import { Dispatch, MouseEvent, SetStateAction, useState } from 'react';
import { IBoard } from '../../types';
import {
  StyledBadgeWrap,
  StyledBoardName,
  StyledBoardsGrid,
  StyledCard,
  StyledFooter,
  StyledImageWrap,
} from './styles';
import Badge from '../../ui/components/atoms/Badge';
import { TrashIcon } from '../../ui/icons/TrashIcon';
import Button from '../../ui/components/atoms/Button';
import { useNavigate } from 'react-router-dom';
import { deleteBoard } from '../../services/board';
import { EditIcon } from '../../ui/icons/EditIcon';
import EditBoardModal from '../EditBoardModal';

export default function BoardsGrid({
  boards,
  setBoards,
}: {
  boards: IBoard[];
  setBoards: Dispatch<SetStateAction<IBoard[]>>;
}) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isOnHover, setIsOnHover] = useState<string>('');
  const [board, setBoard] = useState<IBoard>({
    title: '',
    columns: [],
  });

  const onDelete = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    id: string
  ) => {
    e.stopPropagation();
    deleteBoard(id).then(() => {
      setBoards((prev) => prev.filter((board) => board.id !== id));
    });
  };

  const onEdit = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    board: IBoard
  ) => {
    e.stopPropagation();
    setBoard(board);
    setIsModalOpen(true);
  };

  return (
    <StyledBoardsGrid>
      {boards.map((board) => (
        <StyledCard
          key={board.id}
          onClick={() => navigate(`/board/${board.id}`)}
          onMouseEnter={() => setIsOnHover(board.id || '')}
          onMouseLeave={() => setIsOnHover('')}
        >
          <StyledImageWrap>
            {isOnHover === board.id && (
              <>
                <Button
                  onClick={(e) => onEdit(e, board)}
                  variant="icon"
                  size="medium"
                >
                  <EditIcon size={16} />
                </Button>
                <Button
                  onClick={(e) => onDelete(e, board.id || '')}
                  variant="icon"
                  size="medium"
                >
                  <TrashIcon size={16} color="#FF344C" />
                </Button>
              </>
            )}
          </StyledImageWrap>
          <StyledFooter>
            <StyledBoardName>{board.title}</StyledBoardName>
            <StyledBadgeWrap>
              {board.columns.map((col) => (
                <Badge key={col.id} color={col.color}>
                  {`${col.title} ${col.cards.length}`}
                </Badge>
              ))}
            </StyledBadgeWrap>
          </StyledFooter>
        </StyledCard>
      ))}
      {isModalOpen && (
        <EditBoardModal
          setIsModalOpen={setIsModalOpen}
          board={board}
          setBoards={setBoards}
        />
      )}
    </StyledBoardsGrid>
  );
}

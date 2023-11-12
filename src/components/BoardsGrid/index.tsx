import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { IBoard } from '../../types';
import { StyledBoardsGrid } from './styles';
import Board from '../Board';
import { deleteBoard } from '../../services/board';
import BoardModal from '../BoardModal';

export default function BoardsGrid({
  boards,
  setBoards,
}: {
  boards: IBoard[];
  setBoards: Dispatch<SetStateAction<IBoard[]>>;
}) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [board, setBoard] = useState<IBoard>({
    title: '',
    columns: [],
  });

  const handleEdit = useCallback((board: IBoard) => {
    try {
      setBoard(board);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error opening edit modal:', error);
    }
  }, []);

  const handleDelete = async (boardId: string) => {
    try {
      await deleteBoard(boardId);
      setBoards((prev) => prev.filter((b) => boardId !== b.id));
    } catch (error) {
      console.error('Error deleting board:', error);
    }
  };

  return (
    <StyledBoardsGrid>
      {boards.map((board) => (
        <Board
          key={board.id}
          board={board}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      ))}
      {isModalOpen && (
        <BoardModal
          setIsModalOpen={setIsModalOpen}
          board={board}
          setBoards={setBoards}
          mode="edit"
        />
      )}
    </StyledBoardsGrid>
  );
}

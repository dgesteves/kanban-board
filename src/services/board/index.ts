import { v4 as uuid } from 'uuid';
import { IBoard } from '../../types';
import { handleError } from '../../utils/handleError';

export async function getBoardsFromLocalStorage(): Promise<IBoard[]> {
  return new Promise((resolve) => {
    const boardsJson = localStorage.getItem('boards') || '[]';
    resolve(JSON.parse(boardsJson));
  });
}

export async function updateBoardsInLocalStorage(
  boards: IBoard[]
): Promise<void> {
  return new Promise((resolve) => {
    localStorage.setItem('boards', JSON.stringify(boards));
    resolve();
  });
}

export async function getBoard(id: string): Promise<IBoard> {
  try {
    const boards: IBoard[] = await getBoardsFromLocalStorage();
    const board = boards.find((board) => board.id === id);
    if (board) {
      return { ...board };
    } else {
      throw new Error('Board not found');
    }
  } catch (error) {
    handleError(error as Error, 'Error retrieving board');
  }
}

export async function getBoards(): Promise<IBoard[]> {
  try {
    return getBoardsFromLocalStorage();
  } catch (error) {
    handleError(error as Error, 'Error retrieving boards');
  }
}

export async function createBoard(board: IBoard): Promise<IBoard> {
  try {
    const newBoard = { ...board, id: uuid() };
    const boards: IBoard[] = await getBoardsFromLocalStorage();
    const updatedBoards = [...boards, newBoard];
    await updateBoardsInLocalStorage(updatedBoards);
    return newBoard;
  } catch (error) {
    handleError(error as Error, 'Error creating board');
  }
}

export async function updateBoard(updatedBoard: IBoard): Promise<IBoard> {
  try {
    const boards: IBoard[] = await getBoardsFromLocalStorage();
    const updatedBoards = boards.map((board) =>
      board.id === updatedBoard.id ? { ...updatedBoard } : board
    );
    await updateBoardsInLocalStorage(updatedBoards);
    return { ...updatedBoard };
  } catch (error) {
    handleError(error as Error, 'Error updating board');
  }
}

export async function deleteBoard(id: string): Promise<void> {
  try {
    const boards: IBoard[] = await getBoardsFromLocalStorage();
    const filteredBoards = boards.filter((board) => board.id !== id);
    await updateBoardsInLocalStorage(filteredBoards);
  } catch (error) {
    handleError(error as Error, 'Error deleting board');
  }
}

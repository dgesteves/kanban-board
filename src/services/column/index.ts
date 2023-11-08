import { v4 as uuid } from 'uuid';
import { IBoard, IColumn } from '../../types';
import {
  getBoardsFromLocalStorage,
  updateBoardsInLocalStorage,
} from '../board';

export async function getColumnsFromBoard(boardId: string): Promise<IColumn[]> {
  const boards: IBoard[] = await getBoardsFromLocalStorage();
  const board = boards.find((board) => board.id === boardId);
  return board ? board.columns : [];
}

export async function updateColumnsInBoard(
  boardId: string,
  columns: IColumn[]
): Promise<void> {
  const boards: IBoard[] = await getBoardsFromLocalStorage();
  const updatedBoards = boards.map((board) =>
    board.id === boardId ? { ...board, columns } : board
  );
  await updateBoardsInLocalStorage(updatedBoards);
}

export async function getColumn(id: string, boardId: string): Promise<IColumn> {
  try {
    const columns: IColumn[] = await getColumnsFromBoard(boardId);
    const column = columns.find((column) => column.id === id);
    if (column) {
      return { ...column };
    } else {
      throw new Error('Column not found');
    }
  } catch (error) {
    throw new Error(`Error retrieving column: ${(error as Error).message}`);
  }
}

export async function getColumns(boardId: string): Promise<IColumn[]> {
  try {
    return await getColumnsFromBoard(boardId);
  } catch (error) {
    throw new Error(`Error retrieving columns: ${(error as Error).message}`);
  }
}

export async function createColumn(
  boardId: string,
  column: IColumn
): Promise<IColumn> {
  try {
    const newColumn: IColumn = { ...column, id: uuid() };
    const columns: IColumn[] = await getColumnsFromBoard(boardId);
    const updatedColumns = [...columns, newColumn];
    await updateColumnsInBoard(boardId, updatedColumns);
    return newColumn;
  } catch (error) {
    throw new Error(`Error creating column: ${(error as Error).message}`);
  }
}

export async function updateColumn(
  boardId: string,
  updatedColumn: IColumn
): Promise<IColumn> {
  try {
    const columns: IColumn[] = await getColumnsFromBoard(boardId);
    const updatedColumns = columns.map((column) =>
      column.id === updatedColumn.id ? { ...updatedColumn } : column
    );
    await updateColumnsInBoard(boardId, updatedColumns);
    return { ...updatedColumn };
  } catch (error) {
    throw new Error(`Error updating column: ${(error as Error).message}`);
  }
}

export async function deleteColumn(id: string, boardId: string): Promise<void> {
  try {
    const columns: IColumn[] = await getColumnsFromBoard(boardId);
    const filteredColumns = columns.filter((column) => column.id !== id);
    await updateColumnsInBoard(boardId, filteredColumns);
  } catch (error) {
    throw new Error(`Error deleting column: ${(error as Error).message}`);
  }
}

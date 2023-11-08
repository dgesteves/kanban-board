import { v4 as uuid } from 'uuid';
import { IColumn, ICard } from '../../types';
import { getColumnsFromBoard, updateColumnsInBoard } from '../column';

async function getCardsFromColumn(
  boardId: string,
  columnId: string
): Promise<ICard[]> {
  const columns: IColumn[] = await getColumnsFromBoard(boardId);
  const column = columns.find((column) => column.id === columnId);
  return column ? column.cards : [];
}

async function updateCardsInColumn(
  boardId: string,
  columnId: string,
  cards: ICard[]
): Promise<void> {
  const columns: IColumn[] = await getColumnsFromBoard(boardId);
  const updatedColumns = columns.map((column) =>
    column.id === columnId ? { ...column, cards } : column
  );
  await updateColumnsInBoard(boardId, updatedColumns);
}

export async function getCard(
  boardId: string,
  columnId: string,
  cardId: string
): Promise<ICard> {
  try {
    const cards: ICard[] = await getCardsFromColumn(boardId, columnId);
    const card = cards.find((card) => card.id === cardId);
    if (card) {
      return { ...card };
    } else {
      throw new Error('Card not found');
    }
  } catch (error) {
    throw new Error(`Error retrieving card: ${(error as Error).message}`);
  }
}

export async function getCards(
  boardId: string,
  columnId: string
): Promise<ICard[]> {
  try {
    return await getCardsFromColumn(boardId, columnId);
  } catch (error) {
    throw new Error('Error retrieving cards: ' + (error as Error).message);
  }
}

export async function createCard(
  boardId: string,
  columnId: string,
  card: ICard
): Promise<ICard> {
  try {
    const newCard: ICard = { ...card, id: uuid() };
    const cards: ICard[] = await getCardsFromColumn(boardId, columnId);
    const updatedCards = [...cards, newCard];
    await updateCardsInColumn(boardId, columnId, updatedCards);
    return newCard;
  } catch (error) {
    throw new Error(`Error creating card: ${(error as Error).message}`);
  }
}

export async function updateCard(
  boardId: string,
  columnId: string,
  updatedCard: ICard
): Promise<ICard> {
  try {
    const cards: ICard[] = await getCardsFromColumn(boardId, columnId);
    const updatedCards = cards.map((card) =>
      card.id === updatedCard.id ? { ...updatedCard } : card
    );
    await updateCardsInColumn(boardId, columnId, updatedCards);
    return { ...updatedCard };
  } catch (error) {
    throw new Error(`Error updating card: ${(error as Error).message}`);
  }
}

export async function deleteCard(
  boardId: string,
  columnId: string,
  cardId: string
): Promise<void> {
  try {
    const cards: ICard[] = await getCardsFromColumn(boardId, columnId);
    const filteredCards = cards.filter((card) => card.id !== cardId);
    await updateCardsInColumn(boardId, columnId, filteredCards);
  } catch (error) {
    throw new Error(`Error deleting card: ${(error as Error).message}`);
  }
}

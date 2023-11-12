/**
 * IBoard represents a board in the application.
 * @interface
 * @property {string} id - The unique identifier of the board.
 * @property {string} title - The title of the board.
 * @property {IColumn[]} columns - The columns of the board.
 */
export interface IBoard {
  id?: string;
  title: string;
  columns: IColumn[];
}

/**
 * IColumn represents a column in a board.
 * @interface
 * @property {string} id - The unique identifier of the column.
 * @property {string} title - The title of the column.
 * @property {string} color - The color of the column.
 * @property {ICard[]} cards - The cards in the column.
 */
export interface IColumn {
  id?: string;
  title: string;
  color: string;
  cards: ICard[];
}

/**
 * ICard represents a card in a column.
 * @interface
 * @property {string} id - The unique identifier of the card.
 * @property {string} title - The title of the card.
 * @property {string} description - The description of the card.
 * @property {ICategory[]} categories - The categories of the card.
 * @property {string} dueDate - The due date of the card.
 */
export interface ICard {
  id?: string;
  title: string;
  description: string;
  categories?: ICategory[];
  dueDate?: string;
}

/**
 * ICategory represents a category in a card.
 * @interface
 * @property {string} id - The unique identifier of the category.
 * @property {string} title - The title of the category.
 * @property {Color} color - The color of the category.
 */
export interface ICategory {
  id?: string;
  title: string;
  color: Color;
}

/**
 * Color represents the possible color values in the application.
 * @typedef {('dataFuchsia'|'dataTangerine'|'dataSea'|'dataLemon'|'dataEmerald'|'dataMustard'|'systemRed'|'systemGreen'|'systemGray'|'systemPurple')} Color
 */
export type Color =
  | 'dataFuchsia'
  | 'dataTangerine'
  | 'dataSea'
  | 'dataLemon'
  | 'dataEmerald'
  | 'dataMustard'
  | 'systemRed'
  | 'systemGreen'
  | 'systemGray'
  | 'systemPurple';

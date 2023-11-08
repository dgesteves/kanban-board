export interface IBoard {
  id?: string;
  title: string;
  columns: IColumn[];
}

export interface IColumn {
  id?: string;
  title: string;
  color: string;
  cards: ICard[];
}

export interface ICard {
  id?: string;
  title: string;
  description: string;
  categories?: ICategory[];
  dueDate?: string;
}

export interface ICategory {
  id?: string;
  title: string;
  color: string;
}

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

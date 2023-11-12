import { Dispatch, SetStateAction } from 'react';
import { IBoard, ICard, IColumn } from '../../types';

export interface EditCardModalProps {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  board: IBoard;
  setBoard: Dispatch<SetStateAction<IBoard>>;
  column: IColumn;
  card?: ICard;
  mode: 'edit' | 'create';
}

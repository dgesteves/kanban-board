import { v4 as uuid } from 'uuid';

export const DEFAULT_COLUMNS = [
  {
    id: uuid(),
    title: 'To Do',
    color: 'systemPurple',
    cards: [],
  },
  {
    id: uuid(),
    title: 'In Progress',
    color: 'systemGray',
    cards: [],
  },
  {
    id: uuid(),
    title: 'Done',
    color: 'systemGreen',
    cards: [],
  },
];

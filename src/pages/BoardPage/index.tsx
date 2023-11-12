import {
  StyledBoard,
  StyledColumnsWrap,
  StyledPlusIcon,
  StyledSearchIcon,
  StyledSearchWrap,
} from './styles';
import { SearchIcon } from '../../ui/icons/SearchIcon';
import Input from '../../ui/components/atoms/Input';
import Button from '../../ui/components/atoms/Button';
import {
  ChangeEvent,
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { IBoard } from '../../types';
import { getBoard } from '../../services/board';
import { useParams } from 'react-router-dom';
import Badge from '../../ui/components/atoms/Badge';
import { PlusIcon } from '../../ui/icons/PlusIcon';

const ColumnModal = lazy(() => import('../../components/ColumnModal'));
const Column = lazy(() => import('../../components/Column'));

export default function BoardPage() {
  const { id } = useParams<{ id: string }>();
  const [board, setBoard] = useState<IBoard>({ title: '', columns: [] });
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getBoard(id || '').then(setBoard);
  }, [id]);

  const handleButtonClick = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const filteredBoard = useMemo(() => {
    if (search === '') {
      return board;
    }

    return {
      ...board,
      columns: board.columns.map((column) => ({
        ...column,
        cards: column.cards.filter(
          (card) =>
            card.title.toLowerCase().includes(search.toLowerCase()) ||
            card?.categories?.some((category) =>
              category.title.toLowerCase().includes(search.toLowerCase())
            )
        ),
      })),
    };
  }, [board, search]);

  return (
    <StyledBoard>
      <StyledSearchWrap>
        <Badge color="dataLemon">{filteredBoard?.title}</Badge>
        <StyledSearchIcon>
          <SearchIcon size={16} />
        </StyledSearchIcon>
        <Input
          type="text"
          placeholder="Search Cards By Name or Category"
          onChange={handleSearchChange}
        />
      </StyledSearchWrap>
      <StyledColumnsWrap>
        {filteredBoard?.columns.map((column) => (
          <Suspense key={column.id} fallback={<div>Loading...</div>}>
            <Column column={column} setBoard={setBoard} board={filteredBoard} />
          </Suspense>
        ))}
        <Button onClick={handleButtonClick} variant="icon" size="medium">
          <StyledPlusIcon>
            <PlusIcon size={16} />
          </StyledPlusIcon>
        </Button>
      </StyledColumnsWrap>
      {isModalOpen && (
        <Suspense fallback={<div>Loading...</div>}>
          <ColumnModal
            setIsModalOpen={setIsModalOpen}
            board={filteredBoard}
            setBoard={setBoard}
            mode={'create'}
          />
        </Suspense>
      )}
    </StyledBoard>
  );
}

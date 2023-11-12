import { StyledBoards, StyledEmptyStateText, StyledSearchWrap } from './styles';
import { IBoard } from '../../types';
import { useOutletContext } from 'react-router-dom';
import {
  ChangeEvent,
  Dispatch,
  lazy,
  SetStateAction,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { getBoards } from '../../services/board';
import Input from '../../ui/components/atoms/Input';
import { SearchIcon } from '../../ui/icons/SearchIcon';

const BoardsEmpty = lazy(() => import('../../components/BoardsEmpty'));
const BoardsGrid = lazy(() => import('../../components/BoardsGrid'));

export default function BoardsPage() {
  const [boards, setBoards] = useState<IBoard[]>([]);
  const [search, setSearch] = useState('');
  const { setIsModalOpen } = useOutletContext<{
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  }>();

  useEffect(() => {
    getBoards()
      .then(setBoards)
      .catch((error) => {
        console.error('Error fetching boards:', error);
      });
  }, []);

  const handleSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const filteredBoards = useMemo(() => {
    if (search === '') {
      return boards;
    }
    return boards.filter((board) =>
      board.title.toLowerCase().includes(search.toLowerCase())
    );
  }, [boards, search]);

  return (
    <StyledBoards>
      {boards.length > 0 && (
        <StyledSearchWrap>
          <SearchIcon size={16} />
          <Input
            type="text"
            placeholder="Search boards"
            onChange={handleSearchChange}
          />
        </StyledSearchWrap>
      )}
      {filteredBoards.length === 0 && boards.length > 0 && (
        <StyledEmptyStateText>
          No boards found with this name
        </StyledEmptyStateText>
      )}
      {boards.length > 0 ? (
        <Suspense fallback={<div>Loading...</div>}>
          <BoardsGrid boards={filteredBoards} setBoards={setBoards} />
        </Suspense>
      ) : (
        <Suspense fallback={<div>Loading...</div>}>
          <BoardsEmpty setIsModalOpen={setIsModalOpen} />
        </Suspense>
      )}
    </StyledBoards>
  );
}

import { StyledBoards, StyledSearchWrap, StyledEmptyStateText } from './styles';
import { IBoard } from '../../types';
import { useOutletContext } from 'react-router-dom';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { getBoards } from '../../services/board';
import Input from '../../ui/components/atoms/Input';
import { SearchIcon } from '../../ui/icons/SearchIcon';
import BoardsEmpty from '../../components/BoardsEmpty';
import BoardsGrid from '../../components/BoardsGrid';

export default function BoardsPage() {
  const [boards, setBoards] = useState<IBoard[]>([]);
  const [search, setSearch] = useState('');
  const { setIsModalOpen } = useOutletContext<{
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  }>();

  useEffect(() => {
    getBoards().then((res) => {
      setBoards(res);
    });
  }, []);

  const filteredBoards = useCallback(() => {
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
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearch(e.target.value)
            }
          />
        </StyledSearchWrap>
      )}
      {filteredBoards().length === 0 && boards.length > 0 && (
        <StyledEmptyStateText>
          No boards found with this name
        </StyledEmptyStateText>
      )}
      {boards.length > 0 ? (
        <BoardsGrid boards={filteredBoards()} setBoards={setBoards} />
      ) : (
        <BoardsEmpty setIsModalOpen={setIsModalOpen} />
      )}
    </StyledBoards>
  );
}

import { StyledBoards, StyledSearchWrap, StyledEmptyStateText } from './styles';
import { IBoard } from '../../types';
import { useOutletContext } from 'react-router-dom';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
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
  const [filteredBoards, setFilteredBoards] = useState<IBoard[]>([]);
  const { setIsModalOpen } = useOutletContext<{
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  }>();

  useEffect(() => {
    getBoards().then((res) => {
      setBoards(res);
      setFilteredBoards(res);
    });
  }, []);

  const onFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilteredBoards(
      boards.filter((board) => {
        return board.title.toLowerCase().includes(value.toLowerCase());
      })
    );
  };

  return (
    <StyledBoards>
      {boards.length > 0 && (
        <StyledSearchWrap>
          <SearchIcon size={16} />
          <Input type="text" placeholder="Search boards" onChange={onFilter} />
        </StyledSearchWrap>
      )}
      {filteredBoards.length === 0 && boards.length > 0 && (
        <StyledEmptyStateText>
          No boards found with this name
        </StyledEmptyStateText>
      )}
      {boards.length > 0 ? (
        <BoardsGrid boards={filteredBoards} setBoards={setFilteredBoards} />
      ) : (
        <BoardsEmpty setIsModalOpen={setIsModalOpen} />
      )}
    </StyledBoards>
  );
}

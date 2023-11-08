import {
  StyledBoard,
  StyledColumnsWrap,
  StyledPlusIcon,
  StyledSearchIcon,
} from './styles';
import { SearchIcon } from '../../ui/icons/SearchIcon';
import Input from '../../ui/components/atoms/Input';
import { StyledSearchWrap } from './styles';
import Button from '../../ui/components/atoms/Button';
import { ChangeEvent, useEffect, useState, useCallback } from 'react';
import { IBoard } from '../../types';
import { getBoard } from '../../services/board';
import { useParams } from 'react-router-dom';
import Badge from '../../ui/components/atoms/Badge';
import CreateNewColumnModal from '../../components/CreateNewColumnModal';
import { PlusIcon } from '../../ui/icons/PlusIcon';
import Column from '../../components/Column';

export default function BoardPage() {
  const { id } = useParams<{ id: string }>();
  const [board, setBoard] = useState<IBoard>({ title: '', columns: [] });
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getBoard(id || '').then((res) => {
      setBoard(res);
    });
  }, [id]);

  const filteredBoard = useCallback(() => {
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
        <Badge color="dataLemon">{filteredBoard()?.title}</Badge>
        <StyledSearchIcon>
          <SearchIcon size={16} />
        </StyledSearchIcon>
        <Input
          type="text"
          placeholder="Search Cards By Name or Category"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearch(e.target.value)
          }
        />
      </StyledSearchWrap>
      <StyledColumnsWrap>
        {filteredBoard()?.columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            setBoard={setBoard}
            board={filteredBoard()}
          />
        ))}
        <Button
          onClick={() => setIsModalOpen(true)}
          variant="icon"
          size="medium"
        >
          <StyledPlusIcon>
            <PlusIcon size={16} />
          </StyledPlusIcon>
        </Button>
      </StyledColumnsWrap>
      {isModalOpen && (
        <CreateNewColumnModal
          setIsModalOpen={setIsModalOpen}
          board={filteredBoard()}
          setBoard={setBoard}
        />
      )}
    </StyledBoard>
  );
}

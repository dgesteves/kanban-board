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
import { ChangeEvent, useEffect, useState } from 'react';
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
  const [filteredBoard, setFilteredBoard] = useState<IBoard>({
    title: '',
    columns: [],
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getBoard(id || '').then((res) => {
      setBoard(res);
      setFilteredBoard(res);
    });
  }, [id]);

  const onFilter = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFilteredBoard({
      ...board,
      columns: board.columns.map((column) => ({
        ...column,
        cards: column.cards.filter(
          (card) =>
            card.title.toLowerCase().includes(value.toLowerCase()) ||
            card?.categories?.some((category) =>
              category.title.toLowerCase().includes(value.toLowerCase())
            )
        ),
      })),
    });
  };

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
          onChange={onFilter}
        />
      </StyledSearchWrap>
      <StyledColumnsWrap>
        {filteredBoard?.columns.map((column) => (
          <Column
            key={column.id}
            column={column}
            setBoard={setFilteredBoard}
            board={filteredBoard}
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
          board={filteredBoard}
          setBoard={setFilteredBoard}
        />
      )}
    </StyledBoard>
  );
}

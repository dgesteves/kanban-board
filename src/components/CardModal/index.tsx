import Modal from '../../ui/components/organisms/Modal';
import { v4 as uuid } from 'uuid';
import { KeyboardEvent, useCallback, useState } from 'react';
import {
  StyledContentWrap,
  StyledLabel,
  StyledModalActions,
  StyledColorPicker,
  StyledCategoriesInput,
  StyledCategoriesWrap,
} from './styles';
import Button from '../../ui/components/atoms/Button';
import Input from '../../ui/components/atoms/Input';
import { Color } from '../../types';
import { createCard, updateCard } from '../../services/card';
import Checkbox from '../../ui/components/atoms/Checkbox';
import Badge from '../../ui/components/atoms/Badge';
import TextArea from '../../ui/components/atoms/TextArea';
import { COLORS, DEFAULT_COLOR } from '../../constants/colors';
import useCardState from './useCardState';
import useCategoryState from './useCategoryState';
import { EditCardModalProps } from './types';

export default function CardModal({
  setIsModalOpen,
  board,
  setBoard,
  column,
  card,
  mode,
}: EditCardModalProps) {
  const [color, setColor] = useState<Color>(DEFAULT_COLOR);
  const [modalCard, handleCardChange] = useCardState(
    card || {
      title: '',
      description: '',
      categories: [],
      dueDate: '',
    }
  );
  const [category, handleCategoryChange] = useCategoryState({
    title: '',
    color: DEFAULT_COLOR,
  });

  const handleAction = useCallback(() => {
    if (modalCard.title.trim() === '' || modalCard.description.trim() === '') {
      return;
    }

    const cardAction = mode === 'edit' ? updateCard : createCard;

    cardAction(board.id || '', column.id || '', modalCard)
      .then((res) => {
        setBoard((prev) => ({
          ...prev,
          columns: prev.columns.map((col) => {
            if (col.id === column.id) {
              return {
                ...col,
                cards:
                  mode === 'edit'
                    ? col.cards.map((c) =>
                        c.id === modalCard.id ? modalCard : c
                      )
                    : [...col.cards, res],
              };
            }
            return col;
          }),
        }));
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error(`Failed to ${mode} card:`, error);
      });
  }, [board.id, column.id, modalCard, setBoard, setIsModalOpen, mode]);

  const handleCategoryCreate = useCallback(() => {
    if (category.title.trim() === '') {
      return;
    }

    const newCategory = {
      ...category,
      id: uuid(),
      color,
    };

    handleCardChange('categories', [
      ...(modalCard.categories || []),
      newCategory,
    ]);

    handleCategoryChange('title', '');
    handleCategoryChange('color', DEFAULT_COLOR);

    setColor(DEFAULT_COLOR);
  }, [
    category,
    color,
    modalCard.categories,
    handleCategoryChange,
    handleCardChange,
  ]);

  const handleCancel = useCallback(() => {
    setIsModalOpen(false);
  }, [setIsModalOpen]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleAction();
      }
    },
    [handleAction]
  );

  return (
    <Modal
      setIsModalOpen={setIsModalOpen}
      title={mode === 'edit' ? 'Edit Card' : 'Create Card'}
    >
      <StyledContentWrap>
        <StyledLabel>Card Title</StyledLabel>
        <Input
          dataCy={'card-title'}
          value={modalCard.title}
          onChange={(e) => handleCardChange('title', e.target.value)}
          onKeyDown={handleKeyDown}
          type="text"
          placeholder={'Enter a card title...'}
        />
        <StyledLabel>Card Description</StyledLabel>
        <TextArea
          rows={8}
          value={modalCard.description}
          onChange={(e) => handleCardChange('description', e.target.value)}
          placeholder={'Enter a card description...'}
        />
        <StyledLabel>Card Categories</StyledLabel>
        <StyledCategoriesInput>
          <Input
            value={category.title}
            onChange={(e) => handleCategoryChange('title', e.target.value)}
            type="text"
            placeholder={'Add a category...'}
          />
          <Button
            onClick={handleCategoryCreate}
            variant="tertiary"
            size="medium"
          >
            Add Category
          </Button>
        </StyledCategoriesInput>
        <StyledColorPicker>
          {COLORS.map((c) => (
            <Checkbox
              key={c}
              onClick={() => setColor(c)}
              color={c}
              checked={color === c}
            />
          ))}
        </StyledColorPicker>
        <StyledCategoriesWrap>
          {modalCard?.categories?.map((cat) => (
            <Badge key={cat.id} color={cat.color}>
              {cat.title}
            </Badge>
          ))}
        </StyledCategoriesWrap>
        <StyledLabel>Card Due Date</StyledLabel>
        <Input
          value={modalCard.dueDate}
          onChange={(e) => handleCardChange('dueDate', e.target.value)}
          type="date"
        />
      </StyledContentWrap>
      <StyledModalActions>
        <Button onClick={handleCancel} variant="secondary">
          Cancel
        </Button>
        <Button
          dataCy={mode === 'edit' ? 'edit-card' : 'create-card'}
          onClick={handleAction}
        >
          {mode === 'edit' ? 'Save' : 'Create'}
        </Button>
      </StyledModalActions>
    </Modal>
  );
}

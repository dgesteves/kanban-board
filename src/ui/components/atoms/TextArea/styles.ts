import styled from 'styled-components';

export const StyledTextareaWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 12px;
  width: 100%;
  gap: 8px;
  background: ${({ theme }) => theme.colors.grayIron900};
  border: 1px solid ${({ theme }) => theme.colors.grayIron600};
  border-radius: 4px;
`;
export const StyledTextarea = styled.textarea`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background: ${({ theme }) => theme.colors.grayIron900};
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.white};
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  height: 100%;
  &:disabled {
    color: ${({ theme }) => theme.colors.grayIron500};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.white};
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }) => theme.colors.grayIron400};
  }

  &::-webkit-search-cancel-button {
    display: none;
  }
`;

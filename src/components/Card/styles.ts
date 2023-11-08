import styled from 'styled-components';

export const StyledCard = styled.div<{ due: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
  padding: 8px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.grayIron600};
  border: ${({ theme, due }) =>
    due ? `1px solid ${theme.colors.systemRed}` : 'none'};
  cursor: grab;

  &:hover {
    background-color: ${({ theme }) => theme.colors.grayIron500};
  }
`;

export const StyledCardHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  width: 100%;
`;

export const StyledCardTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.white};
  margin: 0;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledCardDescription = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};
  margin: 0;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledCardCategories = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  width: 100%;
`;

export const StyledDueDate = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 4px;
  width: 100%;
`;

export const StyledDueDateText = styled.span`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.white};
  margin: 0;
`;

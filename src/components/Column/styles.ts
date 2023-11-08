import styled from 'styled-components';

export const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  width: 272px;
  min-width: 272px;
  height: 100%;
  padding: 16px;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.colors.grayIron750};
  overflow-y: auto;
  overflow-x: hidden;
`;

export const StyledColumnHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
  height: 32px;
`;

export const StyledCardsWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
  height: 100%;
`;

export const StyledColumnColor = styled.div<{ color: string }>`
  width: 18px;
  height: 18px;
  background: ${({ theme, color }) => {
    switch (color) {
      case 'dataFuchsia':
        return theme.colors.dataFuchsia;
      case 'dataTangerine':
        return theme.colors.dataTangerine;
      case 'dataSea':
        return theme.colors.dataSea;
      case 'dataLemon':
        return theme.colors.dataLemon;
      case 'dataEmerald':
        return theme.colors.dataEmerald;
      case 'dataMustard':
        return theme.colors.dataMustard;
      case 'systemRed':
        return theme.colors.systemRed;
      case 'systemGreen':
        return theme.colors.systemGreen;
      case 'systemGray':
        return theme.colors.systemGray;
      case 'systemPurple':
        return theme.colors.systemPurple;
      default:
        return theme.colors.systemPurple;
    }
  }};
  border-radius: 4px;
`;

export const StyledColumnTitle = styled.h2`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.white};
  margin: 0;
  width: 100px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledColumnActions = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

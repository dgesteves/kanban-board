import styled from 'styled-components';

export const StyledBoards = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100vh - 108px);
  width: 100vw;
  position: relative;
  overflow: hidden;
`;

export const StyledSearchWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  width: 100%;
  max-width: 592px;
  margin: 32px;
  padding: 0 16px;
`;

export const StyledEmptyStateText = styled.p`
  font-size: 26px;
  line-height: 32px;
  color: ${({ theme }) => theme.colors.grayIron300};
  text-align: center;
  max-width: 450px;
`;

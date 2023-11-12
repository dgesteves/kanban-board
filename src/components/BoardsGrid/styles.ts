import styled from 'styled-components';

export const StyledBoardsGrid = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, 368px);
  grid-gap: 16px;
  overflow-y: auto;
  padding: 0 16px;
`;

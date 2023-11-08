import styled from 'styled-components';

export const StyledBoard = styled.main`
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
  max-width: 900px;
  margin: 32px;
  padding: 0 16px;
`;

export const StyledSearchIcon = styled.div`
  width: 18px;
  margin-left: 8px;
`;

export const StyledPlusIcon = styled.div`
  width: 16px;
`;

export const StyledColumnsWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 16px;
  width: 100%;
  height: 100%;
  padding: 0 32px;
  overflow-x: auto;
  overflow-y: hidden;
`;

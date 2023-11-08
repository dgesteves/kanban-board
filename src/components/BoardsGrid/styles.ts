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

export const StyledCard = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 368px;
  height: 272px;
  background: ${({ theme }) => theme.colors.grayIron750};
  border-radius: 4px;

  &:hover {
    background: ${({ theme }) => theme.colors.grayIron700};
    cursor: pointer;
  }
`;

export const StyledImageWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  gap: 4px;
  background-image: url('/src/ui/images/plan.svg');
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  border-width: 2px 2px 0 2px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.grayIron750};
  border-radius: 4px;
  padding: 12px;
`;

export const StyledFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 120px;
  padding: 16px;
  gap: 8px;
`;

export const StyledBadgeWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
  gap: 8px;
  overflow-x: auto;
`;
export const StyledBoardName = styled.h3`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.grayIron200};
  max-width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

import styled from 'styled-components';

export const StyledContentWrap = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0 16px;
  width: 100%;
  margin-bottom: 16px;
  gap: 8px;
`;

export const StyledModalActions = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-start;
  padding: 16px;
  gap: 12px;
  width: 592px;
  height: 72px;
  border-top: 1px solid ${({ theme }) => theme.colors.grayIron600};
`;

export const StyledLabel = styled.span`
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
  color: ${({ theme }) => theme.colors.grayIron300};
`;

export const StyledCategoriesInput = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
  width: 100%;
  gap: 12px;
`;

export const StyledColorPicker = styled.div`
  display: flex;
  padding: 4px 0;
`;

export const StyledCategoriesWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  flex-wrap: wrap;
`;

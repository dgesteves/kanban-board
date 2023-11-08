import styled from 'styled-components';

export const StyledModalOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
`;

export const StyledModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  background: ${({ theme }) => theme.colors.grayIron750};
  border: 1px solid ${({ theme }) => theme.colors.grayIron700};
  border-radius: 4px;
`;

export const StyledModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  width: 100%;
  height: 56px;
  background: ${({ theme }) => theme.colors.grayIron750};
  border-width: 1px 1px 0 1px;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.grayIron700};
  border-radius: 4px 4px 0 0;
`;

export const StyledModalTitle = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.white};
`;

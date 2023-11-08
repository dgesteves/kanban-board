import styled from 'styled-components';

export const StyledHeader = styled.header`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  height: 108px;
  background: ${({ theme }) => theme.colors.grayIron900};
`;

export const StyledTopBar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 16px;
  width: 100%;
  height: 44px;
`;

export const StyledLogo = styled.h1`
  font-size: 20px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.grayIron100};
  margin: 0;
`;

export const StyledTrailing = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
  height: 44px;
`;

export const StyledAvatar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  background: ${({ theme }) => theme.colors.grayIron600};
  border-radius: 16px;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 12px;
  letter-spacing: -0.02em;
  color: ${({ theme }) => theme.colors.grayIron200};
`;

export const StyledNavigation = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 64px;
  padding: 0 16px;
  background: ${({ theme }) => theme.colors.grayIron750};
`;

export const StyledTabs = styled.nav`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-grow: 1;
  height: 64px;
`;

export const StyledText = styled.span`
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;
`;

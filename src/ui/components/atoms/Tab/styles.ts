import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const StyledTab = styled(NavLink)<{
  active?: string;
}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 24px;
  gap: 8px;
  height: 64px;
  color: ${({ theme, active }) =>
    active === 'true' ? theme.colors.white : theme.colors.grayIron400};
  border-bottom: ${({ theme, active }) =>
    active === 'true' ? ` 3px solid ${theme.colors.purple600}` : 'none'};

  &.active {
    color: ${({ theme }) => theme.colors.white};
    border-bottom: 3px solid ${({ theme }) => theme.colors.purple600};
  }

  &:hover {
    color: ${({ theme }) => theme.colors.white};
    border-bottom: 3px solid ${({ theme }) => theme.colors.grayIron600};
  }
`;

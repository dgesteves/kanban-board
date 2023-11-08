import styled from 'styled-components';

export const StyledCheckbox = styled.div<{
  color: string;
}>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 2px;
  width: 20px;
  height: 20px;
  background: ${({ theme, color }) =>
    theme.colors[color as keyof typeof theme.colors]};
  border: 1px solid ${({ theme }) => theme.colors.grayIron600};
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.grayIron400};
  }
`;

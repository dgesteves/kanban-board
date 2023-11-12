import styled from 'styled-components';

export const StyledBadge = styled.span<{ color: string }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
  height: 24px;
  background: ${({ color }) => {
    switch (color) {
      case 'dataFuchsia':
        return 'rgba(255, 119, 209, 0.2)';
      case 'dataTangerine':
        return 'rgba(255, 172, 96, 0.2)';
      case 'dataSea':
        return 'rgba(60, 196, 255, 0.2)';
      case 'dataLemon':
        return 'rgba(255, 249, 113, 0.2)';
      case 'dataEmerald':
        return 'rgba(0, 255, 0, 0.2)';
      case 'dataMustard':
        return 'rgba(159, 122, 94, 0.2)';
      case 'systemRed':
        return 'rgba(255, 107, 132, 0.2)';
      case 'systemGreen':
        return 'rgba(56, 217, 169, 0.2)';
      case 'systemGray':
        return 'rgba(112, 112, 123, 0.2)';
      case 'systemPurple':
        return 'rgba(122, 90, 248, 0.2)';
      default:
        return 'rgba(122, 90, 248, 0.2)';
    }
  }};
  border: 1px solid
    ${({ theme, color }) => theme.colors[color as keyof typeof theme.colors]};
  border-radius: 36px;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  text-transform: capitalize;
  line-height: 18px;
  letter-spacing: -0.02em;
  white-space: nowrap;
  color: ${({ theme, color }) =>
    theme.colors[color as keyof typeof theme.colors]};
`;

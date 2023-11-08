import styled from 'styled-components';

export const StyledCircle = styled.div`
  height: calc(100vh - 108px);
  width: 50vw;
  background-image: url('/circle-bg.svg');
  transform: scale(1.5);
  background-position: 50%;
  background-repeat: no-repeat;
  background-size: contain;
  margin: 0 auto;
  position: absolute;
  z-index: -1;
`;

export const StyledEmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 48px;
  height: calc(100vh - 108px);
`;

export const StyledEmptyStateText = styled.p`
  font-size: 26px;
  line-height: 32px;
  color: ${({ theme }) => theme.colors.grayIron300};
  text-align: center;
  max-width: 450px;
`;

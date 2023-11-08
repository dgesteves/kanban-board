import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledError = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
`;

export const StyledErrorText = styled.p`
  font-size: 2rem;
  font-weight: 700;
`;

export const StyledErrorLink = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.purple500};
  padding: 0.5rem;
  border-radius: 0.5rem;
  color: ${({ theme }) => theme.colors.purple500};

  &:hover {
    color: ${({ theme }) => theme.colors.purple600};
    border: 1px solid ${({ theme }) => theme.colors.purple600};
  }
`;

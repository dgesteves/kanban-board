import styled from 'styled-components';

export const StyledInputWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 12px;
  width: 100%;
  height: 32px;
  gap: 8px;
  background: ${({ theme }) => theme.colors.grayIron900};
  border: 1px solid ${({ theme }) => theme.colors.grayIron600};
  border-radius: 4px;
`;
export const StyledInput = styled.input`
  display: flex;
  flex-grow: 1;
  flex-direction: row;
  align-items: center;
  width: 100%;
  background: ${({ theme }) => theme.colors.grayIron900};
  border: none;
  outline: none;
  color: ${({ theme }) => theme.colors.white};
  font-weight: 500;
  font-size: 14px;
  line-height: 20px;

  // Datepicker
  ::-webkit-datetime-edit-text {
    color: ${({ theme }) => theme.colors.grayIron400};
    padding: 0 4px;
  }

  ::-webkit-datetime-edit-month-field {
    color: ${({ theme }) => theme.colors.grayIron400};
    text-transform: uppercase;
  }

  ::-webkit-datetime-edit-day-field {
    color: ${({ theme }) => theme.colors.grayIron400};
    text-transform: uppercase;
  }

  ::-webkit-datetime-edit-year-field {
    color: ${({ theme }) => theme.colors.grayIron400};
    text-transform: uppercase;
  }

  ::-webkit-calendar-picker-indicator {
    background-size: 16px;
    background: url('/clock.svg') no-repeat center;
    cursor: pointer;
  }

  &:disabled {
    color: ${({ theme }) => theme.colors.grayIron500};
  }

  &::placeholder {
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: ${({ theme }) => theme.colors.grayIron400};
  }
`;

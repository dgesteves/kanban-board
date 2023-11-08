import styled from 'styled-components';

export const StyledButton = styled.button<{
  variant: string;
  size: string;
  fullWidth: boolean;
}>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${({ size }) => {
    switch (size) {
      case 'small':
        return '0';
      case 'medium':
        return '8px';
      case 'large':
        return '12px';
    }
  }};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};
  height: ${({ size }) => {
    switch (size) {
      case 'small':
        return '20px';
      case 'medium':
        return '32px';
      case 'large':
        return '40px';
    }
  }};
  background: ${({ theme, variant }) => {
    switch (variant) {
      case 'primary':
        return theme.colors.purple600;
      case 'secondary':
        return theme.colors.grayIron600;
      case 'tertiary':
        return 'transparent';
      case 'icon':
        return theme.colors.grayIron700;
    }
  }};
  ${({ theme }) => theme.colors.purple600};
  border: ${({ theme, variant }) => {
    switch (variant) {
      case 'primary':
        return `1px solid ${theme.colors.purple500}`;
      case 'secondary':
        return `1px solid ${theme.colors.grayIron500}`;
      case 'tertiary':
        return `1px solid ${theme.colors.grayIron600}`;
      case 'icon':
        return 'none';
    }
  }};
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.white};
  font-weight: 500;
  font-size: ${({ size }) => {
    switch (size) {
      case 'small':
        return '10px';
      case 'medium':
        return '12px';
      case 'large':
        return '14px';
    }
  }};
  white-space: nowrap;

  &:hover {
    background: ${({ theme, variant }) => {
      switch (variant) {
        case 'primary':
          return theme.colors.purple500;
        case 'secondary':
          return theme.colors.grayIron500;
        case 'tertiary':
          return 'transparent';
        case 'icon':
          return theme.colors.grayIron500;
      }
    }};
    border: ${({ theme, variant }) => {
      switch (variant) {
        case 'primary':
          return `1px solid ${theme.colors.purple500}`;
        case 'secondary':
          return `1px solid ${theme.colors.grayIron500}`;
        case 'tertiary':
          return `1px solid ${theme.colors.grayIron500}`;
        case 'icon':
          return 'none';
      }
    }};
  }

  &:active {
    background: ${({ theme, variant }) => {
      switch (variant) {
        case 'primary':
          return theme.colors.purple700;
        case 'secondary':
          return theme.colors.grayIron700;
        case 'tertiary':
          return 'transparent';
        case 'icon':
          return theme.colors.grayIron800;
      }
    }};
    border: ${({ theme, variant }) => {
      switch (variant) {
        case 'primary':
          return `1px solid ${theme.colors.purple600}`;
        case 'secondary':
          return `1px solid ${theme.colors.grayIron600}`;
        case 'tertiary':
          return `1px solid ${theme.colors.grayIron700}`;
        case 'icon':
          return 'none';
      }
    }};
  }

  &:disabled {
    background: ${({ theme }) => theme.colors.purple900};
    background: ${({ theme, variant }) => {
      switch (variant) {
        case 'primary':
          return theme.colors.purple900;
        case 'secondary':
          return theme.colors.grayIron800;
        case 'tertiary':
          return 'transparent';
        case 'icon':
          return 'transparent';
      }
    }};
    border: 1px solid ${({ theme }) => theme.colors.purple800};
    border: ${({ theme, variant }) => {
      switch (variant) {
        case 'primary':
          return `1px solid ${theme.colors.purple800}`;
        case 'secondary':
          return `1px solid ${theme.colors.grayIron800}`;
        case 'tertiary':
          return `1px solid ${theme.colors.grayIron700}`;
        case 'icon':
          return 'none';
      }
    }};
    color: ${({ theme }) => theme.colors.purple600};
    color: ${({ theme, variant }) => {
      switch (variant) {
        case 'primary':
          return theme.colors.purple600;
        case 'secondary':
          return theme.colors.grayIron700;
        case 'tertiary':
          return theme.colors.grayIron600;
        case 'icon':
          return theme.colors.grayIron600;
      }
    }};
    pointer-events: none;
  }
`;

import { MouseEventHandler, ReactNode } from 'react';
import { StyledButton } from './styles';

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'large',
  fullWidth = false,
  dataCy,
}: {
  children: ReactNode | undefined;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'icon';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  dataCy?: string;
}) {
  return (
    <StyledButton
      onClick={onClick}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      data-cy={dataCy}
    >
      {children}
    </StyledButton>
  );
}

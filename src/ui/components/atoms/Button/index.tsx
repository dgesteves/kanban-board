import { MouseEventHandler, ReactNode } from 'react';
import { StyledButton } from './styles';

export default function Button({
  children,
  onClick,
  variant = 'primary',
  size = 'large',
  fullWidth = false,
}: {
  children: ReactNode | undefined;
  onClick: MouseEventHandler<HTMLButtonElement> | undefined;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'icon';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
}) {
  return (
    <StyledButton
      onClick={onClick}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
    >
      {children}
    </StyledButton>
  );
}

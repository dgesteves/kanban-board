import { StyledButton } from './styles';
import { IButtonProps } from './types';

export default function Button({
  variant = 'primary',
  size = 'large',
  fullWidth = false,
  dataCy,
  children,
  ...props
}: IButtonProps) {
  return (
    <StyledButton
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      data-cy={dataCy}
      {...props}
    >
      {children}
    </StyledButton>
  );
}

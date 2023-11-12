import { StyledBadge } from './styles';
import { IBadgeProps } from './types';

export default function Badge({ children, color, ...props }: IBadgeProps) {
  return (
    <StyledBadge color={color} {...props}>
      {children}
    </StyledBadge>
  );
}

import { StyledBadge } from './styles';
import { ReactNode } from 'react';

export default function Badge({
  children,
  color,
}: {
  children: ReactNode;
  color: string;
}) {
  return <StyledBadge color={color}>{children}</StyledBadge>;
}

import { StyledTab } from './styles';
import { ReactNode } from 'react';

export default function Tab({
  children,
  to,
}: {
  children: ReactNode;
  to: string;
}) {
  return <StyledTab to={to}>{children}</StyledTab>;
}

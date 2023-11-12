import { StyledTab } from './styles';
import { ITabProps } from './types';

export default function Tab({ children, to, ...props }: ITabProps) {
  return (
    <StyledTab to={to} {...props}>
      {children}
    </StyledTab>
  );
}

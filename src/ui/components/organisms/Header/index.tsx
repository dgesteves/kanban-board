import {
  StyledAvatar,
  StyledHeader,
  StyledLogo,
  StyledNavigation,
  StyledTabs,
  StyledText,
  StyledTopBar,
  StyledTrailing,
} from './styles';
import Button from '../../atoms/Button';
import Tab from '../../atoms/Tab';
import { IHeaderProps } from './types';

export default function Header({ setIsModalOpen, ...props }: IHeaderProps) {
  return (
    <StyledHeader {...props}>
      <StyledTopBar>
        <StyledLogo>KanBoards</StyledLogo>
        <StyledTrailing>
          <StyledAvatar>DE</StyledAvatar>
        </StyledTrailing>
      </StyledTopBar>
      <StyledNavigation>
        <StyledTabs>
          <Tab to={'/boards'}>
            <StyledText>Boards</StyledText>
          </Tab>
        </StyledTabs>
        <Button onClick={() => setIsModalOpen(true)}>Create New Board</Button>
      </StyledNavigation>
    </StyledHeader>
  );
}

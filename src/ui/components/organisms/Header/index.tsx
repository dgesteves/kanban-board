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
import { Dispatch, SetStateAction } from 'react';
import Button from '../../atoms/Button';
import Tab from '../../atoms/Tab';

export default function Header({
  setIsModalOpen,
}: {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <StyledHeader>
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

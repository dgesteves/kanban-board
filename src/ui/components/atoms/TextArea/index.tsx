import { StyledTextarea, StyledTextareaWrap } from './styles';

export default function TextArea({ ...props }) {
  return (
    <StyledTextareaWrap>
      <StyledTextarea {...props} />
    </StyledTextareaWrap>
  );
}

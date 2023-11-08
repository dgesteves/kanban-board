import { StyledInput, StyledInputWrap } from './styles';

export default function Input({ ...props }) {
  return (
    <StyledInputWrap>
      <StyledInput {...props} />
    </StyledInputWrap>
  );
}

import { StyledInput, StyledInputWrap } from './styles';
import { IInputProps } from './types';

export default function Input({ dataCy, ...props }: IInputProps) {
  return (
    <StyledInputWrap>
      <StyledInput data-cy={dataCy} {...props} />
    </StyledInputWrap>
  );
}

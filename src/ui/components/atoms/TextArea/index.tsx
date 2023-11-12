import { StyledTextarea, StyledTextareaWrap } from './styles';
import { ComponentPropsWithRef } from 'react';

export default function TextArea({
  ...props
}: ComponentPropsWithRef<'textarea'>) {
  return (
    <StyledTextareaWrap>
      <StyledTextarea {...props} />
    </StyledTextareaWrap>
  );
}

import { StyledCheckbox } from './styles';
import { CheckIcon } from '../../../icons/CheckIcon';
import { ICheckboxProps } from './types';

export default function Checkbox({ checked, color, ...props }: ICheckboxProps) {
  return (
    <StyledCheckbox color={color} {...props}>
      {checked && <CheckIcon size={20} />}
    </StyledCheckbox>
  );
}

import { MouseEventHandler } from 'react';
import { StyledCheckbox } from './styles';
import { CheckIcon } from '../../../icons/CheckIcon';

export default function Checkbox({
  checked,
  onClick,
  color,
}: {
  checked: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
  color:
    | 'dataFuchsia'
    | 'dataTangerine'
    | 'dataSea'
    | 'dataLemon'
    | 'dataEmerald'
    | 'dataMustard'
    | 'systemRed'
    | 'systemGreen'
    | 'systemGray'
    | 'systemPurple';
}) {
  return (
    <StyledCheckbox onClick={onClick} color={color}>
      {checked && <CheckIcon size={20} />}
    </StyledCheckbox>
  );
}

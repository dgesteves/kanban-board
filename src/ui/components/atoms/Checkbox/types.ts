import { ComponentPropsWithRef } from 'react';
import { Color } from '../../../../types';

export interface ICheckboxProps extends ComponentPropsWithRef<'div'> {
  checked: boolean;
  color: Color;
}

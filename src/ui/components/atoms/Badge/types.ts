import { ComponentPropsWithRef } from 'react';
import { Color } from '../../../../types';

export interface IBadgeProps extends ComponentPropsWithRef<'span'> {
  color: Color;
}

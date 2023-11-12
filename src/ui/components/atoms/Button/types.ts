import { ComponentPropsWithRef } from 'react';

export interface IButtonProps extends ComponentPropsWithRef<'button'> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'icon';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  dataCy?: string;
}

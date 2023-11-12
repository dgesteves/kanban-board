import { ComponentPropsWithRef } from 'react';

export interface IInputProps extends ComponentPropsWithRef<'input'> {
  dataCy?: string;
}

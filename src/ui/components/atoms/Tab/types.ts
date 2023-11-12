import { ComponentPropsWithRef, ReactNode } from 'react';

export interface ITabProps extends ComponentPropsWithRef<'a'> {
  children: ReactNode;
  to: string;
}

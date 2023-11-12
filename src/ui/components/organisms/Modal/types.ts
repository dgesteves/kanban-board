import { ComponentPropsWithRef, Dispatch, SetStateAction } from 'react';

export interface IModalProps extends ComponentPropsWithRef<'div'> {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
}

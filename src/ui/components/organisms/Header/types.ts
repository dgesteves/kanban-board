import { ComponentPropsWithRef, Dispatch, SetStateAction } from 'react';

export interface IHeaderProps extends ComponentPropsWithRef<'header'> {
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

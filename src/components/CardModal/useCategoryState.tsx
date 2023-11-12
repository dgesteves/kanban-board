import { ICategory } from '../../types';
import { useState } from 'react';

export default function useCategoryState(initialState: ICategory) {
  const [state, setState] = useState(initialState);

  const handleStateChange = (
    key: keyof ICategory,
    value: ICategory[keyof ICategory]
  ) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  return [state, handleStateChange] as const;
}

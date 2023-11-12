import { useState } from 'react';
import { ICard } from '../../types';

export default function useCardState(initialState: ICard) {
  const [state, setState] = useState(initialState);

  const handleStateChange = (key: keyof ICard, value: ICard[keyof ICard]) => {
    setState((prev) => ({ ...prev, [key]: value }));
  };

  return [state, handleStateChange] as const;
}

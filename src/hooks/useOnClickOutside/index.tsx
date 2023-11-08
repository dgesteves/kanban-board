import { RefObject, useEffect } from 'react';

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T> | null,
  handler: (event: MouseEvent) => void,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown'
): void {
  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!ref?.current || ref?.current?.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener(mouseEvent, listener);
    return () => {
      document.removeEventListener(mouseEvent, listener);
    };
  }, [handler, mouseEvent, ref]);
}

export default useOnClickOutside;

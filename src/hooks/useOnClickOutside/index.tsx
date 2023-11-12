import { RefObject, useEffect } from 'react';

type EventType = MouseEvent | TouchEvent;

export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  ref: RefObject<T> | null,
  handler: (event: EventType) => void,
  mouseEvent: 'mousedown' | 'mouseup' = 'mousedown',
  touchEvent: 'touchstart' | 'touchend' = 'touchstart'
): void {
  useEffect(() => {
    const listener = (event: EventType) => {
      if (!ref?.current || ref?.current?.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener(mouseEvent, listener);
    document.addEventListener(touchEvent, listener);
    return () => {
      document.removeEventListener(mouseEvent, listener);
      document.removeEventListener(touchEvent, listener);
    };
  }, [handler, mouseEvent, touchEvent, ref]);
}

export default useOnClickOutside;

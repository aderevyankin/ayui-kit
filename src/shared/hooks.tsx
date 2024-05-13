import React, { useEffect, useRef } from 'react';

type Callback = () => void;

export const useOnClickOutside = (
  ref: React.RefObject<any> | React.RefObject<any>[],
  callback: Callback
  // eslint-disable-next-line sonarjs/cognitive-complexity
): void => {
  const refs = Array.isArray(ref) ? ref : [ref];

  const savedCallback = useRef<Callback | null>(null);

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (!event.target) return;

      let clickInside = false;

      for (const r of refs) {
        if (r.current && r.current.contains(event.target)) {
          clickInside = true;
        }
      }

      if (!clickInside) {
        savedCallback.current && savedCallback.current();
      }
    };

    document.addEventListener('click', listener);

    return () => document.removeEventListener('click', listener);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedCallback]);
};

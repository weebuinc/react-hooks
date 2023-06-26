import { useCallback } from 'react';
import { debounce } from '@weebu/web-kit';

import { useClosure } from '../closure';

export function useDebounce<F extends (...args) => any>(cb: F, timeout = 300) {
  const ref = useClosure(() => cb, [cb]);

  return debounce(((...args) => ref.current(...args)) as F, timeout);
}

export default useDebounce;

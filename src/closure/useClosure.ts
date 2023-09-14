import { useEffect, useRef } from 'react';

/**
 * The closure hook returns a reference that updates, automatically, by the dependencies passed to it.
 * @param cb The callback function that produces the content of the reference.
 * @param deps The dependencies that are watched to keep the reference up to date.
 *
 * @example
 * ```typescript
 * import { useCallback, useState } from 'react';
 * import { useClosure } from '@weebuinc/react-hooks';
 *
 * export function Input({ maxLength }) {
 *   const [clicks, setClicks] = useState(0);
 *   const [value, setValue] = useState('');
 *   const maxLengthRef = useClosure(() => maxLength, [maxLength]);
 *
 *   // a function that will not cause a re-render when the maxLength property changes
 *   const handleChange = useCallback((ev) => {
 *     if (ev.target.value.length <= maxLengthRef.current) {
 *       setValue(ev.target.value);
 *     }
 *   }, [])
 *   return <input value={value} onChange={handleChange} />
 * }
 * ```
 */
export function useClosure<T>(cb: ClosureCallback<T>, deps: Array<any>) {
  const ref = useRef<T>(cb());

  useEffect(() => {
    ref.current = cb();
  }, [...deps]);

  return ref;
}

type ClosureCallback<T> = () => T;

export default useClosure;

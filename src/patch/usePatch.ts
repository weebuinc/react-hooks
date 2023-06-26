import { Dispatch, useReducer } from 'react';

/**
 * The patch hook allows an object state to have some (or all) of its fields to be changed by the dispatch setter.
 * @param initialState the initial state that will be changed by the returned dispatch
 * @example
 * ```typescript
 * import { usePatch } from '@weebu/react-hooks';
 *
 * export function MyComponent() {
 *
 *  // allows for the firstName to be changed without affecting the lastName and vice versa
 *  const [patch, setPatch] = usePatch({ firstName: '', lastName: '' });
 *
 *  return(
 *    <>
 *      <input name="firstName" value={patch.firstName} onClick={(ev) => setPatch({ firstName: ev.target.value })} />
 *      <input name="lastName" value={patch.lastName} onClick={(ev) => setPatch({ lastName: ev.target.value })} />
 *    </>
 *  );
 * }
 * ```
 */
export function usePatch<T>(initialState: Partial<T>): [T, Dispatch<Partial<T>>];
export function usePatch<T>(state: T) {
  const [partial, setPartial] = useReducer((curr: T, next: Partial<T>) => {
    if (next && typeof next === 'object' && !Array.isArray(next)) {
      return { ...curr, ...next } as T;
    }
    return {} as T;
  }, state);
  return [partial, setPartial];
}

export default usePatch;

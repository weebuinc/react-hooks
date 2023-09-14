import { argumenter, debounce } from '@weebuinc/web-kit';

import { useClosure } from '../closure';

type DebounceDispatch<F> = ReturnType<typeof debounce>;

/**
 * The debounce hook takes in a callback function and returns a dispatch function that debounces the callback.
 * @param cb The callback function that will be debounced by the returned dispatch.
 * @returns The dispatch function that debounces the callback function as per the timeout.
 */
export function useDebounce<F extends (...args) => any>(cb: F): DebounceDispatch<F>;

/**
 * The debounce hook takes in a callback function and returns a dispatch function that debounces the callback.
 * @param cb The callback function that will be debounced by the returned dispatch.
 * @param timeout The period to wait for between the time the dispatch is called and the callback is called. (**default:** `300`)
 * @returns The dispatch function that debounces the callback function as per the timeout.
 */
export function useDebounce<F extends (...args) => any>(cb: F, timeout: number): DebounceDispatch<F>;

/**
 * The debounce hook takes in a callback function and returns a dispatch function that debounces the callback.
 * @param cb The callback function that will be debounced by the returned dispatch.
 * @param deps The dependencies that are watched to keep the callback up to date.
 * @returns The dispatch function that debounces the callback function as per the timeout.
 */
export function useDebounce<F extends (...args) => any>(cb: F, deps: Array<any>): DebounceDispatch<F>;

/**
 * The debounce hook takes in a callback function and returns a dispatch function that debounces the callback.
 * @param cb The callback function that will be debounced by the returned dispatch.
 * @param timeout The period to wait for between the time the dispatch is called and the callback is called. (**default:** `300`)
 * @param deps The dependencies that are watched to keep the callback up to date.
 * @returns The dispatch function that debounces the callback function as per the timeout.
 *
 * @example
 * ```typescript
 * import axios from 'axios';
 * import { useState } from 'react';
 * import { useDebounce } from '@weebuinc/react-hooks';
 *
 * export function SearchInput() {
 *
 *  const [value, setValue] = useState('');
 *  const [names, setNames] = useState(new Array<string>());
 *
 *  const search = useDebounce(async (name: string) => {
 *    // this logic will be called 300ms after the last dispatch of the search function
 *    const { data } = await axios.get('http://api.example.com/search', { params: { name } });
 *    setNames([...data]);
 *  })
 *
 *  return (
 *    <div>
 *      <input
 *        value={value}
 *        onChange={(ev) => {
 *          setValue(ev.target.value);
 *          search(ev.target.value);
 *        }}
 *      />
 *      <ul>
 *        {names.map(name => <li key={name}>{name}</li>)}
 *      </ul>
 *    </div>
 *  );
 * }
 * ```
 */
export function useDebounce<F extends (...args) => any>(cb: F, timeout: number, deps: Array<any>): DebounceDispatch<F>;

/**
 * The debounce hook takes in a callback function and returns a dispatch function that debounces the callback.
 * @param cb The callback function that will be debounced by the returned dispatch.
 * @param deps The dependencies that are watched to keep the callback up to date.
 * @param timeout The period to wait for between the time the dispatch is called and the callback is called. (**default:** `300`)
 * @returns The dispatch function that debounces the callback function as per the timeout.
 */
export function useDebounce<F extends (...args) => any>(cb: F, deps: Array<any>, timeout: number): DebounceDispatch<F>;
export function useDebounce<F extends (...args) => any>(cb: F, ...args) {
  const { number: timeout = 300, array: deps = [] } = argumenter(args);
  const ref = useClosure(() => cb, [cb, timeout, ...deps]);

  return debounce(((...args) => ref.current(...args)) as F, timeout);
}

export default useDebounce;

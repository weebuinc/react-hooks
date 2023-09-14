import '@testing-library/jest-dom';
import { act, renderHook, waitFor } from '@testing-library/react';
import { useCallback, useEffect, useState } from 'react';
import { wait } from '@weebuinc/web-kit';

import { useDebounce } from './useDebounce';

describe('useDebounce unit tests', () => {
  it('debounce without passing in parameters', async () => {
    const cb = jest.fn();
    const { result } = renderHook(() => useDebounce(cb));
    await act(async () => {
      result.current();
      await wait(350);
    });

    await waitFor(() => {
      expect(cb).toBeCalledTimes(1);
    });
  });

  it('debounce with passing in parameters', async () => {
    const cb = jest.fn((name: string, age: number) => {});
    const { result } = renderHook(() => useDebounce(cb));
    const name = 'Jane Doe';
    const age = 38;

    await act(async () => {
      result.current(name, age);
      await wait(350);
    });

    await waitFor(() => {
      expect(cb).toBeCalledTimes(1);
      expect(cb).toBeCalledWith(name, age);
    });
  });

  it('debounce with a specified timeout', async () => {
    const cb = jest.fn();
    const { result } = renderHook(() => useDebounce(cb, 100));
    await act(async () => {
      result.current();
    });

    expect(cb).toBeCalledTimes(0);
    await wait(150);
    expect(cb).toBeCalledTimes(1);
  });

  it('debounce with a change in callback state', async () => {
    const func = jest.fn();

    const { result } = renderHook(() => {
      const [name, setName] = useState('John Doe');
      useEffect(() => {
        setTimeout(() => setName('Jane Doe'), 500);
      }, []);
      const cb = useCallback(() => func(name), [name]);
      return useDebounce(cb);
    });

    await act(async () => {
      result.current();
      await wait(550);
    });

    await act(async () => {
      result.current();
      await wait(350);
    });

    await waitFor(() => {
      expect(func).toBeCalledTimes(2);
      expect(func).toBeCalledWith('John Doe');
      expect(func).toBeCalledWith('Jane Doe');
    });
  });

  it('debounce with a change in dependency state', async () => {
    const func = jest.fn();

    const { result } = renderHook(() => {
      const [name, setName] = useState('John Doe');
      useEffect(() => {
        setTimeout(() => setName('Jane Doe'), 500);
      }, []);
      const cb = () => func(name);
      return useDebounce(cb, [name]);
    });

    await act(async () => {
      result.current();
      await wait(550);
    });

    await act(async () => {
      result.current();
      await wait(350);
    });

    await waitFor(() => {
      expect(func).toBeCalledTimes(2);
      expect(func).toBeCalledWith('John Doe');
      expect(func).toBeCalledWith('Jane Doe');
    });
  });
});

import '@testing-library/jest-dom';
import { act, renderHook, waitFor } from '@testing-library/react';

import { usePatch } from './usePatch';

describe('usePatch unit tests', () => {
  it('set initial state', async () => {
    const initialState = { firstName: 'Jane', lastName: 'Doe' };
    const { result } = renderHook(() => usePatch(initialState));

    await waitFor(() => {
      expect(result.current[0]).toEqual(initialState);
    });
  });

  it('patch state', async () => {
    const initialState = { firstName: 'John', lastName: 'Doe' };
    const { result } = renderHook(() => usePatch(initialState));

    act(() => {
      const [, setState] = result.current;
      setState({ firstName: 'Jane' });
    });

    await waitFor(() => {
      expect(result.current[0]).toEqual({ firstName: 'Jane', lastName: 'Doe' });
    });
  });

  it('reset state', async () => {
    const initialState = { firstName: 'John', lastName: 'Doe' };
    const { result } = renderHook(() => usePatch(initialState));

    act(() => {
      const [, setState] = result.current;
      setState(null);
    });

    await waitFor(() => {
      expect(result.current[0]).toEqual({});
    });
  });
});

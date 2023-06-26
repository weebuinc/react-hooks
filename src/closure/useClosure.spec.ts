import '@testing-library/jest-dom';
import { renderHook, waitFor } from '@testing-library/react';

import { useClosure } from './useClosure';

describe('useClosure unit tests', () => {
  it('return primitive closures', async () => {
    const cb = jest.fn(() => 'Jane Doe');
    const { result } = renderHook(() => useClosure(cb, []));

    await waitFor(() => {
      expect(result.current.current).toBe('Jane Doe');
      expect(cb).toBeCalled();
    });
  });
});

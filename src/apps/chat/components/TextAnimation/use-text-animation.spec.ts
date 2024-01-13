import { renderHook } from '@testing-library/react-hooks';
import { useTextAnimation } from './use-text-animation';

describe('useTextAnimation', () => {
  it('should return empty visibleText and shouldHideCursor=false', () => {
    const { result } = renderHook(() =>
      useTextAnimation({
        text: 'test',
        onTypeEnd: jest.fn(),
        shouldAnimate: true,
      }),
    );
    expect(result.current.visibleText).toEqual('');
    expect(result.current.shouldShowCursor).toEqual(true);
  });
  describe('shouldAnimate=true', () => {
    it('should return visibleText and shouldHideCursor=true', async () => {
      const props: Parameters<typeof useTextAnimation>[0] = {
        text: 'test',
        onTypeEnd: jest.fn(),
        shouldAnimate: true,
      };
      const { result, waitForValueToChange } = renderHook(() =>
        useTextAnimation(props),
      );
      expect(result.current.visibleText).toEqual('');

      await waitForValueToChange(() => result.current.visibleText);
      expect(result.current.visibleText).toEqual('t');
      expect(result.current.shouldShowCursor).toEqual(true);

      await waitForValueToChange(() => result.current.visibleText);
      expect(result.current.visibleText).toEqual('te');
      expect(result.current.shouldShowCursor).toEqual(true);

      await waitForValueToChange(() => result.current.visibleText);
      expect(result.current.visibleText).toEqual('tes');
      expect(result.current.shouldShowCursor).toEqual(true);

      await waitForValueToChange(() => result.current.visibleText);
      expect(result.current.visibleText).toEqual('test');
      expect(result.current.shouldShowCursor).toEqual(false);
    });
    it('should call onTypeEnd when text is fully typed', async () => {
      const props: Parameters<typeof useTextAnimation>[0] = {
        text: 'test',
        onTypeEnd: jest.fn(),
        shouldAnimate: true,
      };
      const { waitFor } = renderHook(() => useTextAnimation(props));
      await waitFor(() => {
        expect(props.onTypeEnd).toBeCalledTimes(1);
      });
    });
  });
  it('should return full text if shouldAnimate=false', () => {
    const { result } = renderHook(() =>
      useTextAnimation({
        text: 'test',
        onTypeEnd: jest.fn(),
        shouldAnimate: false,
      }),
    );
    expect(result.current.visibleText).toEqual('test');
    expect(result.current.shouldShowCursor).toEqual(false);
  });
});

import useDebouncedCallback from "@/hooks/useDebouncedCallback";
import { act, renderHook } from "@testing-library/react";

describe("useDebouncedCallback", () => {
  const wait = 500;
  let func: jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();

    func = jest.fn();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    jest.useRealTimers();
  });

  it("should call the function after the specified wait time", () => {
    const { result } = renderHook(() => useDebouncedCallback(func, wait));

    act(() => {
      result.current("test");
    });

    expect(func).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(wait);
    });

    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith("test");
  });

  it("should reset the timer if called again within the wait time", () => {
    const subTimer = 200;

    const { result } = renderHook(() => useDebouncedCallback(func, wait));

    act(() => {
      result.current("first call");
      jest.advanceTimersByTime(subTimer);
      result.current("second call");
      jest.advanceTimersByTime(wait - subTimer);
      result.current("third call");
    });

    expect(func).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(wait);
    });

    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith("third call");
  });

  it("should not call the function if unmounted before wait time", () => {
    const { unmount } = renderHook(() => useDebouncedCallback(func, wait));

    unmount();

    act(() => {
      jest.advanceTimersByTime(wait);
    });

    expect(func).not.toHaveBeenCalled();
  });

  it("should handle rapid successive calls and only invoke the function once with the last argument", () => {
    const { result } = renderHook(() => useDebouncedCallback(func, wait));

    act(() => {
      result.current("call1");
      result.current("call2");
      result.current("call3");
      result.current("call4");
    });

    act(() => {
      jest.advanceTimersByTime(wait - 1);
    });

    expect(func).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith("call4");
  });

  it("should create a new debounced function when func changes", () => {
    const func2 = jest.fn();

    const { result, rerender } = renderHook(
      ({ func }) => useDebouncedCallback(func, wait),
      {
        initialProps: { func: func },
      }
    );

    act(() => {
      result.current("test1");
    });

    act(() => {
      jest.advanceTimersByTime(wait);
    });

    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith("test1");

    rerender({ func: func2 });

    act(() => {
      result.current("test2");
    });

    act(() => {
      jest.advanceTimersByTime(wait);
    });

    expect(func2).toHaveBeenCalledTimes(1);
    expect(func2).toHaveBeenCalledWith("test2");

    expect(func).toHaveBeenCalledTimes(1);
  });

  it("should create a new debounced function when wait changes", () => {
    let wait = 500;

    const { result, rerender } = renderHook(
      ({ wait }) => useDebouncedCallback(func, wait),
      {
        initialProps: { wait },
      }
    );

    act(() => {
      result.current("test1");
    });

    act(() => {
      jest.advanceTimersByTime(wait);
    });

    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith("test1");

    wait = 1000;
    rerender({ wait });

    act(() => {
      result.current("test2");
    });

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(func).toHaveBeenCalledTimes(1);

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(func).toHaveBeenCalledTimes(2);
    expect(func).toHaveBeenCalledWith("test2");
  });
});

import useHorizontalScroll from "@/hooks/useHorizontalScroll";
import "@testing-library/jest-dom";
import { act, renderHook } from "@testing-library/react";

const fireWheelEvent = (element: HTMLElement, deltaY: number) => {
  const event = new WheelEvent("wheel", {
    deltaY,
    bubbles: true,
    cancelable: true,
  });
  element.dispatchEvent(event);
};

describe("useHorizontalScroll", () => {
  const renderHorizontalScrollHook = (mockDiv: HTMLDivElement) => {
    return renderHook(() => {
      const ref = useHorizontalScroll<HTMLDivElement>();
      ref.current = mockDiv;
      return ref;
    });
  };

  it("returns a ref object", () => {
    const { result } = renderHook(() => useHorizontalScroll<HTMLDivElement>());
    expect(result.current).toHaveProperty("current", null);
  });

  it("does nothing if deltaY is 0", () => {
    const mockDiv = document.createElement("div");
    mockDiv.scrollLeft = 0;
    mockDiv.scrollTo = jest.fn();

    renderHorizontalScrollHook(mockDiv);

    act(() => {
      fireWheelEvent(mockDiv, 0);
    });

    expect(mockDiv.scrollTo).not.toHaveBeenCalled();
    expect(mockDiv.scrollLeft).toBe(0);
  });

  it("attaches and removes the wheel event listener on the ref'd element", () => {
    const mockDiv = document.createElement("div");
    const addEventListenerSpy = jest.spyOn(mockDiv, "addEventListener");
    const removeEventListenerSpy = jest.spyOn(mockDiv, "removeEventListener");

    const { unmount } = renderHorizontalScrollHook(mockDiv);

    expect(addEventListenerSpy).toHaveBeenCalledWith(
      "wheel",
      expect.any(Function)
    );

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "wheel",
      expect.any(Function)
    );
  });

  it("handles wheel events to scroll horizontally", () => {
    const mockDiv = document.createElement("div");
    mockDiv.scrollLeft = 0;
    mockDiv.scrollTo = jest
      .fn()
      .mockImplementation((options: ScrollToOptions) => {
        if (options && options.left) {
          mockDiv.scrollLeft = options.left;
        }
      });

    renderHorizontalScrollHook(mockDiv);

    act(() => {
      fireWheelEvent(mockDiv, 100);
    });

    expect(mockDiv.scrollTo).toHaveBeenCalledWith({
      left: 100,
      behavior: "auto",
    });
    expect(mockDiv.scrollLeft).toBe(100);
  });
});

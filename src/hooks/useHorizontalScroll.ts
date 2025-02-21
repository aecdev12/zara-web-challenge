import { useEffect, useRef } from "react";

const useHorizontalScroll = <T extends HTMLElement>() => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const { current } = ref;
    if (current) {
      const onWheel = (e: WheelEvent) => {
        if (e.deltaY === 0) return;
        e.preventDefault();
        current.scrollTo({
          left: current.scrollLeft + e.deltaY,
          behavior: "auto",
        });
      };

      current.addEventListener("wheel", onWheel);
      return () => current.removeEventListener("wheel", onWheel);
    }
  }, []);

  return ref;
};

export default useHorizontalScroll;

import { useRef, useEffect } from "react";
// import { useScrollTo } from "react-use-window-scroll";

function useChatScroll(dep) {
  const ref = useRef();
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollTop = ref.current.scrollHeight;
    }
  }, [dep]);
  return ref;
}

export default useChatScroll;

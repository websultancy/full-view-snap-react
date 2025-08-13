import { useCallback, useContext } from "react";
import { RootScrollerContext } from "full-view-snap-react";

function PaginationButton({ idx, active }: { idx: number; active: boolean }) {
  // Access scrollToView from RootScrollerContext
  const { scrollToView } = useContext(RootScrollerContext);
  //Define a callback for the onclick,  to uise the scrollToView function but also log whether the context is available
  if (!scrollToView) {
    console.warn("RootScrollerContext is not available, scrollToView will not work.");
  }

  const onClick = useCallback(() => {
    if (scrollToView) {
      scrollToView(idx);
    } else {
      console.warn("scrollToView function is not available.");
    }
  }, [scrollToView, idx]);
  return (
    <button
      style={{
        margin: "0 0.25rem",
        color: active ? "#ffffff" : "#cccccc",
        padding: "0.5rem 1rem",
        borderRadius: 4,
        border: active ? "2px solid #007bff" : "1px solid #ccc",
        background: active ? "#000000" : "#303030",
        fontWeight: active ? "bold" : "normal",
        cursor: "pointer",
      }}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
    >
      {idx + 1}
    </button>
  );
}

export default PaginationButton;
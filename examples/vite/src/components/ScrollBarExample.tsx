import React, { type CSSProperties } from "react";

interface ScrollBarExampleProps {
  scrollPercent: number; // 0-100
  rootScrollerRef?: React.RefObject<HTMLDivElement | HTMLElement | null> | null;
  height?: number | string;
}

const containerStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  right: 0,
  width: "8px",
  height: "100vh",
  pointerEvents: "none",
  zIndex: 9999,
};

const customScrollbarTrack: CSSProperties = {
  position: "absolute",
  top: 0,
  right: 2,
  width: "8px",
  height: "100%",
  background: "rgba(40,40,60,0.12)",
  borderRadius: "6px",
  pointerEvents: "none",
  boxShadow: "0 0 4px 0 rgba(0,0,0,0.08) inset",
};

const customScrollbarThumb: CSSProperties = {
  position: "absolute",
  left: 0,
  width: "100%",
  background: "linear-gradient(135deg, #5a7cff 0%, #3e54a3 100%)",
  borderRadius: "6px",
  minHeight: "36px",
  transition: "background 0.2s, box-shadow 0.2s",
  pointerEvents: "none",
  opacity: 0.85,
  boxShadow: "0 2px 8px 0 rgba(90,124,255,0.15)",
  border: "2px solid rgba(255,255,255,0.5)",
};

export const ScrollBarExample: React.FC<ScrollBarExampleProps> = ({
  scrollPercent,
  rootScrollerRef,
  height = "100%",
}) => {
  // Hide native scrollbars on html element via JS
  React.useEffect(() => {
    const html = document.documentElement;
    const prevScrollbarWidth = html.style.scrollbarWidth;
    // @ts-expect-error not defined in types
    const prevMsOverflowStyle = (html.style)["msOverflowStyle"];
    // @ts-expect-error not defined in types
    const prevWebkitScrollbar = (html).style["-webkit-scrollbar"];

    html.style.scrollbarWidth = "none";
    // @ts-expect-error not defined in types
    (html.style)["msOverflowStyle"] = "none";
    // @ts-expect-error not defined in types
    html.style["-webkit-scrollbar"] = "none";

    return () => {
      html.style.scrollbarWidth = prevScrollbarWidth;
      // @ts-expect-error not defined in types
      (html.style)["msOverflowStyle"] = prevMsOverflowStyle;
      // @ts-expect-error not defined in types
      html.style["-webkit-scrollbar"] = prevWebkitScrollbar;
    };
  }, []);

  // Calculate thumb height and position based on rootScrollerRef
  const [thumbHeight, setThumbHeight] = React.useState(30);
  const [thumbTop, setThumbTop] = React.useState(0);

  React.useEffect(() => {
    const scroller = rootScrollerRef?.current || document.documentElement;
    const visible =
      "clientHeight" in scroller
        ? (scroller as HTMLElement).clientHeight
        : window.innerHeight;
    const total =
      "scrollHeight" in scroller
        ? (scroller as HTMLElement).scrollHeight
        : document.documentElement.scrollHeight;
    const ratio = visible / total;
    const thumbH = Math.max(visible * ratio, 30);
    setThumbHeight(thumbH);

    // Clamp scrollPercent between 0 and 100
    const percent = scrollPercent
    const maxThumbTop = visible - thumbH;
    setThumbTop(percent * maxThumbTop);
  }, [scrollPercent, height, rootScrollerRef]);

  return (
    <div style={{ ...containerStyle, height }}>
      <div style={customScrollbarTrack}>
        <div
          style={{
            ...customScrollbarThumb,
            height: thumbHeight,
            top: thumbTop,
          }}
        />
      </div>
    </div>
  );
};

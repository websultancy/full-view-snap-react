"use client";

import { useContext } from "react";
import { FullViewSnapContext } from "full-view-snap-react";
import type { RootScrollerContextProps } from "../../../../src/components/RootScrollerContext";

interface FullViewSnapDebuggerProps {
  currentView: number;
  totalViews: number;
  scrollPercentage: number;
  contentScrollPercentage: number;
  rootScrollerContext: RootScrollerContextProps;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

function FullViewSnapDebugger({
  currentView,
  totalViews,
  scrollPercentage,
  contentScrollPercentage,
  rootScrollerContext,
  position = "top-right",
}: FullViewSnapDebuggerProps) {
  const { contextState } = useContext(FullViewSnapContext);

  const positionStyles = {
    "top-left": { top: "20px", left: "20px" },
    "top-right": { top: "20px", right: "20px" },
    "bottom-left": { bottom: "20px", left: "20px" },
    "bottom-right": { bottom: "20px", right: "20px" },
  };

  const formatValue = (value: any): string => {
    if (value === null) return "null";
    if (value === undefined) return "undefined";
    if (typeof value === "function") return "function()";
    if (typeof value === "object") {
      if (Array.isArray(value)) {
        return `Array[${value.length}]`;
      }
      if (value.current !== undefined) {
        return "RefObject";
      }
      return "Object";
    }
    if (typeof value === "number") {
      return value.toFixed(2);
    }
    return String(value);
  };

  const getRootScrollerContextInfo = () => {
    if (!rootScrollerContext) return {};
    return {
      rootScrollerRef: rootScrollerContext.rootScrollerRef
        ? "RefObject"
        : "null",
      isFixedViewport: formatValue(rootScrollerContext.isFixedViewport),
      scrollToView: rootScrollerContext.scrollToView ? "function()" : "undefined",
      slideRefs: rootScrollerContext.slideRefs
        ? `Array[${rootScrollerContext.slideRefs.length}]`
        : "undefined",
      setSlideRefs: rootScrollerContext.setSlideRefs ? "function()" : "undefined",
      suspendScrollSnap: rootScrollerContext.suspendScrollSnap
        ? "function()"
        : "undefined",
      instateScrollSnap: rootScrollerContext.instateScrollSnap
        ? "function()"
        : "undefined",
    };
  };

  const rootContextInfo = getRootScrollerContextInfo();

  return (
    <div
      style={{
        position: "fixed",
        ...positionStyles[position],
        zIndex: 1000,
        background: "rgba(0, 0, 0, 0.9)",
        color: "#fff",
        padding: "1rem",
        borderRadius: "8px",
        fontFamily: "monospace",
        fontSize: "0.85rem",
        maxWidth: "400px",
        maxHeight: "80vh",
        overflow: "auto",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      <div
        style={{
          marginBottom: "0.75rem",
          paddingBottom: "0.75rem",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
          fontWeight: "bold",
          fontSize: "1rem",
        }}
      >
        🔍 FullViewSnap Debugger
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <div style={{ fontWeight: "bold", marginBottom: "0.5rem", color: "#4facfe" }}>
          Render Props:
        </div>
        <div style={{ marginLeft: "0.5rem" }}>
          <div style={{ marginBottom: "0.25rem" }}>
            <span style={{ color: "#888" }}>currentView:</span>{" "}
            <span style={{ color: "#43e97b" }}>{currentView}</span>
          </div>
          <div style={{ marginBottom: "0.25rem" }}>
            <span style={{ color: "#888" }}>totalViews:</span>{" "}
            <span style={{ color: "#43e97b" }}>{totalViews}</span>
          </div>
          <div style={{ marginBottom: "0.25rem" }}>
            <span style={{ color: "#888" }}>scrollPercentage:</span>{" "}
            <span style={{ color: "#43e97b" }}>{formatValue(scrollPercentage)}%</span>
          </div>
          <div style={{ marginBottom: "0.25rem" }}>
            <span style={{ color: "#888" }}>contentScrollPercentage:</span>{" "}
            <span style={{ color: "#43e97b" }}>
              {formatValue(contentScrollPercentage)}%
            </span>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <div style={{ fontWeight: "bold", marginBottom: "0.5rem", color: "#f5576c" }}>
          rootScrollerContext:
        </div>
        <div style={{ marginLeft: "0.5rem" }}>
          {Object.entries(rootContextInfo).map(([key, value]) => (
            <div key={key} style={{ marginBottom: "0.25rem" }}>
              <span style={{ color: "#888" }}>{key}:</span>{" "}
              <span style={{ color: "#fee140" }}>{String(value)}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <div style={{ fontWeight: "bold", marginBottom: "0.5rem", color: "#f093fb" }}>
          FullViewSnapContext:
        </div>
        <div style={{ marginLeft: "0.5rem" }}>
          <div style={{ marginBottom: "0.25rem" }}>
            <span style={{ color: "#888" }}>contextState.currentIndex:</span>{" "}
            <span style={{ color: "#43e97b" }}>{contextState.currentIndex}</span>
          </div>
          <div style={{ marginBottom: "0.25rem" }}>
            <span style={{ color: "#888" }}>contextState.totalViews:</span>{" "}
            <span style={{ color: "#43e97b" }}>{contextState.totalViews}</span>
          </div>
          <div style={{ marginBottom: "0.25rem" }}>
            <span style={{ color: "#888" }}>contextState.currentScrollPercentage:</span>{" "}
            <span style={{ color: "#43e97b" }}>
              {formatValue(contextState.currentScrollPercentage)}%
            </span>
          </div>
          <div style={{ marginBottom: "0.25rem" }}>
            <span style={{ color: "#888" }}>
              contextState.currentContentScrollPercentage:
            </span>{" "}
            <span style={{ color: "#43e97b" }}>
              {formatValue(contextState.currentContentScrollPercentage)}%
            </span>
          </div>
          <div style={{ marginBottom: "0.25rem" }}>
            <span style={{ color: "#888" }}>contextState.edgeSpacerRef:</span>{" "}
            <span style={{ color: "#fee140" }}>
              {contextState.edgeSpacerRef ? "RefObject" : "undefined"}
            </span>
          </div>
          <div style={{ marginBottom: "0.25rem" }}>
            <span style={{ color: "#888" }}>updateContextState:</span>{" "}
            <span style={{ color: "#fee140" }}>function()</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FullViewSnapDebugger;


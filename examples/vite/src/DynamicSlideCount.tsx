import { useState } from "react";
import { FullViewSnap, FullView, Controller } from "full-view-snap-react";
import "./Basic.css";
import FullViewSnapDebugger from "./components/FullViewSnapDebugger";

const colors = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #30cfd0 0%, #330867 100%)",
  "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
  "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)",
];

function DynamicSlideCount() {
  const [slideCount, setSlideCount] = useState(3);

  const addSlide = () => {
    setSlideCount((prev) => Math.min(prev + 1, 8));
  };

  const removeSlide = () => {
    setSlideCount((prev) => Math.max(prev - 1, 1));
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 100,
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          background: "rgba(0, 0, 0, 0.85)",
          padding: "1rem 1.5rem",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
        }}
      >
        <button
          onClick={removeSlide}
          disabled={slideCount <= 1}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            borderRadius: "4px",
            border: "none",
            background: slideCount <= 1 ? "#666" : "#f5576c",
            color: "white",
            cursor: slideCount <= 1 ? "not-allowed" : "pointer",
            fontWeight: "bold",
          }}
        >
          − Remove Slide
        </button>
        <div
          style={{
            color: "white",
            fontSize: "1.1rem",
            fontWeight: "bold",
            minWidth: "120px",
            textAlign: "center",
          }}
        >
          Slides: {slideCount}
        </div>
        <button
          onClick={addSlide}
          disabled={slideCount >= 8}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            borderRadius: "4px",
            border: "none",
            background: slideCount >= 8 ? "#666" : "#43e97b",
            color: "white",
            cursor: slideCount >= 8 ? "not-allowed" : "pointer",
            fontWeight: "bold",
          }}
        >
          + Add Slide
        </button>
      </div>
      <FullViewSnap
        hideScrollBars={true}
        render={(currentView, totalViews, scrollPercentage, contentScrollPercentage, rootScrollerContext) => (
          <>
            <FullViewSnapDebugger
              currentView={currentView}
              totalViews={totalViews}
              scrollPercentage={scrollPercentage}
              contentScrollPercentage={contentScrollPercentage}
              rootScrollerContext={rootScrollerContext}
              position="top-right"
            />
            <div
              style={{
                position: "fixed",
                top: "90px",
                left: "50%",
                transform: "translateX(-50%)",
                zIndex: 10,
                background: "rgba(0, 0, 0, 0.85)",
                padding: "0.5rem 1rem",
                borderRadius: "8px",
                color: "white",
                fontSize: "0.9rem",
              }}
            >
              View {currentView + 1} of {totalViews}
            </div>
            <Controller>
              {Array.from({ length: slideCount }, (_, index) => (
                <FullView key={index}>
                  <div
                    className="full-view-wrapper"
                    style={{
                      background: colors[index % colors.length],
                    }}
                  >
                    <div className="full-view-wrapper-content">
                      <h1 style={{ fontSize: "3rem", marginBottom: "1rem", color: "white" }}>
                        Slide {index + 1}
                      </h1>
                      <p style={{ fontSize: "1.2rem", color: "white", textAlign: "center", maxWidth: "600px" }}>
                        This slide was {index === 0 ? "created" : "added"} dynamically. 
                        Use the buttons above to add or remove slides and see how the snap behavior adapts!
                      </p>
                    </div>
                  </div>
                </FullView>
              ))}
            </Controller>
          </>
        )}
      />
    </>
  );
}

export default DynamicSlideCount;


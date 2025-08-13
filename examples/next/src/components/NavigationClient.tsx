'use client';

import { FullViewSnap, FullView, Controller } from "full-view-snap-react";

import "./Basic.css";

import PaginationButton from "./PaginationButton";

export default function NavigationClient() {
  return (
    <FullViewSnap
      render={(
        currentView,
        totalViews,
        _scrollPercentage,
        _contentScrollPercentage,
        rootScrollerContext
      ) => (
        <>
        {/* End fixed item */}
        {/* Fixed pagination buttons */}
        <div
          style={{
            position: "fixed",
            top: "max(70px, 10vh)",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            justifyContent: "center",
            gap: "0.5rem",
            zIndex: 10,
            pointerEvents: "none",
          }}
        >
          <div style={{ alignItems: "center", display: "inline-flex", justifyContent: "center", pointerEvents: "auto", background: "rgba(0, 0, 0, 0.85)", borderRadius: 8, padding: "0.5rem 1rem", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
            {[...Array(totalViews)].map((_, idx) => (
              <PaginationButton key={idx} idx={idx} active={idx === currentView} />
            ))}
          </div>
        </div>
        {/* End fixed pagination buttons */}
        <Controller>
          <FullView>
            <div className="full-view-wrapper">
              <div className="full-view-wrapper-content">
                <p>Just call the <code>scrollToView</code> function within the <code>rootScrollerContext</code> render prop with the <code>index</code> of the view you want to scroll to.</p>
                <a
                  style={{cursor: "pointer"}}
                  onClick={() => {
                    if (rootScrollerContext && typeof rootScrollerContext.scrollToView === "function") {
                      rootScrollerContext.scrollToView(1);
                    }
                  }}
                >
                  <p><code>{`rootScrollerContext.scrollToView(1)`}</code></p>
                </a>
              </div>
            </div>
          </FullView>
          <FullView>
            <div className="full-view-wrapper">
              <div className="full-view-wrapper-content">
                <p>Have a deep nested structure?<br/>
                A context is wrapped around everything beneath the <code>FullViewSnap</code> component</p>
              </div>
            </div>
          </FullView>
          <FullView>
            <div className="full-view-wrapper">
              <div className="full-view-wrapper-content">
                <p>Simply<br/><code>{`import { RootScrollerContext } from 'full-view-snap-react'`}</code></p>
              </div>
            </div>
          </FullView>
          <FullView>
            <div className="full-view-wrapper">
              <div className="full-view-wrapper-content">
                <p>And obtain the function<br/><code>{`const { scrollToView } = useContext(RootScrollerContext);`}</code></p>
              </div>
            </div>
          </FullView>
          <FullView>
            <div className="full-view-wrapper">
              <div className="full-view-wrapper-content">
                <p>
                  Then scroll to the desired view by passing the index:
                  <br />
                  <code>{`scrollToView(index)`}</code>
                </p>
              </div>
            </div>
          </FullView>
          <FullView>
            <div className="full-view-wrapper">
              <div className="full-view-wrapper-content">
                <p>See<br/><code>examples/vite/src/components/PaginationButton.tsx</code><br/>for an example implementation</p>
              </div>
            </div>
          </FullView>
        </Controller>
        </>
      )}
    />
  );
}

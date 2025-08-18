"use client";

import { FullViewSnap, FullView, Controller, FullViewSnapContext } from "full-view-snap-react";
import React, { useEffect, useMemo, createRef, useRef, useContext } from "react";
import "../Basic.css";

export default function BasicClient() {
  // Use context
  const { contextState } = useContext(FullViewSnapContext);
  //Create a ref for the 1st FullView
  const fullViewRef1 = useRef<HTMLDivElement>(null);
  // Create an array of refs matching the number of FullView components
  const fullViewRefs = useMemo(
    () => Array.from({ length: 5 }, () => createRef<HTMLDivElement>()),
    []
  );

  // Keep edgeSpacerRef.current up to date with contextState.edgeSpacerRef?.current
  useEffect(() => {
    console.log("edgeSpacerRef", contextState);
  }, [contextState.edgeSpacerRef]);

  // Log refs once on mount
  useEffect(() => {
    console.log(fullViewRef1);
  }, [fullViewRef1]);

  return (
    <FullViewSnap
      hideScrollBars={true}
      render={(
        currentView,
        totalViews,
        scrollPercentage,
        contentScrollPercentage
      ) => (
        <>
          <FullViewSnapContext.Consumer>
            {({ contextState }) => (
              <div className="full-view-stats" style={{ top: 0, right: 0, position: "fixed", zIndex: 9999 }}>
                <div>Context currentIndex: {contextState.currentIndex}</div>
              </div>
            )}
          </FullViewSnapContext.Consumer>
          {/* This is a fixed item,  make sure it renders beneath the <Controller/> otherwise it will block scrolling */}
          <div className="full-view-stats">
            <div className="full-view-stat-container">
              <div className="full-view-stat-title">currentView</div>
              <div className="full-view-stat-value">{currentView}</div>
            </div>
            <div className="full-view-stat-container">
              <div className="full-view-stat-title">totalViews</div>
              <div className="full-view-stat-value">{totalViews}</div>
            </div>
            <div className="full-view-stat-container">
              <div className="full-view-stat-title">contentScrollPercentage</div>
              <div className="full-view-stat-value">{Number(contentScrollPercentage).toFixed(2)}</div>
            </div>
            <div className="full-view-stat-container">
              <div className="full-view-stat-title">scrollPercentage</div>
              <div className="full-view-stat-value">{Number(scrollPercentage).toFixed(2)}</div>
            </div>
          </div>
          {/* End fixed item */}
          <Controller>
            <FullView ref={(ref) => {console.log(ref)}}>
              <div className="full-view-wrapper">
                <div className="full-view-wrapper-content">
                  <p>The render props can be used for various purposes</p>
                </div>
              </div>
            </FullView>
            <FullView>
              <div className="full-view-wrapper">
                <div className="full-view-wrapper-content">
                  <p><i>currentView</i><br/>could be used for <a href="/navigation">pagination indicators</a></p>
                </div>
              </div>
            </FullView>
            <FullView>
              <div className="full-view-wrapper">
                <div className="full-view-wrapper-content">
                  <p><i>totalViews</i><br/>can be used to determine the amount of <a href="/navigation">pagination dots</a></p>
                </div>
              </div>
            </FullView>
            <FullView>
              <div className="full-view-wrapper">
                <div className="full-view-wrapper-content">
                  <p>
                    <i>contentScrollPercentage</i><br/>content scroll percentage can be used for a scroll, progress bar or even a <a href="/animated">custom animation</a>
                    <br />
                  </p>
                </div>
              </div>
            </FullView>
            <FullView>
              <div className="full-view-wrapper">
                <div className="full-view-wrapper-content">
                  <p><i>scrollPercentage</i><br/>includes the overscroll spacing to give you more visual flexibility</p>
                </div>
              </div>
            </FullView>
          </Controller>
        </>
      )}
    />
  );
}

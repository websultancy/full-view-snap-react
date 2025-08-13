"use client";

import { FullViewSnap, FullView, Controller } from "full-view-snap-react";
import "../Basic.css";

export default function BasicClient() {
  return (
    <FullViewSnap
      render={(
        currentView,
        totalViews,
        scrollPercentage,
        contentScrollPercentage
      ) => (
        <>
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
            <FullView>
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

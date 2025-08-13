"use client";

import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import RootScrollerContext from "./RootScrollerContext";
import { useSize } from "../hooks/useSize";
import { FullViewSnapContext } from "./FullViewSnap";

interface RootScrollerProps {
  children: React.ReactNode;
}

const RootScroller: React.FC<RootScrollerProps> = ({ children }) => {
  const viewportMaxHeightRef = useRef<HTMLDivElement>(null);
  const viewportMinHeightRef = useRef<HTMLDivElement>(null);

  const maxHeight = useSize(viewportMaxHeightRef).height;
  const minHeight = useSize(viewportMinHeightRef).height;

  //Define a state for if we want to fix the viewport or not
  const [isFixedViewport, setIsFixedViewport] = useState(false);

  // State for slide refs
  const [slideRefs, setSlideRefs] = useState<React.RefObject<HTMLDivElement | null>[]>([]);
  const slideRefsRef = useRef(slideRefs);

  // Update slideRefsRef when slideRefs changes
  useEffect(() => {
    slideRefsRef.current = slideRefs;
  }, [slideRefs]);

  // Create a ref for the root scroller element
  const rootScrollerRef = React.useRef<HTMLDivElement | HTMLElement>(null) as React.MutableRefObject<HTMLDivElement | HTMLElement>;

  // Create a ref for the fixed scroller
  const fixedScrollerRef = React.useRef<HTMLDivElement | HTMLElement>(null) as React.MutableRefObject<HTMLDivElement | HTMLElement>;

  // Ref for suspendScrollSnap timeout
  const suspendScrollSnapTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Create a callback function to suspend scroll snapping for a specified duration
  const suspendScrollSnap = useCallback((duration: number = 1000) => {

      document.documentElement.classList.remove("FVS-snap-y", "FVS-snap-mandatory");
      if(fixedScrollerRef.current) {
        fixedScrollerRef?.current.classList.remove("FVS-snap-y", "FVS-snap-mandatory");
      }
      // Clear any previous timeout
      if (suspendScrollSnapTimeoutRef.current) {
        clearTimeout(suspendScrollSnapTimeoutRef.current);
        suspendScrollSnapTimeoutRef.current = null;
      }
      if(duration !== -1) {
        suspendScrollSnapTimeoutRef.current = setTimeout(() => {
          if(fixedScrollerRef.current) {
            fixedScrollerRef.current.classList.add("FVS-snap-y", "FVS-snap-mandatory");
          }else{
            document.documentElement.classList.add("FVS-snap-y", "FVS-snap-mandatory");
          }
        }, duration);
      }
  
  }, []);

  // Hydration effect to ensure the component is ready for interaction
  const instateScrollSnap = useCallback(() => {
      document.documentElement.classList.add("FVS-snap-y", "FVS-snap-mandatory");
      if(fixedScrollerRef.current) {
        fixedScrollerRef.current.classList.add("FVS-snap-y", "FVS-snap-mandatory");
      }
  }, []);

  const scrollToView = useCallback((index:number, speed:number = 0) => {
    suspendScrollSnap(); //
    if (rootScrollerRef && rootScrollerRef?.current && slideRefsRef.current.length > 0) {
      const scroller = rootScrollerRef.current === document.documentElement ? window : rootScrollerRef.current;
      const slideTopPosition = slideRefsRef.current[index]?.current?.offsetTop || 0;
      //Tempormarally remove the snapping classes then scroll to the slide after a few milliseconds
      if(speed != -1){
        scroller.scrollTo({
          top: slideTopPosition,
          behavior: "smooth",
        });
      }else{
        //Instantly jump the scroll to the slide position
        scroller.scrollTo({
          top: slideTopPosition,
          behavior: "auto",
        });
      }
    }
  }, []);

  //

  useEffect(() => {

    // First we check if the minHeights and maxHeights have been picked if (if not, the device probably doesn't support lvh and svh)
    if (minHeight > 0 && maxHeight > 0) {

      // If the device does support them,  can It tell the fdifference between lvh and svh?
      if (minHeight !== maxHeight) {
        //These devices are known to correctly honour LVH & SVH
        setIsFixedViewport(false);
      }else{
        //The device doen't know the difference between lvh and svh, so we'll play it safe and set the viewport to fixed
        setIsFixedViewport(true);
      }

    } else{
      //Setting the viewport to fixed is like a safe mode
      setIsFixedViewport(true);
    }

  }, [minHeight, maxHeight]);

  // Cleanup effect to remove classes on unmount
  useEffect(() => {
    return () => {
      document.documentElement.classList.remove("FVS-snap-y", "FVS-snap-mandatory");
      document.documentElement.style.overflow = ""; // Reset overflow style
    };
  }, []);

  useEffect(() => {
    rootScrollerRef.current = document.documentElement;
    if(isFixedViewport){
      rootScrollerRef.current.classList.remove("FVS-snap-y", "FVS-snap-mandatory");
      rootScrollerRef.current = fixedScrollerRef.current; // Set to the root document scroll element
    }else{// Set to the root document scroll element
      rootScrollerRef.current.classList.add("FVS-snap-y", "FVS-snap-mandatory");
      rootScrollerRef.current.style.overflow = "hidden"; // Temporarily disable scrolling
      setTimeout(() => {
        rootScrollerRef.current.style.overflow = "auto"; // Temporarily disable scrolling
      }, 500); // Delay to ensure Safari recalculates layout
    }
  }, [isFixedViewport]);

  // Load FullViewSnapContext
  const { updateContextState, contextState } = useContext(FullViewSnapContext);

  // Update contextStateProps.rootScrollerContext from within RootScroller
  useEffect(() => {
    updateContextState({
      ...contextState,
      rootScrollerContext: {
        rootScrollerRef,
        setSlideRefs,
        scrollToView,
        isFixedViewport,
        suspendScrollSnap,
        instateScrollSnap
      }
    });
  }, [
    rootScrollerRef,
    setSlideRefs,
    scrollToView,
    isFixedViewport,
    suspendScrollSnap,
    instateScrollSnap,
  ]);

  return (
    <RootScrollerContext.Provider
      value={{
        rootScrollerRef: rootScrollerRef,
        setSlideRefs: setSlideRefs,
        scrollToView: scrollToView,
        isFixedViewport: isFixedViewport,
        suspendScrollSnap,      // Expose suspendScrollSnap
        instateScrollSnap       // Expose instateScrollSnap
      } as const}
    >
      <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "0%",
          height: "100lvh",
          pointerEvents: "none",
          textAlign: "right",
        }}
        ref={viewportMaxHeightRef}
      />
      <div
        style={{
          position: "fixed",
          top: "0",
          left: 0,
          width: "0%",
          height: "100svh",
          textAlign: "right",
          pointerEvents: "none",
        }}
        ref={viewportMinHeightRef}
      />
        {isFixedViewport ? (
          <>
            <div
              ref={fixedScrollerRef as React.RefObject<HTMLDivElement>}
              className="FVS-overflow-x-hidden FVS-overflow-y-scroll FVS-h-[100dvh] FVS-snap-y FVS-snap-mandatory FVS-w-screen"
            >
              <div id={"FVS-fixed-viewport-wrapper"} className="FVS-relative">{children}</div>
            </div>
          </>

        ) : (
          <>{children}</> 
        )}
      </>
    </RootScrollerContext.Provider>
  );
};

export default RootScroller;

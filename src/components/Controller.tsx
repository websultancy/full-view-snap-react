"use client";

import React, { useCallback, useContext, useEffect } from "react";
import RootScrollerContext from "./RootScrollerContext";
import { FullViewSnapContext } from "./FullViewSnap";
import EdgeSpacer from "./EdgeSpacer";

import type { contextStateProps } from "./FullViewSnap";

interface FullViewSnapControllerProps {
  children: React.ReactNode;
  shouldBeVisible?: boolean;
}

const FullViewSnapController: React.FC<FullViewSnapControllerProps> = ({
  children,
}) => {
  //Get the context for the FullViewSnapContext
  const topSpacerRef = React.useRef<HTMLDivElement | null>(null);
  const endSpacerRef = React.useRef<HTMLDivElement>(null);

  const rootScroller = useContext(RootScrollerContext);

  const currentTotalViewsRef = React.useRef<number>(0);

  const setSlideRefs = useContext(RootScrollerContext).setSlideRefs;

  const dummyLvhDiv = React.useRef<HTMLDivElement>(null);

  //Get the context for the FullViewSnapContext
  const { contextState, updateContextState } = useContext(FullViewSnapContext);

  const contextStateRef = React.useRef<contextStateProps>(contextState);

  const allChildren = React.Children.toArray(children);
  const fullViewChildren = allChildren.filter((child) => {
    if (!React.isValidElement(child)) return false;
    return (child as any).type?.displayName === "FullView";
  });

  const fullViewRefs = React.useRef<Array<React.RefObject<HTMLDivElement>>>([]);

  if (fullViewRefs.current.length !== fullViewChildren.length) {
    fullViewRefs.current = fullViewChildren.map(() =>
      React.createRef<HTMLDivElement>()
    );
  }

  //Define a callback that acts as the event listener for the scroll event on the root scroller
  const updateScrollContext = useCallback(() => {
    if (
      !rootScroller.rootScrollerRef?.current ||
      currentTotalViewsRef.current <= 0
    ) {
      return;
    }

    const scrollerEl = rootScroller.rootScrollerRef.current;
    const isDocumentScroller = scrollerEl === document.documentElement;
    const childCount = fullViewChildren.length;

    if (!rootScroller.enabled) {
      const scrollTop = isDocumentScroller
        ? window.scrollY
        : scrollerEl.scrollTop;
      const scrollHeight = isDocumentScroller
        ? document.documentElement.scrollHeight
        : scrollerEl.scrollHeight;
      const clientHeight = isDocumentScroller
        ? window.innerHeight
        : scrollerEl.clientHeight;
      const maxScroll = Math.max(scrollHeight - clientHeight, 1);
      const scrollPercentage = scrollTop / maxScroll;

      let newIndex = 0;
      const midpoint = clientHeight * 0.5;
      fullViewRefs.current.forEach((slideRef, index) => {
        const slideEl = slideRef.current;
        if (!slideEl) return;
        const { top } = slideEl.getBoundingClientRect();
        if (top <= midpoint) {
          newIndex = index;
        }
      });

      const contentScrollPercentage =
        childCount > 1 ? newIndex / (childCount - 1) : 1;

      updateContextState({
        ...contextStateRef.current,
        currentScrollPercentage: scrollPercentage,
        currentContentScrollPercentage: contentScrollPercentage,
        totalViews: currentTotalViewsRef.current,
        currentIndex: newIndex,
        edgeSpacerRef: topSpacerRef,
      });
      return;
    }

    //Get the total scroll through percentage and log it
    if (
      rootScroller?.rootScrollerRef &&
      dummyLvhDiv.current !== null
    ) {
      //We want to exculude the buffer spacers for the calculation

      const topSpacerHeight = topSpacerRef.current?.clientHeight || 0;
      const bottomSpacerHeight = endSpacerRef.current?.clientHeight || 0;

      const scrollTop = rootScroller?.rootScrollerRef.current?.scrollTop;
      const contentScrollTop = scrollTop - topSpacerHeight || 0;

      //Get the lvh value and store it in a variable

      const scrollBottom =
        rootScroller?.rootScrollerRef.current?.scrollHeight -
        dummyLvhDiv.current?.clientHeight;

      const contentScrollBottom =
        scrollBottom - bottomSpacerHeight - topSpacerHeight;

      const scrollPercentage = scrollTop / scrollBottom;

      //Clone contextState and update the currentScrollPercentage

      const contentScrollPercentage = (currentTotalViewsRef.current > 1) ? contentScrollTop / contentScrollBottom : 1;

      //Use the scroll percentage to calculate the current index based on the number of FullView children
      const newIndex = Math.round(contentScrollPercentage * (childCount - 1));

      const newState: contextStateProps = {
        ...contextStateRef.current,
        currentScrollPercentage: scrollPercentage,
        currentContentScrollPercentage: contentScrollPercentage,
        totalViews: currentTotalViewsRef.current,
        currentIndex: newIndex,
        edgeSpacerRef: topSpacerRef, // already present
      };

      updateContextState(newState);
    }
  }, [rootScroller, fullViewChildren.length, updateContextState]);

  useEffect(() => {
    if (rootScroller.rootScrollerRef?.current) {
      const newTotalViews = React.Children.count(fullViewChildren);
      const scroller =
        rootScroller.rootScrollerRef.current === document.documentElement
          ? window
          : rootScroller.rootScrollerRef.current;

      // Attach the scroll event listener
      scroller.addEventListener("scroll", updateScrollContext);
      // Compare the current total views state with the new total views
      if (currentTotalViewsRef.current !== newTotalViews) {
        currentTotalViewsRef.current = newTotalViews;
        updateScrollContext();
      }

      // Cleanup function to remove the event listener
      return () => {
        scroller.removeEventListener("scroll", updateScrollContext);
      };
    }
  }, [rootScroller, fullViewChildren.length]);

  useEffect(() => {
    contextStateRef.current = contextState;
  }, [contextState]);

  // Process all children - FullView gets refs, StickyView passes through
  const childrenWithRefs = allChildren.map((child, idx) => {
    if (React.isValidElement(child)) {
      const displayName = (child as any).type?.displayName;
      if (displayName === "FullView") {
        // Find the index of this FullView in the fullViewChildren array
        let fullViewIdx = -1;
        for (let i = 0; i < fullViewChildren.length; i++) {
          if (fullViewChildren[i] === child) {
            fullViewIdx = i;
            break;
          }
        }
        // Instead of touching element.ref (React 19), pass controller's ref via an explicit prop
        return React.cloneElement(child as React.ReactElement<any>, {
          key: child.key ?? idx,
          internalRef: fullViewRefs.current[fullViewIdx],
        });
      } else if ((child as any).type?.displayName === "StickyView") {
        // StickyView doesn't need refs, just return as is
        return child;
      }
    }
    return child;
  });

  useEffect(() => {
    // Update the context state with the new total views
    if (fullViewRefs.current)
      setSlideRefs(fullViewRefs.current);
  }, [fullViewChildren.length]);

  //Add a buffer space div each side of the children to allow a nice snap buffer effect
  const finalChildren = [
    <EdgeSpacer ref={topSpacerRef} key="start-spacer" />,
    ...childrenWithRefs,
    <EdgeSpacer ref={endSpacerRef} key="end-spacer" />
  ];
  
  return (
    <>
      {/* Create a div that has a 100lvh so we can store that height in a vairalbe */}
      <div
        ref={dummyLvhDiv}
        className={
          rootScroller.enabled
            ? "FVS-w-[100%] FVS-h-[100lvh] FVS-absolute FVS-top-0 FVS-left-0 FVS-pointer-events-none FVS-z-[-1]"
            : "FVS-absolute FVS-top-0 FVS-left-0 FVS-pointer-events-none FVS-z-[-1]"
        }
      />
      {finalChildren}
    </>
  );
};

export default FullViewSnapController;
FullViewSnapController.displayName = "FullViewSnapController";

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

  const setSlideRefs = useContext(RootScrollerContext).setSlideRefs;

  const dummyLvhDiv = React.useRef<HTMLDivElement>(null);

  //Get the context for the FullViewSnapContext
  const { contextState, updateContextState } = useContext(FullViewSnapContext);

  const contextStateRef = React.useRef<contextStateProps>(contextState);
  
  //Define a callback that acts as the event listener for the scroll event on the root scroller
  const updateScrollContext = useCallback(() => {

    //Get the total scroll through percentage and log it
    if (
      rootScroller.rootScrollerRef?.current !== null &&
      rootScroller?.rootScrollerRef &&
      dummyLvhDiv.current !== null &&
      contextState.totalViews > 1
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

      const contentScrollPercentage = contentScrollTop / contentScrollBottom;

      //Use the scroll percentage to calculate the current index based on the number of children
      const childCount = React.Children.count(children);
      const newIndex = Math.round(contentScrollPercentage * (childCount - 1));

      const newState: contextStateProps = {
        ...contextStateRef.current,
        currentScrollPercentage: scrollPercentage,
        currentContentScrollPercentage: contentScrollPercentage,
        currentIndex: newIndex,
        edgeSpacerRef: topSpacerRef, // already present
      };

      updateContextState(newState);
    }
  }, [rootScroller]);

  useEffect(() => {
    if (rootScroller.rootScrollerRef?.current) {
      const scroller =
        rootScroller.rootScrollerRef.current === document.documentElement
          ? window
          : rootScroller.rootScrollerRef.current;

      // Attach the scroll event listener
      scroller.addEventListener("scroll", updateScrollContext);

      contextState.totalViews = React.Children.count(children);

      // Cleanup function to remove the event listener
      return () => {
        scroller.removeEventListener("scroll", updateScrollContext);
      };
    }
  }, [rootScroller]);

  useEffect(() => {
    contextStateRef.current = contextState;
  }, [contextState]);

  const filteredChildren = React.Children.toArray(children).filter((child) => {
    if (!React.isValidElement(child)) return false;
    //
    //If child has a prop displayName
    if ((child as any).type.displayName === "FullView") {
      return true;
    }
  });


    // Create a ref array for FullView children
  const fullViewRefs = React.useRef<
    Array<React.RefObject<HTMLDivElement | null>>
  >([]);
  if (fullViewRefs.current.length === 0) {
    // Initialize or reset refs if children count changes
    fullViewRefs.current = filteredChildren.map(() =>
      React.createRef<HTMLDivElement>()
    );
  }

  // Clone FullView children and attach refs
  const childrenWithRefs = filteredChildren.map((child, idx) => {
    if (
      React.isValidElement(child) &&
      (child as any).type.displayName === "FullView"
    ) {
      // Cast to any to allow ref prop, assuming FullView is forwardRef-compatible
      return React.cloneElement(child as React.ReactElement<any>, {
        key: child.key ?? idx,
        ref: fullViewRefs.current[idx],
      });
    }
    return child;
  });

  useEffect(() => {
    // Update the context state with the new total views
    if (fullViewRefs.current)
      setSlideRefs(fullViewRefs.current);
  }, [childrenWithRefs]);

  //Add a buffer space div each side of the children to allow a nice snap buffer effect
  childrenWithRefs.unshift(
    <EdgeSpacer ref={topSpacerRef} key="start-spacer" />
  );
  childrenWithRefs.push(<EdgeSpacer ref={endSpacerRef} key="end-spacer" />);
  return (
    <>
      {/* Create a div that has a 100lvh so we can store that height in a vairalbe */}
      <div
        ref={dummyLvhDiv}
        className="FVS-w-[100%] FVS-h-[100lvh] FVS-absolute FVS-top-0 FVS-left-0 FVS-pointer-events-none FVS-z-[-1]"
      />
      {childrenWithRefs}
    </>
  );
};

export default FullViewSnapController;
FullViewSnapController.displayName = "FullViewSnapController";

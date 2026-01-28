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

      //Use the scroll percentage to calculate the current index based on the number of FullView children
      const childCount = React.Children.count(fullViewChildren);
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

  // Process all children - filter only FullView for ref handling
  const allChildren = React.Children.toArray(children);
  const fullViewChildren = allChildren.filter((child) => {
    if (!React.isValidElement(child)) return false;
    return (child as any).type?.displayName === "FullView";
  });

  useEffect(() => {
    if (rootScroller.rootScrollerRef?.current) {
      const scroller =
        rootScroller.rootScrollerRef.current === document.documentElement
          ? window
          : rootScroller.rootScrollerRef.current;

      // Attach the scroll event listener
      scroller.addEventListener("scroll", updateScrollContext);

      // Cleanup function to remove the event listener
      return () => {
        scroller.removeEventListener("scroll", updateScrollContext);
      };
    }
  }, [rootScroller, fullViewChildren.length]);

  // Update totalViews when the number of FullView children changes
  useEffect(() => {
    const newTotalViews = React.Children.count(fullViewChildren);
    if (contextStateRef.current.totalViews !== newTotalViews) {
      updateContextState({
        ...contextStateRef.current,
        totalViews: newTotalViews,
      });
    }
  }, [fullViewChildren.length, updateContextState]);

  useEffect(() => {
    contextStateRef.current = contextState;
  }, [contextState]);

  // Create a ref array for FullView children only
  const fullViewRefs = React.useRef<
    Array<React.RefObject<HTMLDivElement>>
  >([]);
  
  // Update refs array when the number of FullView children changes
  if (fullViewRefs.current.length !== fullViewChildren.length) {
    fullViewRefs.current = fullViewChildren.map(() =>
      React.createRef<HTMLDivElement>()
    );
  }

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
        className="FVS-w-[100%] FVS-h-[100lvh] FVS-absolute FVS-top-0 FVS-left-0 FVS-pointer-events-none FVS-z-[-1]"
      />
      {finalChildren}
    </>
  );
};

export default FullViewSnapController;
FullViewSnapController.displayName = "FullViewSnapController";

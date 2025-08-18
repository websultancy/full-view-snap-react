"use client";
import React, { useEffect } from "react";
import RootScroller from "./RootScroller";
import RootScrollerContext from "./RootScrollerContext";

import type { RootScrollerContextProps } from "./RootScrollerContext";
import type { ReactElement, ReactNode } from "react";

export type contextStateProps = {
  currentIndex: number;
  currentScrollPercentage: number;
  totalViews: number;
  currentContentScrollPercentage: number;
  rootScrollerContext: RootScrollerContextProps; // Reference to the RootScrollerContextProps
  edgeSpacerRef?: React.RefObject<HTMLDivElement | null>;
};

interface FullViewSnapContextProps {
  contextState: contextStateProps;
  updateContextState: (newState: contextStateProps) => void;
}

interface FullViewSnapProps {
  children?: ReactNode;
  hideScrollBars?: boolean;
  render: (
    currentView: number,
    totalViews: number,
    scrollPercentage: number,
    contentScrollPercentage: number,
    rootScrollerContext: RootScrollerContextProps,
  ) => ReactNode;
}

//Declare and export a context for the current index
export const FullViewSnapContext =
  React.createContext<FullViewSnapContextProps>({
    contextState: {
      currentIndex: 0,
      totalViews: 0,
      currentScrollPercentage: 0,
      currentContentScrollPercentage: 0,
      rootScrollerContext: {} as RootScrollerContextProps, // Use a default value or cast
      edgeSpacerRef: React.createRef<HTMLDivElement | null>(), // Initialize with a ref
    },
    updateContextState: () => {},
  });

const FullViewSnap: React.FC<FullViewSnapProps> = ({
  render,
  hideScrollBars = false,
}) => {

  // Bring in the rootscroller ref from the RootScrollerContext
  const rootScrollerContext = React.useContext(RootScrollerContext)

  const [contextState, setContextState] = React.useState<contextStateProps>({
    currentIndex: 0,
    totalViews: 0,
    currentScrollPercentage: 0,
    currentContentScrollPercentage: 0,
    rootScrollerContext: rootScrollerContext,
    edgeSpacerRef: undefined,
  });

  const updateContextState = (newState: contextStateProps) => {
    setContextState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  return (
    <FullViewSnapContext.Provider
      value={{ contextState, updateContextState }}
    >
      <RootScroller hideScrollBars={hideScrollBars}>
          {render(
            contextState.currentIndex,
            contextState.totalViews,
            contextState.currentScrollPercentage,
            contextState.currentContentScrollPercentage,
            contextState.rootScrollerContext
          )}
      </RootScroller>
    </FullViewSnapContext.Provider>
  );
};

export default FullViewSnap;

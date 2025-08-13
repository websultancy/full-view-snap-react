"use client";
import React, { forwardRef, useEffect } from 'react';
import RootScrollerContext from './RootScrollerContext';

interface FullViewProps {
    children?: React.ReactNode;
    isLast?: boolean;
}

const FullView = forwardRef<HTMLDivElement, FullViewProps>(({ children, isLast = false }, ref) => {
    // Get the root scroll context and obtain the isFixedViewport property
    const rootScroller = React.useContext(RootScrollerContext);
    const isFixedViewport = rootScroller.isFixedViewport;

    // FC container ref
    const containerRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;
        const parent = containerRef.current.parentElement;

        if (!isFixedViewport) {

            // Condition 1: parent must be body
            if (parent !== document.body) {
                throw new Error(
                    "FullView: Ensure that <FullView> is not wrapped in any HTMLElements and is a direct decendant of <body> before the page hyrdates"
                );
            }
        } else {

            // Condition 2: parent must be the rootScrollerRef element
            if (parent?.id !== "FVS-fixed-viewport-wrapper") {
                throw new Error(
                    "FullView: Ensure that <FullView> is not wrapped in any HTMLElements and is a direct decendant of <body> before the page hyrdates,  FullViewSnap will handle the rest."
                );
            }
        }
    }, [containerRef, rootScroller.rootScrollerRef]);

    return (
        <div
            ref={containerRef}
            className={`FVS-w-[100%] FVS-h-[100svh] ${!isLast ? "FVS-snap-start" : "FVS-snap-end"}`}
            style={{ marginBottom: 'calc(100lvh - 100svh)'}} // This is samsung internet specific fix,  for samsung internet lvh varies depending on the screen size and svh is consistent
        >
            <div
                ref={ref}
                style={{ position: 'absolute', overflow: 'hidden' }}
                className={`${isFixedViewport ? 'FVS-h-[100dvh]' : 'FVS-h-[100lvh]'} FVS-w-full`}
            >
                {children}
            </div>
        </div>
    );
});

export default FullView;

// Set the display name for debugging purposes
FullView.displayName = 'FullView';
"use client";
import React, { forwardRef, useEffect } from 'react';
import RootScrollerContext from './RootScrollerContext';

interface FullViewProps {
    children?: React.ReactNode;
    isLast?: boolean;
    // Internal, used by Controller to collect slide refs without touching element.ref in React 19
    internalRef?: React.Ref<HTMLDivElement>;
}

const FullView = forwardRef<HTMLDivElement, FullViewProps>(({ children, isLast = false, internalRef }, ref) => {
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

    // Merge user ref with internal controller ref without reading element.ref
    const mergeRefs = (...refs: Array<React.Ref<HTMLDivElement> | undefined>) => {
        return (value: HTMLDivElement | null) => {
            refs.forEach((r) => {
                if (!r) return;
                if (typeof r === 'function') {
                    r(value);
                } else {
                    try {
                        (r as React.MutableRefObject<HTMLDivElement | null>).current = value;
                    } catch {}
                }
            });
        };
    };

    return (
        <div
            ref={containerRef}
            className={`FVS-w-[100%] FVS-h-[100svh] ${!isLast ? "FVS-snap-start" : "FVS-snap-end"}`}
            style={{ marginBottom: 'calc(100lvh - 100svh)'}} // This is samsung internet specific fix,  for samsung internet lvh varies depending on the screen size and svh is consistent
        >
            <div
                ref={mergeRefs(ref, internalRef)}
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
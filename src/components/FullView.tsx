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
    const enabled = rootScroller.enabled ?? true;

    const outerClassName = enabled
        ? `FVS-w-[100%] FVS-h-[100svh] ${!isLast ? "FVS-snap-start" : "FVS-snap-end"}`
        : "";
    const innerClassName = enabled
        ? `${isFixedViewport ? "FVS-h-[100dvh]" : "FVS-h-[100lvh]"} FVS-w-full`
        : "";

    // FC container ref
    const containerRef = React.useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!enabled || !containerRef.current) return;
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
    }, [enabled, isFixedViewport, rootScroller.rootScrollerRef]);

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
            className={outerClassName}
            style={
                enabled
                    ? { marginBottom: "calc(100lvh - 100svh)" }
                    : undefined
            }
        >
            <div
                ref={mergeRefs(ref, internalRef)}
                style={enabled ? { position: "absolute", overflow: "hidden" } : undefined}
                className={innerClassName}
            >
                {children}
            </div>
        </div>
    );
});

export default FullView;

// Set the display name for debugging purposes
FullView.displayName = 'FullView';
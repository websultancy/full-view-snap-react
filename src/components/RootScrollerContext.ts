"use client";
import { createContext } from 'react';
import type { MutableRefObject } from 'react';

export interface RootScrollerContextProps {
    rootScrollerRef: MutableRefObject<HTMLDivElement | HTMLElement> | null;
    isFixedViewport: boolean | null, // Default value for isFixedViewport
    scrollToView?: (index: number, speed?:number) => void; // Optional function to scroll to a specific slide
    slideRefs?: React.MutableRefObject<HTMLDivElement[]>[]; // Optional array of slide refs
    setSlideRefs: React.Dispatch<React.SetStateAction<React.RefObject<HTMLDivElement | null>[]>>;
    suspendScrollSnap?: (duration?: number) => void; // Optional function to suspend scroll snapping for a specified duration
    instateScrollSnap?: () => void; // Optional function to re-instate scroll snapping
}

const RootScrollerContext = createContext<RootScrollerContextProps>({
    rootScrollerRef: null,
    scrollToView: undefined, // Default value set to undefined
    slideRefs: undefined, // Default value set to undefined
    isFixedViewport: false, // Default value for isFixedViewport
    setSlideRefs: () => {}, // Default no-op function
    suspendScrollSnap: (_duration: number = 1400) => {}, // Default no-op function
    instateScrollSnap: () => {}, // Default no-op function
})
export default RootScrollerContext;
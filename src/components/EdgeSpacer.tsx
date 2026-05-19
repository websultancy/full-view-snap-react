"use client";
import { forwardRef, useContext } from 'react';
import RootScrollerContext from './RootScrollerContext';

const EdgeSpacer = forwardRef<HTMLDivElement, {}>((_props, ref) => {
    const enabled = useContext(RootScrollerContext).enabled ?? true;

    return (
        <div
            ref={ref}
            className={enabled ? "FVS-h-[10vh] FVS-snap-none" : ""}
            style={enabled ? { height: "10lvh" } : undefined}
        >
            {/* Your content here */}
        </div>
    );
});

EdgeSpacer.displayName = 'EdgeSpacer';

export default EdgeSpacer;
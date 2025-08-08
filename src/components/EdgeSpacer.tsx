import { forwardRef } from 'react';

const EdgeSpacer = forwardRef<HTMLDivElement, {}>((_props, ref) => {
    // add empty timeline duration to the slide timeline in the useGsap hook
    return (
        <div
            ref={ref}
            className="FVS-h-[10vh] FVS-snap-none"
            style={{height: '10lvh'}}
        >
            {/* Your content here */}
        </div>
    );
});

EdgeSpacer.displayName = 'EdgeSpacer';

export default EdgeSpacer;
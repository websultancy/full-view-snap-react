"use client";
import React, { forwardRef } from 'react';

interface AbsoluteViewProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
}

const AbsoluteView = forwardRef<HTMLDivElement, AbsoluteViewProps>(({ 
    children, 
    style = {},
    ...props 
}, ref) => {
    const absoluteStyle: React.CSSProperties = {
        position: 'absolute',
        ...style,
    };

    return (
        <div
            ref={ref}
            style={absoluteStyle}
            {...props}
        >
            {children}
        </div>
    );
});

export default AbsoluteView;

// Set the display name for debugging purposes
AbsoluteView.displayName = 'AbsoluteView';
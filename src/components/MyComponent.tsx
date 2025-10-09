"use client";

import React from 'react';
import { useSize } from '../hooks/useSize';

interface MyComponentProps {
    label: string;
    onClick: () => void;
}

const MyComponent: React.FC<MyComponentProps> = ({ label, onClick }) => {
    const ref = React.useRef<HTMLButtonElement | null>(null);
    const size = useSize(ref);
    React.useEffect(() => {
        if (size.width && size.height) {
            // Size tracking logic can be added here if needed
        }
    }, [size]);
    return (
        <button ref={ref} onClick={onClick}>
            {label}
        </button>
    );
};

export default MyComponent;
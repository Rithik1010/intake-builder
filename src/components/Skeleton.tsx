import React from "react";

interface SkeletonProps {
    width?: string;
    height?: string;
    className?: string;
}

export default function Skeleton({
    width = "100%",
    height = "20px",
    className = "",
}: SkeletonProps) {
    return (
        <div
            className={`bg-gray-200 dark:bg-gray-700 animate-pulse ${className}`}
            style={{ width, height }}
        ></div>
    );
}

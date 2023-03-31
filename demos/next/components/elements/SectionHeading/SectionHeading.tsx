import React from 'react';

interface SectionHeadingProps {
    children: React.ReactNode;
}

export default function SectionHeading({ children }: SectionHeadingProps) {
    return <h4>{children}</h4>;
}

"use client"

import { useState } from "react";

interface Props {
    children: string;
    length?: number;
    className?: string;
}

const ReadMore = ({ children, length = 100, className }: Props) => {
    const [isReadMore, setIsReadMore] = useState(true);

    const toggleReadMore = () => setIsReadMore(!isReadMore)

    return (
        <p className={className}>
            { isReadMore ? <>
                { children?.slice(0, length).trim() }
                <span
                    onClick={toggleReadMore}
                    className="text-primary cursor-pointer"
                > ...read more</span>
            </> : children }
        </p>
    );
};
 
export default ReadMore;
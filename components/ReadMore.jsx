import React, { useState } from 'react';

export default function ReadMore({ readMore }) {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleContent = () => {
        setIsExpanded(!isExpanded);
    };

    // Function to convert newline characters to <br> tags
    function newlineToBreak(input) {
        return input.replace(/\n/g, '<br/>');
    }

    return (
        <>
            <div className='read-more-toggle' onClick={toggleContent}>
                {isExpanded ? 'Close' : 'Read More...'}
            </div>
            {isExpanded ? (
                <div
                    className='read-more'
                    dangerouslySetInnerHTML={{ __html: newlineToBreak(readMore) }}
                />
            ) : null}
        </>
    );
}

import React from 'react';

const Loading = () => {
    return (
        <div className="flex justify-center items-center h-fit flex-col gap-2">
            <div className="animate-spin rounded-full border-4 border-[#736f6f] border-primary border-t-transparent h-8 w-8" />
            <span className="text-[#625757] font-semibold ml-3">Loading...</span>
        </div>
    );
};

export default Loading;
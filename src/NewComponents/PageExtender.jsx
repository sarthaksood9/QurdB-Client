import React, { useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

function PageExtender({ title, content,content2, info, info2 }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="border-b border-black py-3 w-full">
      <div className="flex relative justify-between items-center cursor-pointer" onClick={handleToggle}>
        <h3 className="text-lg font-medium">{title}</h3>
        {/* <svg
          className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          width={20}
          height={20}
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 15l7-7 7 7" />
        </svg> */}
        <IoIosArrowDown className={`transform absolute right-3 top-[0.65rem] text-[1.3rem] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      
      {isOpen && (
        <div className="mt-2 flex flex-col gap-2">
          
          <h3 className="text-[1.05rem] text-gray-600 font-medium">{content}</h3>
            <div>{info}</div>

            <h3 className="text-[1.05rem] text-gray-600 font-medium">{content2}</h3>
            <div>{info2}</div>
          
        </div>
      )}
    </div>
  );
}

export default PageExtender;
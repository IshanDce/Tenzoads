import React from 'react';

export const FilterPills = ({
  options = [],
  activeOption,
  onChange,
  className = '',
}) => {
  return (
    <div
      className={`flex items-center gap-2.5 overflow-x-auto no-scrollbar py-2 px-1 ${className}`}
      role="tablist"
      aria-label="Filter Options"
    >
      {options.map((option) => {
        const isActive = activeOption === option;

        return (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(option)}
            className={`whitespace-nowrap px-5 py-2.5 text-xs sm:text-sm font-bold rounded-full transition-all duration-300 focus:outline-none cursor-pointer transform ${
              isActive
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30 ring-2 ring-blue-500/40 scale-105'
                : 'bg-white text-slate-700 border border-slate-200/90 hover:border-blue-500 hover:text-blue-600 hover:shadow-md hover:scale-105 active:scale-95'
            }`}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default FilterPills;

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
            className={`whitespace-nowrap px-5 py-2 text-xs sm:text-sm font-bold rounded-full transition-all duration-200 focus:outline-none ${
              isActive
                ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-600'
                : 'bg-white text-slate-700 border border-slate-200 hover:border-blue-400 hover:text-blue-600'
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

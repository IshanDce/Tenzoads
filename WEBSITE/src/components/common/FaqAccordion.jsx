import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus } from 'lucide-react';

export const FaqAccordion = ({ items = [], allowMultiple = false }) => {
  const [openIndexes, setOpenIndexes] = useState([0]); // First item open by default

  const toggleItem = (index) => {
    if (allowMultiple) {
      if (openIndexes.includes(index)) {
        setOpenIndexes(openIndexes.filter((i) => i !== index));
      } else {
        setOpenIndexes([...openIndexes, index]);
      }
    } else {
      setOpenIndexes(openIndexes.includes(index) ? [] : [index]);
    }
  };

  return (
    <div className="space-y-4">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);

        return (
          <div
            key={item.question}
            className="border border-borderCream bg-white rounded-2xl overflow-hidden transition-all duration-200 hover:border-amber-300"
          >
            <button
              type="button"
              onClick={() => toggleItem(index)}
              className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-ink hover:text-amber-hover transition-colors focus:outline-none"
              aria-expanded={isOpen}
            >
              <span className="text-base sm:text-lg leading-snug">{item.question}</span>
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                  isOpen ? 'bg-amber text-ink rotate-45' : 'bg-cream-light text-ink rotate-0'
                }`}
              >
                <Plus className="w-4 h-4 stroke-[2.5]" />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: 'easeInOut' }}
                >
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-muted leading-relaxed border-t border-cream-light">
                    {item.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};

export default FaqAccordion;


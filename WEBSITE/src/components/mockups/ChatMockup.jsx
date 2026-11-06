import React from 'react';

export const ChatMockup = ({ className = '', title = 'Nova AI Assistant' }) => {
  return (
    <div
      className={`mx-auto w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-md flex flex-col justify-between ${className}`}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-sm shadow-blue-500/30">
            AI
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">{title}</div>
            <div className="text-[9px] text-emerald-600 font-medium">● Online</div>
          </div>
        </div>
        <div className="text-[10px] text-slate-400">LLM Engine v4</div>
      </div>

      {/* Messages */}
      <div className="space-y-2.5 my-2">
        <div className="max-w-[85%] bg-white border border-slate-200 text-slate-800 text-[11px] p-2.5 rounded-2xl rounded-tl-sm shadow-sm leading-relaxed">
          Hello! How can I help synthesize your workflow documents today?
        </div>
        <div className="max-w-[85%] ml-auto bg-blue-600 text-white text-[11px] p-2.5 rounded-2xl rounded-tr-sm shadow-sm leading-relaxed">
          Extract customer action items and summarize the Q3 sprint velocity.
        </div>
        <div className="max-w-[85%] bg-white border border-slate-200 text-slate-800 text-[11px] p-2.5 rounded-2xl rounded-tl-sm shadow-sm leading-relaxed">
          Analyzed 14 tickets. Key milestone delivered 4 days ahead of schedule.
        </div>
      </div>

      {/* Input bar */}
      <div className="mt-3 flex items-center gap-2 pt-2 border-t border-slate-200">
        <div className="flex-1 bg-white border border-slate-200 rounded-full px-3 py-1.5 text-[10px] text-slate-400">
          Ask Nova anything...
        </div>
        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] shadow-sm">
          ↑
        </div>
      </div>
    </div>
  );
};

export default ChatMockup;

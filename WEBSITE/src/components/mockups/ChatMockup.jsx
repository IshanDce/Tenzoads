import React from 'react';
import { Bot, Send, User } from 'lucide-react';

export const ChatMockup = ({ className = '', title = 'Nova AI Assistant' }) => {
  return (
    <div
      className={`w-full max-w-[340px] sm:max-w-[400px] bg-white rounded-2xl overflow-hidden shadow-xl border border-borderCream mx-auto flex flex-col ${className}`}
    >
      {/* Chat Header */}
      <div className="bg-amber px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-ink text-white flex items-center justify-center">
            <Bot className="w-4 h-4 text-amber" />
          </div>
          <div>
            <h4 className="text-xs font-extrabold text-ink leading-tight">{title}</h4>
            <span className="text-[9px] text-ink/75 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 inline-block animate-pulse" />
              Connected to Enterprise API
            </span>
          </div>
        </div>
        <span className="text-[9px] bg-white/40 px-2 py-0.5 rounded-full font-bold text-ink">
          GPT-4o
        </span>
      </div>

      {/* Message Stream */}
      <div className="p-4 bg-cream-light space-y-3 flex-1">
        {/* User Bubble */}
        <div className="flex justify-end items-start gap-2">
          <div className="bg-ink text-white rounded-2xl rounded-tr-none px-3.5 py-2 text-xs max-w-[80%] shadow-sm">
            Can you summarize our Q3 support tickets and highlight recurring issues?
          </div>
          <div className="w-6 h-6 rounded-full bg-neutral-300 flex items-center justify-center text-ink flex-shrink-0">
            <User className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* AI Bot Bubble */}
        <div className="flex justify-start items-start gap-2">
          <div className="w-6 h-6 rounded-full bg-amber flex items-center justify-center text-ink flex-shrink-0">
            <Bot className="w-3.5 h-3.5" />
          </div>
          <div className="bg-white border border-borderCream text-ink rounded-2xl rounded-tl-none p-3 text-xs max-w-[85%] shadow-sm space-y-2">
            <p className="font-medium">
              Analyzed 1,420 tickets from Q3. Here are the top 3 drivers:
            </p>
            <div className="bg-cream rounded-xl p-2 space-y-1 text-[11px]">
              <div className="flex justify-between font-bold">
                <span>1. Checkout webhook timeout</span>
                <span className="text-amber-700">42%</span>
              </div>
              <div className="flex justify-between font-bold">
                <span>2. Password reset email delay</span>
                <span className="text-amber-700">28%</span>
              </div>
            </div>
            <p className="text-[10px] text-muted">Ready to deploy automated fixes?</p>
          </div>
        </div>
      </div>

      {/* Chat Input */}
      <div className="p-3 bg-white border-t border-borderCream flex items-center gap-2">
        <div className="flex-1 bg-cream-light rounded-full px-3.5 py-1.5 text-xs text-muted border border-borderCream flex items-center">
          Ask Nova anything...
        </div>
        <div className="w-7 h-7 rounded-full bg-amber flex items-center justify-center text-ink shadow-sm">
          <Send className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};

export default ChatMockup;


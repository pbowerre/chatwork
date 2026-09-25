import { useEffect, useRef } from 'react';
import { useChatState } from '../../hooks/useChatState';
import { ChevronLeft, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

export default function IphonePreview() {
  const { state } = useChatState();
  const { profile, messages, settings } = state;
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-[#f2f2f7] font-sans">
      {/* iOS Status Bar */}
      <div className="h-12 bg-[#f6f6f6]/95 backdrop-blur flex justify-between items-end px-6 pb-1.5 shrink-0 z-40 relative">
        <div className="text-[14px] font-semibold tracking-tight">{settings.time}</div>
        <div className="flex items-center gap-1.5 h-4">
          {settings.showSignal && (
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
              <path d="M1 9.5H3.5C3.77614 9.5 4 9.72386 4 10V11C4 11.2761 3.77614 11.5 3.5 11.5H1C0.723858 11.5 0.5 11.2761 0.5 11V10C0.5 9.72386 0.723858 9.5 1 9.5Z" fill="black"/>
              <path d="M5.5 7.5H8C8.27614 7.5 8.5 7.72386 8.5 8V11C8.5 11.2761 8.27614 11.5 8 11.5H5.5C5.22386 11.5 5 11.2761 5 11V8C5 7.72386 5.22386 7.5 5.5 7.5Z" fill="black"/>
              <path d="M10 4.5H12.5C12.7761 4.5 13 4.72386 13 5V11C13 11.2761 12.7761 11.5 12.5 11.5H10C9.72386 11.5 9.5 11.2761 9.5 11V5C9.5 4.72386 9.72386 4.5 10 4.5Z" fill="black"/>
              <path d="M14.5 1H17C17.2761 1 17.5 1.22386 17.5 1.5V11C17.5 11.2761 17.2761 11.5 17 11.5H14.5C14.2239 11.5 14 11.2761 14 11V1.5C14 1.22386 14.2239 1 14.5 1Z" fill="black"/>
            </svg>
          )}
          {settings.showWifi && (
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
              <path fillRule="evenodd" clipRule="evenodd" d="M8 11C8.82843 11 9.5 10.3284 9.5 9.5C9.5 8.67157 8.82843 8 8 8C7.17157 8 6.5 8.67157 6.5 9.5C6.5 10.3284 7.17157 11 8 11ZM8 6C6.55171 6 5.2046 6.43875 4.09579 7.16859L5.17646 8.52808C5.97542 8.00224 6.94589 7.6875 8 7.6875C9.05411 7.6875 10.0246 8.00224 10.8235 8.52808L11.9042 7.16859C10.7954 6.43875 9.44829 6 8 6ZM1.6166 4.0487C3.39956 2.7663 5.60233 2 8 2C10.3977 2 12.6004 2.7663 14.3834 4.0487L15.4852 2.6617C13.4158 1.17387 10.835 0.3125 8 0.3125C5.16499 0.3125 2.58416 1.17387 0.514781 2.6617L1.6166 4.0487Z" fill="black"/>
            </svg>
          )}
          {settings.showBattery && (
            <div className="flex items-center">
              <div className="w-5 h-2.5 border border-black rounded-[3px] p-[0.5px] relative">
                <div 
                  className="h-full bg-black rounded-[1.5px]" 
                  style={{ width: `${settings.batteryLevel}%` }}
                ></div>
              </div>
              <div className="w-[1px] h-1 bg-black ml-[1px] rounded-r-sm"></div>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="bg-[#f6f6f6]/95 backdrop-blur border-b border-[#c6c6c8] shrink-0 pt-1 pb-2 px-2 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center text-[#007aff] font-medium w-20">
          <ChevronLeft className="w-6 h-6 -ml-1" />
          <span className="text-[17px] -ml-1">Messages</span>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="w-7 h-7 rounded-full bg-gray-300 overflow-hidden mb-0.5">
            {profile.avatar ? (
              <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-b from-gray-200 to-gray-400"></div>
            )}
          </div>
          <div className="text-[11px] font-semibold text-black tracking-wide flex items-center gap-1">
            {profile.name}
            {profile.showStatus && <ChevronLeft className="w-2 h-2 text-gray-400 rotate-270 -rotate-90" />}
          </div>
        </div>
        
        <div className="w-20 flex justify-end">
          <Info className="w-5 h-5 text-[#007aff] mr-2 stroke-[1.5px]" />
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length > 0 && (
          <div className="text-center text-[11px] text-gray-500 font-medium my-4">
            Today {messages[0].timestamp || '9:41 AM'}
          </div>
        )}

        <AnimatePresence>
          {messages.map((msg, i) => {
            const isMe = msg.sender === 'me';
            const showTail = i === messages.length - 1 || messages[i + 1].sender !== msg.sender;
            const nextIsSame = i < messages.length - 1 && messages[i + 1].sender === msg.sender;
            
            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn('flex flex-col', isMe ? 'items-end' : 'items-start', !nextIsSame ? 'mb-4' : 'mb-[2px]')}
              >
                {msg.image ? (
                  <div className="max-w-[70%] relative">
                    <img src={msg.image} className={cn('rounded-[18px] max-w-full', showTail && (isMe ? 'rounded-br-sm' : 'rounded-bl-sm'))} />
                  </div>
                ) : (
                  <div 
                    className={cn(
                      'px-4 py-2.5 max-w-[75%] text-[16px] leading-[22px]',
                      isMe ? 'bg-[#007aff] text-white' : 'bg-[#e9e9eb] text-black',
                      'rounded-[18px]',
                      isMe && showTail && 'rounded-br-[4px]',
                      !isMe && showTail && 'rounded-bl-[4px]',
                      isMe && !showTail && 'rounded-br-[18px]',
                      !isMe && !showTail && 'rounded-bl-[18px]'
                    )}
                    style={{ wordBreak: 'break-word' }}
                  >
                    {msg.text}
                  </div>
                )}
                {isMe && showTail && msg.status && msg.status !== 'none' && (
                  <div className="text-[11px] text-gray-500 font-medium mt-1 mr-1">
                    {msg.status === 'read' ? `Read ${msg.timestamp}` : 'Delivered'}
                  </div>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="bg-[#f6f6f6]/95 backdrop-blur shrink-0 px-4 pt-3 pb-8 flex items-end gap-3 border-t border-[#c6c6c8]">
        <div className="w-8 h-8 rounded-full bg-[#e9e9eb] flex items-center justify-center shrink-0 mb-[3px]">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8e8e93" strokeWidth="2">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </div>
        <div className="flex-1 bg-white border border-[#c6c6c8] rounded-full px-4 py-1.5 flex items-center min-h-[34px]">
          <span className="text-[#c7c7cc] text-[16px]">iMessage</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-[#007aff] flex items-center justify-center shrink-0 mb-[3px]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="2" className="ml-[2px] mt-[1px]">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
}

import { useEffect, useRef } from 'react';
import { useChatState } from '../../hooks/useChatState';
import { ArrowLeft, Phone, Video, MoreVertical, Check, CheckCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

export default function AndroidPreview() {
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
    <div className="flex flex-col h-full bg-[#e5ddd5] font-sans relative" style={{ backgroundImage: 'url("https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png")', backgroundSize: '300px' }}>
      
      {/* Android Status Bar */}
      <div className="h-7 bg-[#075e54] flex justify-between items-center px-4 shrink-0 text-white z-40 relative">
        <div className="text-[12px] font-medium">{settings.time}</div>
        <div className="flex items-center gap-1.5 h-3 opacity-90">
          {settings.showWifi && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3C7.79 3 3.96 4.54 1 7.07L12 21L23 7.07C20.04 4.54 16.21 3 12 3ZM12 5C15.5 5 18.73 6.18 21.2 8.16L12 19L2.8 8.16C5.27 6.18 8.5 5 12 5Z" />
              <path d="M12 9C9.72 9 7.63 9.8 6 11.1L12 19L18 11.1C16.37 9.8 14.28 9 12 9Z" />
            </svg>
          )}
          {settings.showSignal && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M2 22H22V2L2 22ZM20 20H4.83L20 4.83V20Z" />
              <path d="M14 20H20V14L14 20Z" />
            </svg>
          )}
          {settings.showBattery && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 4H14V2H10V4H8C6.9 4 6 4.9 6 6V20C6 21.1 6.9 22 8 22H16C17.1 22 18 21.1 18 20V6C18 4.9 17.1 4 16 4ZM16 20H8V6H16V20Z" />
              <path d="M8 12H16V20H8V12Z" />
            </svg>
          )}
        </div>
      </div>

      {/* WhatsApp Header */}
      <div className="bg-[#075e54] text-white flex items-center px-2 py-2 shrink-0 z-30 shadow-md">
        <div className="flex items-center">
          <ArrowLeft className="w-6 h-6 mr-1" />
          <div className="w-9 h-9 rounded-full bg-slate-300 overflow-hidden mr-3">
            {profile.avatar ? (
              <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-[#128c7e]"></div>
            )}
          </div>
        </div>
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-[17px] font-medium leading-5">{profile.name}</div>
          {profile.showStatus && (
            <div className="text-[13px] text-white/80 leading-4">{profile.status}</div>
          )}
        </div>
        <div className="flex items-center gap-4 px-2">
          <Video className="w-5 h-5 fill-current" />
          <Phone className="w-5 h-5 fill-current" />
          <MoreVertical className="w-5 h-5" />
        </div>
      </div>

      {/* Chat Area */}
      <div ref={scrollContainerRef} className="flex-1 overflow-y-auto px-3 py-4 space-y-[2px]">
        {messages.length > 0 && (
          <div className="flex justify-center my-4">
            <div className="bg-[#e1f3fb] text-[#556972] text-[12px] px-3 py-1 rounded-lg uppercase tracking-wider font-medium shadow-sm">
              Today
            </div>
          </div>
        )}

        <AnimatePresence>
          {messages.map((msg, i) => {
            const isMe = msg.sender === 'me';
            const showTail = i === 0 || messages[i - 1].sender !== msg.sender;
            const nextIsSame = i < messages.length - 1 && messages[i + 1].sender === msg.sender;

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={cn('flex flex-col', isMe ? 'items-end' : 'items-start', !nextIsSame ? 'mb-3' : '')}
              >
                <div 
                  className={cn(
                    'relative max-w-[80%] rounded-lg shadow-sm',
                    isMe ? 'bg-[#dcf8c6]' : 'bg-white',
                    msg.image ? 'p-1' : 'px-2 pt-1.5 pb-2',
                    showTail && isMe ? 'rounded-tr-none' : '',
                    showTail && !isMe ? 'rounded-tl-none' : ''
                  )}
                >
                  {/* Tail SVG */}
                  {showTail && (
                    <div className={cn('absolute top-0 w-3 h-3', isMe ? '-right-2' : '-left-2')}>
                      {isMe ? (
                        <svg viewBox="0 0 8 13" width="8" height="13" className="fill-[#dcf8c6]">
                          <path d="M5.188 1H0v11.193l6.467-8.625C7.526 2.156 6.958 1 5.188 1z" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 8 13" width="8" height="13" className="fill-white">
                          <path d="M1.533 3.568L8 12.193V1H2.812C1.042 1 .474 2.156 1.533 3.568z" />
                        </svg>
                      )}
                    </div>
                  )}

                  {msg.image ? (
                    <div className="relative">
                      <img src={msg.image} className="rounded-md max-w-full" alt="Attachment" />
                      <div className="absolute bottom-1 right-1 flex items-center gap-1 bg-black/30 text-white rounded-full px-1.5 py-0.5 text-[10px]">
                        {msg.timestamp || '9:41'}
                        {isMe && msg.status === 'read' && <CheckCheck className="w-3 h-3 text-[#34b7f1]" />}
                        {isMe && msg.status === 'delivered' && <CheckCheck className="w-3 h-3" />}
                        {isMe && msg.status === 'sent' && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  ) : (
                    <div className="relative">
                      <span className="text-[15px] leading-5 text-[#303030] inline-block pb-[2px]" style={{ wordBreak: 'break-word' }}>
                        {msg.text}
                        <span className={cn("inline-block h-3", isMe ? "w-[68px]" : "w-[44px]")} />
                      </span>
                      <div className="flex items-end gap-[2px] absolute bottom-0 right-0 pb-[2px]">
                        <span className="text-[10px] text-[#999999] whitespace-nowrap leading-[14px]">
                          {msg.timestamp || '9:41'}
                        </span>
                        {isMe && msg.status === 'read' && <CheckCheck className="w-[14px] h-[14px] text-[#4fc3f7] mb-[1px]" />}
                        {isMe && msg.status === 'delivered' && <CheckCheck className="w-[14px] h-[14px] text-[#999999] mb-[1px]" />}
                        {isMe && msg.status === 'sent' && <Check className="w-[14px] h-[14px] text-[#999999] mb-[1px]" />}
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Input Area */}
      <div className="shrink-0 p-2 flex items-end gap-2 z-30 mb-2">
        <div className="flex-1 bg-white rounded-full min-h-[44px] flex items-center px-3 gap-3 shadow-sm">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="#859398">
            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm3.5-12a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-7 0a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm3.5 6.5c-2.33 0-4.31-1.46-5.11-3.5h10.22c-.8 2.04-2.78 3.5-5.11 3.5z" />
          </svg>
          <div className="text-[16px] text-[#859398] flex-1">Message</div>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="#859398" className="transform -rotate-45">
            <path d="M21.426 11.095l-17-8A1 1 0 0 0 3.03 4.242L4.969 12 3.03 19.758a1 1 0 0 0 1.396 1.147l17-8a1 1 0 0 0 0-1.81zM5.319 19.01L6.96 13H14v-2H6.96L5.319 4.99 18.824 12z" />
          </svg>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="#859398">
            <path d="M12 2c-3.309 0-6 2.691-6 6v4c0 3.309 2.691 6 6 6s6-2.691 6-6V8c0-3.309-2.691-6-6-6zm4 10c0 2.206-1.794 4-4 4s-4-1.794-4-4V8c0-2.206 1.794-4 4-4s4 1.794 4 4v4zm5.753-4.526a.998.998 0 0 0-1.341-.444 8.006 8.006 0 0 1-10.824 0 .999.999 0 0 0-1.049 1.688 10.015 10.015 0 0 0 13.659 0 .998.998 0 0 0-.445-1.244z" />
          </svg>
        </div>
        <div className="w-[44px] h-[44px] rounded-full bg-[#00a884] flex items-center justify-center shadow-sm shrink-0">
          <svg viewBox="0 0 24 24" width="24" height="24" fill="white">
            <path d="M11.999 14.942c2.001 0 3.531-1.53 3.531-3.531V4.35c0-2.001-1.53-3.531-3.531-3.531S8.468 2.35 8.468 4.35v7.061c0 2.001 1.53 3.531 3.531 3.531zm6.238-3.53c0 3.531-2.942 6.002-6.237 6.002s-6.237-2.471-6.237-6.002H3.761c0 4.001 3.178 7.297 7.061 7.885v3.884h2.354v-3.884c3.884-.588 7.061-3.884 7.061-7.885h-2.002z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useChatState } from '../../hooks/useChatState';
import { Image as ImageIcon, Send, Smile, MoreVertical } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

export default function MessageEditor() {
  const { state, addMessage, deleteMessage } = useChatState();
  const [newMessageText, setNewMessageText] = useState('');
  const [sender, setSender] = useState<'me' | 'them'>('them');
  const [messageTime, setMessageTime] = useState(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  const handleAddText = () => {
    if (!newMessageText.trim()) return;
    addMessage({
      sender,
      text: newMessageText,
      status: sender === 'me' ? 'delivered' : 'none',
      timestamp: messageTime || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
    setNewMessageText('');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        addMessage({
          sender,
          image: event.target?.result as string,
          status: sender === 'me' ? 'delivered' : 'none',
          timestamp: messageTime || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-5 animate-in fade-in duration-500 pb-4">
      {/* Add Message Box */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Add Message</label>
        <div className="bg-[#0b0f1a] rounded-xl border border-white/5 p-3 shadow-inner">
          <textarea
            value={newMessageText}
            onChange={(e) => setNewMessageText(e.target.value)}
            placeholder="Type your message..."
            className="w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-600 resize-none h-16 outline-none"
          />
          <div className="flex items-center justify-between mt-2 pt-2 border-t border-white/5 text-slate-500">
             <div className="flex gap-3">
                <Smile className="w-4 h-4 cursor-pointer hover:text-slate-300 transition-colors" />
                <label className="cursor-pointer hover:text-slate-300 transition-colors">
                  <ImageIcon className="w-4 h-4" />
                  <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                </label>
             </div>
             <span className="text-[10px] font-medium">{newMessageText.length}/1000</span>
          </div>
        </div>
      </div>

      {/* Sender Toggle */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Sender</label>
        <div className="flex bg-[#0b0f1a] p-1 rounded-xl border border-white/5 shadow-inner">
           <button 
             onClick={() => setSender('them')} 
             className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${sender === 'them' ? 'bg-[#1e243b] text-white shadow-sm ring-1 ring-white/10' : 'text-slate-500 hover:text-slate-300'}`}
           >
             {state.profile.name || 'Them'}
           </button>
           <button 
             onClick={() => setSender('me')} 
             className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all ${sender === 'me' ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-sm ring-1 ring-white/10' : 'text-slate-500 hover:text-slate-300'}`}
           >
             Me
           </button>
        </div>
      </div>

      {/* Time Input */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Time</label>
        <div className="bg-[#0b0f1a] rounded-xl border border-white/5 p-1.5 shadow-inner">
          <input
            type="text"
            value={messageTime}
            onChange={(e) => setMessageTime(e.target.value)}
            placeholder="e.g. 9:41 AM, Yesterday..."
            className="w-full bg-transparent text-sm text-slate-200 px-2 py-1 outline-none placeholder:text-slate-600"
          />
        </div>
      </div>

      {/* Add Message Button */}
      <button 
        onClick={handleAddText} 
        disabled={!newMessageText.trim()}
        className="w-full py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-teal-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send className="w-4 h-4" /> Add Message
      </button>

      {/* Messages List */}
      <div className="pt-6 border-t border-white/5 space-y-3">
        <div className="flex items-center justify-between px-1 mb-2">
           <span className="text-[11px] font-bold text-slate-300 tracking-wide">Messages</span>
           <span className="text-[10px] font-bold text-slate-400 bg-white/5 px-2 py-0.5 rounded-full">{state.messages.length}</span>
        </div>
        
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
          <AnimatePresence initial={false}>
            {state.messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="group flex flex-col bg-[#0b0f1a] rounded-xl border border-white/5 p-3 relative hover:border-white/10 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full overflow-hidden bg-slate-800 shrink-0 border border-white/10">
                     {msg.sender === 'them' && state.profile.avatar ? (
                        <img src={state.profile.avatar} alt="" className="w-full h-full object-cover" />
                     ) : (
                        <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-white bg-teal-600">
                          {msg.sender === 'me' ? 'M' : 'T'}
                        </div>
                     )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-300 truncate pr-2">
                        {msg.image ? '📷 Image attached' : msg.text}
                      </p>
                      <MoreVertical className="w-3 h-3 text-slate-600 shrink-0" />
                    </div>
                    <span className="text-[10px] text-slate-500">{msg.timestamp || '9:41 AM'}</span>
                  </div>
                </div>
                {/* Delete overlay on hover */}
                <button 
                  onClick={() => deleteMessage(msg.id)}
                  className="absolute inset-0 bg-red-500/10 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-xl transition-opacity border border-red-500/50"
                >
                  <span className="text-xs font-bold text-red-500">Delete</span>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
          {state.messages.length === 0 && (
            <div className="text-center p-6 text-slate-500 border border-dashed border-white/10 rounded-xl bg-white/5">
              <p className="text-xs">No messages yet.</p>
            </div>
          )}
        </div>
        <p className="text-[10px] text-center text-slate-500 pt-2 flex items-center justify-center gap-1">
          <MoreVertical className="w-3 h-3 opacity-50" /> Drag to reorder messages
        </p>
      </div>
    </div>
  );
}

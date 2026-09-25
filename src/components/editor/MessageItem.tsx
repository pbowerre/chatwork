import { useRef } from 'react';
import type { Message } from '../../types/chat';
import { useChatState } from '../../hooks/useChatState';
import { Button } from '../common/Button';
import { Input } from '../common/Input';
import { ArrowUp, ArrowDown, Trash2, Copy } from 'lucide-react';
import { motion } from 'framer-motion';

interface Props {
  message: Message;
  index: number;
  total: number;
}

export default function MessageItem({ message, index, total }: Props) {
  const { updateMessage, deleteMessage, reorderMessages, addMessage } = useChatState();
  const isMe = message.sender === 'me';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDuplicate = () => {
    addMessage({ ...message, id: undefined } as any);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateMessage(message.id, { image: event.target?.result as string, text: '' });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, type: 'spring', bounce: 0.2 }}
      className={`relative group p-4 rounded-2xl border ${isMe ? 'border-blue-200/50 bg-blue-50/50 dark:border-blue-900/30 dark:bg-blue-950/20' : 'border-slate-200/60 bg-white dark:border-slate-800/60 dark:bg-slate-900/50'} shadow-sm`}
    >
      <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
        <button disabled={index === 0} onClick={() => reorderMessages(index, index - 1)} className="p-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-sm hover:bg-slate-50 disabled:opacity-30">
          <ArrowUp className="w-3 h-3 text-slate-500" />
        </button>
        <button disabled={index === total - 1} onClick={() => reorderMessages(index, index + 1)} className="p-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full shadow-sm hover:bg-slate-50 disabled:opacity-30">
          <ArrowDown className="w-3 h-3 text-slate-500" />
        </button>
      </div>

      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isMe ? 'bg-blue-500' : 'bg-slate-400'}`} />
          <select
            value={message.sender}
            onChange={(e) => updateMessage(message.id, { sender: e.target.value as 'me' | 'them' })}
            className="text-xs font-medium border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1 bg-white dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
          >
            <option value="me">Me (Right)</option>
            <option value="them">Them (Left)</option>
          </select>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="ghost" size="icon" className="h-7 w-7 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm rounded-full" onClick={handleDuplicate}>
            <Copy className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
          </Button>
          <Button variant="ghost" size="icon" className="h-7 w-7 bg-white dark:bg-slate-800 border border-red-200 dark:border-red-900/50 shadow-sm hover:bg-red-50 dark:hover:bg-red-950/50 rounded-full" onClick={() => deleteMessage(message.id)}>
            <Trash2 className="w-3.5 h-3.5 text-red-500" />
          </Button>
        </div>
      </div>

      <div className="space-y-3">
        {message.image ? (
          <div className="relative group/img overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700">
            <img src={message.image} alt="Message attachment" className="w-full max-h-40 object-cover" />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity backdrop-blur-[2px]">
              <Button size="sm" variant="secondary" className="mr-2" onClick={() => fileInputRef.current?.click()}>Change</Button>
              <Button size="sm" variant="danger" onClick={() => updateMessage(message.id, { image: undefined, text: 'Replaced image' })}>Remove</Button>
            </div>
            <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
          </div>
        ) : (
          <textarea
            value={message.text}
            onChange={(e) => updateMessage(message.id, { text: e.target.value })}
            className="w-full text-sm rounded-xl bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-700 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/50 resize-none min-h-[50px] shadow-sm"
          />
        )}

        <div className="flex gap-2 items-center bg-white/50 dark:bg-slate-900/30 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
          <div className="flex-1">
            <Input
              value={message.timestamp || ''}
              onChange={(e) => updateMessage(message.id, { timestamp: e.target.value })}
              placeholder="9:41"
              className="h-8 text-xs font-medium bg-transparent border-none shadow-none focus:ring-0 px-2"
            />
          </div>
          {isMe && (
            <div className="flex-1 border-l border-slate-200 dark:border-slate-700 pl-2">
              <select
                value={message.status || 'none'}
                onChange={(e) => updateMessage(message.id, { status: e.target.value as any })}
                className="text-xs h-8 w-full border-none bg-transparent font-medium text-slate-600 dark:text-slate-400 focus:outline-none focus:ring-0 px-2"
              >
                <option value="none">No status</option>
                <option value="sent">Sent</option>
                <option value="delivered">Delivered</option>
                <option value="read">Read</option>
              </select>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

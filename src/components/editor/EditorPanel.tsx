import { useState } from 'react';
import { User, MessageSquare, Palette, Trash2 } from 'lucide-react';
import { useChatState } from '../../hooks/useChatState';
import { Button } from '../common/Button';
import ProfileEditor from './ProfileEditor';
import MessageEditor from './MessageEditor';
import PlatformSelector from './PlatformSelector';
import { cn } from '../../utils/cn';

type Tab = 'profile' | 'messages' | 'platform';

export default function EditorPanel() {
  const [activeTab, setActiveTab] = useState<Tab>('messages');
  const { resetState } = useChatState();

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'profile', label: '1. Profile', icon: <User className="w-4 h-4" /> },
    { id: 'messages', label: '2. Chat', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'platform', label: '3. Design', icon: <Palette className="w-4 h-4" /> },
  ];

  const getStepHeader = () => {
    switch (activeTab) {
      case 'profile': return { title: 'Step 1: Profile Setup', desc: 'Who are you chatting with?' };
      case 'messages': return { title: 'Step 2: Conversation', desc: 'Add and edit the messages.' };
      case 'platform': return { title: 'Step 3: App Design', desc: 'Customize the final look and device.' };
    }
  };

  const header = getStepHeader();

  return (
    <div className="flex flex-col h-full bg-slate-50/50 dark:bg-slate-950/30">
      <div className="px-6 py-5 border-b border-slate-200 dark:border-slate-800/80 sticky top-0 bg-slate-50/80 dark:bg-slate-950/80 backdrop-blur-xl z-20">
        <div className="flex p-1.5 bg-slate-200/50 dark:bg-slate-900/50 rounded-xl shadow-inner border border-slate-200/50 dark:border-slate-800/50">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex-1 flex flex-col md:flex-row items-center justify-center gap-1.5 md:gap-2 py-2 px-2 text-xs md:text-sm font-bold rounded-lg transition-all duration-300',
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm ring-1 ring-slate-200 dark:ring-slate-700 scale-105 md:scale-100'
                  : 'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800/50'
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-6 pb-24">
        <div className="mb-6 pb-4 border-b border-slate-200 dark:border-slate-800/50">
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">{header.title}</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{header.desc}</p>
        </div>
        
        {activeTab === 'profile' && <ProfileEditor />}
        {activeTab === 'messages' && <MessageEditor />}
        {activeTab === 'platform' && <PlatformSelector />}
      </div>

      <div className="p-4 border-t border-slate-200 dark:border-slate-800/80 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md sticky bottom-0 z-10 flex justify-end">
        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30" onClick={resetState}>
          <Trash2 className="w-4 h-4 mr-2" />
          Reset Project
        </Button>
      </div>
    </div>
  );
}

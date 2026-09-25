import { useState, useEffect } from 'react';
import chatworkLogo from './assets/chatwork.jpg';
import ProfileEditor from './components/editor/ProfileEditor';
import MessageEditor from './components/editor/MessageEditor';
import PlatformSelector from './components/editor/PlatformSelector';
import PreviewPanel from './components/preview/PreviewPanel';
import { useChatState } from './hooks/useChatState';
import { exportAsImage } from './utils/exportImage';
import { Check, User, Settings, HelpCircle, Undo, Redo, Download, ChevronDown, ChevronUp, MonitorPlay, Loader2 } from 'lucide-react';

function App() {
  const { isSaving, state, setPlatform, setAppStyle, resetState } = useChatState();
  const [profileOpen, setProfileOpen] = useState(true);
  const [messagesOpen, setMessagesOpen] = useState(true);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportAsImage('export-container', 'chatshot-preview', 'png', 3);
    } catch (e) {
      alert('Failed to export screenshot. Make sure all images are valid.');
    } finally {
      setIsExporting(false);
    }
  };

  // Force dark mode
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="flex flex-col h-screen bg-[#0b0f1a] text-white overflow-hidden font-sans selection:bg-teal-500/30">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-center justify-between px-4 md:px-6 py-3 bg-[#111524]/80 backdrop-blur-md border-b border-white/5 shrink-0 z-30 gap-3 md:gap-0">
        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl shadow-lg flex items-center justify-center overflow-hidden bg-white shrink-0">
              <img src={chatworkLogo} alt="ChatWork Logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-lg md:text-xl font-bold tracking-tight text-white">
              ChatWork
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-5 w-full md:w-auto justify-between md:justify-end overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400 shrink-0">
            {isSaving ? (
              <>
                <div className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500" />
                <span>Saved locally</span>
              </>
            )}
          </div>
          
          <div className="hidden md:flex items-center gap-2 border-l border-white/10 pl-5 shrink-0">
            <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 transition-colors">
              <Undo className="w-4 h-4" />
            </button>
            <button className="p-2 hover:bg-white/5 rounded-lg text-slate-400 transition-colors">
              <Redo className="w-4 h-4" />
            </button>
          </div>

          <button 
            onClick={resetState}
            className="hidden md:block px-4 py-2 text-sm font-medium hover:bg-white/5 rounded-lg border border-white/10 transition-colors shrink-0"
          >
            Reset
          </button>
          
          <button 
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 rounded-lg shadow-lg shadow-teal-500/20 transition-all disabled:opacity-50 shrink-0"
          >
            {isExporting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
            Export
            <ChevronDown className="w-3.5 h-3.5 ml-1 opacity-70" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col lg:flex-row flex-1 overflow-y-auto lg:overflow-hidden relative">
        
        {/* Thin Left Navigation */}
        <aside className="hidden lg:flex w-[72px] bg-[#111524] border-r border-white/5 flex-col items-center py-4 gap-2 shrink-0 z-20">
          <button className="flex flex-col items-center gap-1 p-2 w-14 rounded-lg bg-white/5 text-teal-400">
            <User className="w-4 h-4" />
            <span className="text-[9px] font-medium">Profile</span>
          </button>

          
          <div className="mt-auto flex flex-col gap-2">
            <button className="flex flex-col items-center gap-1 p-2 w-14 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors">
              <Settings className="w-4 h-4" />
              <span className="text-[9px] font-medium">Settings</span>
            </button>
            <button className="flex flex-col items-center gap-1 p-2 w-14 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-colors">
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </aside>

        {/* Middle Left Sidebar (Editor) */}
        <aside className="w-full lg:w-[280px] bg-[#0b0f1a] border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col shrink-0 z-10 lg:h-full">
          <div className="flex-none lg:flex-1 lg:overflow-y-auto p-3 space-y-3 pb-6">
            
            {/* Profile Accordion */}
            <div className="rounded-xl border border-white/5 bg-[#111524] overflow-hidden">
              <button 
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-full flex items-center justify-between p-2.5 text-[10px] font-bold text-slate-200 hover:bg-white/5 transition-colors uppercase tracking-wider"
              >
                Profile
                {profileOpen ? <ChevronUp className="w-3.5 h-3.5 text-slate-500" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-500" />}
              </button>
              {profileOpen && (
                <div className="px-3 pb-3 border-t border-white/5 pt-3">
                  <ProfileEditor />
                </div>
              )}
            </div>

            {/* Conversation Accordion */}
            <div className="rounded-xl border border-white/5 bg-[#111524] overflow-hidden">
              <button 
                onClick={() => setMessagesOpen(!messagesOpen)}
                className="w-full flex items-center justify-between p-2.5 text-[10px] font-bold text-slate-200 hover:bg-white/5 transition-colors uppercase tracking-wider"
              >
                Conversation
                {messagesOpen ? <ChevronUp className="w-3.5 h-3.5 text-slate-500" /> : <ChevronDown className="w-3.5 h-3.5 text-slate-500" />}
              </button>
              {messagesOpen && (
                <div className="px-3 pb-3 border-t border-white/5 pt-3">
                  <MessageEditor />
                </div>
              )}
            </div>

          </div>
        </aside>

        {/* Center Preview Area */}
        <div className="w-full lg:flex-1 flex flex-col relative overflow-hidden bg-[#0b0f1a] min-h-[650px] lg:min-h-0 shrink-0 lg:shrink">
          {/* Subtle glow behind phone */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-[800px] h-[800px] bg-teal-600/10 blur-[120px] rounded-full" />
            <div className="absolute w-[500px] h-[500px] bg-emerald-600/10 blur-[100px] rounded-full translate-x-20 -translate-y-20" />
          </div>

          {/* Platform Toggle */}
          <div className="pt-6 flex justify-center z-20 w-full shrink-0 relative">
            <div className="flex p-1 bg-[#111524] border border-white/10 rounded-full shadow-2xl">
              <button
                onClick={() => {
                  setPlatform('ios');
                  setAppStyle('imessage');
                }}
                className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-semibold transition-all ${
                  state.platform === 'ios'
                    ? 'bg-teal-500/20 text-teal-400 shadow-sm ring-1 ring-teal-500/50'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <MonitorPlay className="w-4 h-4" />
                iPhone
              </button>
              <button
                onClick={() => {
                  setPlatform('android');
                  setAppStyle('whatsapp');
                }}
                className={`flex items-center gap-2 px-6 py-2 rounded-full text-xs font-semibold transition-all ${
                  state.platform === 'android'
                    ? 'bg-teal-500/20 text-teal-400 shadow-sm ring-1 ring-teal-500/50'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <MonitorPlay className="w-4 h-4" />
                Android
              </button>
            </div>
          </div>
          
          <div className="flex-1 flex items-center justify-center p-2 z-10 overflow-hidden w-full relative">
            <div className="my-auto flex items-center justify-center w-full">
              <PreviewPanel />
            </div>
          </div>
        </div>

        {/* Right Settings Sidebar */}
        <aside className="w-full lg:w-[280px] bg-[#111524] border-t lg:border-t-0 lg:border-l border-white/5 flex flex-col p-4 lg:overflow-y-auto shrink-0 z-20 lg:h-full">
           <PlatformSelector />
        </aside>
      </main>
    </div>
  );
}



export default App;

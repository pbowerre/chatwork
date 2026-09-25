import { useRef } from 'react';
import { useChatState } from '../../hooks/useChatState';
import { Image as ImageIcon, ChevronDown, User } from 'lucide-react';

export default function ProfileEditor() {
  const { state, updateProfile } = useChatState();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateProfile({ avatar: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col h-full space-y-6 animate-in fade-in duration-500 pb-2">
      {/* Profile Photo */}
      <div className="space-y-3">
        <h2 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Profile Photo</h2>
        <div className="flex items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden bg-[#0b0f1a] flex items-center justify-center shrink-0 border border-white/10 shadow-inner">
            {state.profile.avatar ? (
              <img src={state.profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
            ) : (
              <User className="w-6 h-6 text-slate-600" />
            )}
            {/* Edit pencil overlay */}
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="absolute bottom-0 right-0 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-200"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
            </button>
          </div>
          
          <div className="flex flex-col gap-1.5 flex-1">
            <button 
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2 bg-[#0b0f1a] border border-white/5 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-center gap-2 shadow-sm"
            >
              <ImageIcon className="w-3.5 h-3.5 opacity-70" />
              Upload image
            </button>
            <p className="text-[9px] text-slate-500 text-center leading-tight">
              JPG, PNG or WEBP<br/>Recommended 512x512
            </p>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>
      </div>

      {/* Name Input */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between pl-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Name</label>
          <span className="text-[10px] text-slate-500">{state.profile.name.length}/50</span>
        </div>
        <div className="bg-[#0b0f1a] rounded-xl border border-white/5 px-3 py-2.5 shadow-inner">
          <input
            type="text"
            value={state.profile.name}
            onChange={(e) => updateProfile({ name: e.target.value.substring(0, 50) })}
            placeholder="e.g. Sarah ❤️"
            className="w-full bg-transparent text-sm text-slate-200 placeholder:text-slate-600 outline-none"
          />
        </div>
      </div>

      {/* Status Input */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest pl-1">Status</label>
        <div className="relative">
          <select
            value={state.profile.status}
            onChange={(e) => updateProfile({ status: e.target.value })}
            className="w-full bg-[#0b0f1a] rounded-xl border border-white/5 px-9 py-2.5 text-sm text-slate-200 outline-none appearance-none cursor-pointer shadow-inner"
          >
            <option value="online">online</option>
            <option value="typing...">typing...</option>
            <option value="offline">offline</option>
            <option value="">(none)</option>
          </select>
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
          </div>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
      </div>
      
    </div>
  );
}

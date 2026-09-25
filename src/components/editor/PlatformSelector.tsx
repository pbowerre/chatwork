import { useChatState } from '../../hooks/useChatState';
import type { Device } from '../../types/chat';
import { Minus, Plus, Lightbulb, X } from 'lucide-react';

export default function PlatformSelector() {
  const { state, setDevice, setBackground } = useChatState();

  return (
    <div className="flex flex-col h-full space-y-5 animate-in fade-in duration-500 pb-4">
      {/* DEVICE */}
      <section className="space-y-2">
        <h2 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-1">Device</h2>
        <div className="bg-[#111524] rounded-lg border border-white/5 shadow-sm relative overflow-hidden">
          <select
            value={state.device}
            onChange={(e) => setDevice(e.target.value as Device)}
            className="w-full h-9 bg-transparent px-3 py-1.5 text-xs font-medium focus:outline-none text-slate-200 appearance-none cursor-pointer"
          >
            {state.platform === 'ios' ? (
              <>
                <option value="iphone-15">iPhone 15 Pro</option>
                <option value="iphone-16">iPhone 14</option>
                <option value="generic">Generic iOS</option>
              </>
            ) : (
              <>
                <option value="pixel">Google Pixel</option>
                <option value="galaxy">Samsung Galaxy</option>
                <option value="generic">Generic Android</option>
              </>
            )}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
            <svg width="10" height="6" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ZOOM */}
      <section className="space-y-2">
        <h2 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-1">Zoom</h2>
        <div className="flex items-center gap-2">
          <div className="flex-1 bg-[#111524] rounded-lg border border-white/5 shadow-sm flex items-center justify-between p-1">
            <button className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/5 text-slate-400 transition-colors">
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-[10px] font-medium text-slate-200">100%</span>
            <button className="w-6 h-6 flex items-center justify-center rounded-md hover:bg-white/5 text-slate-400 transition-colors">
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <button className="px-3 py-1.5 h-8 bg-[#111524] rounded-lg border border-white/5 text-[10px] font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-colors shadow-sm">
            Fit
          </button>
        </div>
      </section>

      {/* BACKGROUND */}
      <section className="space-y-2">
        <h2 className="text-[9px] font-bold text-slate-400 uppercase tracking-widest pl-1">Background</h2>
        <div className="bg-[#111524] p-3 rounded-lg border border-white/5 shadow-sm space-y-4">
          <div className="flex items-center justify-between px-1">
            <button 
              onClick={() => setBackground('transparent')}
              className={`w-7 h-7 rounded-full border-[1.5px] transition-all flex items-center justify-center ${state.background === 'transparent' ? 'border-teal-500' : 'border-transparent'}`}
            >
              <div className="w-5 h-5 rounded-full border border-white/10" style={{ backgroundImage: 'linear-gradient(45deg, #1e243b 25%, transparent 25%), linear-gradient(-45deg, #1e243b 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #1e243b 75%), linear-gradient(-45deg, transparent 75%, #1e243b 75%)', backgroundSize: '6px 6px', backgroundPosition: '0 0, 0 3px, 3px -3px, -3px 0px' }} />
            </button>
            
            <button 
              onClick={() => setBackground('black')}
              className={`w-7 h-7 rounded-full border-[1.5px] transition-all flex items-center justify-center ${state.background === 'black' ? 'border-teal-500' : 'border-transparent'}`}
            >
              <div className="w-5 h-5 rounded-full bg-black border border-white/10" />
            </button>
            
            <button 
              onClick={() => setBackground('white')}
              className={`w-7 h-7 rounded-full border-[1.5px] transition-all flex items-center justify-center ${state.background === 'white' ? 'border-teal-500' : 'border-transparent'}`}
            >
              <div className="w-5 h-5 rounded-full bg-white border border-white/10" />
            </button>

            <button 
              onClick={() => setBackground('gradient')}
              className={`w-7 h-7 rounded-full border-[1.5px] transition-all flex items-center justify-center ${state.background === 'gradient' ? 'border-teal-500' : 'border-transparent'}`}
            >
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 border border-white/10" />
            </button>
          </div>

          <div className="flex items-center justify-between border-t border-white/5 pt-3">
            <span className="text-[10px] font-medium text-slate-400">Custom</span>
            <div className="flex items-center gap-2 bg-[#1e243b] px-2 py-1 rounded border border-white/5">
              <div className="relative w-3 h-3 rounded-sm overflow-hidden border border-white/10 shadow-sm shrink-0">
                <input
                  type="color"
                  value={state.customBackgroundColor || '#0b0f1a'}
                  onChange={(e) => setBackground('custom', e.target.value)}
                  className="absolute -top-2 -left-2 w-8 h-8 cursor-pointer"
                />
              </div>
              <span className="font-mono text-[9px] text-slate-300">{state.customBackgroundColor || '#0b0f1a'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Spacer to push tip down */}
      <div className="flex-1" />

      {/* TIP */}
      <div className="bg-[#111524] p-3 rounded-lg border border-white/5 relative mt-4">
        <button className="absolute top-2 right-2 text-slate-500 hover:text-slate-300">
          <X className="w-3 h-3" />
        </button>
        <div className="flex items-center gap-1.5 mb-1.5">
          <Lightbulb className="w-3 h-3 text-teal-400" />
          <h3 className="text-[9px] font-bold text-teal-400 tracking-wide">Tip</h3>
        </div>
        <p className="text-[9px] text-slate-400 leading-relaxed">
          Drag messages to reorder.<br/>Changes are saved automatically.
        </p>
      </div>
    </div>
  );
}

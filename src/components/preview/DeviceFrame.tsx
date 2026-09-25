import { useChatState } from '../../hooks/useChatState';
import IphonePreview from './IphonePreview';
import AndroidPreview from './AndroidPreview';

export default function DeviceFrame() {
  const { state } = useChatState();
  const isIos = state.platform === 'ios';

  return (
    <div 
      className={`relative overflow-hidden bg-white transition-all duration-300 flex flex-col ${
        isIos 
          ? 'w-[340px] h-[620px] rounded-[3rem] border-[8px] border-[#0a0a0a]' 
          : 'w-[340px] h-[620px] rounded-[2.5rem] border-[6px] border-[#0a0a0a]'
      }`}
    >
      {/* Device specific notches/cameras */}
      {isIos && state.device === 'iphone-15' && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-7 bg-black rounded-full z-50 flex items-center justify-end px-3">
          <div className="w-2 h-2 rounded-full bg-slate-800/80 mr-1 shadow-inner"></div>
        </div>
      )}
      {isIos && state.device === 'iphone-16' && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-50"></div>
      )}
      {!isIos && state.device === 'pixel' && (
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-black rounded-full z-50"></div>
      )}

      {/* Main chat UI area */}
      <div className="flex-1 w-full h-full bg-white relative">
        {state.appStyle === 'imessage' ? <IphonePreview /> : <AndroidPreview />}
      </div>
      
      {/* Home indicators */}
      {isIos && (
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-black/80 rounded-full z-50"></div>
      )}
    </div>
  );
}

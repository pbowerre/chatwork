import { useChatState } from '../../hooks/useChatState';
import DeviceFrame from './DeviceFrame';

export default function PreviewPanel() {
  const { state } = useChatState();

  const getBackgroundStyle = () => {
    switch (state.background) {
      case 'transparent': return { background: 'transparent' };
      case 'black': return { background: '#000000' };
      case 'white': return { background: '#ffffff' };
      case 'gradient': return { background: 'linear-gradient(135deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)' };
      case 'custom': return { background: state.customBackgroundColor };
      default: return { background: 'transparent' };
    }
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center z-10 p-4">
      <div 
        className="relative transition-all duration-300 shrink-0 flex items-center justify-center"
        style={{ 
          transform: 'scale(min(1, calc((100vh - 220px) / 600)))', 
          transformOrigin: 'center center'
        }}
      >
        <div 
          id="export-container"
          className="p-2 flex items-center justify-center transition-colors rounded-[3rem]"
          style={getBackgroundStyle()}
        >
          <DeviceFrame />
        </div>
      </div>
    </div>
  );
}

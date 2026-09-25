import type { ChatState } from '../types/chat';

const STORAGE_KEY = 'chat-generator-project-v1';

export const defaultState: ChatState = {
  profile: {
    name: 'Sarah ❤️',
    username: '@sarah',
    status: 'online',
    showStatus: true,
    isVerified: false,
  },
  messages: [
    {
      id: 'msg-1',
      sender: 'them',
      text: "You won't believe what just happened 😂",
      timestamp: '9:41 AM',
      status: 'none',
    },
    {
      id: 'msg-2',
      sender: 'me',
      text: 'What happened??',
      timestamp: '9:42 AM',
      status: 'read',
    },
    {
      id: 'msg-3',
      sender: 'them',
      text: "I'll tell you when I see you.",
      timestamp: '9:45 AM',
      status: 'none',
    },
  ],
  platform: 'ios',
  appStyle: 'imessage',
  device: 'iphone-15',
  background: 'transparent',
  customBackgroundColor: '#ffffff',
  zoom: 0,
  settings: {
    showSignal: true,
    showWifi: true,
    showBattery: true,
    batteryLevel: 100,
    time: '9:41',
  },
};

export const saveState = (state: ChatState) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save state to LocalStorage', error);
  }
};

export const loadState = (): ChatState => {
  try {
    const item = localStorage.getItem(STORAGE_KEY);
    if (item) {
      return JSON.parse(item);
    }
  } catch (error) {
    console.error('Failed to load state from LocalStorage', error);
  }
  return defaultState;
};

export const clearState = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear state in LocalStorage', error);
  }
};

export type Sender = 'me' | 'them';
export type MessageStatus = 'sent' | 'delivered' | 'read' | 'none';
export type Platform = 'ios' | 'android';
export type AppStyle = 'imessage' | 'whatsapp';
export type Device = 'iphone-15' | 'iphone-16' | 'pixel' | 'galaxy' | 'generic';
export type BackgroundMode = 'transparent' | 'black' | 'white' | 'gradient' | 'custom';

export interface Message {
  id: string;
  text?: string;
  image?: string;
  sender: Sender;
  timestamp?: string;
  status?: MessageStatus;
}

export interface Profile {
  name: string;
  username?: string;
  avatar?: string;
  status: string;
  showStatus: boolean;
  isVerified: boolean;
}

export interface Settings {
  showSignal: boolean;
  showWifi: boolean;
  showBattery: boolean;
  batteryLevel: number;
  time: string;
}

export interface ChatState {
  profile: Profile;
  messages: Message[];
  platform: Platform;
  appStyle: AppStyle;
  device: Device;
  background: BackgroundMode;
  customBackgroundColor?: string;
  settings: Settings;
  zoom: number;
}

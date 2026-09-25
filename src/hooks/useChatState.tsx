import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { ChatState, Message, Profile, Platform, AppStyle, Device, BackgroundMode, Settings } from '../types/chat';
import { loadState, saveState, defaultState, clearState } from '../utils/storage';

interface ChatContextType {
  state: ChatState;
  updateProfile: (profile: Partial<Profile>) => void;
  updateSettings: (settings: Partial<Settings>) => void;
  addMessage: (message: Omit<Message, 'id'>) => void;
  updateMessage: (id: string, message: Partial<Message>) => void;
  deleteMessage: (id: string) => void;
  reorderMessages: (fromIndex: number, toIndex: number) => void;
  setPlatform: (platform: Platform) => void;
  setAppStyle: (appStyle: AppStyle) => void;
  setDevice: (device: Device) => void;
  setBackground: (background: BackgroundMode, color?: string) => void;
  resetState: () => void;
  isSaving: boolean;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<ChatState>(loadState);
  const [isSaving, setIsSaving] = useState(false);

  // Auto-save debounced
  useEffect(() => {
    setIsSaving(true);
    const timeout = setTimeout(() => {
      saveState(state);
      setIsSaving(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [state]);

  const updateProfile = useCallback((profile: Partial<Profile>) => {
    setState((prev) => ({ ...prev, profile: { ...prev.profile, ...profile } }));
  }, []);

  const updateSettings = useCallback((settings: Partial<Settings>) => {
    setState((prev) => ({ ...prev, settings: { ...prev.settings, ...settings } }));
  }, []);

  const addMessage = useCallback((message: Omit<Message, 'id'>) => {
    const newMessage = { ...message, id: `msg-${Date.now()}` };
    setState((prev) => ({ ...prev, messages: [...prev.messages, newMessage] }));
  }, []);

  const updateMessage = useCallback((id: string, partial: Partial<Message>) => {
    setState((prev) => ({
      ...prev,
      messages: prev.messages.map((m) => (m.id === id ? { ...m, ...partial } : m)),
    }));
  }, []);

  const deleteMessage = useCallback((id: string) => {
    setState((prev) => ({
      ...prev,
      messages: prev.messages.filter((m) => m.id !== id),
    }));
  }, []);

  const reorderMessages = useCallback((fromIndex: number, toIndex: number) => {
    setState((prev) => {
      const msgs = [...prev.messages];
      const [moved] = msgs.splice(fromIndex, 1);
      msgs.splice(toIndex, 0, moved);
      return { ...prev, messages: msgs };
    });
  }, []);

  const setPlatform = useCallback((platform: Platform) => {
    setState((prev) => ({ ...prev, platform }));
  }, []);

  const setAppStyle = useCallback((appStyle: AppStyle) => {
    setState((prev) => ({ ...prev, appStyle }));
  }, []);

  const setDevice = useCallback((device: Device) => {
    setState((prev) => ({ ...prev, device }));
  }, []);

  const setBackground = useCallback((background: BackgroundMode, color?: string) => {
    setState((prev) => ({
      ...prev,
      background,
      ...(color ? { customBackgroundColor: color } : {}),
    }));
  }, []);

  const resetState = useCallback(() => {
    if (confirm('Start over? This will clear your current conversation and customization.')) {
      clearState();
      setState(defaultState);
    }
  }, []);

  const value = {
    state,
    updateProfile,
    updateSettings,
    addMessage,
    updateMessage,
    deleteMessage,
    reorderMessages,
    setPlatform,
    setAppStyle,
    setDevice,
    setBackground,
    resetState,
    isSaving,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatState = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatState must be used within a ChatProvider');
  }
  return context;
};

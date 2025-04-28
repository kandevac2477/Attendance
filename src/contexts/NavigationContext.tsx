'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

type TabType = 'timeclock' | 'requests' | 'shifts' | 'reports' | 'employees' | 'settings';

interface NavigationContextType {
  isOpen: boolean;
  activeTab: TabType;
  toggleSidebar: () => void;
  setActiveTab: (tab: TabType) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>('timeclock');
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <NavigationContext.Provider value={{ isOpen, activeTab, toggleSidebar, setActiveTab }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationContext = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (context === undefined) {
    throw new Error('useNavigationContext must be used within a NavigationProvider');
  }
  return context;
};
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { metaMaskService, WalletInfo } from '../services/metamask';
import { Toast, ToastType } from '../components/Toast';

interface WalletContextType {
  isConnected: boolean;
  walletInfo: WalletInfo | null;
  isLoading: boolean;
  error: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  refreshWalletInfo: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

interface WalletProviderProps {
  children: ReactNode;
}

export const WalletProvider: React.FC<WalletProviderProps> = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletInfo, setWalletInfo] = useState<WalletInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: ToastType; message: string; isVisible: boolean }>({
    type: 'info',
    message: '',
    isVisible: false
  });

  // Check if MetaMask is installed on mount
  useEffect(() => {
    if (!metaMaskService.isMetaMaskInstalled()) {
      setError('MetaMask is not installed. Please install MetaMask extension.');
    }
  }, []);

  // Set up event listeners for account and chain changes
  useEffect(() => {
    if (metaMaskService.isMetaMaskInstalled()) {
      // Listen for account changes
      metaMaskService.onAccountsChanged((accounts: string[]) => {
        if (accounts.length === 0) {
          // User disconnected their wallet
          handleDisconnect();
        } else {
          // User switched accounts
          refreshWalletInfo();
        }
      });

      // Listen for chain changes
      metaMaskService.onChainChanged((chainId: string) => {
        refreshWalletInfo();
      });

      // Cleanup listeners on unmount
      return () => {
        metaMaskService.removeListeners();
      };
    }
  }, []);

  // Try to reconnect on page refresh if previously connected
  useEffect(() => {
    const checkConnection = async () => {
      try {
        const info = await metaMaskService.getWalletInfo();
        if (info) {
          setIsConnected(true);
          setWalletInfo(info);
        }
      } catch (error) {
        console.log('No previous connection found');
      }
    };

    checkConnection();
  }, []);

  const showToast = (type: ToastType, message: string) => {
    setToast({ type, message, isVisible: true });
  };

  const hideToast = () => {
    setToast(prev => ({ ...prev, isVisible: false }));
  };

  const connect = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const info = await metaMaskService.connect();
      setIsConnected(true);
      setWalletInfo(info);
      showToast('success', 'Wallet connected successfully!');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to connect to MetaMask';
      setError(errorMessage);
      setIsConnected(false);
      setWalletInfo(null);
      showToast('error', errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    handleDisconnect();
  };

  const handleDisconnect = () => {
    metaMaskService.disconnect();
    setIsConnected(false);
    setWalletInfo(null);
    setError(null);
    showToast('info', 'Wallet disconnected');
  };

  const refreshWalletInfo = async () => {
    try {
      const info = await metaMaskService.getWalletInfo();
      if (info) {
        setWalletInfo(info);
      } else {
        handleDisconnect();
      }
    } catch (error) {
      console.error('Error refreshing wallet info:', error);
      handleDisconnect();
    }
  };

  const value: WalletContextType = {
    isConnected,
    walletInfo,
    isLoading,
    error,
    connect,
    disconnect,
    refreshWalletInfo
  };

  return (
    <WalletContext.Provider value={value}>
      {children}
      <Toast
        type={toast.type}
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </WalletContext.Provider>
  );
};

export const useWallet = (): WalletContextType => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}; 
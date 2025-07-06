import React from 'react';
import { Wallet, Settings, Bell, TrendingUp, AlertCircle, Loader2 } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';

export const Header: React.FC = () => {
  const { isConnected, walletInfo, isLoading, error, connect, disconnect } = useWallet();
  return (
    <header className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-white">CryptoTrade</h1>
          </div>
          
          <div className="flex items-center space-x-4">
            {error && (
              <div className="flex items-center space-x-2 text-red-400 text-sm">
                <AlertCircle className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}
            <button className="text-gray-300 hover:text-white transition-colors duration-200">
              <Bell className="w-5 h-5" />
            </button>
            <button className="text-gray-300 hover:text-white transition-colors duration-200">
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={isConnected ? disconnect : connect}
              disabled={isLoading}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                isLoading
                  ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  : isConnected
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
              }`}
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Wallet className="w-4 h-4" />
              )}
              <span>
                {isLoading 
                  ? 'Connecting...' 
                  : isConnected 
                  ? `${walletInfo?.address.slice(0, 6)}...${walletInfo?.address.slice(-4)}` 
                  : 'Connect Wallet'
                }
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
import React from 'react';
import { Wallet, Network, Coins, Copy, Check } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';

// Extend the context to include toast functionality
const useWalletWithToast = () => {
  const wallet = useWallet();
  return {
    ...wallet,
    showToast: (type: 'success' | 'error' | 'warning' | 'info', message: string) => {
      // This will be handled by the context
      console.log(`${type}: ${message}`);
    }
  };
};

export const WalletInfo: React.FC = () => {
  const { walletInfo, isConnected } = useWalletWithToast();
  const [copied, setCopied] = React.useState(false);

  if (!isConnected || !walletInfo) {
    return null;
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(walletInfo.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy address:', error);
    }
  };

  const getNetworkColor = (chainId: number) => {
    switch (chainId) {
      case 1: return 'text-blue-400'; // Ethereum Mainnet
      case 5: return 'text-purple-400'; // Goerli
      case 11155111: return 'text-blue-400'; // Sepolia
      case 137: return 'text-purple-400'; // Polygon
      case 56: return 'text-yellow-400'; // BSC
      default: return 'text-gray-400';
    }
  };

  const getNetworkName = (chainId: number) => {
    switch (chainId) {
      case 1: return 'Ethereum Mainnet';
      case 5: return 'Goerli Testnet';
      case 11155111: return 'Sepolia Testnet';
      case 137: return 'Polygon';
      case 56: return 'BSC';
      default: return 'Unknown Network';
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Wallet Info</h2>
        <Wallet className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {/* Address */}
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Address</span>
            <button
              onClick={copyToClipboard}
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-white font-mono text-sm break-all">
            {walletInfo.address}
          </p>
        </div>

        {/* Balance */}
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Coins className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-sm">Balance</span>
          </div>
          <p className="text-white text-lg font-bold">
            {parseFloat(walletInfo.balance).toFixed(4)} ETH
          </p>
        </div>

        {/* Network */}
        <div className="bg-gray-800 rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Network className="w-4 h-4 text-gray-400" />
            <span className="text-gray-400 text-sm">Network</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${getNetworkColor(walletInfo.chainId)}`}></div>
            <p className={`text-white font-medium ${getNetworkColor(walletInfo.chainId)}`}>
              {getNetworkName(walletInfo.chainId)}
            </p>
          </div>
          <p className="text-gray-400 text-xs mt-1">
            Chain ID: {walletInfo.chainId}
          </p>
        </div>

        {/* Connection Status */}
        <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm font-medium">Connected</span>
          </div>
        </div>
      </div>
    </div>
  );
}; 
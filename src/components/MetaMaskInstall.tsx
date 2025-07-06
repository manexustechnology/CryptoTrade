import React from 'react';
import { AlertCircle, ExternalLink } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';

export const MetaMaskInstall: React.FC = () => {
  const { isConnected, error } = useWallet();

  const openMetaMaskWebsite = () => {
    window.open('https://metamask.io/download/', '_blank');
  };

  // Don't show if wallet is connected or if there's no error
  if (isConnected || !error) {
    return null;
  }

  return (
    <div className="bg-yellow-900/20 border border-yellow-500/20 rounded-xl p-6">
      <div className="flex items-start space-x-4">
        <AlertCircle className="w-6 h-6 text-yellow-400 mt-1 flex-shrink-0" />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-yellow-400 mb-2">
            MetaMask Required
          </h3>
          <p className="text-yellow-200 mb-4">
            To use this trading platform, you need to install MetaMask wallet extension. 
            MetaMask is a secure wallet for accessing Ethereum-based applications.
          </p>
          <div className="space-y-3">
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-medium text-white mb-2">Installation Steps:</h4>
              <ol className="text-gray-300 text-sm space-y-1">
                <li>1. Visit the official MetaMask website</li>
                <li>2. Click "Download" and install the extension</li>
                <li>3. Create a new wallet or import existing one</li>
                <li>4. Connect your wallet to this application</li>
              </ol>
            </div>
            <button
              onClick={openMetaMaskWebsite}
              className="flex items-center space-x-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Install MetaMask</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}; 
import React, { useEffect, useState } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface WalletProvider {
  name: string;
  isInstalled: boolean;
  isMetaMask: boolean;
}

export const WalletDetector: React.FC = () => {
  const [detectedWallets, setDetectedWallets] = useState<WalletProvider[]>([]);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const detectWallets = () => {
      const wallets: WalletProvider[] = [];
      
      // Check for MetaMask
      if (typeof window !== 'undefined' && window.ethereum) {
        if (window.ethereum.isMetaMask) {
          wallets.push({
            name: 'MetaMask',
            isInstalled: true,
            isMetaMask: true
          });
        }
        
        // Check for other wallets that might interfere
        if (window.ethereum.isCoinbaseWallet) {
          wallets.push({
            name: 'Coinbase Wallet',
            isInstalled: true,
            isMetaMask: false
          });
        }
        
        if (window.ethereum.isTokenPocket) {
          wallets.push({
            name: 'TokenPocket',
            isInstalled: true,
            isMetaMask: false
          });
        }
        
        if (window.ethereum.isTronLink) {
          wallets.push({
            name: 'TronLink',
            isInstalled: true,
            isMetaMask: false
          });
        }
        
        // Check for Yoroi (Cardano wallet)
        if (window.cardano) {
          wallets.push({
            name: 'Yoroi (Cardano)',
            isInstalled: true,
            isMetaMask: false
          });
        }
      }
      
      setDetectedWallets(wallets);
      
      // Show warning if multiple wallets are detected
      if (wallets.length > 1) {
        setShowWarning(true);
      }
    };

    detectWallets();
  }, []);

  if (!showWarning || detectedWallets.length <= 1) {
    return null;
  }

  const metaMaskWallet = detectedWallets.find(w => w.isMetaMask);
  const otherWallets = detectedWallets.filter(w => !w.isMetaMask);

  return (
    <div className="fixed top-4 left-4 right-4 z-50 animate-in slide-in-from-top-2">
      <div className="bg-yellow-900/90 border border-yellow-500/50 rounded-lg p-4 backdrop-blur-sm">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-yellow-400 mb-2">
              Multiple Wallets Detected
            </h3>
            <p className="text-yellow-200 text-sm mb-3">
              We detected multiple wallet extensions. For the best experience, we recommend using MetaMask.
            </p>
            
            <div className="space-y-2">
              {metaMaskWallet && (
                <div className="bg-green-900/30 border border-green-500/30 rounded p-2">
                  <span className="text-green-400 text-sm font-medium">✓ {metaMaskWallet.name} (Recommended)</span>
                </div>
              )}
              
              {otherWallets.map((wallet, index) => (
                <div key={index} className="bg-gray-800/50 border border-gray-600/30 rounded p-2">
                  <span className="text-gray-300 text-sm">⚠ {wallet.name}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-3 text-xs text-yellow-300">
              <p>• Disable other wallet extensions if you experience connection issues</p>
              <p>• Ensure MetaMask is unlocked and on the correct network</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowWarning(false)}
            className="text-yellow-400 hover:text-yellow-300 transition-colors duration-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}; 
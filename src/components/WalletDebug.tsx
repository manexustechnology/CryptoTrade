import React, { useState, useEffect } from 'react';
import { Bug, ChevronDown, ChevronUp } from 'lucide-react';

export const WalletDebug: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [debugInfo, setDebugInfo] = useState<any>({});

  useEffect(() => {
    const gatherDebugInfo = () => {
      const info: any = {
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        ethereum: {
          exists: typeof window.ethereum !== 'undefined',
          isMetaMask: window.ethereum?.isMetaMask || false,
          isCoinbaseWallet: window.ethereum?.isCoinbaseWallet || false,
          isTokenPocket: window.ethereum?.isTokenPocket || false,
          isTronLink: window.ethereum?.isTronLink || false,
          selectedAddress: window.ethereum?.selectedAddress || null,
          chainId: window.ethereum?.chainId || null,
          isConnected: window.ethereum?.isConnected?.() || false,
        },
        cardano: {
          exists: typeof window.cardano !== 'undefined',
          name: window.cardano?.name || null,
        },
        otherWallets: []
      };

      // Check for other wallet providers
      if (window.ethereum) {
        const providers = Object.keys(window.ethereum).filter(key => 
          key.startsWith('is') && typeof window.ethereum[key] === 'boolean'
        );
        
        providers.forEach(provider => {
          if (window.ethereum[provider]) {
            info.otherWallets.push(provider);
          }
        });
      }

      setDebugInfo(info);
    };

    gatherDebugInfo();
    
    // Update debug info when ethereum changes
    if (window.ethereum) {
      const handleAccountsChanged = () => gatherDebugInfo();
      const handleChainChanged = () => gatherDebugInfo();
      
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);
      
      return () => {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      };
    }
  }, []);

  // Only show in development mode
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-gray-900 border border-gray-700 rounded-lg shadow-lg">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2 px-3 py-2 text-gray-300 hover:text-white transition-colors duration-200"
        >
          <Bug className="w-4 h-4" />
          <span className="text-sm font-medium">Wallet Debug</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        
        {isOpen && (
          <div className="p-4 border-t border-gray-700 max-w-md">
            <div className="space-y-3 text-xs">
              <div>
                <h4 className="font-medium text-white mb-1">Ethereum Provider</h4>
                <div className="space-y-1 text-gray-300">
                  <div>Exists: {debugInfo.ethereum?.exists ? '✅' : '❌'}</div>
                  <div>MetaMask: {debugInfo.ethereum?.isMetaMask ? '✅' : '❌'}</div>
                  <div>Connected: {debugInfo.ethereum?.isConnected ? '✅' : '❌'}</div>
                  <div>Address: {debugInfo.ethereum?.selectedAddress || 'None'}</div>
                  <div>Chain ID: {debugInfo.ethereum?.chainId || 'None'}</div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-white mb-1">Other Wallets</h4>
                <div className="space-y-1 text-gray-300">
                  {debugInfo.otherWallets?.length > 0 ? (
                    debugInfo.otherWallets.map((wallet: string, index: number) => (
                      <div key={index}>⚠️ {wallet}</div>
                    ))
                  ) : (
                    <div>None detected</div>
                  )}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-white mb-1">Cardano</h4>
                <div className="space-y-1 text-gray-300">
                  <div>Exists: {debugInfo.cardano?.exists ? '✅' : '❌'}</div>
                  <div>Name: {debugInfo.cardano?.name || 'None'}</div>
                </div>
              </div>
              
              <div className="pt-2 border-t border-gray-700">
                <button
                  onClick={() => {
                    console.log('Wallet Debug Info:', debugInfo);
                    alert('Debug info logged to console');
                  }}
                  className="text-blue-400 hover:text-blue-300 text-xs"
                >
                  Log to Console
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}; 
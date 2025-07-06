import React, { useState } from 'react';
import { Header } from './components/Header';
import { TradingInterface } from './components/TradingInterface';
import { MarketData } from './components/MarketData';
import { Portfolio } from './components/Portfolio';
import { TransactionHistory } from './components/TransactionHistory';
import { OrderBook } from './components/OrderBook';

function App() {
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  const handleWalletConnect = () => {
    if (!isWalletConnected) {
      // Simulate wallet connection
      setIsWalletConnected(true);
      setWalletAddress('0x742d35Cc6634C0532925a3b8D45C7f29f8A5C8C7');
    } else {
      setIsWalletConnected(false);
      setWalletAddress('');
    }
  };

  const handleTrade = (type: 'buy' | 'sell', amount: number, price: number) => {
    // Simulate trade execution
    alert(`${type.toUpperCase()} order placed: ${amount} BTC at $${price}`);
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Header 
        onWalletConnect={handleWalletConnect}
        isConnected={isWalletConnected}
        walletAddress={walletAddress}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Trading Interface */}
          <div className="lg:col-span-3">
            <TradingInterface onTrade={handleTrade} />
          </div>

          {/* Center Column - Market Data and Order Book */}
          <div className="lg:col-span-6 space-y-8">
            <MarketData />
            <OrderBook />
          </div>

          {/* Right Column - Portfolio and History */}
          <div className="lg:col-span-3 space-y-8">
            <Portfolio />
            <TransactionHistory />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
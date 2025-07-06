import React from 'react';
import { Header } from './components/Header';
import { TradingInterface } from './components/TradingInterface';
import { MarketData } from './components/MarketData';
import { Portfolio } from './components/Portfolio';
import { TransactionHistory } from './components/TransactionHistory';
import { OrderBook } from './components/OrderBook';
import { WalletInfo } from './components/WalletInfo';
import { MetaMaskInstall } from './components/MetaMaskInstall';
import { WalletDetector } from './components/WalletDetector';
import { WalletDebug } from './components/WalletDebug';
import { WalletProvider } from './contexts/WalletContext';

function App() {
  const handleTrade = (type: 'buy' | 'sell', amount: number, price: number) => {
    // Simulate trade execution
    alert(`${type.toUpperCase()} order placed: ${amount} BTC at $${price}`);
  };

  return (
    <WalletProvider>
      <div className="min-h-screen bg-gray-950">
        <WalletDetector />
        <Header />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <MetaMaskInstall />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
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
              <WalletInfo />
              <Portfolio />
              <TransactionHistory />
            </div>
          </div>
        </main>
        
        <WalletDebug />
      </div>
    </WalletProvider>
  );
}

export default App;
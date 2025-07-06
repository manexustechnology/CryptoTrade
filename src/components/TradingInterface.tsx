import React, { useState } from 'react';
import { ArrowUpDown, TrendingUp, TrendingDown, Wallet } from 'lucide-react';
import { useWallet } from '../contexts/WalletContext';

interface TradingInterfaceProps {
  onTrade: (type: 'buy' | 'sell', amount: number, price: number) => void;
}

export const TradingInterface: React.FC<TradingInterfaceProps> = ({ onTrade }) => {
  const { isConnected, connect } = useWallet();
  const [activeTab, setActiveTab] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      connect();
      return;
    }
    if (amount && price) {
      onTrade(activeTab, parseFloat(amount), parseFloat(price));
      setAmount('');
      setPrice('');
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Trade</h2>
        <div className="flex items-center space-x-2">
          <ArrowUpDown className="w-5 h-5 text-gray-400" />
          <span className="text-gray-300">BTC/USDT</span>
        </div>
      </div>

      <div className="flex space-x-1 mb-6">
        <button
          onClick={() => setActiveTab('buy')}
          disabled={!isConnected}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            !isConnected
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : activeTab === 'buy'
              ? 'bg-green-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <TrendingUp className="w-4 h-4" />
            <span>Buy</span>
          </div>
        </button>
        <button
          onClick={() => setActiveTab('sell')}
          disabled={!isConnected}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            !isConnected
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
              : activeTab === 'sell'
              ? 'bg-red-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
          }`}
        >
          <div className="flex items-center justify-center space-x-2">
            <TrendingDown className="w-4 h-4" />
            <span>Sell</span>
          </div>
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Amount (BTC)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder={!isConnected ? "Connect wallet first" : "0.00"}
            disabled={!isConnected}
            className={`w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              !isConnected ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            step="0.00001"
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Price (USDT)
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder={!isConnected ? "Connect wallet first" : "0.00"}
            disabled={!isConnected}
            className={`w-full px-3 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
              !isConnected ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            step="0.01"
            min="0"
          />
        </div>

        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-400">Total:</span>
            <span className="text-white font-medium">
              {amount && price ? (parseFloat(amount) * parseFloat(price)).toFixed(2) : '0.00'} USDT
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Fee (0.1%):</span>
            <span className="text-white font-medium">
              {amount && price ? ((parseFloat(amount) * parseFloat(price)) * 0.001).toFixed(2) : '0.00'} USDT
            </span>
          </div>
        </div>

        <button
          type="submit"
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
            !isConnected
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : activeTab === 'buy'
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-red-600 hover:bg-red-700 text-white'
          }`}
        >
          {!isConnected ? (
            <div className="flex items-center justify-center space-x-2">
              <Wallet className="w-4 h-4" />
              <span>Connect Wallet to Trade</span>
            </div>
          ) : (
            `${activeTab === 'buy' ? 'Buy' : 'Sell'} BTC`
          )}
        </button>
      </form>
    </div>
  );
};
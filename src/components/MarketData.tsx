import React from 'react';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

export const MarketData: React.FC = () => {
  const marketData = [
    {
      symbol: 'BTC/USDT',
      price: 43250.00,
      change: '+2.45%',
      volume: '24.5B',
      isPositive: true
    },
    {
      symbol: 'ETH/USDT',
      price: 2650.00,
      change: '+1.82%',
      volume: '12.3B',
      isPositive: true
    },
    {
      symbol: 'BNB/USDT',
      price: 315.50,
      change: '-0.75%',
      volume: '2.1B',
      isPositive: false
    },
    {
      symbol: 'ADA/USDT',
      price: 0.45,
      change: '+3.22%',
      volume: '890M',
      isPositive: true
    },
    {
      symbol: 'SOL/USDT',
      price: 98.75,
      change: '+5.12%',
      volume: '1.8B',
      isPositive: true
    },
    {
      symbol: 'DOT/USDT',
      price: 6.85,
      change: '-1.23%',
      volume: '420M',
      isPositive: false
    }
  ];

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Market Overview</h2>
        <Activity className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {marketData.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors duration-200">
            <div>
              <h3 className="font-medium text-white">{item.symbol}</h3>
              <p className="text-2xl font-bold text-white">${item.price.toLocaleString()}</p>
            </div>
            <div className="text-right">
              <div className={`flex items-center space-x-1 ${item.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                {item.isPositive ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span className="font-medium">{item.change}</span>
              </div>
              <p className="text-gray-400 text-sm">Vol: {item.volume}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
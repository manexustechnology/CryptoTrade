import React from 'react';
import { PieChart, Wallet, TrendingUp, DollarSign } from 'lucide-react';

export const Portfolio: React.FC = () => {
  const portfolio = [
    { symbol: 'BTC', amount: 0.5432, value: 23478.50, change: '+2.45%', isPositive: true },
    { symbol: 'ETH', amount: 12.345, value: 32745.25, change: '+1.82%', isPositive: true },
    { symbol: 'BNB', amount: 45.67, value: 14413.35, change: '-0.75%', isPositive: false },
    { symbol: 'USDT', amount: 15000.00, value: 15000.00, change: '0.00%', isPositive: true }
  ];

  const totalValue = portfolio.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Portfolio</h2>
        <Wallet className="w-5 h-5 text-gray-400" />
      </div>

      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
            <DollarSign className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="text-gray-400">Total Portfolio Value</p>
            <p className="text-3xl font-bold text-white">${totalValue.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {portfolio.map((item, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">{item.symbol.slice(0, 1)}</span>
              </div>
              <div>
                <h3 className="font-medium text-white">{item.symbol}</h3>
                <p className="text-gray-400 text-sm">{item.amount} {item.symbol}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-white">${item.value.toLocaleString()}</p>
              <div className={`flex items-center space-x-1 ${item.isPositive ? 'text-green-400' : 'text-red-400'}`}>
                <TrendingUp className="w-3 h-3" />
                <span className="text-sm">{item.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
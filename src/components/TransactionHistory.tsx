import React from 'react';
import { Clock, ArrowUpRight, ArrowDownLeft } from 'lucide-react';

export const TransactionHistory: React.FC = () => {
  const transactions = [
    {
      id: 1,
      type: 'buy',
      symbol: 'BTC/USDT',
      amount: 0.1234,
      price: 43150.00,
      total: 5324.71,
      time: '2024-01-15 14:30:25',
      status: 'completed'
    },
    {
      id: 2,
      type: 'sell',
      symbol: 'ETH/USDT',
      amount: 2.5,
      price: 2640.00,
      total: 6600.00,
      time: '2024-01-15 13:45:12',
      status: 'completed'
    },
    {
      id: 3,
      type: 'buy',
      symbol: 'BNB/USDT',
      amount: 15.0,
      price: 315.50,
      total: 4732.50,
      time: '2024-01-15 12:20:08',
      status: 'completed'
    },
    {
      id: 4,
      type: 'sell',
      symbol: 'ADA/USDT',
      amount: 1000.0,
      price: 0.45,
      total: 450.00,
      time: '2024-01-15 11:15:33',
      status: 'pending'
    }
  ];

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Transaction History</h2>
        <Clock className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {transactions.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors duration-200">
            <div className="flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                tx.type === 'buy' ? 'bg-green-600' : 'bg-red-600'
              }`}>
                {tx.type === 'buy' ? (
                  <ArrowDownLeft className="w-4 h-4 text-white" />
                ) : (
                  <ArrowUpRight className="w-4 h-4 text-white" />
                )}
              </div>
              <div>
                <h3 className="font-medium text-white">
                  {tx.type === 'buy' ? 'Buy' : 'Sell'} {tx.symbol}
                </h3>
                <p className="text-gray-400 text-sm">{tx.time}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-white">{tx.amount} @ ${tx.price.toLocaleString()}</p>
              <p className="text-gray-400 text-sm">Total: ${tx.total.toLocaleString()}</p>
              <span className={`inline-block px-2 py-1 rounded text-xs ${
                tx.status === 'completed' ? 'bg-green-600 text-white' : 'bg-yellow-600 text-white'
              }`}>
                {tx.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
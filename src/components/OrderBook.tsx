import React from 'react';
import { BarChart3 } from 'lucide-react';

export const OrderBook: React.FC = () => {
  const sellOrders = [
    { price: 43280.00, amount: 0.1234, total: 5342.43 },
    { price: 43275.00, amount: 0.5678, total: 24578.15 },
    { price: 43270.00, amount: 0.2345, total: 10146.32 },
    { price: 43265.00, amount: 0.8901, total: 38515.21 },
    { price: 43260.00, amount: 0.3456, total: 14943.94 }
  ];

  const buyOrders = [
    { price: 43255.00, amount: 0.4567, total: 19754.85 },
    { price: 43250.00, amount: 0.6789, total: 29369.25 },
    { price: 43245.00, amount: 0.1234, total: 5336.43 },
    { price: 43240.00, amount: 0.8901, total: 38479.22 },
    { price: 43235.00, amount: 0.2345, total: 10138.63 }
  ];

  return (
    <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white">Order Book</h2>
        <BarChart3 className="w-5 h-5 text-gray-400" />
      </div>

      <div className="space-y-6">
        {/* Sell Orders */}
        <div>
          <h3 className="text-sm font-medium text-red-400 mb-3">Sell Orders</h3>
          <div className="space-y-2">
            {sellOrders.map((order, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-red-400 font-medium">${order.price.toLocaleString()}</span>
                <span className="text-gray-300">{order.amount}</span>
                <span className="text-gray-400">${order.total.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Current Price */}
        <div className="text-center py-4 bg-gray-800 rounded-lg">
          <p className="text-2xl font-bold text-white">$43,257.50</p>
          <p className="text-green-400 text-sm">+2.45% (+$1,032.45)</p>
        </div>

        {/* Buy Orders */}
        <div>
          <h3 className="text-sm font-medium text-green-400 mb-3">Buy Orders</h3>
          <div className="space-y-2">
            {buyOrders.map((order, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span className="text-green-400 font-medium">${order.price.toLocaleString()}</span>
                <span className="text-gray-300">{order.amount}</span>
                <span className="text-gray-400">${order.total.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
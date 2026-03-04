import React, { useState } from 'react';
import { Sandwich } from '../types';
import { Flame, Plus, Minus, ShoppingCart } from 'lucide-react';
import { motion } from 'motion/react';

interface SandwichCardProps {
  sandwich: Sandwich;
  onOrder: (sandwich: Sandwich, quantity: number) => void;
}

export const SandwichCard: React.FC<SandwichCardProps> = ({ sandwich, onOrder }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => setQuantity(prev => prev + 1);
  const handleDecrement = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 group"
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={sandwich.image}
          alt={sandwich.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm">
          <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
          <span className="text-xs font-bold text-slate-700">{sandwich.calories} سعرة</span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-slate-900 leading-tight">{sandwich.name}</h3>
          <span className="text-emerald-600 font-bold text-lg">{sandwich.price.toFixed(2)} ر.س</span>
        </div>
        
        <p className="text-sm text-slate-500 mb-6 line-clamp-2 h-10">
          {sandwich.description}
        </p>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center bg-slate-50 rounded-xl border border-slate-200 p-1">
            <button
              onClick={handleDecrement}
              className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-600"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-bold text-slate-900">{quantity}</span>
            <button
              onClick={handleIncrement}
              className="p-1.5 hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-600"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => onOrder(sandwich, quantity)}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-100"
          >
            <ShoppingCart className="w-4 h-4" />
            اطلب الآن
          </button>
        </div>
      </div>
    </motion.div>
  );
};

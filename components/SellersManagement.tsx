import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserCheck, UserX, Search, ShieldCheck, ShieldAlert, Clock } from 'lucide-react';
import { Seller } from '../types';

interface SellersManagementProps {
  sellers: Seller[];
  onToggleApproval: (phone: string) => void;
}

export const SellersManagement: React.FC<SellersManagementProps> = ({ sellers, onToggleApproval }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSellers = sellers.filter(s => 
    s.name.includes(searchTerm) || s.phone.includes(searchTerm)
  );

  return (
    <div className="space-y-8" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">إدارة المناديب (البائعين)</h2>
          <p className="text-slate-500 mt-1">الموافقة على حسابات المناديب أو إيقافها</p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder="بحث بالاسم أو رقم الجوال..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pr-12 pl-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredSellers.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-200 text-center">
            <p className="text-slate-400">لا يوجد مناديب مسجلين حالياً.</p>
          </div>
        ) : (
          filteredSellers.map((seller) => (
            <motion.div
              key={seller.phone}
              layout
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                  seller.isApproved ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                }`}>
                  {seller.isApproved ? <ShieldCheck className="w-8 h-8" /> : <ShieldAlert className="w-8 h-8" />}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{seller.name}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-slate-500 flex items-center gap-1">
                      <Search className="w-3.5 h-3.5" />
                      {seller.phone}
                    </span>
                    <span className="text-sm text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      انضم في {seller.joinedDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                  seller.isApproved ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                }`}>
                  {seller.isApproved ? 'حساب مفعل' : 'بانتظار التفعيل'}
                </div>
                <button
                  onClick={() => onToggleApproval(seller.phone)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95 ${
                    seller.isApproved 
                      ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' 
                      : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-100'
                  }`}
                >
                  {seller.isApproved ? (
                    <>
                      <UserX className="w-4 h-4" />
                      إلغاء التفعيل
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4" />
                      تفعيل الحساب
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

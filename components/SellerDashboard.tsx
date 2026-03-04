import React from 'react';
import { CheckCircle2, Clock, MapPin, Phone, Package, ArrowRight, CreditCard, Banknote } from 'lucide-react';
import { Order } from '../types';

interface SellerDashboardProps {
  orders: Order[];
  onUpdateStatus: (id: string, status: Order['status']) => void;
}

export const SellerDashboard: React.FC<SellerDashboardProps> = ({ orders, onUpdateStatus }) => {
  const activeOrders = orders.filter(o => o.status !== 'delivered');

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">إدارة الطلبات المباشرة</h2>
          <p className="text-slate-500">متابعة وتجهيز الطلبات الحالية للعملاء.</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-lg text-sm font-bold">
            <Clock className="w-4 h-4" />
            {activeOrders.filter(o => o.status === 'preparing').length} قيد التحضير
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-bold">
            <CheckCircle2 className="w-4 h-4" />
            {activeOrders.filter(o => o.status === 'ready').length} جاهز للتسليم
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {activeOrders.length === 0 ? (
          <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-4">
            <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <Package className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-slate-500 font-medium">لا توجد طلبات نشطة حالياً.</p>
          </div>
        ) : (
          activeOrders.map((order) => (
            <div key={order.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden hover:shadow-md transition-all group">
              <div className="flex flex-col md:flex-row">
                <div className={`w-2 md:w-3 ${order.status === 'ready' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                <div className="flex-1 p-6">
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div className="space-y-4 flex-1">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{order.id}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                            order.status === 'ready' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'
                          }`}>
                            {order.status === 'ready' ? 'جاهز للتسليم' : 'قيد التحضير'}
                          </span>
                          <span className="flex items-center gap-1 px-2 py-0.5 bg-slate-100 text-slate-600 rounded-full text-[10px] font-bold">
                            {order.paymentMethod === 'cash' ? <Banknote className="w-3 h-3" /> : <CreditCard className="w-3 h-3" />}
                            {order.paymentMethod === 'cash' ? 'كاش' : 'بطاقة'}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">{order.customer}</h3>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {order.time}
                          </span>
                          <span className="font-bold text-emerald-600">{order.total.toFixed(2)} ر.س</span>
                        </div>
                      </div>

                      {/* Order Details */}
                      <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                        <p className="text-xs font-bold text-slate-400 uppercase mb-2">تفاصيل الطلب:</p>
                        {order.details?.map((item, idx) => (
                          <div key={idx} className="flex justify-between text-sm">
                            <span className="text-slate-700 font-medium">{item.name}</span>
                            <span className="text-slate-500">x{item.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-row md:flex-col items-center gap-3">
                      <div className="flex gap-2">
                        <button className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors">
                          <Phone className="w-5 h-5" />
                        </button>
                        <button className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-600 transition-colors">
                          <MapPin className="w-5 h-5" />
                        </button>
                      </div>
                      <button 
                        onClick={() => onUpdateStatus(order.id, order.status === 'preparing' ? 'ready' : 'delivered')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95 w-full justify-center ${
                          order.status === 'ready' 
                            ? 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-100' 
                            : 'bg-slate-900 text-white hover:bg-slate-800 shadow-lg shadow-slate-100'
                        }`}
                      >
                        {order.status === 'ready' ? 'تم التسليم' : 'تحديد كجاهز'}
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

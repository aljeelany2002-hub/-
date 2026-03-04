import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, User, ArrowRight, X } from 'lucide-react';
import { BRAND_CONFIG } from '../brand';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (name: string, phone: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [phone, setPhone] = useState('');
  const [userName, setUserName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { name, logoUrl, Icon: LogoIcon } = BRAND_CONFIG;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length < 9 || userName.trim().length < 2) return;
    
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    onSuccess(userName, phone);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
          dir="rtl"
        >
          <button 
            onClick={onClose}
            className="absolute top-6 left-6 p-2 hover:bg-slate-100 rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>

          <div className="p-8 sm:p-10">
            <div className="flex flex-col items-center text-center mb-10">
              <div className="w-20 h-20 bg-white p-2 rounded-2xl shadow-sm border border-slate-100 mb-6 flex items-center justify-center overflow-hidden">
                {logoUrl ? (
                  <img src={logoUrl} alt={name} className="w-full h-full object-contain" />
                ) : (
                  <div className="bg-emerald-600 w-full h-full rounded-xl flex items-center justify-center">
                    <LogoIcon className="w-10 h-10 text-white" />
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">تسجيل الدخول</h2>
              <p className="text-slate-500 text-sm">أدخل اسمك ورقم جوالك للبدء</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 mr-1">الاسم الكريم</label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="أدخل اسمك هنا"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="block w-full pr-12 pl-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-lg font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700 mr-1">رقم الجوال</label>
                <div className="relative">
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="5XXXXXXXX"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    className="block w-full pr-12 pl-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-lg font-medium tracking-wider"
                  />
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-slate-400 font-bold">+966</span>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading || phone.length < 9 || userName.trim().length < 2}
                className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:cursor-not-allowed text-white font-bold py-4 rounded-2xl shadow-lg shadow-emerald-100 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <span>دخول</span>
                    <ArrowRight className="w-5 h-5 rotate-180" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="p-6 bg-slate-50 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-400">
              باستمرارك، أنت توافق على شروط الخدمة وسياسة الخصوصية الخاصة بـ {name}
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

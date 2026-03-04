import React from 'react';
import { LayoutDashboard, ShoppingBag, MessageSquare, UserCircle, Store, Truck, X, Settings, Users } from 'lucide-react';
import { UserRole } from '../types';
import { BRAND_CONFIG } from '../brand';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: any) => void;
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  onLoginClick: () => void;
  onCartClick: () => void;
  cartCount: number;
  user: { name: string; phone: string; isAdmin?: boolean; isSellerApproved?: boolean } | null;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, currentRole, setCurrentRole, onLoginClick, onCartClick, cartCount, user }) => {
  const { name, slogan, logoUrl, Icon: LogoIcon } = BRAND_CONFIG;

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="bg-white p-1 rounded-xl shadow-sm border border-slate-100 overflow-hidden flex items-center justify-center w-14 h-14 transition-transform group-hover:scale-105">
                {logoUrl ? (
                  <img src={logoUrl} alt={name} className="w-full h-full object-contain" />
                ) : (
                  <div className="bg-emerald-600 w-full h-full rounded-lg flex items-center justify-center">
                    <LogoIcon className="w-7 h-7 text-white" />
                  </div>
                )}
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 tracking-tight leading-tight">{name}</h1>
                <p className="text-xs text-emerald-600 font-bold uppercase tracking-wider">{slogan}</p>
              </div>
            </div>

            {user?.isAdmin && (
              <div className="hidden lg:flex items-center gap-1 bg-slate-50 p-1 rounded-xl border border-slate-100">
                <button
                  onClick={() => setCurrentRole('buyer')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    currentRole === 'buyer' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <UserCircle className="w-3.5 h-3.5" />
                  مشتري
                </button>
                <button
                  onClick={() => setCurrentRole('restaurant')}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    currentRole === 'restaurant' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                  }`}
                >
                  <Store className="w-3.5 h-3.5" />
                  المطعم
                </button>
                {(user?.isAdmin || user?.isSellerApproved) && (
                  <button
                    onClick={() => setCurrentRole('seller')}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      currentRole === 'seller' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    <Truck className="w-3.5 h-3.5" />
                    الفروع
                  </button>
                )}
              </div>
            )}
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {currentRole === 'buyer' && (
              <>
                <button
                  onClick={() => setActiveTab('shop')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'shop' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <ShoppingBag className="w-4 h-4" />
                  المتجر
                </button>
                <button
                  onClick={() => setActiveTab('feedback')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'feedback' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  التقييم
                </button>
              </>
            )}
            {currentRole === 'restaurant' && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab('dashboard')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'dashboard' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  لوحة التحكم
                </button>
                <button
                  onClick={() => setActiveTab('manage-menu')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'manage-menu' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <Store className="w-4 h-4" />
                  إدارة القائمة
                </button>
                <button
                  onClick={() => setActiveTab('manage-reviews')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeTab === 'manage-reviews' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  التقييمات
                </button>
                {user?.isAdmin && (
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === 'settings' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                    الإعدادات
                  </button>
                )}
                {user?.isAdmin && (
                  <button
                    onClick={() => setActiveTab('manage-sellers')}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      activeTab === 'manage-sellers' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <Users className="w-4 h-4" />
                    إدارة الفروع
                  </button>
                )}
              </div>
            )}
            {currentRole === 'seller' && (
              <button
                onClick={() => setActiveTab('seller-orders')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeTab === 'seller-orders' ? 'bg-emerald-50 text-emerald-700' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Truck className="w-4 h-4" />
                طلبات الفرع
              </button>
            )}
          </nav>

          <div className="flex items-center gap-4">
            {currentRole === 'buyer' && (
              <button
                onClick={onCartClick}
                className="relative p-2.5 bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 rounded-xl border border-slate-100 transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                    {cartCount}
                  </span>
                )}
              </button>
            )}

            {user ? (
              <div className="flex items-center gap-3">
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-slate-900">
                    {user.name}
                  </p>
                  <p className="text-xs text-slate-500">{user.phone}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center overflow-hidden cursor-pointer group relative">
                   <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.phone}`} alt="User" />
                   <div 
                     onClick={() => window.location.reload()} 
                     className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                     title="تسجيل الخروج"
                   >
                     <X className="w-5 h-5 text-white" />
                   </div>
                </div>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-emerald-100 transition-all active:scale-95"
              >
                تسجيل الدخول
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { AuthModal } from './components/AuthModal';
import { Footer } from './components/Footer';
import { SandwichCard } from './components/SandwichCard';
import { Dashboard } from './components/Dashboard';
import { FeedbackForm } from './components/FeedbackForm';
import { SellerDashboard } from './components/SellerDashboard';
import { MenuManagement } from './components/MenuManagement';
import { ReviewsManagement } from './components/ReviewsManagement';
import { SettingsManagement } from './components/SettingsManagement';
import { BranchesManagement } from './components/BranchesManagement';
import { SANDWICHES as INITIAL_SANDWICHES } from './constants';
import { Sandwich, DashboardStats, UserRole, Review, Order, RestaurantConfig, Branch } from './types';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, X, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [currentRole, setCurrentRole] = useState<UserRole>('buyer');
  const [activeTab, setActiveTab] = useState<string>('shop');
  const [sandwiches, setSandwiches] = useState<Sandwich[]>(INITIAL_SANDWICHES);
  const [reviews, setReviews] = useState<Review[]>([
    { id: '1', name: 'محمد علي', rating: 5, message: 'أفضل ساندوتش كلوب ذقته في حياتي!', date: '2024-03-01' },
    { id: '2', name: 'سارة أحمد', rating: 4, message: 'الوجبة لذيذة جداً ولكن التوصيل تأخر قليلاً.', date: '2024-03-02' }
  ]);
  const [orders, setOrders] = useState<Order[]>([
    { 
      id: 'ORD-101', 
      customer: 'أحمد محمود', 
      items: 2, 
      total: 45, 
      time: 'منذ 10 دقائق', 
      status: 'preparing',
      paymentMethod: 'cash',
      details: [{ name: 'بيتزا خضار', quantity: 1 }, { name: 'فطيرة لبنة', quantity: 1 }]
    },
    { 
      id: 'ORD-102', 
      customer: 'ليلى خالد', 
      items: 1, 
      total: 22, 
      time: 'منذ 25 دقيقة', 
      status: 'ready',
      paymentMethod: 'card',
      details: [{ name: 'ساندوتش فلافل', quantity: 1 }]
    }
  ]);
  const [cart, setCart] = useState<{ sandwich: Sandwich; quantity: number }[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'card'>('cash');
  const [showCart, setShowCart] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [user, setUser] = useState<{ name: string; phone: string; isAdmin?: boolean; isSellerApproved?: boolean } | null>(null);
  const [branches, setBranches] = useState<Branch[]>([
    { id: 'BR-1', name: 'فرع الرياض الرئيسي', manager: 'خالد المندوب', phone: '0500000001', isApproved: true, joinedDate: '2024-02-15' },
    { id: 'BR-2', name: 'فرع جدة', manager: 'ياسر علي', phone: '0500000002', isApproved: false, joinedDate: '2024-03-01' }
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [restaurantConfig, setRestaurantConfig] = useState<RestaurantConfig>({
    phone: '+966 54 414 1303',
    location: 'الرياض، المملكة العربية السعودية',
    workingHours: {
      weekdays: '10:00 ص - 12:00 م',
      friday: '1:00 م - 1:00 ص'
    },
    socialLinks: {
      instagram: 'https://instagram.com',
      facebook: 'https://facebook.com',
      twitter: 'https://twitter.com'
    }
  });

  const categories = ['الكل', 'بيتزا', 'فطائر', 'فلافل'];

  const filteredSandwiches = useMemo(() => {
    if (selectedCategory === 'الكل') return sandwiches;
    return sandwiches.filter(s => s.name.includes(selectedCategory));
  }, [sandwiches, selectedCategory]);

  // Update active tab when role changes
  useEffect(() => {
    if (currentRole === 'buyer') setActiveTab('shop');
    else if (currentRole === 'restaurant') setActiveTab('dashboard');
    else if (currentRole === 'seller') setActiveTab('seller-orders');
  }, [currentRole]);

  // Order Handlers
  const handleCheckout = () => {
    const total = cart.reduce((sum, item) => sum + item.sandwich.price * item.quantity, 0);
    const newOrder: Order = {
      id: `ORD-${Math.floor(Math.random() * 900) + 100}`,
      customer: user?.name || 'عميل جديد',
      items: cart.reduce((sum, item) => sum + item.quantity, 0),
      total,
      time: 'الآن',
      status: 'preparing',
      paymentMethod: paymentMethod,
      details: cart.map(item => ({ name: item.sandwich.name, quantity: item.quantity }))
    };
    setOrders([newOrder, ...orders]);
    setCart([]);
    setShowCart(false);
    setOrderSuccess(true);
    setTimeout(() => setOrderSuccess(false), 3000);
  };

  const handleUpdateOrderStatus = (id: string, status: Order['status']) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
  };

  // Review Handlers
  const handleAddReview = (newReview: Omit<Review, 'id' | 'date'>) => {
    const id = (reviews.length + 1).toString();
    const date = new Date().toISOString().split('T')[0];
    setReviews([{ ...newReview, id, date }, ...reviews]);
  };

  // Menu Management Handlers
  const handleAddSandwich = (newSandwich: Omit<Sandwich, 'id'>) => {
    const id = (sandwiches.length + 1).toString();
    setSandwiches([...sandwiches, { ...newSandwich, id }]);
  };

  const handleUpdateSandwich = (updatedSandwich: Sandwich) => {
    setSandwiches(sandwiches.map(s => s.id === updatedSandwich.id ? updatedSandwich : s));
  };

  const handleToggleBranchApproval = (phone: string) => {
    setBranches(prev => prev.map(b => 
      b.phone === phone ? { ...b, isApproved: !b.isApproved } : b
    ));
    // Update current user if they are the one being toggled
    if (user?.phone === phone) {
      setUser(prev => prev ? { ...prev, isSellerApproved: !prev.isSellerApproved } : null);
    }
  };

  const handleDeleteSandwich = (id: string) => {
    setSandwiches(sandwiches.filter(s => s.id !== id));
  };

  // Mock stats for the dashboard
  const stats: DashboardStats = useMemo(() => ({
    totalSales: 12450,
    totalOrders: 482,
    popularItems: sandwiches.map(s => ({
      name: s.name,
      count: Math.floor(Math.random() * 100) + 20
    })).sort((a, b) => b.count - a.count),
    salesByDay: [
      { day: 'الاثنين', amount: 1200 },
      { day: 'الثلاثاء', amount: 1900 },
      { day: 'الأربعاء', amount: 1500 },
      { day: 'الخميس', amount: 2100 },
      { day: 'الجمعة', amount: 2800 },
      { day: 'السبت', amount: 3200 },
      { day: 'الأحد', amount: 2400 },
    ]
  }), [sandwiches]);

  const handleOrder = (sandwich: Sandwich, quantity: number) => {
    setCart(prev => {
      const existing = prev.find(item => item.sandwich.id === sandwich.id);
      if (existing) {
        return prev.map(item => 
          item.sandwich.id === sandwich.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { sandwich, quantity }];
    });
    setShowCart(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.sandwich.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.sandwich.price * item.quantity), 0);

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        onLoginClick={() => setShowAuth(true)}
        onCartClick={() => setShowCart(true)}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        user={user}
      />

      <AuthModal 
        isOpen={showAuth} 
        onClose={() => setShowAuth(false)}
        onSuccess={(name, phone) => {
          const isAdmin = name === 'سلطان' && phone === '0544141303';
          const branch = branches.find(b => b.phone === phone);
          
          // If not admin and not in branches list, add as pending branch
          if (!isAdmin && !branch) {
            const newBranch: Branch = { 
              id: `BR-${Math.floor(Math.random() * 900) + 100}`,
              name: 'فرع جديد', 
              manager: name,
              phone, 
              isApproved: false, 
              joinedDate: new Date().toISOString().split('T')[0] 
            };
            setBranches(prev => [...prev, newBranch]);
          }

          setUser({ 
            name, 
            phone, 
            isAdmin, 
            isSellerApproved: isAdmin || (branch?.isApproved || false) 
          });
          
          setShowAuth(false);
          if (isAdmin) {
            setCurrentRole('restaurant');
          }
        }}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <AnimatePresence mode="wait">
          {activeTab === 'shop' && (
            <motion.div
              key="shop"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Hero Section */}
              <div className="relative h-[300px] rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=1920" 
                  alt="Hero" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent flex flex-col justify-center px-12">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="bg-emerald-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4 inline-block">
                      طعم لا يقاوم
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                      أشهى المعجنات <br /> والبيتزا الطازجة
                    </h2>
                    <p className="text-slate-200 max-w-md text-lg">
                      نستخدم أجود المكونات لنقدم لكم تجربة طعام فريدة ومميزة يومياً.
                    </p>
                  </motion.div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="flex flex-wrap gap-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                        selectedCategory === category 
                          ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-100' 
                          : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-200 hover:bg-emerald-50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                <div className="flex-1 max-w-md">
                  <div className="relative group">
                    <input 
                      type="text"
                      placeholder="ابحث عن وجبتك المفضلة..."
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all text-sm placeholder:text-slate-400"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredSandwiches.map(sandwich => (
                  <SandwichCard 
                    key={sandwich.id} 
                    sandwich={sandwich} 
                    onOrder={handleOrder}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">تحليلات الأعمال</h2>
                <p className="text-slate-500 mt-1">نظرة عامة مباشرة على أداء متجر الساندوتشات الخاص بك.</p>
              </div>
              <Dashboard stats={stats} />
            </motion.div>
          )}

          {activeTab === 'manage-menu' && (
            <motion.div
              key="manage-menu"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <MenuManagement 
                sandwiches={sandwiches}
                onAdd={handleAddSandwich}
                onUpdate={handleUpdateSandwich}
                onDelete={handleDeleteSandwich}
              />
            </motion.div>
          )}

          {activeTab === 'manage-reviews' && (
            <motion.div
              key="manage-reviews"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <ReviewsManagement reviews={reviews} />
            </motion.div>
          )}

          {activeTab === 'seller-orders' && (
            <motion.div
              key="seller-orders"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <SellerDashboard 
                orders={orders} 
                onUpdateStatus={handleUpdateOrderStatus} 
              />
            </motion.div>
          )}

          {activeTab === 'feedback' && (
            <motion.div
              key="feedback"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <FeedbackForm onSubmitReview={handleAddReview} />
            </motion.div>
          )}

          {activeTab === 'settings' && user?.isAdmin && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <SettingsManagement 
                config={restaurantConfig} 
                onUpdate={setRestaurantConfig} 
                branches={branches}
                onUpdateBranches={setBranches}
              />
            </motion.div>
          )}

          {activeTab === 'manage-sellers' && user?.isAdmin && (
            <motion.div
              key="manage-sellers"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <BranchesManagement 
                branches={branches} 
                onToggleApproval={handleToggleBranchApproval} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer config={restaurantConfig} />

      {/* Cart Sidebar */}
      <AnimatePresence>
        {showCart && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCart(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <ShoppingCart className="w-5 h-5 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">طلبك الحالي</h3>
                </div>
                <button 
                  onClick={() => setShowCart(false)}
                  className="p-2 hover:bg-slate-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {orderSuccess ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="bg-emerald-100 p-4 rounded-full">
                      <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900">تم الطلب بنجاح!</h4>
                    <p className="text-slate-500">ساندوتشاتك اللذيذة قيد التحضير الآن.</p>
                  </div>
                ) : cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                    <div className="bg-slate-100 p-4 rounded-full">
                      <ShoppingCart className="w-12 h-12 text-slate-400" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900">السلة فارغة</h4>
                    <p className="text-slate-500">أضف بعض الساندوتشات لتبدأ طلبك!</p>
                  </div>
                ) : (
                  cart.map(item => (
                    <div key={item.sandwich.id} className="flex gap-4 group">
                      <img 
                        src={item.sandwich.image} 
                        alt={item.sandwich.name} 
                        className="w-20 h-20 rounded-xl object-cover border border-slate-100"
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-slate-900">{item.sandwich.name}</h4>
                          <button 
                            onClick={() => removeFromCart(item.sandwich.id)}
                            className="text-slate-400 hover:text-rose-500 transition-colors"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-slate-500">الكمية: {item.quantity}</p>
                        <p className="text-emerald-600 font-bold mt-1">{(item.sandwich.price * item.quantity).toFixed(2)} ر.س</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {!orderSuccess && cart.length > 0 && (
                <div className="p-6 bg-slate-50 border-t border-slate-100 space-y-6">
                  <div className="space-y-3">
                    <p className="text-sm font-bold text-slate-700">طريقة الدفع</p>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setPaymentMethod('cash')}
                        className={`py-3 rounded-xl border-2 font-bold text-sm transition-all ${
                          paymentMethod === 'cash' 
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-700' 
                            : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                        }`}
                      >
                        الدفع عند الاستلام
                      </button>
                      <button
                        onClick={() => setPaymentMethod('card')}
                        className={`py-3 rounded-xl border-2 font-bold text-sm transition-all ${
                          paymentMethod === 'card' 
                            ? 'border-emerald-600 bg-emerald-50 text-emerald-700' 
                            : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                        }`}
                      >
                        بطاقة مدى / فيزا
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-lg font-bold text-slate-900">
                    <span>الإجمالي</span>
                    <span>{cartTotal.toFixed(2)} ر.س</span>
                  </div>
                  <button 
                    onClick={handleCheckout}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-emerald-100 transition-all active:scale-[0.98]"
                  >
                    إتمام الطلب
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

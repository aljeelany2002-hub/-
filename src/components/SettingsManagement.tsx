import React, { useState } from 'react';
import { Save, Phone, MapPin, Clock, Share2, Instagram, Facebook, Twitter, Building2, User, Plus, Trash2 } from 'lucide-react';
import { RestaurantConfig, Branch } from '../types';

interface SettingsManagementProps {
  config: RestaurantConfig;
  onUpdate: (config: RestaurantConfig) => void;
  branches: Branch[];
  onUpdateBranches: (branches: Branch[]) => void;
}

export const SettingsManagement: React.FC<SettingsManagementProps> = ({ config, onUpdate, branches, onUpdateBranches }) => {
  const [formData, setFormData] = useState<RestaurantConfig>(config);
  const [branchList, setBranchList] = useState<Branch[]>(branches);
  const [isSaving, setIsSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    onUpdate(formData);
    onUpdateBranches(branchList);
    setIsSaving(false);
  };

  const addBranch = () => {
    const newBranch: Branch = {
      id: `BR-${Math.floor(Math.random() * 900) + 100}`,
      name: 'فرع جديد',
      manager: 'اسم الموظف',
      phone: '05xxxxxxxx',
      isApproved: true,
      joinedDate: new Date().toISOString().split('T')[0]
    };
    setBranchList([...branchList, newBranch]);
  };

  const removeBranch = (id: string) => {
    setBranchList(branchList.filter(b => b.id !== id));
  };

  const updateBranch = (id: string, field: keyof Branch, value: string) => {
    setBranchList(branchList.map(b => b.id === id ? { ...b, [field]: value } : b));
  };

  return (
    <div className="space-y-8" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">إعدادات المتجر</h2>
          <p className="text-slate-500 mt-1">التحكم في معلومات التواصل وساعات العمل والفروع</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold">معلومات التواصل الرئيسية</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">رقم الجوال</label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={e => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">الموقع (العنوان)</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={e => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold">ساعات العمل</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">السبت - الخميس</label>
                <input
                  type="text"
                  value={formData.workingHours.weekdays}
                  onChange={e => setFormData({ 
                    ...formData, 
                    workingHours: { ...formData.workingHours, weekdays: e.target.value } 
                  })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">الجمعة</label>
                <input
                  type="text"
                  value={formData.workingHours.friday}
                  onChange={e => setFormData({ 
                    ...formData, 
                    workingHours: { ...formData.workingHours, friday: e.target.value } 
                  })}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Branches Management */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-6">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-100 rounded-lg text-amber-600">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold">إدارة الفروع</h3>
            </div>
            <button
              type="button"
              onClick={addBranch}
              className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-bold text-sm"
            >
              <Plus className="w-4 h-4" />
              إضافة فرع جديد
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {branchList.map((branch) => (
              <div key={branch.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4 relative group">
                <button
                  type="button"
                  onClick={() => removeBranch(branch.id)}
                  className="absolute top-4 left-4 p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">اسم الفرع</label>
                    <div className="relative">
                      <Building2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={branch.name}
                        onChange={e => updateBranch(branch.id, 'name', e.target.value)}
                        className="w-full pr-10 pl-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">الموظف المسؤول</label>
                    <div className="relative">
                      <User className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={branch.manager}
                        onChange={e => updateBranch(branch.id, 'manager', e.target.value)}
                        className="w-full pr-10 pl-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase mb-1">رقم الجوال</label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={branch.phone}
                        onChange={e => updateBranch(branch.id, 'phone', e.target.value)}
                        className="w-full pr-10 pl-4 py-2 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
              <Share2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold">روابط التواصل الاجتماعي</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1">
                <Instagram className="w-4 h-4 text-pink-600" />
                إنستغرام
              </label>
              <input
                type="text"
                value={formData.socialLinks.instagram}
                onChange={e => setFormData({ 
                  ...formData, 
                  socialLinks: { ...formData.socialLinks, instagram: e.target.value } 
                })}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1">
                <Facebook className="w-4 h-4 text-blue-600" />
                فيسبوك
              </label>
              <input
                type="text"
                value={formData.socialLinks.facebook}
                onChange={e => setFormData({ 
                  ...formData, 
                  socialLinks: { ...formData.socialLinks, facebook: e.target.value } 
                })}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 mb-1">
                <Twitter className="w-4 h-4 text-sky-500" />
                تويتر
              </label>
              <input
                type="text"
                value={formData.socialLinks.twitter}
                onChange={e => setFormData({ 
                  ...formData, 
                  socialLinks: { ...formData.socialLinks, twitter: e.target.value } 
                })}
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSaving}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-emerald-100 transition-all active:scale-95 disabled:bg-slate-300"
          >
            {isSaving ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Save className="w-5 h-5" />
                حفظ الإعدادات
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

import React, { useState } from 'react';
import { Sandwich } from '../types';
import { Plus, Edit2, Trash2, Save, X, Image as ImageIcon, Flame, DollarSign } from 'lucide-react';

interface MenuManagementProps {
  sandwiches: Sandwich[];
  onAdd: (sandwich: Omit<Sandwich, 'id'>) => void;
  onUpdate: (sandwich: Sandwich) => void;
  onDelete: (id: string) => void;
}

export const MenuManagement: React.FC<MenuManagementProps> = ({ sandwiches, onAdd, onUpdate, onDelete }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Sandwich, 'id'>>({
    name: '',
    price: 0,
    image: '',
    calories: 0,
    description: ''
  });

  const handleEdit = (sandwich: Sandwich) => {
    setEditingId(sandwich.id);
    setFormData({
      name: sandwich.name,
      price: sandwich.price,
      image: sandwich.image,
      calories: sandwich.calories,
      description: sandwich.description
    });
  };

  const handleSave = () => {
    if (editingId) {
      onUpdate({ ...formData, id: editingId });
      setEditingId(null);
    } else {
      onAdd(formData);
      setIsAdding(false);
    }
    setFormData({ name: '', price: 0, image: '', calories: 0, description: '' });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">إدارة قائمة الطعام</h2>
          <p className="text-slate-500">إضافة، تعديل، أو حذف الوجبات من القائمة.</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-6 rounded-xl flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-100"
        >
          <Plus className="w-5 h-5" />
          إضافة وجبة جديدة
        </button>
      </div>

      {(isAdding || editingId) && (
        <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-xl space-y-6 animate-in slide-in-from-top-4 duration-300">
          <div className="flex justify-between items-center border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold text-slate-900">
              {editingId ? 'تعديل الوجبة' : 'إضافة وجبة جديدة'}
            </h3>
            <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="text-slate-400 hover:text-slate-600">
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">اسم الوجبة</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                placeholder="مثال: كلاسيك برجر"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">السعر (ر.س)</label>
              <div className="relative">
                <DollarSign className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">رابط الصورة</label>
              <div className="relative">
                <ImageIcon className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">السعرات الحرارية</label>
              <div className="relative">
                <Flame className="absolute right-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  value={formData.calories}
                  onChange={(e) => setFormData({ ...formData, calories: parseInt(e.target.value) })}
                  className="w-full pr-10 pl-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none"
                />
              </div>
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-bold text-slate-700">وصف الوجبة</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none resize-none"
                placeholder="اكتب وصفاً قصيراً للمكونات..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => { setIsAdding(false); setEditingId(null); }}
              className="px-6 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-all"
            >
              إلغاء
            </button>
            <button
              onClick={handleSave}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-8 rounded-xl flex items-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-100"
            >
              <Save className="w-5 h-5" />
              حفظ الوجبة
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sandwiches.map((sandwich) => (
          <div key={sandwich.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all group">
            <div className="h-40 relative">
              <img src={sandwich.image} alt={sandwich.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button
                  onClick={() => handleEdit(sandwich)}
                  className="p-2 bg-white rounded-lg text-slate-900 hover:bg-emerald-50 hover:text-emerald-600 transition-all"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(sandwich.id)}
                  className="p-2 bg-white rounded-lg text-slate-900 hover:bg-rose-50 hover:text-rose-600 transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-bold text-slate-900">{sandwich.name}</h4>
                <span className="text-emerald-600 font-bold">{sandwich.price} ر.س</span>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2">{sandwich.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

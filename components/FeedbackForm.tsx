import React, { useState } from 'react';
import { MessageCircle, Send, Star, User, Phone, MessageSquare } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../constants';
import { Review } from '../types';

interface FeedbackFormProps {
  onSubmitReview: (review: Omit<Review, 'id' | 'date'>) => void;
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSubmitReview }) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save locally
    onSubmitReview({ name, rating, message });
    
    // Send via WhatsApp
    const text = `*تقييم جديد من ساندوتش هب*%0A%0A*الاسم:* ${name}%0A*التقييم:* ${'⭐'.repeat(rating)}%0A*الرسالة:* ${message}`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    
    window.open(whatsappUrl, '_blank');

    // Reset form
    setName('');
    setRating(5);
    setMessage('');
  };

  return (
    <div className="max-w-2xl mx-auto animate-in slide-in-from-bottom-8 duration-500">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        <div className="bg-emerald-600 p-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white/20 p-3 rounded-2xl backdrop-blur-md">
              <MessageCircle className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">تقييم العملاء</h2>
              <p className="text-emerald-100 text-sm">رأيك يهمنا جداً!</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <User className="w-4 h-4 text-emerald-600" />
              الاسم الكامل
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="أدخل اسمك هنا"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <Star className="w-4 h-4 text-emerald-600" />
              التقييم
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`p-2 rounded-lg transition-all ${
                    rating >= star ? 'text-amber-400 scale-110' : 'text-slate-200'
                  }`}
                >
                  <Star className={`w-8 h-8 ${rating >= star ? 'fill-amber-400' : ''}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              رسالتك
            </label>
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              placeholder="أخبرنا عن تجربتك..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] shadow-lg shadow-emerald-100"
          >
            <Send className="w-5 h-5" />
            إرسال عبر واتساب
          </button>

          <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-2">
            <Phone className="w-3 h-3" />
            مباشرة إلى: {WHATSAPP_NUMBER}+
          </p>
        </form>
      </div>
    </div>
  );
};

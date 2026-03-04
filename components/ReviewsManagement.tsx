import React from 'react';
import { Review } from '../types';
import { Star, MessageSquare, Calendar, User } from 'lucide-react';

interface ReviewsManagementProps {
  reviews: Review[];
}

export const ReviewsManagement: React.FC<ReviewsManagementProps> = ({ reviews }) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">تقييمات العملاء</h2>
        <p className="text-slate-500">متابعة آراء وملاحظات العملاء حول الخدمة والوجبات.</p>
      </div>

      {reviews.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-4">
          <div className="bg-slate-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
            <MessageSquare className="w-8 h-8 text-slate-300" />
          </div>
          <p className="text-slate-500 font-medium">لا توجد تقييمات حالياً.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{review.name}</h4>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-3 h-3 ${review.rating >= s ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {review.date}
                </div>
              </div>
              
              <p className="text-sm text-slate-600 leading-relaxed italic">
                "{review.message}"
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

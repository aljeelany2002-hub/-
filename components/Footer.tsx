import React from 'react';
import { BRAND_CONFIG } from '../brand';
import { Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { RestaurantConfig } from '../types';

interface FooterProps {
  config: RestaurantConfig;
}

export const Footer: React.FC<FooterProps> = ({ config }) => {
  const { name, slogan } = BRAND_CONFIG;

  return (
    <footer className="bg-slate-900 text-white py-16" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold tracking-tight">{name}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              {slogan} - نقدم لكم أفضل الوجبات الطازجة يومياً بأعلى معايير الجودة والنظافة.
            </p>
            <div className="flex gap-4">
              <a href={config.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-lg hover:bg-emerald-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href={config.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-lg hover:bg-emerald-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={config.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-lg hover:bg-emerald-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">روابط سريعة</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li><a href="#" className="hover:text-emerald-500 transition-colors">قائمة الطعام</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">عن المطعم</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">تواصل معنا</a></li>
              <li><a href="#" className="hover:text-emerald-500 transition-colors">الأسئلة الشائعة</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">ساعات العمل</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex justify-between">
                <span>السبت - الخميس:</span>
                <span>{config.workingHours.weekdays}</span>
              </li>
              <li className="flex justify-between">
                <span>الجمعة:</span>
                <span>{config.workingHours.friday}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">اتصل بنا</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-emerald-500" />
                <span>{config.phone}</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-emerald-500" />
                <span>{config.location}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
          <p>© {new Date().getFullYear()} {name}. جميع الحقوق محفوظة.</p>
        </div>
      </div>
    </footer>
  );
};

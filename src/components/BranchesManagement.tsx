import React, { useState } from 'react';
import { motion } from 'motion/react';
import { UserCheck, UserX, Search, ShieldCheck, ShieldAlert, Clock, Building2, User } from 'lucide-react';
import { Branch } from '../types';

interface BranchesManagementProps {
  branches: Branch[];
  onToggleApproval: (phone: string) => void;
}

export const BranchesManagement: React.FC<BranchesManagementProps> = ({ branches, onToggleApproval }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBranches = branches.filter(b => 
    b.name.includes(searchTerm) || b.phone.includes(searchTerm) || b.manager.includes(searchTerm)
  );

  return (
    <div className="space-y-8" dir="rtl">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-slate-900">إدارة الفروع</h2>
          <p className="text-slate-500 mt-1">الموافقة على حسابات الفروع أو إيقافها</p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
        <input
          type="text"
          placeholder="بحث باسم الفرع، الموظف، أو الجوال..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pr-12 pl-4 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredBranches.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-dashed border-slate-200 text-center">
            <p className="text-slate-400">لا توجد فروع مسجلة حالياً.</p>
          </div>
        ) : (
          filteredBranches.map((branch) => (
            <motion.div
              key={branch.phone}
              layout
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
            >
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                  branch.isApproved ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                }`}>
                  {branch.isApproved ? <Building2 className="w-8 h-8" /> : <ShieldAlert className="w-8 h-8" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-slate-900">{branch.name}</h3>
                    <span className="text-xs bg-slate-100 text-slate-500 px-2 py-0.5 rounded-md">فرع</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1">
                    <span className="text-sm text-slate-600 flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      المسؤول: {branch.manager}
                    </span>
                    <span className="text-sm text-slate-500 flex items-center gap-1">
                      <Search className="w-3.5 h-3.5" />
                      {branch.phone}
                    </span>
                    <span className="text-sm text-slate-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      انضم في {branch.joinedDate}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                  branch.isApproved ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                }`}>
                  {branch.isApproved ? 'فرع مفعل' : 'بانتظار التفعيل'}
                </div>
                <button
                  onClick={() => onToggleApproval(branch.phone)}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold transition-all active:scale-95 ${
                    branch.isApproved 
                      ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' 
                      : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-100'
                  }`}
                >
                  {branch.isApproved ? (
                    <>
                      <UserX className="w-4 h-4" />
                      إيقاف الفرع
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4" />
                      تفعيل الفرع
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

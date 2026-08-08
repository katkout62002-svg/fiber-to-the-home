import React from 'react';
import { Zap, Award, BookOpen, Calculator, Activity, AlertTriangle, Sparkles, Shield, Users } from 'lucide-react';
import { UserRole } from '../types';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  wizardXp: number;
  openAiMentor: () => void;
  openProfileModal?: (tab?: 'card' | 'wizard' | 'tech' | 'logo') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  userRole,
  setUserRole,
  wizardXp,
  openAiMentor,
  openProfileModal,
}) => {
  const getRoleBadge = () => {
    if (wizardXp >= 1000) return { title: 'FTTH Master Wizard 🧙‍♂️', color: 'bg-purple-500/10 text-purple-400 border-purple-500/30' };
    if (wizardXp >= 500) return { title: 'مهندس ألياف خبير ⚡', color: 'bg-orange-500/10 text-orange-400 border-orange-500/30' };
    if (wizardXp >= 200) return { title: 'فني ألياف متقدم 🔧', color: 'bg-amber-500/10 text-amber-400 border-amber-500/30' };
    return { title: 'متدرب ألياف (Apprentice) 🎓', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' };
  };

  const badge = getRoleBadge();

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800 text-white shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Hashtag */}
          <div className="flex items-center space-x-3 space-x-reverse cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="relative">
              <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center border-2 border-orange-300 shadow-[0_0_15px_rgba(249,115,22,0.4)]">
                <Zap className="w-6 h-6 text-slate-950 font-black fill-slate-950" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-orange-500"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-xl tracking-tight text-white">
                  Be7ery <span className="text-orange-500">Fiber Academy</span>
                </h1>
                <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-orange-500/10 text-orange-400 border border-orange-500/30">
                  #be7ery
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                The FTTH Wizard Platform • المنصة التعليمية الشاملة
              </p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="hidden lg:flex items-center space-x-1 space-x-reverse bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => setActiveTab('home')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'home'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-900/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              المنهج الشامل
            </button>

            <button
              onClick={() => setActiveTab('lab')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'lab'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-900/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Zap className="w-4 h-4 text-amber-400" />
              مختبر اللحام
            </button>

            <button
              onClick={() => setActiveTab('otdr')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'otdr'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-900/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Activity className="w-4 h-4 text-orange-400" />
              محلل OTDR
            </button>

            <button
              onClick={() => setActiveTab('calculator')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'calculator'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-900/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Calculator className="w-4 h-4 text-blue-400" />
              حاسبة الضوء
            </button>

            <button
              onClick={() => setActiveTab('atlas')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'atlas'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-900/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              أطلس الأعطال
            </button>

            <button
              onClick={() => setActiveTab('community')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'community'
                  ? 'bg-orange-500 text-white shadow-lg shadow-orange-900/20'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Users className="w-4 h-4 text-purple-400" />
              مجتمع #be7ery
            </button>

            <button
              onClick={() => setActiveTab('cert')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'cert'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-900/20'
                  : 'text-amber-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Award className="w-4 h-4 text-amber-300" />
              الشهادة
            </button>
          </nav>

          {/* User Status & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Business Card & Profile Trigger */}
            <button
              onClick={() => openProfileModal && openProfileModal('card')}
              className="p-2 sm:px-3 sm:py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 font-bold text-xs transition-all flex items-center gap-1.5"
              title="بطاقة التعارف وإدارة المشاريع"
            >
              <span className="text-sm">💼</span>
              <span className="hidden sm:inline">بطاقة Be7ery</span>
            </button>

            {/* AI Assistant Trigger */}
            <button
              onClick={openAiMentor}
              className="relative group flex items-center gap-2 px-3.5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-all shadow-lg shadow-orange-950/30"
            >
              <Sparkles className="w-4 h-4 text-amber-200 group-hover:rotate-12 transition-transform" />
              <span className="hidden sm:inline">اسأل Wizard</span>
            </button>

            {/* XP and Rank Badge */}
            <div className="hidden md:flex flex-col items-end">
              <span className={`text-[11px] px-2.5 py-0.5 rounded-full border font-bold ${badge.color}`}>
                {badge.title}
              </span>
              <span className="text-[11px] text-slate-400 font-mono mt-0.5">
                نقاط الخبرة: <strong className="text-orange-400">{wizardXp} XP</strong>
              </span>
            </div>

          </div>

        </div>

        {/* Mobile Navigation Bar */}
        <div className="lg:hidden flex items-center justify-around py-2.5 border-t border-slate-800 text-xs overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab('home')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-bold ${
              activeTab === 'home' ? 'bg-orange-500 text-white' : 'text-slate-400'
            }`}
          >
            المنهج
          </button>
          <button
            onClick={() => setActiveTab('lab')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-bold ${
              activeTab === 'lab' ? 'bg-orange-500 text-white' : 'text-slate-400'
            }`}
          >
            مختبر اللحام
          </button>
          <button
            onClick={() => setActiveTab('otdr')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-bold ${
              activeTab === 'otdr' ? 'bg-orange-500 text-white' : 'text-slate-400'
            }`}
          >
            OTDR
          </button>
          <button
            onClick={() => setActiveTab('calculator')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-bold ${
              activeTab === 'calculator' ? 'bg-orange-500 text-white' : 'text-slate-400'
            }`}
          >
            الحاسبة
          </button>
          <button
            onClick={() => setActiveTab('atlas')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-bold ${
              activeTab === 'atlas' ? 'bg-orange-500 text-white' : 'text-slate-400'
            }`}
          >
            الأعطال
          </button>
          <button
            onClick={() => setActiveTab('community')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-bold ${
              activeTab === 'community' ? 'bg-orange-500 text-white' : 'text-slate-400'
            }`}
          >
            المجتمع
          </button>
          <button
            onClick={() => setActiveTab('cert')}
            className={`px-3 py-1.5 rounded-lg whitespace-nowrap font-bold ${
              activeTab === 'cert' ? 'bg-amber-600 text-white' : 'text-amber-400'
            }`}
          >
            الشهادة
          </button>
        </div>

      </div>
    </header>
  );
};

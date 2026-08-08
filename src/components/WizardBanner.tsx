import React, { useState } from 'react';
import { Zap, Sparkles, Award, Shield, CheckCircle2, ArrowLeft, Lightbulb } from 'lucide-react';
import { UserRole } from '../types';

interface WizardBannerProps {
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  setActiveTab: (tab: string) => void;
  openAiMentor: () => void;
  openProfileModal?: (tab?: 'card' | 'wizard' | 'tech' | 'logo') => void;
}

const WIZARD_QUOTES = [
  'الألياف مش سلك.. الألياف نظافة ونظام! #be7ery',
  'يا هندسة الشعيرة لو لمست إيدك ارميها.. النظافة 90% من نجاح الشغل!',
  'اوعى تركب كونكتور أخضر SC/APC في بورت أزرق SC/UPC.. الانعكاس هيبوظ الإشارة!',
  'قشرت؟ امسح فوراً بالكحول قبل ما تقطع بالقاطعة.. ترتيب الخطوات هو السحر الحقيقي!',
  'القياس هو الحكم النهائي دائماً.. من -15dBm لـ -28dBm شغل فنانين!'
];

export const WizardBanner: React.FC<WizardBannerProps> = ({
  userRole,
  setUserRole,
  setActiveTab,
  openAiMentor,
  openProfileModal,
}) => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  const nextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % WIZARD_QUOTES.length);
  };

  return (
    <div className="relative overflow-hidden bg-slate-950 text-white pt-6 pb-10 border-b border-slate-800">
      
      {/* Background Glow */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-purple-600 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
        
        {/* Top Header Card */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-slate-900/80 p-5 sm:p-6 rounded-3xl border border-slate-800 gap-4">
          <div 
            onClick={() => openProfileModal && openProfileModal('card')}
            className="flex items-center gap-4 cursor-pointer group"
          >
            <div className="w-16 h-16 rounded-full bg-orange-500 flex items-center justify-center border-2 border-orange-300 shadow-[0_0_20px_rgba(249,115,22,0.4)] shrink-0 group-hover:scale-105 transition-transform relative">
              <img
                src="/src/assets/images/behery_personal_avatar_1786200926785.jpg"
                alt="Eng. Abdelghaffar Behairy Avatar"
                className="w-full h-full rounded-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-1 -right-1 p-1 bg-slate-950 rounded-full border border-orange-500 text-[9px] font-black text-orange-400">
                ★
              </span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white group-hover:text-orange-400 transition-colors">
                  Be7ery <span className="text-orange-500">Fiber Academy</span>
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-orange-500/10 text-orange-400 border border-orange-500/30">
                  #be7ery
                </span>
              </div>
              <p className="text-slate-400 text-xs sm:text-sm font-bold tracking-wider mt-0.5 flex flex-wrap items-center gap-2">
                <span>Eng. Abdelghaffar Behairy • Project Coordinator & FTTH Lead</span>
                <span className="text-orange-400 text-[11px] underline font-normal">(بطاقة الأعمال والموقع)</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 self-end md:self-center">
            <button
              onClick={() => openProfileModal && openProfileModal('card')}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2"
            >
              <span>💼</span>
              بطاقة الأعمال والموقع
            </button>

            <button
              onClick={() => openProfileModal && openProfileModal('wizard')}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2"
            >
              <span>👷‍♂️</span>
              FTTH Wizard Hero
            </button>

            <button
              onClick={openAiMentor}
              className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-lg shadow-orange-950/30 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              استشارة FTTH Wizard
            </button>
          </div>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Comprehensive FTTH Curriculum Bento Card */}
          <div 
            onClick={() => setActiveTab('home')}
            className="lg:col-span-2 cursor-pointer p-6 rounded-3xl border bg-gradient-to-br from-slate-900 to-slate-800 border-orange-500/80 shadow-lg shadow-orange-950/20 hover:border-orange-400 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="bg-orange-500/10 text-orange-400 text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider border border-orange-500/30">
                  Comprehensive FTTH Academy
                </span>
                <span className="text-xs text-orange-400 font-mono font-bold">7 فصول كاملة • 18 درساً ميدانياً</span>
              </div>
              <h2 className="text-2xl font-bold mt-3 text-white">مسار ألياف الضوء (FTTH Academy)</h2>
              <p className="text-slate-300 mt-2 text-xs leading-relaxed max-w-xl">
                من أساسيات الفيزياء الضوئية وتشريح الكابلات حتى الميزانية الضوئية، القياسات بـ OTDR، وإدارة المواقع الميدانية.
              </p>
            </div>
            <div className="flex justify-between items-end mt-6">
              <span className="text-xs text-amber-400 font-bold">تصفح المنهج الميداني الكامل ←</span>
              <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold shadow-md group-hover:scale-105 transition-transform">
                ←
              </div>
            </div>
          </div>

          {/* Virtual Lab Simulator Bento Card */}
          <div className="lg:col-span-2 bg-slate-900 p-6 rounded-3xl border border-slate-800 relative overflow-hidden flex flex-col justify-between hover:border-slate-700 transition-colors">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-orange-500 font-bold uppercase text-xs tracking-widest">
                  Wizard's Virtual Lab
                </span>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                  Interactive Simulator
                </span>
              </div>
              <h2 className="text-3xl font-black mt-2 text-white">محاكي اللحام الحراري</h2>
              <p className="text-slate-300 mt-2 text-xs leading-relaxed max-w-lg">
                طبق القواعد الذهبية (قشرت؟ امسح فوراً) في بيئة افتراضية تفاعلية قبل النزول للميدان.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3 items-center z-10">
              <button
                onClick={() => setActiveTab('lab')}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-orange-950/30 flex items-center gap-2 transition-all"
              >
                <Zap className="w-4 h-4 text-amber-200" />
                دخول مختبر اللحام
              </button>
              <button
                onClick={() => setActiveTab('otdr')}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-5 py-2.5 rounded-xl font-bold text-xs border border-slate-700 transition-all"
              >
                محلل منحنيات OTDR
              </button>
            </div>

            {/* Stylized Vector Background Graphic */}
            <div className="absolute left-[-20px] bottom-[-20px] w-56 h-56 opacity-10 pointer-events-none">
              <svg viewBox="0 0 200 200" className="w-full h-full text-orange-500">
                <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 5" />
                <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="3" />
                <path d="M100 20 V180 M20 100 H180" stroke="currentColor" strokeWidth="1" />
              </svg>
            </div>
          </div>

        </div>

        {/* Pro Tip Card & Quick Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Bento Pro Tip Card in Orange */}
          <div 
            onClick={nextQuote}
            className="bg-orange-500 p-6 rounded-3xl flex flex-col justify-center text-center cursor-pointer hover:bg-orange-400 transition-colors shadow-lg shadow-orange-950/30"
          >
            <span className="text-3xl mb-2">💡</span>
            <p className="text-slate-950 font-black text-base leading-snug">
              "{WIZARD_QUOTES[quoteIndex]}"
            </p>
            <p className="text-slate-950/70 text-[11px] mt-2 font-black uppercase tracking-widest">
              - Be7ery Pro Tip • (اضغط لتغيير النصيحة)
            </p>
          </div>

          {/* Quick Tool: Link Budget */}
          <div 
            onClick={() => setActiveTab('calculator')}
            className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 hover:border-orange-500/50 cursor-pointer transition-colors flex flex-col justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-orange-500 text-xs font-black border border-slate-700">
                dBm
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">حاسبة الميزانية الضوئية (Link Budget)</h4>
                <p className="text-[11px] text-slate-400">حساب الفقد في القسام والوصلات والمسافة</p>
              </div>
            </div>
            <div className="mt-4 space-y-1">
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className="w-2/3 h-full bg-orange-500"></div>
              </div>
              <p className="text-[10px] text-orange-400 font-mono text-left">Target: -18.5 dBm (Excellent Signal)</p>
            </div>
          </div>

          {/* Quick Tool: OTDR Atlas */}
          <div 
            onClick={() => setActiveTab('atlas')}
            className="bg-slate-900/80 p-5 rounded-3xl border border-slate-800 hover:border-orange-500/50 cursor-pointer transition-colors flex flex-col justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center text-orange-500 text-sm font-bold border border-slate-700">
                📉
              </div>
              <div>
                <h4 className="font-bold text-sm text-white">أطلس الأعطال المصور</h4>
                <p className="text-[11px] text-slate-400">صور الأعطال الحقيقية وكيفية معالجتها فوراً</p>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-[11px] text-slate-400">
              <span className="text-orange-400 font-mono font-bold">15+ عطل ميداني شائع</span>
              <span className="text-slate-500">استعراض الأطلس ←</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

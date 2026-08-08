import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  Mail, 
  Globe, 
  Briefcase, 
  ShieldCheck, 
  Sparkles, 
  Copy, 
  Check, 
  ExternalLink,
  MessageCircle,
  Zap,
  Award,
  Star,
  MapPin,
  Terminal,
  HardHat
} from 'lucide-react';

interface BeheryProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'card' | 'wizard' | 'tech' | 'logo';
}

export const BeheryProfileModal: React.FC<BeheryProfileModalProps> = ({
  isOpen,
  onClose,
  defaultTab = 'card'
}) => {
  const [activeTab, setActiveTab] = useState<'card' | 'wizard' | 'tech' | 'logo'>(defaultTab);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200 dir-rtl">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-slate-950/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-orange-500/20">
              <Zap className="w-5 h-5 fill-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black text-white">المهندس عبد الغفار بحيري</h3>
                <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-orange-500/10 text-orange-400 border border-orange-500/30">
                  #be7ery
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                PROJECT COORDINATOR • Site Manager FTTH Project • مؤسس الأكاديمية والمرشد الميداني
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-1 p-2 bg-slate-950/40 border-b border-slate-800/80 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('card')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
              activeTab === 'card'
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-950/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            بطاقة التعارف وإدارة المشاريع
          </button>

          <button
            onClick={() => setActiveTab('wizard')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
              activeTab === 'wizard'
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-950/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <HardHat className="w-4 h-4" />
            بوستر FTTH Wizard الميداني
          </button>

          <button
            onClick={() => setActiveTab('tech')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
              activeTab === 'tech'
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-950/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Terminal className="w-4 h-4" />
            أفاتار البرمجة والشبكات
          </button>

          <button
            onClick={() => setActiveTab('logo')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
              activeTab === 'logo'
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-950/30'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Star className="w-4 h-4 text-amber-300" />
            شعار #bE7ERY المعتمد
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          
          {/* TAB 1: Business Card */}
          {activeTab === 'card' && (
            <div className="space-y-6">
              
              {/* Digital Business Card Display */}
              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 border-2 border-slate-800 p-6 sm:p-8 shadow-2xl">
                {/* Curved background pattern inspired by the card */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full filter blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-[-100px] right-[-50px] w-80 h-80 bg-cyan-500/10 rounded-full pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                  
                  {/* Left Details */}
                  <div className="space-y-4 text-right flex-1">
                    <div>
                      <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-orange-500/10 text-orange-400 border border-orange-500/30">
                        AFRO "Technology Gateway"
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
                        ABDELGHAFFAR BEHAIRY
                      </h2>
                      <p className="text-orange-400 font-extrabold text-lg tracking-wide uppercase mt-0.5">
                        PROJECT COORDINATOR
                      </p>
                      <p className="text-slate-400 text-xs font-medium">
                        Site Manager & FTTH Lead Engineer
                      </p>
                    </div>

                    <div className="space-y-2.5 text-xs text-slate-300 font-mono">
                      <div className="flex items-center gap-3 p-2.5 bg-slate-900/90 rounded-xl border border-slate-800">
                        <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                        <span className="flex-1 text-left font-bold" dir="ltr">(+20) 100 739 4480</span>
                        <button
                          onClick={() => handleCopy('+201007394480', 'phone1')}
                          className="p-1 hover:text-white text-slate-400 transition-colors"
                          title="نسخ الرقم"
                        >
                          {copiedField === 'phone1' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>

                      <div className="flex items-center gap-3 p-2.5 bg-slate-900/90 rounded-xl border border-slate-800">
                        <Mail className="w-4 h-4 text-orange-400 shrink-0" />
                        <span className="flex-1 text-left font-bold" dir="ltr">behery6@hotmail.com</span>
                        <button
                          onClick={() => handleCopy('behery6@hotmail.com', 'email')}
                          className="p-1 hover:text-white text-slate-400 transition-colors"
                          title="نسخ البريد"
                        >
                          {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>

                    {/* ISO Certifications Badges */}
                    <div className="pt-2 flex flex-wrap items-center gap-2 text-[10px] font-bold">
                      <span className="text-slate-400">الشهادات المعيارية:</span>
                      <span className="px-2 py-0.5 rounded bg-blue-950 border border-blue-500/40 text-blue-300">ISO 9001</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40 text-emerald-300">ISO 14001</span>
                      <span className="px-2 py-0.5 rounded bg-purple-950 border border-purple-500/40 text-purple-300">ISO 27001</span>
                      <span className="px-2 py-0.5 rounded bg-amber-950 border border-amber-500/40 text-amber-300">ISO 45001</span>
                    </div>

                  </div>

                  {/* Right Avatar & Badge */}
                  <div className="flex flex-col items-center shrink-0">
                    <div className="relative">
                      <div className="w-36 h-36 rounded-full p-1 bg-gradient-to-tr from-cyan-500 via-blue-500 to-orange-500 shadow-xl">
                        <img
                          src="/src/assets/images/behery_personal_avatar_1786200926785.jpg"
                          alt="Eng. Abdelghaffar Behairy Personal Avatar"
                          className="w-full h-full rounded-full object-cover border-2 border-slate-900"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="absolute -bottom-2 bg-slate-900 px-3 py-1 rounded-full border border-orange-500 text-[10px] font-black text-orange-400 shadow">
                        #be7ery
                      </div>
                    </div>
                    <p className="text-slate-400 text-[11px] font-bold mt-3 text-center">
                      إدارة وتقييم شبكات الألياف الميدانية
                    </p>
                  </div>

                </div>
              </div>

              {/* Action Buttons for Business Card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <a
                  href="https://wa.me/201007394480?text=%D0%A3%D0%B1%D1%80%D0%AD%20%D9%8A%D8%A7%20%D9%87%D9%86%D8%AF%D8%B3%D8%A9%20%D8%B9%D8%A8%D8%AF%20%D8%A7%D9%84%D8%BA%D9%81%D8%A7%D8%B1%20%D8%A8%D8%AD%D9%8A%D8%B1%D9%8A%20%D9%85%D9%86%20%D9%85%D9%86%D8%B5%D8%A9%20Be7ery%20Fiber%20Academy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs transition-all shadow-lg shadow-emerald-950/30"
                >
                  <MessageCircle className="w-4 h-4" />
                  تواصل عبر واتساب (+201007394480)
                </a>

                <a
                  href="mailto:behery6@hotmail.com"
                  className="flex items-center justify-center gap-2 p-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-xs border border-slate-700 transition-all"
                >
                  <Mail className="w-4 h-4 text-orange-400" />
                  إرسال بريد إلكتروني
                </a>

                <button
                  onClick={() => handleCopy('Eng. Abdelghaffar Behairy - Project Coordinator & FTTH Lead\nPhone: +201007394480\nEmail: behery6@hotmail.com\nHashtag: #be7ery', 'all_contact')}
                  className="flex items-center justify-center gap-2 p-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-xs border border-slate-700 transition-all"
                >
                  {copiedField === 'all_contact' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-orange-400" />}
                  {copiedField === 'all_contact' ? 'تم نسخ بيانات الاتصال!' : 'نسخ جميع البيانات'}
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: FTTH Wizard Hero Poster */}
          {activeTab === 'wizard' && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 text-center space-y-4 relative overflow-hidden">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold border border-orange-500/30">
                  <HardHat className="w-4 h-4 text-amber-400" />
                  The FTTH Wizard Hero Identity Poster
                </div>

                <h3 className="text-2xl font-black text-white">
                  Abdelghaffar <span className="text-orange-500">THE FTTH WIZARD</span>
                </h3>
                <p className="text-slate-400 text-xs font-mono font-bold tracking-wider">
                  "CONNECTING THE WORLD, ONE FIBER AT A TIME!"
                </p>

                {/* High Quality Hero Poster Showcase */}
                <div className="relative rounded-2xl bg-slate-900 border border-orange-500/30 shadow-2xl overflow-hidden group">
                  <img
                    src="/src/assets/images/ftth_wizard_hero_poster_1786200480008.jpg"
                    alt="ABDELGHAFFAR THE FTTH WIZARD - Superhero Comic Poster"
                    className="w-full h-auto max-h-[500px] object-contain mx-auto rounded-xl shadow-lg"
                    referrerPolicy="no-referrer"
                  />

                  {/* Badge Overlay */}
                  <div className="absolute bottom-4 right-4 bg-slate-950/90 backdrop-blur-md px-4 py-2 rounded-xl border border-orange-500/40 text-right space-y-0.5 shadow-xl">
                    <span className="text-amber-400 text-[10px] font-bold block uppercase tracking-widest">
                      ★ البوستر الرسمي للمرشد الميداني
                    </span>
                    <span className="text-white text-xs font-black block">
                      #be7ery • Site Manager FTTH Project
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs text-center">
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-orange-400 font-bold block text-sm">100%</span>
                    <span className="text-slate-400 text-[10px]">نظافة اللحام والمعاينة</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-orange-400 font-bold block text-sm">OTDR</span>
                    <span className="text-slate-400 text-[10px]">دقة تحليل الأعطال</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-orange-400 font-bold block text-sm">-18.5 dBm</span>
                    <span className="text-slate-400 text-[10px]">إشارة فائقة الجودة</span>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                    <span className="text-orange-400 font-bold block text-sm">Afro Group</span>
                    <span className="text-slate-400 text-[10px]">إدارة المواقع الميدانية</span>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: Tech & Programming Avatar */}
          {activeTab === 'tech' && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 text-center space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-xs font-bold border border-purple-500/30">
                  <Terminal className="w-4 h-4 text-purple-400" />
                  World of Programming & Fiber Network Architecture
                </div>

                <h3 className="text-2xl font-black text-white">
                  العقل الذكي خلف أتمتة وحسابات الـ FTTH
                </h3>
                <p className="text-slate-300 text-xs max-w-xl mx-auto">
                  دمج خبرة هندسة الشبكات الميدانية مع الأدوات البرمجية الذكية لحسابات الميزانية الضوئية، وتحليل المنحنيات ومحاكاة اللحام افتراضياً.
                </p>

                <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col md:flex-row items-center justify-around gap-6 text-right">
                  <div className="space-y-3 max-w-sm">
                    <h4 className="font-bold text-white text-base">مميزات المنصة التعليمية الرقمية:</h4>
                    <ul className="space-y-2 text-xs text-slate-300 list-disc list-inside">
                      <li>محاكي اللحام الحراري الخماسي (Splicing Simulator).</li>
                      <li>خوارزميات حساب فقد السبلترات والتوصيل (Link Budget Engine).</li>
                      <li>أطلس الأعطال التفاعلي لمعالجة مشاكل Macro-bend.</li>
                      <li>شهادات رقمية معتمدة مع رمز التوثيق الميداني.</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-purple-500/30 text-center space-y-2 shrink-0">
                    <div className="w-16 h-16 rounded-full bg-purple-600/20 border border-purple-500 flex items-center justify-center text-purple-400 mx-auto font-black text-xl">
                      💻
                    </div>
                    <div className="text-xs font-bold text-white">Smart FTTH Mentor</div>
                    <div className="text-[10px] text-purple-400 font-mono">Powered by #be7ery</div>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: Official #bE7ERY Logo */}
          {activeTab === 'logo' && (
            <div className="space-y-4">
              <div className="bg-slate-950 p-8 rounded-3xl border border-slate-800 text-center space-y-6">
                
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 text-xs font-bold border border-orange-500/30">
                  <Star className="w-4 h-4 text-amber-300 fill-amber-300" />
                  Official Brand Seal & Certified Quality Standard
                </div>

                {/* Stylized Logo Canvas */}
                <div className="p-10 bg-slate-900 rounded-3xl border-2 border-slate-800 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
                  
                  {/* Glowing Orbit Star */}
                  <div className="relative flex items-center justify-center py-4">
                    <div className="text-5xl sm:text-6xl font-black tracking-tight text-white font-sans">
                      #b<span className="text-orange-500 font-extrabold text-6xl sm:text-7xl">7</span>ERY
                    </div>
                    
                    {/* Orbit Star graphic */}
                    <div className="absolute -top-4 -right-6 text-amber-400 animate-bounce">
                      <Star className="w-10 h-10 fill-amber-400 text-amber-300 filter drop-shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
                    </div>
                  </div>

                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-4">
                    علامة الجودة والاحترافية الميدانية لشبكات الفايبر
                  </p>
                </div>

                <div className="text-right text-xs text-slate-300 leading-relaxed bg-slate-900 p-4 rounded-2xl border border-slate-800">
                  <strong>دلالة الشعار (#be7ery):</strong>
                  <p className="mt-1">
                    يرمز النجم الساطع والقوس المداري إلى انطلاق الضوء في الألياف الضوئية بأقصى سرعة وأعلى جودة بدون فقد أو تشويه. يُستخدم هذا الهاشتاج كرمز موثوق في كافة شهادات الأكاديمية والتقارير الميدانية.
                  </p>
                </div>

              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Be7ery Fiber Academy • جميع المكونات موثقة برعاية #be7ery</span>
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-colors"
          >
            إغلاق
          </button>
        </div>

      </div>
    </div>
  );
};

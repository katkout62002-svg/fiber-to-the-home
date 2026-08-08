import React, { useState } from 'react';
import { FAULT_ATLAS_ITEMS } from '../data/faultAtlasData';
import { FaultItem } from '../types';
import { AlertTriangle, ShieldAlert, CheckCircle2, Search, Filter, Sparkles, Lightbulb } from 'lucide-react';

export const FaultAtlas: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeFault, setActiveFault] = useState<FaultItem>(FAULT_ATLAS_ITEMS[0]);

  const filteredFaults = FAULT_ATLAS_ITEMS.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.title.includes(searchQuery) || item.symptoms.includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      
      {/* Title */}
      <div className="bg-slate-900 border border-cyan-500/30 rounded-3xl p-6 shadow-2xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-950 text-cyan-300 rounded-full text-xs font-bold border border-cyan-500/30">
          <AlertTriangle className="w-4 h-4 text-rose-400" />
          <span>Visual Fault Atlas • #be7ery</span>
        </div>
        <h2 className="text-2xl font-black text-white">
          أطلس الأعطال المصور والحلول الميدانية
        </h2>
        <p className="text-slate-300 text-sm">
          دليل صور وعيوب اللحام الميداني، أسباب الفقاعات والانتفاخات، والمشكلات المعقدة وكيفية معالجتها.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute right-3 top-3" />
          <input
            type="text"
            placeholder="بحث عن عطل أو عرض..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl pr-9 pl-4 py-2 text-xs text-white placeholder-slate-500 focus:border-cyan-400 outline-none"
          />
        </div>

        <div className="flex items-center gap-2 text-xs overflow-x-auto w-full sm:w-auto">
          {['all', 'splicing', 'otdr', 'connector', 'cable'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl font-bold transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-cyan-600 text-white shadow'
                  : 'bg-slate-900 text-slate-400 hover:text-white'
              }`}
            >
              {cat === 'all' && 'كل الأعطال'}
              {cat === 'splicing' && 'أخطاء اللحام'}
              {cat === 'otdr' && 'منحنيات OTDR'}
              {cat === 'connector' && 'الموصلات SC/APC'}
              {cat === 'cable' && 'الكابلات والقطع'}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: List + Detail Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Fault Cards List */}
        <div className="lg:col-span-5 space-y-3 max-h-[600px] overflow-y-auto pr-1">
          {filteredFaults.map((item) => (
            <div
              key={item.id}
              onClick={() => setActiveFault(item)}
              className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                activeFault.id === item.id
                  ? 'bg-cyan-950/80 border-cyan-400 text-white shadow-lg'
                  : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-white font-bold">{item.title}</span>
                <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-black ${
                  item.severity === 'critical' ? 'bg-rose-950 text-rose-300 border border-rose-500/40' :
                  item.severity === 'high' ? 'bg-amber-950 text-amber-300 border border-amber-500/40' :
                  'bg-cyan-950 text-cyan-300 border border-cyan-500/40'
                }`}>
                  {item.severity}
                </span>
              </div>

              <p className="text-xs text-slate-400 line-clamp-2">
                {item.symptoms}
              </p>
            </div>
          ))}
        </div>

        {/* Fault Detail Display */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl">
          
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <h3 className="text-xl font-black text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-400" />
              <span>{activeFault.title}</span>
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              التصنيف: {activeFault.category}
            </span>
          </div>

          {/* Visual Canvas Diagram Render */}
          <div className="bg-slate-950 rounded-2xl border border-cyan-900/50 p-6 flex flex-col items-center justify-center min-h-[160px] relative">
            <div className="text-xs font-mono text-cyan-400 mb-3 uppercase tracking-wider">
              المعاينة الميكروسكوبية للشعيرة (Microscopic Fault View)
            </div>

            {/* SVG Visual Graphic for Fault Type */}
            <div className="relative w-full max-w-md h-24 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-center overflow-hidden">
              
              {activeFault.visualType === 'bubble' && (
                <div className="flex items-center justify-center w-full">
                  <div className="h-2 bg-cyan-400 w-32 rounded-l-sm"></div>
                  <div className="w-6 h-6 rounded-full bg-slate-900 border-2 border-rose-500 flex items-center justify-center mx-1">
                    <div className="w-2 h-2 rounded-full bg-rose-400 animate-ping"></div>
                  </div>
                  <div className="h-2 bg-cyan-400 w-32 rounded-r-sm"></div>
                </div>
              )}

              {activeFault.visualType === 'offset' && (
                <div className="flex flex-col items-center justify-center w-full">
                  <div className="flex items-center justify-center">
                    <div className="h-2 bg-cyan-400 w-28 -translate-y-2"></div>
                    <div className="w-2 h-6 bg-slate-800"></div>
                    <div className="h-2 bg-cyan-400 w-28 translate-y-2"></div>
                  </div>
                </div>
              )}

              {activeFault.visualType === 'fat' && (
                <div className="flex items-center justify-center w-full">
                  <div className="h-2 bg-cyan-400 w-28"></div>
                  <div className="w-8 h-8 rounded-full bg-amber-500 border-2 border-amber-300"></div>
                  <div className="h-2 bg-cyan-400 w-28"></div>
                </div>
              )}

              {activeFault.visualType === 'macrobend' && (
                <div className="flex items-center justify-center w-full">
                  <svg className="w-48 h-16" viewBox="0 0 200 60">
                    <path d="M 10 30 Q 100 80 190 30" stroke="#38bdf8" strokeWidth="4" fill="none" />
                    <circle cx="100" cy="45" r="4" fill="#f43f5e" />
                  </svg>
                </div>
              )}

              {activeFault.visualType === 'dust' && (
                <div className="flex items-center justify-center gap-1">
                  <div className="w-12 h-12 bg-emerald-600 rounded-lg border border-emerald-400 flex items-center justify-center">
                    <div className="w-4 h-4 bg-amber-900 rounded-full border border-amber-500 animate-pulse"></div>
                  </div>
                  <span className="text-slate-500 text-xs">SC/APC Ferrule Face</span>
                </div>
              )}

              {activeFault.visualType === 'fibercut' && (
                <div className="flex items-center justify-center w-full">
                  <div className="h-2 bg-cyan-400 w-28"></div>
                  <div className="w-4 h-12 bg-rose-600/80 mx-2"></div>
                  <div className="h-2 bg-slate-800 w-28"></div>
                </div>
              )}

            </div>
          </div>

          {/* Fault Details breakdown */}
          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <strong className="text-rose-300 block">الأعراض الظاهرة (Symptoms):</strong>
              <p className="text-slate-300">{activeFault.symptoms}</p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <strong className="text-amber-300 block">السبب الميداني المباشر (Cause):</strong>
              <p className="text-slate-300">{activeFault.cause}</p>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <strong className="text-emerald-300 block">خطوات المعالجة والإصلاح (Remedy):</strong>
              <p className="text-slate-300">{activeFault.remedy}</p>
            </div>
          </div>

          {/* Wizard Quote Quote Box */}
          <div className="p-3 bg-cyan-950/60 rounded-xl border border-cyan-500/30 text-xs text-cyan-200 flex items-start gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <p className="italic font-semibold">"{activeFault.wizardQuote}"</p>
          </div>

        </div>

      </div>

    </div>
  );
};

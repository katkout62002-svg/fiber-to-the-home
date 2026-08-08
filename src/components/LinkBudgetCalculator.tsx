import React, { useState } from 'react';
import { Calculator, CheckCircle2, AlertTriangle, Info, Zap, RefreshCw, Layers } from 'lucide-react';

interface LinkBudgetCalculatorProps {
  addXp: (amount: number) => void;
}

export const LinkBudgetCalculator: React.FC<LinkBudgetCalculatorProps> = ({ addXp }) => {
  const [distanceKm, setDistanceKm] = useState<number>(12);
  const [wavelength, setWavelength] = useState<'1310' | '1490' | '1550'>('1490');
  const [connectorsCount, setConnectorsCount] = useState<number>(4);
  const [connectorLossDb, setConnectorLossDb] = useState<number>(0.3);
  const [splicesCount, setSplicesCount] = useState<number>(6);
  const [spliceLossDb, setSpliceLossDb] = useState<number>(0.03);
  const [splitterRatio, setSplitterRatio] = useState<string>('1:32');
  const [oltTxPowerDbm, setOltTxPowerDbm] = useState<number>(4.0);
  const [safetyMarginDb, setSafetyMarginDb] = useState<number>(2.0);

  // Splitter Losses standard ITU-T table
  const SPLITTER_LOSS_MAP: Record<string, number> = {
    '1:2': 3.5,
    '1:4': 7.2,
    '1:8': 10.5,
    '1:16': 13.8,
    '1:32': 17.1,
    '1:64': 20.5,
    'cascaded_1:4_1:8': 17.7, // 7.2 + 10.5 dB
  };

  // Fiber attenuation rate dB/km
  const ATTENUATION_RATES: Record<string, number> = {
    '1310': 0.35,
    '1490': 0.23,
    '1550': 0.20,
  };

  const fiberLossTotal = Number((distanceKm * ATTENUATION_RATES[wavelength]).toFixed(2));
  const connectorLossTotal = Number((connectorsCount * connectorLossDb).toFixed(2));
  const spliceLossTotal = Number((splicesCount * spliceLossDb).toFixed(2));
  const splitterLossTotal = SPLITTER_LOSS_MAP[splitterRatio] || 17.1;

  const totalLinkLossDb = Number((fiberLossTotal + connectorLossTotal + spliceLossTotal + splitterLossTotal + safetyMarginDb).toFixed(2));
  const expectedOntRxPowerDbm = Number((oltTxPowerDbm - totalLinkLossDb).toFixed(2));

  // ITU-T GPON Standard Rx Range: -15.0 dBm to -28.0 dBm
  const isPass = expectedOntRxPowerDbm >= -28.0 && expectedOntRxPowerDbm <= -15.0;
  const isTooHigh = expectedOntRxPowerDbm > -15.0;

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-xs font-bold border border-orange-500/30">
          <Calculator className="w-4 h-4 text-orange-400" />
          <span>Be7ery Optical Link Budget Calculator • #be7ery</span>
        </div>
        <h2 className="text-2xl font-black text-white">
          حاسبة ميزانية القدرة الضوئية (Link Power Budget)
        </h2>
        <p className="text-slate-300 text-sm">
          أداة الخبراء والمهندسين لحساب الفقد المتوقع بدقة ومقارنته بمعايير ITU-T GPON قبل البدء بالتنفيذ الميداني.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Input Parameters Form */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl">
          <h3 className="text-sm font-bold text-orange-400 flex items-center gap-2 border-b border-slate-800 pb-2">
            <Layers className="w-4 h-4 text-orange-400" />
            عناصر ومواصفات المسار الضوئي (Input Link Parameters)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            
            {/* Fiber Distance */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold block">طول الكابل (Distance in Km):</label>
              <input
                type="number"
                min="0.1"
                max="60"
                step="0.5"
                value={distanceKm}
                onChange={(e) => setDistanceKm(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:border-cyan-400 outline-none"
              />
            </div>

            {/* Wavelength */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold block">الطول الموجي (Wavelength):</label>
              <select
                value={wavelength}
                onChange={(e) => setWavelength(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:border-cyan-400 outline-none"
              >
                <option value="1310">1310 nm (0.35 dB/km)</option>
                <option value="1490">1490 nm (0.23 dB/km)</option>
                <option value="1550">1550 nm (0.20 dB/km)</option>
              </select>
            </div>

            {/* Splitter Ratio */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold block">نسبة تقسيم السبلتر (Splitter Ratio):</label>
              <select
                value={splitterRatio}
                onChange={(e) => setSplitterRatio(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:border-cyan-400 outline-none"
              >
                <option value="1:2">1:2 (3.5 dB)</option>
                <option value="1:4">1:4 (7.2 dB)</option>
                <option value="1:8">1:8 (10.5 dB)</option>
                <option value="1:16">1:16 (13.8 dB)</option>
                <option value="1:32">1:32 (17.1 dB)</option>
                <option value="1:64">1:64 (20.5 dB)</option>
                <option value="cascaded_1:4_1:8">Cascaded (1:4 x 1:8 = 17.7 dB)</option>
              </select>
            </div>

            {/* OLT Tx Output Power */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold block">قدرة إرسال الـ OLT (dBm):</label>
              <input
                type="number"
                min="0"
                max="10"
                step="0.5"
                value={oltTxPowerDbm}
                onChange={(e) => setOltTxPowerDbm(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:border-cyan-400 outline-none"
              />
            </div>

            {/* Connector Count & Loss */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold block">عدد الموصلات (Connectors):</label>
              <input
                type="number"
                min="0"
                max="20"
                value={connectorsCount}
                onChange={(e) => setConnectorsCount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:border-cyan-400 outline-none"
              />
            </div>

            {/* Splice Count */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-semibold block">عدد اللحامات الحرارية (Splices):</label>
              <input
                type="number"
                min="0"
                max="30"
                value={splicesCount}
                onChange={(e) => setSplicesCount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:border-cyan-400 outline-none"
              />
            </div>

            {/* Safety Margin */}
            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-slate-300 font-semibold block">هامش الأمان والصيانة (Safety Margin dB):</label>
              <input
                type="number"
                min="0"
                max="5"
                step="0.5"
                value={safetyMarginDb}
                onChange={(e) => setSafetyMarginDb(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-white font-mono focus:border-cyan-400 outline-none"
              />
            </div>

          </div>
        </div>

        {/* Calculation Summary & Results */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-slate-950 border border-cyan-500/30 rounded-3xl p-6 space-y-4 shadow-2xl">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              نتائج الميزانية الضوئية المحسوبة
            </h3>

            {/* Detailed Loss Table */}
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                <span>فقد الشعيرة الزجاجية ({distanceKm} km):</span>
                <span className="text-cyan-300 font-bold">{fiberLossTotal} dB</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                <span>فقد السبلتر ({splitterRatio}):</span>
                <span className="text-cyan-300 font-bold">{splitterLossTotal} dB</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                <span>فقد الموصلات ({connectorsCount}x @ 0.3dB):</span>
                <span className="text-cyan-300 font-bold">{connectorLossTotal} dB</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                <span>فقد اللحامات ({splicesCount}x @ 0.03dB):</span>
                <span className="text-cyan-300 font-bold">{spliceLossTotal} dB</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-800 text-slate-300">
                <span>هامش الأمان الاحتياطي:</span>
                <span className="text-cyan-300 font-bold">{safetyMarginDb} dB</span>
              </div>
              <div className="flex justify-between py-2 border-b border-cyan-500/30 text-sm font-bold text-white">
                <span>إجمالي الفقد الضوئي (Total Link Attenuation):</span>
                <span className="text-amber-400">{totalLinkLossDb} dB</span>
              </div>
            </div>

            {/* Received Power Status Badge */}
            <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 text-center">
              <div className="text-xs text-slate-400">القدرة المتوقعة المستلمة عند ONT العميل:</div>
              <div className={`text-3xl font-black font-mono ${
                isPass ? 'text-emerald-400' : 'text-rose-400'
              }`}>
                {expectedOntRxPowerDbm} dBm
              </div>

              <div className="pt-1 flex items-center justify-center gap-2">
                {isPass ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    مطابق لمعايير ITU-T GPON Class B+ (-15 to -28 dBm) ✓
                  </span>
                ) : isTooHigh ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-500/40 text-xs font-bold">
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                    الإشارة قوية جداً (تستدعي Attenuator)
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-950 text-rose-300 border border-rose-500/40 text-xs font-bold">
                    <AlertTriangle className="w-4 h-4 text-rose-400" />
                    الإشارة ضعيفة وخارج النطاق المسموح!
                  </span>
                )}
              </div>
            </div>

            {/* Wizard Recommendation */}
            <div className="p-3 bg-cyan-950/40 rounded-xl border border-cyan-500/20 text-xs text-cyan-200">
              <strong>نصيحة Wizard:</strong> "دائماً احتفظ بهامش أمان 2.0 dB على الأقل لحساب أي أعمال صيانة أو لحامات طارئة في المستقبل! #be7ery"
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

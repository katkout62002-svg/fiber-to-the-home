import React, { useState } from 'react';
import { Flame, CheckCircle2, AlertTriangle, RefreshCw, Award, Play, Sparkles, ShieldCheck } from 'lucide-react';

interface SplicingLabProps {
  addXp: (amount: number) => void;
}

export const SplicingLab: React.FC<SplicingLabProps> = ({ addXp }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [hasSleeveInserted, setHasSleeveInserted] = useState(false);
  const [hasCleanedWithAlcohol, setHasCleanedWithAlcohol] = useState(false);
  const [cleaveAngle, setCleaveAngle] = useState<number | null>(null);
  const [isSplicingActive, setIsSplicingActive] = useState(false);
  const [spliceResult, setSpliceResult] = useState<{
    lossDb: number;
    status: 'perfect' | 'acceptable' | 'failed';
    message: string;
    mistakes: string[];
  } | null>(null);

  // Step 1: Protection Sleeve
  const handleInsertSleeve = () => {
    setHasSleeveInserted(true);
  };

  // Step 2: Stripping
  const handleStrip = () => {
    if (currentStep === 1) setCurrentStep(2);
  };

  // Step 3: Cleaning
  const handleCleanAlcohol = () => {
    setHasCleanedWithAlcohol(true);
  };

  // Step 4: Cleaving
  const handleCleave = () => {
    // Generate a cleave angle. If cleaned with alcohol, angle is between 0.1° and 0.4°. If not, between 0.9° and 2.5°!
    const angle = hasCleanedWithAlcohol
      ? Number((Math.random() * 0.3 + 0.1).toFixed(2))
      : Number((Math.random() * 1.5 + 0.9).toFixed(2));
    setCleaveAngle(angle);
    setCurrentStep(4);
  };

  // Step 5: Fusion Splicing Execution
  const runFusionSplice = () => {
    setIsSplicingActive(true);
    setTimeout(() => {
      setIsSplicingActive(false);

      const mistakes: string[] = [];
      let baseLoss = 0.01;

      if (!hasSleeveInserted) {
        mistakes.push('نسيت تركيب أنبوب الحماية Heat Shrink Sleeve قبل اللحام! لن تتمكن من حماية نقطة اللحام.');
        baseLoss += 0.25;
      }

      if (!hasCleanedWithAlcohol) {
        mistakes.push('لم تقم بمسح الشعيرة بالكحول الإيزوبروبيلي! مما تسبب بوجود أتربة داخل اللحام.');
        baseLoss += 0.15;
      }

      if (cleaveAngle && cleaveAngle > 0.5) {
        mistakes.push(`زاوية القطع بالقاطعة مرتفعة (${cleaveAngle}°) أكبر من المسموح (0.5°).`);
        baseLoss += 0.10;
      }

      const finalLoss = Number((baseLoss + Math.random() * 0.01).toFixed(2));

      let status: 'perfect' | 'acceptable' | 'failed' = 'perfect';
      let message = 'عمل ممتاز يا هندسة! لحام حراري احترافي مطابق لمعايير FTTH!';

      if (finalLoss > 0.05) {
        status = 'failed';
        message = 'فقد عالي وغير مقبول في اللحام! اقطع وأعد الخطوات بالترتيب الصحيح.';
      } else if (finalLoss > 0.03) {
        status = 'acceptable';
        message = 'لحام مقبول ميدانياً، ولكن يمكن تحسينه بالالتزام الصارم بالنظافة.';
      } else {
        addXp(150); // Award XP for excellent splice!
      }

      setSpliceResult({
        lossDb: finalLoss,
        status,
        message,
        mistakes,
      });

      setCurrentStep(5);
    }, 2500);
  };

  const resetLab = () => {
    setCurrentStep(1);
    setHasSleeveInserted(false);
    setHasCleanedWithAlcohol(false);
    setCleaveAngle(null);
    setSpliceResult(null);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      
      {/* Lab Title */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-xs font-bold border border-orange-500/30">
              <Flame className="w-4 h-4 text-amber-400" />
              <span>Wizard Virtual Splicing Simulator • #be7ery</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              المختبر الافتراضي للحام الفايبر الحراري (Fusion Splicer)
            </h2>
            <p className="text-slate-300 text-sm">
              اتبّع القواعد الذهبية لحام ألياف FTTH وتأكد من الحصول على فقد أقل من 0.03 dB!
            </p>
          </div>

          <button
            onClick={resetLab}
            className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700 transition-all"
          >
            <RefreshCw className="w-4 h-4 text-orange-400" />
            إعادة المحاكاة
          </button>
        </div>

        {/* Wizard Rule Quote */}
        <div className="mt-4 p-3 bg-orange-500 text-slate-950 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md">
          <ShieldCheck className="w-4 h-4 text-slate-950 shrink-0" />
          <span>
            <strong>قاعدة Wizard الذهبية:</strong> قشرت الكابل؟ امسح فوراً بالكحول الإيزوبروبيلي وقص بالقاطعة. الترتيب هو السحر!
          </span>
        </div>
      </div>

      {/* Progress Steps Header */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {[
          { num: 1, title: 'تركيب الأنبوب (Sleeve)' },
          { num: 2, title: 'تقشير الكابل (Strip)' },
          { num: 3, title: 'مسح الكحول (Clean)' },
          { num: 4, title: 'القطع بالقاطعة (Cleave)' },
          { num: 5, title: 'اللحام الحراري (Fusion)' },
        ].map((s) => (
          <div
            key={s.num}
            className={`p-3 rounded-2xl border text-center transition-all ${
              currentStep === s.num
                ? 'bg-orange-500 border-orange-400 text-white font-bold shadow-lg shadow-orange-950/40 scale-105'
                : currentStep > s.num
                ? 'bg-slate-900/80 border-emerald-500/40 text-emerald-400'
                : 'bg-slate-900/40 border-slate-800 text-slate-500'
            }`}
          >
            <div className="text-xs font-mono font-black mb-1">خطوة {s.num}</div>
            <div className="text-xs font-bold truncate">{s.title}</div>
          </div>
        ))}
      </div>

      {/* Interactive Canvas / Machine Display Area */}
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 min-h-[360px] flex flex-col items-center justify-center relative overflow-hidden shadow-2xl">
        
        {/* Fusion Splicer Screen Simulation */}
        <div className="w-full max-w-2xl bg-slate-900 rounded-2xl border-2 border-cyan-500/40 p-6 space-y-6 shadow-inner relative">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 text-xs text-slate-400 font-mono">
            <span>MODEL: BE7ERY-WIZARD-FUSION-X9</span>
            <span className="text-cyan-400 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              CORE ALIGNMENT ACTIVE
            </span>
          </div>

          {/* Machine Camera View for Fibers */}
          <div className="bg-slate-950 rounded-xl p-8 border border-cyan-900/50 flex flex-col items-center justify-center min-h-[180px] relative">
            
            {/* Background alignment grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:20px_20px] opacity-30"></div>

            {/* Fiber Graphic Visualization */}
            <div className="relative w-full flex items-center justify-between z-10 px-6">
              
              {/* Left Fiber */}
              <div className="flex items-center flex-1 justify-end">
                <div className={`h-3 rounded-l-md transition-all ${hasSleeveInserted ? 'bg-amber-600 w-16' : 'bg-slate-700 w-8'}`}></div>
                <div className="h-2 bg-slate-500 w-12"></div>
                <div className={`h-1 transition-all ${hasCleanedWithAlcohol ? 'bg-cyan-300 shadow-[0_0_8px_#38bdf8]' : 'bg-slate-400'} w-20 rounded-r-sm`}></div>
              </div>

              {/* Arc Spark Center Zone */}
              <div className="w-12 flex flex-col items-center justify-center mx-2">
                {isSplicingActive ? (
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-cyan-400 animate-ping opacity-75"></div>
                    <Flame className="w-6 h-6 text-amber-300 absolute inset-0 m-auto animate-bounce" />
                  </div>
                ) : (
                  <div className="w-1.5 h-8 bg-slate-800 border-x border-cyan-500/30"></div>
                )}
              </div>

              {/* Right Fiber */}
              <div className="flex items-center flex-1 justify-start">
                <div className={`h-1 transition-all ${hasCleanedWithAlcohol ? 'bg-cyan-300 shadow-[0_0_8px_#38bdf8]' : 'bg-slate-400'} w-20 rounded-l-sm`}></div>
                <div className="h-2 bg-slate-500 w-12"></div>
                <div className="h-3 bg-slate-700 w-16 rounded-r-md"></div>
              </div>

            </div>

            {/* Display Readout during or after splicing */}
            {isSplicingActive && (
              <div className="mt-4 text-cyan-300 text-xs font-mono animate-pulse font-bold">
                جاري إطلاق الشرارة ومحاذاة النواة (Core Alignment)...
              </div>
            )}

            {spliceResult && !isSplicingActive && (
              <div className="mt-4 flex items-center gap-3">
                <div className={`px-4 py-2 rounded-xl border text-sm font-black font-mono ${
                  spliceResult.status === 'perfect' 
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-500/50' 
                    : spliceResult.status === 'acceptable'
                    ? 'bg-amber-950 text-amber-300 border-amber-500/50'
                    : 'bg-rose-950 text-rose-300 border-rose-500/50'
                }`}>
                  تقدير الفقد: {spliceResult.lossDb} dB
                </div>
              </div>
            )}

          </div>

          {/* Controls Panel based on current step */}
          <div className="space-y-4">
            
            {/* Step 1 Control */}
            {currentStep === 1 && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-sm font-bold text-white">1. تركيب أنبوب الحماية Heat Shrink Sleeve</div>
                  <div className="text-xs text-slate-400">ادخل الأنبوب الحراري قبل قشر وقطع الشعيرة حتى لا تضطر لإعادة العمل.</div>
                </div>
                <button
                  onClick={() => {
                    handleInsertSleeve();
                    setCurrentStep(2);
                  }}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                    hasSleeveInserted 
                      ? 'bg-emerald-600 text-white' 
                      : 'bg-gradient-to-r from-amber-500 to-orange-600 text-white hover:scale-105'
                  }`}
                >
                  {hasSleeveInserted ? 'تم تركيب الأنبوب ✓' : 'تركيب الأنبوب الحراري'}
                </button>
              </div>
            )}

            {/* Step 2 & 3 Control */}
            {currentStep === 2 && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="text-sm font-bold text-white">2 & 3. تقشير الطبقة (250µm) ثم التنظيف بالكحول</div>
                <div className="text-xs text-slate-400">امسح الشعيرة فوراً بمنديل مبلل بكحول إيزوبروبيل 99% للحصول على صفير النظافة.</div>
                
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleCleanAlcohol}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      hasCleanedWithAlcohol 
                        ? 'bg-emerald-600 text-white border border-emerald-400' 
                        : 'bg-slate-800 hover:bg-slate-700 text-orange-400 border border-orange-500/40'
                    }`}
                  >
                    {hasCleanedWithAlcohol ? 'تم المسح الكحولي الفوري ✓' : 'مسح بالكحول الإيزوبروبيلي'}
                  </button>

                  <button
                    onClick={handleCleave}
                    className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-orange-950/30 transition-all hover:scale-105"
                  >
                    انتقال للقطع بالقاطعة (Cleave)
                  </button>
                </div>
              </div>
            )}

            {/* Step 4 Control */}
            {currentStep === 4 && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold text-white">4. نتيجة القطع بالقاطعة (Cleaver Angle)</div>
                  {cleaveAngle !== null && (
                    <span className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold ${
                      cleaveAngle <= 0.5 ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40' : 'bg-rose-950 text-rose-300 border border-rose-500/40'
                    }`}>
                      زاوية القطع: {cleaveAngle}° {cleaveAngle <= 0.5 ? '(ممتازة)' : '(مرتفعة)'}
                    </span>
                  )}
                </div>

                <button
                  onClick={runFusionSplice}
                  disabled={isSplicingActive}
                  className="w-full py-3 bg-gradient-to-r from-amber-500 via-orange-500 to-rose-600 text-white rounded-xl font-bold text-sm shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <Flame className="w-5 h-5 text-amber-200" />
                  إطلاق الشرارة واللحام (Run Fusion Splice)
                </button>
              </div>
            )}

            {/* Step 5 Results */}
            {currentStep === 5 && spliceResult && (
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 text-right">
                <div className="flex items-center gap-2 text-base font-bold text-white">
                  {spliceResult.status === 'perfect' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                  {spliceResult.status === 'acceptable' && <CheckCircle2 className="w-5 h-5 text-amber-400" />}
                  {spliceResult.status === 'failed' && <AlertTriangle className="w-5 h-5 text-rose-400" />}
                  <span>{spliceResult.message}</span>
                </div>

                {spliceResult.mistakes.length > 0 && (
                  <div className="p-3 bg-rose-950/40 border border-rose-500/30 rounded-lg text-xs text-rose-300 space-y-1">
                    <strong className="block text-rose-200">الأخطاء المكتشفة في المحاكاة:</strong>
                    {spliceResult.mistakes.map((m, idx) => (
                      <div key={idx}>• {m}</div>
                    ))}
                  </div>
                )}

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={resetLab}
                    className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-xl text-xs font-bold border border-slate-700"
                  >
                    تجربة لحام جديد
                  </button>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { Activity, Search, AlertCircle, CheckCircle, RefreshCw, Zap, Award, Info } from 'lucide-react';
import { OtdrEvent } from '../types';

interface OtdrAnalyzerProps {
  addXp: (amount: number) => void;
}

const SAMPLE_EVENTS: OtdrEvent[] = [
  { distanceKm: 0.0, type: 'launch', lossDb: 0.0, reflectanceDb: -45, description: 'موصل البداية بالسنترال (Launch Fiber Connector)' },
  { distanceKm: 4.2, type: 'connector', lossDb: 0.35, reflectanceDb: -52, description: 'وصلة FDB في الحي (SC/APC Connector)' },
  { distanceKm: 9.8, type: 'splice', lossDb: 0.02, description: 'نقطة لحام حراري ممتازة (Fusion Splice)' },
  { distanceKm: 14.5, type: 'macrobend', lossDb: 2.80, description: 'انثناء حاد في صينية العلبة (Macro-bend Defect)', hasFault: true },
  { distanceKm: 21.0, type: 'connector', lossDb: 0.40, reflectanceDb: -48, description: 'علبة توزيع المشتركين (FAT Box)' },
  { distanceKm: 24.2, type: 'end', lossDb: 0.0, reflectanceDb: -14, description: 'نهاية الكابل عند العميل (Fiber End / Fresnel Reflection)' }
];

export const OtdrAnalyzer: React.FC<OtdrAnalyzerProps> = ({ addXp }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [wavelength, setWavelength] = useState<'1310' | '1550'>('1550');
  const [selectedEvent, setSelectedEvent] = useState<OtdrEvent | null>(SAMPLE_EVENTS[3]);
  const [userAnswer, setUserAnswer] = useState<string>('');
  const [challengeSolved, setChallengeSolved] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');

  // Draw OTDR Trace Graph on Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set high resolution canvas scaling
    const width = canvas.parentElement?.clientWidth || 800;
    const height = 320;
    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);

    // Grid lines & Background
    ctx.fillStyle = '#020617';
    ctx.fillRect(0, 0, width, height);

    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;

    for (let x = 0; x < width; x += 50) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw Trace Line
    ctx.strokeStyle = wavelength === '1550' ? '#38bdf8' : '#818cf8';
    ctx.lineWidth = 2.5;
    ctx.beginPath();

    const startX = 40;
    const startY = 40;
    const totalKm = 26.0;
    const scaleX = (width - 80) / totalKm;
    const scaleY = (height - 80) / 25; // 25 dB range

    let currentDb = 0;
    ctx.moveTo(startX, startY);

    SAMPLE_EVENTS.forEach((ev) => {
      const px = startX + ev.distanceKm * scaleX;
      
      // Fiber attenuation per km (0.35 dB/km at 1310nm, 0.20 dB/km at 1550nm)
      const attenPerKm = wavelength === '1310' ? 0.35 : 0.20;
      currentDb += ev.distanceKm * attenPerKm;

      // Extra loss for macrobend at 1550nm
      let evLoss = ev.lossDb;
      if (ev.type === 'macrobend' && wavelength === '1310') {
        evLoss = 0.4; // Macrobend loss is much less visible at 1310nm!
      }

      const py = startY + (currentDb + evLoss) * scaleY;

      // Reflectance Spike if present
      if (ev.reflectanceDb) {
        const spikeY = py - 35;
        ctx.lineTo(px, spikeY);
        ctx.lineTo(px + 4, py);
      } else {
        ctx.lineTo(px, py);
      }

      // Draw Event Marker Point
      ctx.fillStyle = ev.hasFault ? '#f43f5e' : '#38bdf8';
      ctx.beginPath();
      ctx.arc(px, py, ev.hasFault ? 6 : 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.moveTo(px, py);
    });

    ctx.stroke();

    // Axis Labels
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px monospace';
    ctx.fillText('0 Km', startX - 10, height - 10);
    ctx.fillText('10 Km', startX + 10 * scaleX - 15, height - 10);
    ctx.fillText('20 Km', startX + 20 * scaleX - 15, height - 10);
    ctx.fillText('26 Km', width - 50, height - 10);

  }, [wavelength]);

  const handleSolveChallenge = () => {
    if (userAnswer === 'macrobend') {
      setChallengeSolved(true);
      setFeedback('إجابة نموذجية يا FTTH Wizard! الانثناء الحاد (Macro-bend) يظهر بوضوح عند الطول الموجي 1550nm لأن الانحناء يجعل أطوال الموجات الطويلة تتسرب أسهل من الغلاف.');
      addXp(200);
    } else {
      setFeedback('حاول مجدداً يا هندسة! قارن قراءة الطول الموجي 1550nm بقراءة 1310nm واكتشف أسباب الفقد الزائد عند 14.5 كم.');
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      
      {/* Title */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-3">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500/10 text-orange-400 rounded-full text-xs font-bold border border-orange-500/30">
              <Activity className="w-4 h-4 text-orange-400" />
              <span>OTDR Curve Interactive Simulator • #be7ery</span>
            </div>
            <h2 className="text-2xl font-black text-white mt-1">
              محلل منحنيات OTDR واكتشاف الأعطال الميدانية
            </h2>
            <p className="text-slate-300 text-sm">
              اقرأ الأحداث الضوئية، قارن الأطوال الموجية، وحدد موقع العطل بدقة المتر المربع!
            </p>
          </div>

          {/* Wavelength Switcher */}
          <div className="flex bg-slate-950 p-1.5 rounded-2xl border border-slate-800 text-xs gap-2">
            <button
              onClick={() => setWavelength('1310')}
              className={`px-4 py-2 rounded-xl font-bold transition-all ${
                wavelength === '1310' ? 'bg-orange-500 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              1310 nm (Upstream)
            </button>
            <button
              onClick={() => setWavelength('1550')}
              className={`px-4 py-2 rounded-xl font-bold transition-all ${
                wavelength === '1550' ? 'bg-orange-500 text-white shadow' : 'text-slate-400 hover:text-white'
              }`}
            >
              1550 nm (Down/Testing)
            </button>
          </div>
        </div>
      </div>

      {/* Canvas Trace Area */}
      <div className="bg-slate-950 border border-slate-800 rounded-3xl p-6 shadow-2xl relative space-y-4">
        
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span className="text-cyan-400 font-bold">
            TRACER WAVELENGTH: {wavelength} nm • PULSE: 20ns • RANGE: 30km
          </span>
          <span className="text-rose-400 flex items-center gap-1 font-bold">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
            عطل مكتشف عند 14.5 Km
          </span>
        </div>

        <div className="w-full overflow-hidden rounded-2xl border border-slate-800">
          <canvas ref={canvasRef} className="w-full block" />
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-2">
          <Info className="w-4 h-4 text-cyan-400" />
          <span>
            لاحظ كيف يتغير شكل المنحنى عند التبديل بين 1310nm و 1550nm: الانثناءات الحادة تظهر بفقد أكبر بكثير عند 1550nm!
          </span>
        </div>
      </div>

      {/* Event Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Event List */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            جدول الأحداث الضوئية المكتشفة (OTDR Event Table)
          </h3>

          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {SAMPLE_EVENTS.map((ev, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedEvent(ev)}
                className={`p-3 rounded-2xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                  selectedEvent?.distanceKm === ev.distanceKm
                    ? 'bg-cyan-950/80 border-cyan-400 text-white'
                    : ev.hasFault
                    ? 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div>
                  <div className="font-bold">{ev.distanceKm} Km - {ev.description}</div>
                  <div className="text-[11px] text-slate-400">
                    النوع: {ev.type} | الفقد: {ev.lossDb} dB
                  </div>
                </div>

                {ev.hasFault && (
                  <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 font-bold text-[10px]">
                    عطل
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Diagnostic Challenge Card */}
        <div className="bg-slate-900 border border-cyan-500/30 rounded-3xl p-5 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-cyan-300">
            <Award className="w-5 h-5 text-amber-400" />
            <span>تحدي FTTH Wizard التشخيصي (اربح +200 XP)</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            عند المسافة 14.5 Km يظهر هبوط حاد بالفقد يصل لـ 2.80 dB عند الطول الموجي 1550nm ولكن الفقد يقل كثيراً عند 1310nm. ما هو التشخيص الميداني الصحيح لهذا العطل؟
          </p>

          <div className="space-y-2 text-xs">
            {[
              { id: 'macrobend', label: 'انثناء حاد في الشعيرة (Macro-bend Defect)' },
              { id: 'dirty_connector', label: 'اتساخ موصل SC/APC بالتراب' },
              { id: 'fiber_cut', label: 'انقطاع كلي في كابل الفايبر' },
              { id: 'fusion_bubble', label: 'فقاعة هواء في اللحام' },
            ].map((opt) => (
              <label
                key={opt.id}
                className={`flex items-center gap-3 p-3 rounded-2xl border cursor-pointer transition-all ${
                  userAnswer === opt.id
                    ? 'bg-cyan-950 border-cyan-400 text-white font-bold'
                    : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <input
                  type="radio"
                  name="fault_choice"
                  value={opt.id}
                  checked={userAnswer === opt.id}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className="accent-cyan-400"
                />
                <span>{opt.label}</span>
              </label>
            ))}
          </div>

          <button
            onClick={handleSolveChallenge}
            disabled={!userAnswer}
            className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
          >
            تأكيد التقييم والحل
          </button>

          {feedback && (
            <div className={`p-3 rounded-xl border text-xs font-medium ${
              challengeSolved ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40' : 'bg-rose-950 text-rose-300 border-rose-500/40'
            }`}>
              {feedback}
            </div>
          )}

        </div>

      </div>

    </div>
  );
};

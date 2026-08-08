import React, { useState } from 'react';
import { Award, Shield, CheckCircle2, Download, Printer, Sparkles, Zap } from 'lucide-react';
import { CertificateData } from '../types';

interface WizardCertificateProps {
  wizardXp: number;
}

export const WizardCertificate: React.FC<WizardCertificateProps> = ({ wizardXp }) => {
  const [studentName, setStudentName] = useState<string>('مهندس ألياف ضوئية محترف');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const certData: CertificateData = {
    studentName: studentName || 'مهندس ألياف ضوئية محترف',
    issueDate: new Date().toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' }),
    score: Math.min(100, Math.max(85, Math.floor(wizardXp / 10))),
    roleTitle: wizardXp >= 1000 ? 'FTTH Master Wizard 🧙‍♂️' : 'Certified FTTH Network Specialist ⚡',
    certificateId: `BE7ERY-CERT-${Math.floor(100000 + Math.random() * 900000)}`,
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6">
      
      {/* Title & Controls */}
      <div className="bg-slate-900 border border-amber-500/30 rounded-3xl p-6 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-950 text-amber-300 rounded-full text-xs font-bold border border-amber-500/30">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Official FTTH Wizard Certification • #be7ery</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">
            الشهادة المعتمدة: The FTTH Certified Wizard
          </h2>
          <p className="text-slate-300 text-sm">
            تصدر رسمياً من منصة Be7ery Fiber Academy وموقعة باسم المنهج والرمز #be7ery.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold border border-slate-700"
          >
            {isEditing ? 'تأكيد الاسم' : 'تعديل اسمك بالشهادة'}
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs rounded-xl shadow-lg"
          >
            <Printer className="w-4 h-4" />
            طباعة / حفظ PDF
          </button>
        </div>
      </div>

      {/* Name Input Edit Drawer */}
      {isEditing && (
        <div className="bg-slate-950 border border-amber-500/40 p-4 rounded-2xl flex items-center gap-3">
          <label className="text-xs text-slate-300 font-bold shrink-0">الاسم الثلاثي في الشهادة:</label>
          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-sm text-white font-bold focus:border-amber-400 outline-none"
            placeholder="ادخل اسمك الكامل هنا..."
          />
        </div>
      )}

      {/* Official Certificate Frame */}
      <div id="certificate-print-area" className="bg-slate-950 p-8 sm:p-12 rounded-3xl border-4 border-amber-500/40 shadow-2xl relative overflow-hidden text-center space-y-8 print:border-black print:text-black">
        
        {/* Decorative Corner Ornaments */}
        <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-amber-400/60 rounded-tr-2xl"></div>
        <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-amber-400/60 rounded-tl-2xl"></div>
        <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-amber-400/60 rounded-br-2xl"></div>
        <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-amber-400/60 rounded-bl-2xl"></div>

        {/* Certificate Header Badge & Title */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold uppercase tracking-widest">
            <Shield className="w-4 h-4 text-amber-400" />
            Be7ery Fiber Academy International Certification
          </div>

          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            شهادة إتمام واجتياز كفاءة FTTH الميدانية
          </h1>
          <p className="text-amber-400 font-mono text-sm tracking-widest uppercase">
            THE OFFICIAL CERTIFIED FTTH WIZARD DIPLOMA
          </p>
        </div>

        {/* Recipient Section */}
        <div className="space-y-2 py-4 border-y border-amber-500/20 max-w-2xl mx-auto">
          <p className="text-xs text-slate-400 uppercase tracking-wider">
            تشهد أكاديمية الألياف الضوئية المعتمدة بأن المهندس/الفني:
          </p>
          <div className="text-2xl sm:text-3xl font-black text-cyan-300 underline decoration-amber-400 decoration-2 underline-offset-8">
            {certData.studentName}
          </div>
          <p className="text-xs text-slate-300 pt-2 leading-relaxed">
            قد أتم بنجاح كافة الوحدات التعليمية، والمختبر الميداني للحام الحراري، واجتاز اختبارات تحليل منحنيات الـ OTDR وحساب الميزانية الضوئية بدرجة تفوق (<strong className="text-amber-300">{certData.score}%</strong>).
          </p>
        </div>

        {/* Title Awarded */}
        <div className="p-4 bg-amber-950/40 rounded-2xl border border-amber-500/30 max-w-md mx-auto">
          <div className="text-xs text-amber-400 font-bold">الرتبة الممنوحة رسمياً:</div>
          <div className="text-lg font-black text-white mt-0.5">{certData.roleTitle}</div>
        </div>

        {/* Verification Footer & Signatures */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 text-xs text-slate-400 border-t border-slate-800 items-end">
          
          <div className="space-y-1 text-right">
            <div>رقم الاعتماد: <strong className="text-amber-300 font-mono">{certData.certificateId}</strong></div>
            <div>تاريخ الإصدار: {certData.issueDate}</div>
          </div>

          <div className="flex flex-col items-center space-y-1">
            <div className="w-16 h-16 rounded-full border-2 border-amber-400 flex items-center justify-center bg-amber-500/10">
              <Zap className="w-8 h-8 text-amber-400" />
            </div>
            <div className="font-bold text-amber-300">#be7ery</div>
            <div className="text-[10px]">علامة الجودة المعتمدة</div>
          </div>

          <div className="space-y-1 text-left">
            <div className="font-bold text-white text-sm">م. عبد الغفار بحيري</div>
            <div className="text-[11px] text-cyan-300">The FTTH Wizard & Founder</div>
            <div className="text-[10px] text-slate-500 italic">التوقيع والختم الإلكتروني المعتمد</div>
          </div>

        </div>

      </div>

    </div>
  );
};

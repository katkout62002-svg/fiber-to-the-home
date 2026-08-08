import React, { useState, useMemo } from 'react';
import { CURRICULUM_MODULES } from '../data/curriculumData';
import { CourseModule, Lesson, QuizQuestion } from '../types';
import { BookOpen, CheckCircle2, ChevronDown, ChevronUp, Award, Lightbulb, Play, ArrowLeft, ArrowRight, Shield, Sparkles } from 'lucide-react';

interface CurriculumViewerProps {
  addXp: (amount: number) => void;
  openAiMentor: () => void;
}

// Helper to format English terms inside Arabic text cleanly with isolated bidi
const renderFormattedText = (text: string) => {
  const parts = text.split(/(\([A-Za-z0-9\s\.\,\-\/\:\%\+°µ]+?\))/g);
  return parts.map((part, i) => {
    if (part.startsWith('(') && part.endsWith(')')) {
      return (
        <span
          key={i}
          dir="ltr"
          className="inline-block px-1.5 py-0.5 mx-1 bg-slate-800/90 text-cyan-300 font-mono text-xs rounded-md border border-slate-700/80 shadow-sm"
          style={{ unicodeBidi: 'isolate' }}
        >
          {part}
        </span>
      );
    }
    return part;
  });
};

export const CurriculumViewer: React.FC<CurriculumViewerProps> = ({ addXp, openAiMentor }) => {
  const [selectedModule, setSelectedModule] = useState<CourseModule>(CURRICULUM_MODULES[0]);
  const [selectedLesson, setSelectedLesson] = useState<Lesson>(CURRICULUM_MODULES[0].lessons[0]);
  const [activeQuiz, setActiveQuiz] = useState<QuizQuestion | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);

  const handleSelectLesson = (lesson: Lesson, module: CourseModule) => {
    setSelectedModule(module);
    setSelectedLesson(lesson);
    setActiveQuiz(null);
    setSelectedAnswer(null);
    setQuizSubmitted(false);
  };

  // Flattened array of all lessons across modules for seamless Next/Prev navigation
  const allLessons = useMemo(() => {
    return CURRICULUM_MODULES.flatMap((mod) =>
      mod.lessons.map((lesson) => ({
        lesson,
        module: mod,
      }))
    );
  }, []);

  const currentLessonIndex = allLessons.findIndex((item) => item.lesson.id === selectedLesson.id);
  const prevLessonItem = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLessonItem = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;

  const handlePrevLesson = () => {
    if (prevLessonItem) {
      handleSelectLesson(prevLessonItem.lesson, prevLessonItem.module);
    }
  };

  const handleNextLesson = () => {
    if (nextLessonItem) {
      handleSelectLesson(nextLessonItem.lesson, nextLessonItem.module);
    }
  };

  const markLessonComplete = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons([...completedLessons, lessonId]);
      addXp(50);
    }
  };

  const handleAnswerSubmit = () => {
    if (!activeQuiz || selectedAnswer === null) return;
    setQuizSubmitted(true);
    if (selectedAnswer === activeQuiz.correctAnswer) {
      addXp(100);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Modules & Lessons Sidebar */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-4 space-y-4 shadow-2xl h-fit">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-orange-500" />
              فهرس الفصول السبعة (#be7ery - الدليل الشامل)
            </h3>
            <span className="text-xs text-slate-400 font-mono">
              {completedLessons.length} / 18 درساً
            </span>
          </div>

          <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
            {CURRICULUM_MODULES.map((mod) => (
              <div key={mod.id} className="space-y-1">
                
                {/* Module Header */}
                <div
                  onClick={() => {
                    setSelectedModule(mod);
                    setSelectedLesson(mod.lessons[0]);
                  }}
                  className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                    selectedModule.id === mod.id
                      ? 'bg-slate-800/80 border-orange-500/80 text-white shadow'
                      : 'bg-slate-950/40 border-slate-800 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span>{mod.title}</span>
                    <span className="text-[10px] text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded-full border border-orange-500/30 font-mono">
                      الوحدة {mod.id}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                    {mod.subtitle}
                  </p>
                </div>

                {/* Lessons in Selected Module */}
                {selectedModule.id === mod.id && (
                  <div className="mr-3 pl-2 border-r-2 border-orange-500/40 space-y-1 pt-1">
                    {mod.lessons.map((les) => (
                      <button
                        key={les.id}
                        onClick={() => handleSelectLesson(les, mod)}
                        className={`w-full text-right p-2 rounded-xl text-xs flex items-center justify-between transition-all ${
                          selectedLesson.id === les.id
                            ? 'bg-orange-500 text-white font-bold shadow'
                            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                        }`}
                      >
                        <span className="truncate">{les.title}</span>
                        {completedLessons.includes(les.id) && (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 shrink-0 mr-1" />
                        )}
                      </button>
                    ))}

                    {/* Quiz Trigger Button */}
                    {mod.quiz.length > 0 && (
                      <button
                        onClick={() => {
                          setActiveQuiz(mod.quiz[0]);
                          setSelectedAnswer(null);
                          setQuizSubmitted(false);
                        }}
                        className="w-full text-right p-2 rounded-xl text-xs font-bold text-amber-300 bg-amber-950/40 border border-amber-500/30 hover:bg-amber-900/40 transition-all flex items-center justify-between"
                      >
                        <span>اختبار الوحدة رقم {mod.id}</span>
                        <Award className="w-3.5 h-3.5 text-amber-400" />
                      </button>
                    )}
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>

        {/* Lesson Reading & Quiz Area */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 shadow-2xl">
          
          {/* If Active Quiz Mode */}
          {activeQuiz ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-amber-400 bg-amber-950 px-2.5 py-1 rounded-full border border-amber-500/30">
                    اختبار استيعاب الوحدة #{selectedModule.id}
                  </span>
                  <h2 className="text-xl font-black text-white mt-2">
                    {activeQuiz.question}
                  </h2>
                </div>
                <button
                  onClick={() => setActiveQuiz(null)}
                  className="text-xs text-slate-400 hover:text-white"
                >
                  العودة للدرس
                </button>
              </div>

              <div className="space-y-3">
                {activeQuiz.options.map((opt, idx) => (
                  <label
                    key={idx}
                    className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer transition-all text-sm ${
                      selectedAnswer === idx
                        ? 'bg-cyan-950 border-cyan-400 text-white font-bold'
                        : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="quiz_option"
                      checked={selectedAnswer === idx}
                      onChange={() => setSelectedAnswer(idx)}
                      className="accent-cyan-400"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>

              {!quizSubmitted ? (
                <button
                  onClick={handleAnswerSubmit}
                  disabled={selectedAnswer === null}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold text-sm rounded-xl shadow-lg hover:scale-105 transition-all"
                >
                  تأكيد الإجابة (+100 XP)
                </button>
              ) : (
                <div className={`p-4 rounded-2xl border text-sm space-y-2 ${
                  selectedAnswer === activeQuiz.correctAnswer
                    ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                    : 'bg-rose-950 text-rose-300 border-rose-500/40'
                }`}>
                  <div className="font-bold text-base">
                    {selectedAnswer === activeQuiz.correctAnswer ? 'إجابة صحيحة يا FTTH Wizard! 🎉' : 'إجابة غير دقيقة!'}
                  </div>
                  <p className="text-xs leading-relaxed">{activeQuiz.explanation}</p>
                </div>
              )}
            </div>
          ) : (
            /* Regular Lesson View */
            <div className="space-y-6">

              {/* Navigation Bar Top */}
              <div className="flex items-center justify-between gap-3 p-3 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-md">
                <button
                  onClick={handlePrevLesson}
                  disabled={!prevLessonItem}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs transition-all ${
                    prevLessonItem
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-orange-500/50 shadow-sm active:scale-95'
                      : 'bg-slate-950/50 text-slate-600 border border-slate-800/50 cursor-not-allowed opacity-40'
                  }`}
                  title={prevLessonItem ? prevLessonItem.lesson.title : 'لا يوجد درس سابق'}
                >
                  <ArrowRight className="w-4 h-4 text-orange-400 shrink-0" />
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 font-normal">الدرس السابق</div>
                    <div className="text-xs truncate max-w-[100px] sm:max-w-[170px]">
                      {prevLessonItem ? prevLessonItem.lesson.title : 'البداية'}
                    </div>
                  </div>
                </button>

                <div className="flex flex-col items-center justify-center font-mono text-xs text-slate-400 px-1">
                  <span className="text-orange-400 font-bold text-xs sm:text-sm">
                    {currentLessonIndex + 1} <span className="text-slate-600">/</span> {allLessons.length}
                  </span>
                  <span className="text-[9px] text-slate-500 font-sans hidden sm:inline">دروس FTTH</span>
                </div>

                <button
                  onClick={handleNextLesson}
                  disabled={!nextLessonItem}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl font-bold text-xs transition-all ${
                    nextLessonItem
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-md shadow-orange-950/30 active:scale-95'
                      : 'bg-slate-950/50 text-slate-600 border border-slate-800/50 cursor-not-allowed opacity-40'
                  }`}
                  title={nextLessonItem ? nextLessonItem.lesson.title : 'وصلت لنهاية المنهج'}
                >
                  <div className="text-left">
                    <div className="text-[10px] text-amber-100/90 font-normal">الدرس التالي</div>
                    <div className="text-xs truncate max-w-[100px] sm:max-w-[170px]">
                      {nextLessonItem ? nextLessonItem.lesson.title : 'النهاية'}
                    </div>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-white shrink-0" />
                </button>
              </div>
              
              {/* Lesson Header */}
              <div className="border-b border-slate-800 pb-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/30 font-mono">
                    {selectedModule.title}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    المدة: {selectedLesson.duration}
                  </span>
                </div>

                <h2 className="text-2xl font-black text-white">
                  {selectedLesson.title}
                </h2>
              </div>

              {/* Lesson Content Body */}
              <div className="space-y-4 text-slate-200 text-sm leading-relaxed">
                {selectedLesson.content.split('\n').map((line, idx) => {
                  const trimmed = line.trim();
                  if (!trimmed) return <div key={idx} className="h-2" />;

                  // Signal path / flowchart line
                  if (trimmed.includes('→') || (trimmed.includes('OLT') && trimmed.includes('ONT') && trimmed.includes('Fiber'))) {
                    const parts = trimmed.split(/→|⬇/).map(p => p.trim()).filter(Boolean);
                    return (
                      <div key={idx} className="my-4 p-4 bg-slate-950 border border-orange-500/40 rounded-2xl shadow-xl space-y-2">
                        <div className="text-[11px] font-bold text-orange-400 font-mono uppercase tracking-wider flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          <span>مسار الإشارة الميداني (Signal Flow Path)</span>
                        </div>
                        <div className="flex flex-wrap items-center gap-2 pt-1" dir="ltr" style={{ unicodeBidi: 'isolate' }}>
                          {parts.map((p, pIdx) => (
                            <React.Fragment key={pIdx}>
                              <span className="px-2.5 py-1.5 bg-slate-900 border border-cyan-500/30 rounded-xl text-cyan-300 font-mono text-xs font-bold shadow-md hover:border-cyan-400 transition-all">
                                {p}
                              </span>
                              {pIdx < parts.length - 1 && (
                                <span className="text-orange-400 font-black text-sm">➔</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  // Numbered Section Titles (1⃣, 2⃣, 3⃣, 4⃣, 5⃣)
                  if (/^[1-9]⃣/.test(trimmed) || trimmed.startsWith('أولاً:') || trimmed.startsWith('ثانياً:') || trimmed.startsWith('ثالثاً:')) {
                    return (
                      <div key={idx} className="pt-3 pb-1 border-r-4 border-orange-500 pr-3 my-2 bg-orange-950/20 rounded-l-xl">
                        <h3 className="text-base font-extrabold text-orange-300 font-sans" dir="auto">
                          {renderFormattedText(trimmed)}
                        </h3>
                      </div>
                    );
                  }

                  // Warnings / Problems
                  if (trimmed.startsWith('❌') || trimmed.includes('مشاكل وأسباب')) {
                    return (
                      <div key={idx} className="p-3.5 bg-rose-950/40 border border-rose-500/40 rounded-2xl text-rose-200 text-xs font-bold my-2 space-y-1 shadow-md" dir="auto">
                        {renderFormattedText(trimmed)}
                      </div>
                    );
                  }

                  // Success / Benefits
                  if (trimmed.startsWith('✅') || trimmed.includes('مميزات')) {
                    return (
                      <div key={idx} className="p-3.5 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl text-emerald-200 text-xs font-bold my-2 space-y-1 shadow-md" dir="auto">
                        {renderFormattedText(trimmed)}
                      </div>
                    );
                  }

                  // Bullet points
                  if (trimmed.startsWith('•')) {
                    return (
                      <div key={idx} className="flex items-start gap-2.5 pr-2 my-1 text-slate-200 text-xs sm:text-sm">
                        <span className="text-orange-400 font-black text-base shrink-0 leading-none mt-0.5">•</span>
                        <span className="leading-relaxed bidi-auto w-full" dir="auto">
                          {renderFormattedText(trimmed.substring(1).trim())}
                        </span>
                      </div>
                    );
                  }

                  // Default paragraph
                  return (
                    <p key={idx} className="text-slate-200 text-xs sm:text-sm leading-relaxed bidi-auto font-sans" dir="auto">
                      {renderFormattedText(trimmed)}
                    </p>
                  );
                })}
              </div>

              {/* Lesson Real Field Photo / PDF Figure */}
              {selectedLesson.imageUrl && (
                <div className="my-5 rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 shadow-2xl space-y-2">
                  <div className="relative group">
                    <img
                      src={selectedLesson.imageUrl}
                      alt={selectedLesson.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-56 sm:h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                    <div className="absolute bottom-3 right-3 left-3 flex items-center justify-between text-xs font-mono text-slate-300 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-slate-700/60">
                      <span className="text-orange-400 font-bold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                        صورة توضيحية من الدليل الميداني (#be7ery)
                      </span>
                      <span className="text-slate-400 text-[10px]">FTTH Field Manual</span>
                    </div>
                  </div>
                  {selectedLesson.imageCaption && (
                    <p className="px-4 pb-3 text-xs text-slate-300 font-sans italic text-center" dir="auto">
                      {selectedLesson.imageCaption}
                    </p>
                  )}
                </div>
              )}

              {/* Diagram / Visual Concept Card */}
              {selectedLesson.diagramType && (
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs font-bold text-orange-400 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400" />
                    تجسيم المفهوم الميداني (Visual Diagram)
                  </div>

                  {selectedLesson.diagramType === 'structure' && (
                    <div className="p-4 bg-slate-900 rounded-xl flex items-center justify-center gap-4 text-xs font-mono">
                      <div className="p-3 bg-orange-950/60 border border-orange-500/40 rounded-lg text-orange-300 text-center">
                        NUCLEUS CORE (9µm)
                      </div>
                      <div className="text-slate-500">→</div>
                      <div className="p-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 text-center">
                        CLADDING (125µm)
                      </div>
                      <div className="text-slate-500">→</div>
                      <div className="p-3 bg-slate-800 border border-slate-700 rounded-lg text-slate-400 text-center">
                        COATING (250µm)
                      </div>
                    </div>
                  )}

                  {selectedLesson.diagramType === 'gpon_map' && (
                    <div className="p-4 bg-slate-900 rounded-xl text-xs font-mono space-y-2">
                      <div className="flex justify-between items-center text-orange-400">
                        <span>[OLT Central]</span>
                        <span>== Feeder ==&gt;</span>
                        <span>[FDB Splitter 1:32]</span>
                        <span>== Drop ==&gt;</span>
                        <span>[ONT Home]</span>
                      </div>
                    </div>
                  )}

                  {selectedLesson.diagramType === 'connector_types' && (
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-emerald-300">
                        <strong>SC/APC (الأخضر):</strong> صقل مائل 8 درجات، يمنع الانعكاس المرتد لشبكات FTTH.
                      </div>
                      <div className="p-3 bg-blue-950/60 border border-blue-500/40 rounded-xl text-blue-300">
                        <strong>SC/UPC (الأزرق):</strong> صقل مسطح 0 درجة، لروابط الكروت والسنترال.
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Wizard Pro Tip Box */}
              <div className="p-4 bg-orange-500 text-slate-950 rounded-2xl space-y-1 shadow-lg shadow-orange-950/20">
                <div className="flex items-center gap-2 text-xs font-black uppercase">
                  <Lightbulb className="w-4 h-4 fill-slate-950" />
                  <span>نصيحة Wizard من الواقع الميداني (#be7ery)</span>
                </div>
                <p className="text-sm font-bold italic">
                  "{selectedLesson.wizardTip}"
                </p>
              </div>

              {/* Key Takeaways */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-slate-300">أهم المخرجات التعليمية للدرس:</h4>
                <ul className="space-y-1.5 text-xs text-slate-400">
                  {selectedLesson.keyTakeaways.map((take, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{take}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Lesson Completion Action */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <button
                  onClick={openAiMentor}
                  className="text-xs text-orange-400 hover:text-orange-300 flex items-center gap-1.5 font-bold"
                >
                  <Sparkles className="w-4 h-4 text-orange-400" />
                  أسئلة واستفسار عن هذا الدرس؟
                </button>

                <button
                  onClick={() => markLessonComplete(selectedLesson.id)}
                  disabled={completedLessons.includes(selectedLesson.id)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                    completedLessons.includes(selectedLesson.id)
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-500/40'
                      : 'bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-950/30'
                  }`}
                >
                  {completedLessons.includes(selectedLesson.id) ? 'تم إنهاء الدرس ✓ (+50 XP)' : 'إكمال الدرس واكسب +50 XP'}
                </button>
              </div>

              {/* Navigation Bar Bottom */}
              <div className="flex items-center justify-between gap-3 p-3 mt-4 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-md">
                <button
                  onClick={handlePrevLesson}
                  disabled={!prevLessonItem}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
                    prevLessonItem
                      ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 hover:border-orange-500/50 shadow-sm active:scale-95'
                      : 'bg-slate-950/50 text-slate-600 border border-slate-800/50 cursor-not-allowed opacity-40'
                  }`}
                >
                  <ArrowRight className="w-4 h-4 text-orange-400 shrink-0" />
                  <div className="text-right">
                    <div className="text-[10px] text-slate-400 font-normal">الدرس السابق</div>
                    <div className="text-xs truncate max-w-[100px] sm:max-w-[180px]">
                      {prevLessonItem ? prevLessonItem.lesson.title : 'البداية'}
                    </div>
                  </div>
                </button>

                <div className="flex flex-col items-center justify-center font-mono text-xs text-slate-400 px-1">
                  <span className="text-orange-400 font-bold text-xs sm:text-sm">
                    {currentLessonIndex + 1} <span className="text-slate-600">/</span> {allLessons.length}
                  </span>
                  <span className="text-[9px] text-slate-500 font-sans hidden sm:inline">دروس FTTH</span>
                </div>

                <button
                  onClick={handleNextLesson}
                  disabled={!nextLessonItem}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs transition-all ${
                    nextLessonItem
                      ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-md shadow-orange-950/30 active:scale-95'
                      : 'bg-slate-950/50 text-slate-600 border border-slate-800/50 cursor-not-allowed opacity-40'
                  }`}
                >
                  <div className="text-left">
                    <div className="text-[10px] text-amber-100/90 font-normal">الدرس التالي</div>
                    <div className="text-xs truncate max-w-[100px] sm:max-w-[180px]">
                      {nextLessonItem ? nextLessonItem.lesson.title : 'النهاية'}
                    </div>
                  </div>
                  <ArrowLeft className="w-4 h-4 text-white shrink-0" />
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
};

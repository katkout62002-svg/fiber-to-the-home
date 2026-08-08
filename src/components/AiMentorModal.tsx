import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, X, Bot, User, RefreshCw, Shield, Zap } from 'lucide-react';
import { UserRole } from '../types';

interface AiMentorModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole: UserRole;
}

interface ChatMessage {
  sender: 'user' | 'wizard';
  text: string;
  time: string;
}

export const AiMentorModal: React.FC<AiMentorModalProps> = ({ isOpen, onClose, userRole }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'wizard',
      text: 'أهلاً بك يا هندسة! أنا "The FTTH Wizard" المهندس عبد الغفار بحيري (#be7ery). اسألني عن أي حاجة في شبكات الألياف الضوئية، اللحامات الحرارية، قراءات OTDR، أو حساب الميزانية الضوئية!',
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputPrompt, setInputPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const handleSend = async () => {
    if (!inputPrompt.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      sender: 'user',
      text: inputPrompt,
      time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    const promptToSend = inputPrompt;
    setInputPrompt('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/wizard-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptToSend,
          userRole: 'مهندس وفني ألياف ضوئية',
          context: 'استشارة المساعد الذكي Be7ery Fiber Academy',
        }),
      });

      const data = await response.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'wizard',
            text: `عذراً يا هندسة: ${data.error}`,
            time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'wizard',
            text: data.text || 'إجابة جيدة من المعلم الذكي.',
            time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'wizard',
          text: 'حدث خطأ في الاتصال بالسيرفر. يرجى المحاولة لاحقاً يا هندسة.',
          time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-end bg-slate-950/80 backdrop-blur-sm p-2 sm:p-4 animate-in fade-in">
      <div className="w-full max-w-lg bg-slate-900 border border-cyan-500/40 rounded-3xl h-[85vh] flex flex-col shadow-2xl overflow-hidden relative">
        
        {/* Drawer Header */}
        <div className="p-4 bg-slate-950 border-b border-cyan-900/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src="/src/assets/images/ftth_wizard_avatar_1786197096090.jpg"
              alt="The FTTH Wizard Avatar"
              className="w-10 h-10 rounded-xl object-cover border border-cyan-400"
              referrerPolicy="no-referrer"
            />
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-white text-sm">The FTTH Wizard AI</h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  #be7ery
                </span>
              </div>
              <p className="text-[11px] text-slate-400">مساعدك الذكي للاستشارات الميدانية بالفايبر</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat History Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2.5 ${
                msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {msg.sender === 'wizard' ? (
                <div className="w-8 h-8 rounded-xl bg-cyan-950 border border-cyan-400 flex items-center justify-center shrink-0">
                  <Zap className="w-4 h-4 text-cyan-400" />
                </div>
              ) : (
                <div className="w-8 h-8 rounded-xl bg-indigo-950 border border-indigo-400 flex items-center justify-center shrink-0">
                  <User className="w-4 h-4 text-indigo-300" />
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl max-w-[80%] space-y-1 ${
                  msg.sender === 'user'
                    ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-tr-none shadow-md'
                    : 'bg-slate-950 text-slate-200 border border-cyan-900/40 rounded-tl-none whitespace-pre-line leading-relaxed'
                }`}
              >
                <div>{msg.text}</div>
                <div className="text-[9px] opacity-60 text-left font-mono">{msg.time}</div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 text-cyan-300 text-xs font-mono p-3 bg-slate-950 rounded-2xl w-fit animate-pulse border border-cyan-500/30">
              <Sparkles className="w-4 h-4 text-amber-400 animate-spin" />
              <span>جاري صياغة الإجابة الميدانية بأسلوب #be7ery...</span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Prompt Input Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="اسأل Wizard عن اللحام، OTDR، أو القراءات..."
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:border-cyan-400 outline-none"
          />

          <button
            onClick={handleSend}
            disabled={!inputPrompt.trim() || isLoading}
            className="p-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-50 text-white rounded-xl shadow-lg transition-all shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

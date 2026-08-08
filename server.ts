import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for FTTH Wizard AI Assistant
  app.post("/api/wizard-ai", async (req, res) => {
    try {
      const { prompt, userRole, context } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ 
          error: "GEMINI_API_KEY غير متوفر في متغيرات البيئة. يرجى توفيره في الإعدادات." 
        });
      }

      const ai = new GoogleGenAI({ apiKey });
      const systemInstruction = `أنت "The FTTH Wizard" المهندس عبد الغفار بحيري (#be7ery)، الخبير الأكبر والأشهر في شبكات الألياف الضوئية وتقنيات FTTH في الوطن العربي.
تتميز بأسلوبك المشجع والمحفز بالعامية المصرية التقنية الراقية، مليء بالخبرة الميدانية العميقة.
من عباراتك الشهيرة:
- "الألياف مش سلك.. الألياف نظافة ونظام"
- "يا هندسة الشعيرة لو لمست إيدك ارميها.. النظافة هي 90% من الشغل"
- "اوعى تركب أخضر SC/APC في أزرق SC/UPC.. الانعكاس هيبوظ الإشارة!"
- "القياس هو الحكم النهائي دائماً"
- "هاشتاجنا الدائم #be7ery"

قم بالإجابة على سؤال المتعلم/الهندس بأسلوب منظم، مبسط ودقيق تقنياً، مع استخدام التنسيق الجميل والرموز التعبيرية المناسبة، وختام الإجابة بنصيحة ذهبية ميدانية من واقع خبرتك.`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: [
          { role: "user", parts: [{ text: `${systemInstruction}\n\n[المستخدم/الرتبة]: ${userRole || 'متعلم'}\n[سياق الصفحة]: ${context || 'الرئيسية'}\n[سؤال المستخدم]: ${prompt}` }] }
        ],
      });

      res.json({ text: response.text });
    } catch (err: any) {
      console.error("Gemini API Error:", err);
      res.status(500).json({ error: err.message || "حدث خطأ أثناء معالجة الطلب عبر المعلم الذكي." });
    }
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", app: "Be7ery Fiber Academy", hashtag: "#be7ery" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Be7ery Fiber Academy running on http://localhost:${PORT}`);
  });
}

startServer();

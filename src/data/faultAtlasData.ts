import { FaultItem } from '../types';

export const FAULT_ATLAS_ITEMS: FaultItem[] = [
  {
    id: 'fault-bubble',
    title: 'فقاعة هواء داخل اللحام (Bubble / Void Defect)',
    category: 'splicing',
    symptoms: 'فقد عالي جداً في نقطة اللحام يصل لـ 0.5 - 2.0 dB، وتظهر نقطة سوداء ملتهبة داخل مركز اللحام بشاشة ماكينة Fusion Splicer.',
    cause: 'وجود أتربة ورطوبة على زجاج الشعيرة بسبب تخطي مسح الكحول الإيزوبروبيلي قبل القطع، أو بسبب عدم معايرة شرارة الماكينة (Arc Calibration).',
    prevention: 'المسح الكحولي الفوري للكابل بعد التقشير وقبل القطع بالقاطعة (Cleaver)، وعمل Arc Calibration يومياً للماكينة.',
    remedy: 'قص حتة اللحام بالكامل (Cut back)، إعادة التقشير والمسح للكحول بشكل معقم، ثم إعادة اللحام.',
    wizardQuote: 'لما تشوف فقاعة الهوا يا هندسة اعرف إنك استعجلت وما مسحتش بالكحول كويس.. اقطع وعيد من جديد! #be7ery',
    visualType: 'bubble',
    severity: 'high'
  },
  {
    id: 'fault-offset',
    title: 'عدم محاذاة المحاور (Offset Alignment Error)',
    category: 'splicing',
    symptoms: 'انزياح رأس الشعيرتين عن بعضهما البعض (Core Mismatch) بنسبة تزيد عن 0.5 ميكرومتر وفقد يتجاوز 0.2 dB.',
    cause: 'وجود بقايا أتربة في مجاري V-Groove في ماكينة اللحام، أو ثني الكابل أثناء إطلاق الشرارة.',
    prevention: 'تنظيف مجاري V-Grooves بفرشاة معقمة وكحول، وضبط أذرع الماكينة.',
    remedy: 'إعادة تنظيف مجرى الـ V-Groove وإعادة عملية اللحام تلقائياً.',
    wizardQuote: 'النظافة مش بس للشعيرة.. مجاري الـ V-Grooves في الماكينة محتاجة نظافة يومية عشان النواة تتطابق 100%! #be7ery',
    visualType: 'offset',
    severity: 'medium'
  },
  {
    id: 'fault-fat-splice',
    title: 'لحام سميك أو مشوه (Fat / Bulging Splice)',
    category: 'splicing',
    symptoms: 'انتفاخ ملحوظ في قطر اللحام يتجاوز 135 ميكرومتر، وفقد متغير يسبب ضغطاً ميكانيكياً.',
    cause: 'قوة الدفع الميكانيكي (Overlap/Push) زائدة عن الحد أثناء تفاعل الشرارة الكهربائية.',
    prevention: 'إعادة ضبط إعدادات برنامج الماكينة على نمط SMF Standard.',
    remedy: 'قص نقطة اللحام وإعادة ضبط برنامج ماكينة اللحام.',
    wizardQuote: 'اللحام التخين بيبان شكله مشوه وبيبقى حساس للكسر جوة المخبز الحراري! #be7ery',
    visualType: 'fat',
    severity: 'medium'
  },
  {
    id: 'fault-macrobend',
    title: 'انثناء حاد في الكابل (Macro-bend Defect)',
    category: 'splicing',
    symptoms: 'فقد مرتفع يظهر بشكل أوضح بكثير عند الطول الموجي 1550nm (فقد يصل لـ 3-8 dB) مقارنة بـ 1310nm.',
    cause: 'ثني الكابل بنصف قطر أقل من المسموح (Micro/Macro Bending) داخل الكبسولة أو العلبة.',
    prevention: 'الالتزام بنصف قطر الانثناء القياسي R >= 30mm أثناء ترتيب الشعيرات (Trays).',
    remedy: 'فك الشعيرة وإعادة ترتيبها داخل الـ Tray بدون أي زوايا حادة.',
    wizardQuote: 'الانثناء الحاد بيخلي الضوء يهرب برة الغلاف.. لو لقيت الفقد عالي في 1550 نانومتر اعرف إنه انثناء حاد فوراً! #be7ery',
    visualType: 'macrobend',
    severity: 'high'
  },
  {
    id: 'fault-dust',
    title: 'تلوث وجه الموصل المكون بالتراب (Dirty Connector End-face)',
    category: 'connector',
    symptoms: 'نبضة انعكاسية غير منتظمة (High Reflectance Spike) وفقد يزيد عن 1.5 dB في الموصل.',
    cause: 'ترك الموصل بدون غطاء الحماية البلاستيكي (Dust Cap) أو لمس الرأس بالأصابع.',
    prevention: 'تركيب أغطية الحماية دائماً واستخدام قلم التنظيف المخصص (One-Click Cleaner).',
    remedy: 'تنظيف وجه الموصل بقلم التنظيف أو كاسيت التنظيف الجاف قبل التوصيل.',
    wizardQuote: 'بصمة صباعك على الموصل بتعمل طبقة زيتها يمنع مرور الضوء! ما تلمسش رأس الـ Ferrule أبداً! #be7ery',
    visualType: 'dust',
    severity: 'low'
  },
  {
    id: 'fault-fibercut',
    title: 'انقاطاع الكابل الكلي (Fiber Cut / Sudden Drop)',
    category: 'cable',
    symptoms: 'اختفاء الإشارة تماماً (-40 dBm)، وظهور نبضة انعكاسية حادة ثم خط رأسي يليه ضوضاء على OTDR.',
    cause: 'حفريات الطرق بدون التنسيق، أو انقطاع الكابل جراء الشد الزائد أثناء السحب.',
    prevention: 'الالتزام بقواعد الشد والتوثيق الميداني ودعم الكابل بالمواسير المقواة (HDPE Conduit).',
    remedy: 'تحديد موقع القطع بالدقة بالمتر عبر OTDR، وتثبيت كبسولة لحام صيانة جديدة (Repair Closure).',
    wizardQuote: 'لما الـ OTDR يدينا قطع.. بنحدد المسافة بالمتر وننزل الميدان ونصلح بجدية السحر والخبرة! #be7ery',
    visualType: 'fibercut',
    severity: 'critical'
  }
];

import { CommunityPost } from '../types';

export const INITIAL_COMMUNITY_POSTS: CommunityPost[] = [
  {
    id: 'post-1',
    authorName: 'المهندس عبد الغفار بحيري',
    authorRole: 'Project Coordinator & FTTH Lead',
    authorAvatar: '/src/assets/images/behery_personal_avatar_1786200926785.jpg',
    title: 'سر نجاح لحام كابلات الـ Drop في الميدان الصعب!',
    content: 'يا شباب، كتير منكم بيشتكي من كسر الشعيرة جوة القاطع (Cleaver) أثناء تجهيز كابل الـ Drop المقوى. السر في التقشير السليم بدون تجريح للطبقة الزجاجية، وتثبيت الكابل في الممسك المخصص (Drop Holder). وافتكروا دايماً: النظافة بالكحول قبل القطع مش بعده! #be7ery',
    hashtag: '#be7ery',
    timestamp: 'تحديث ميداني',
    likes: 142,
    commentsCount: 28,
    tags: ['Splicing', 'DropCable', 'FieldTips'],
    solved: true
  },
  {
    id: 'post-2',
    authorName: 'المهندس عبد الغفار بحيري',
    authorRole: 'Project Coordinator & FTTH Lead',
    authorAvatar: '/src/assets/images/behery_personal_avatar_1786200926785.jpg',
    title: 'معالجة انثناء الألياف (Macro-bend) وحل مشكلة الفقد العالي عند 1550nm',
    content: 'عند وجود قراءة -29 dBm على طول موجي 1550nm بينما القراءة -21 dBm على 1310nm، السبب الميداني الشائع هو وجود انثناء حاد (Macro-bend) للشعيرة داخل كاسيت العلبة. بمجرد تعديل مسار الشعيرة واستقامتها تتحسن القراءة فوراً إلى -19.5 dBm على الترددين! #be7ery',
    hashtag: '#be7ery',
    timestamp: 'تحديث ميداني',
    likes: 118,
    commentsCount: 19,
    tags: ['OTDR', 'MacroBend', 'Troubleshooting'],
    solved: true
  },
  {
    id: 'post-3',
    authorName: 'المهندس عبد الغفار بحيري',
    authorRole: 'Project Coordinator & FTTH Lead',
    authorAvatar: '/src/assets/images/behery_personal_avatar_1786200926785.jpg',
    title: 'توجيهات تنظيف موصلات SC/APC في كبائن الشوارع الترابية',
    content: 'لتنظيف موصلات SC/APC الخضراء بفاعلية في بيئة الموقع الترابية، استخدم قلم التنظيف السريع (One-click cleaner) مع الضغط الخفيف حتى تسمع صوت الكليك، وتجنب إعادة استخدام الشريط المتسخ. الحفاظ على النظافة يمنع الفقد الضوئي وحروق نهايات الليزر! #be7ery',
    hashtag: '#be7ery',
    timestamp: 'تحديث ميداني',
    likes: 95,
    commentsCount: 12,
    tags: ['Cleaning', 'SC_APC', 'Connectors'],
    solved: true
  }
];


import React, { useState } from 'react';
import { INITIAL_COMMUNITY_POSTS } from '../data/communityData';
import { CommunityPost } from '../types';
import { Users, Heart, MessageSquare, Plus, CheckCircle2, Tag, Share2, Sparkles } from 'lucide-react';

export const CommunitySection: React.FC = () => {
  const [posts, setPosts] = useState<CommunityPost[]>(INITIAL_COMMUNITY_POSTS);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  const handleLike = (id: string) => {
    setPosts(
      posts.map((p) => (p.id === id ? { ...p, likes: p.likes + 1 } : p))
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      authorName: 'المهندس عبد الغفار بحيري',
      authorRole: 'Project Coordinator & FTTH Lead',
      authorAvatar: '/src/assets/images/behery_personal_avatar_1786200926785.jpg',
      title: newTitle,
      content: newContent,
      hashtag: '#be7ery',
      timestamp: 'الآن',
      likes: 1,
      commentsCount: 0,
      tags: ['Midan', 'FTTH'],
    };

    setPosts([newPost, ...posts]);
    setNewTitle('');
    setNewContent('');
    setShowNewPostForm(false);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-indigo-500/30 rounded-3xl p-6 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-950 text-indigo-300 rounded-full text-xs font-bold border border-indigo-500/30">
            <Users className="w-4 h-4 text-indigo-400" />
            <span>مجتمع المهندسين والفنيين • #be7ery</span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">
            ملتقى الخبرات الميدانية #be7ery
          </h2>
          <p className="text-slate-300 text-sm">
            تبادل استفسارات الموقع، حلول المشكلات المعقدة، وأفضل الممارسات مع الـ FTTH Wizard ونخبة الفنيين.
          </p>
        </div>

        <button
          onClick={() => setShowNewPostForm(!showNewPostForm)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-400 hover:to-blue-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all"
        >
          <Plus className="w-4 h-4" />
          مشاركة منشور / استفسار
        </button>
      </div>

      {/* New Post Form Drawer */}
      {showNewPostForm && (
        <form onSubmit={handleCreatePost} className="bg-slate-950 border border-indigo-500/40 p-5 rounded-3xl space-y-4 animate-in fade-in">
          <h3 className="text-sm font-bold text-indigo-300">إضافة منشور جديد لمجتمع #be7ery</h3>
          
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="عنوان المنشور أو السؤال الميداني..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:border-indigo-400 outline-none font-bold"
          />

          <textarea
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            rows={3}
            placeholder="اكتب التفاصيل والموقع ونتائج القياسات هنا..."
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-xs text-white placeholder-slate-500 focus:border-indigo-400 outline-none"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowNewPostForm(false)}
              className="px-4 py-2 bg-slate-800 text-slate-300 text-xs rounded-xl font-bold"
            >
              إلغاء
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-indigo-600 text-white text-xs font-bold rounded-xl shadow"
            >
              نشر المنشور (#be7ery)
            </button>
          </div>
        </form>
      )}

      {/* Posts List */}
      <div className="space-y-4">
        {posts.map((p) => (
          <div key={p.id} className="bg-slate-900 border border-slate-800 hover:border-indigo-500/40 rounded-3xl p-6 space-y-4 transition-all shadow-xl">
            
            {/* Author info */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={p.authorAvatar}
                  alt={p.authorName}
                  className="w-10 h-10 rounded-xl object-cover border border-indigo-400"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="font-bold text-white text-sm flex items-center gap-2">
                    <span>{p.authorName}</span>
                    {p.solved && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                        محلول ✓
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-400">{p.authorRole} • {p.timestamp}</div>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-500/30 text-xs font-black font-mono">
                {p.hashtag}
              </span>
            </div>

            {/* Title & Body */}
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white">{p.title}</h3>
              <p className="text-xs text-slate-300 leading-relaxed whitespace-pre-line">{p.content}</p>
            </div>

            {/* Tags & Action buttons */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                {p.tags.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded-lg bg-slate-950 text-slate-400 text-[10px]">
                    #{t}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLike(p.id)}
                  className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 font-bold transition-all"
                >
                  <Heart className="w-4 h-4 fill-rose-500/20" />
                  <span>{p.likes}</span>
                </button>

                <div className="flex items-center gap-1.5 text-slate-400 font-bold">
                  <MessageSquare className="w-4 h-4" />
                  <span>{p.commentsCount}</span>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};

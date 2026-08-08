/**
 * Be7ery Fiber Academy - Main App Component
 * #be7ery • The FTTH Wizard Educational Platform
 */

import React, { useState } from 'react';
import { UserRole } from './types';
import { Navbar } from './components/Navbar';
import { WizardBanner } from './components/WizardBanner';
import { CurriculumViewer } from './components/CurriculumViewer';
import { SplicingLab } from './components/SplicingLab';
import { OtdrAnalyzer } from './components/OtdrAnalyzer';
import { LinkBudgetCalculator } from './components/LinkBudgetCalculator';
import { FaultAtlas } from './components/FaultAtlas';
import { WizardCertificate } from './components/WizardCertificate';
import { CommunitySection } from './components/CommunitySection';
import { AiMentorModal } from './components/AiMentorModal';
import { BeheryProfileModal } from './components/BeheryProfileModal';
import { Zap, Heart, Shield, Phone, Briefcase } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [userRole, setUserRole] = useState<UserRole>('apprentice');
  const [wizardXp, setWizardXp] = useState<number>(350);
  const [isAiMentorOpen, setIsAiMentorOpen] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [profileModalTab, setProfileModalTab] = useState<'card' | 'wizard' | 'tech' | 'logo'>('card');

  const addXp = (amount: number) => {
    setWizardXp((prev) => prev + amount);
  };

  const openProfileModal = (tab: 'card' | 'wizard' | 'tech' | 'logo' = 'card') => {
    setProfileModalTab(tab);
    setIsProfileModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans dir-rtl antialiased flex flex-col selection:bg-orange-500 selection:text-slate-950">
      
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        userRole={userRole}
        setUserRole={setUserRole}
        wizardXp={wizardXp}
        openAiMentor={() => setIsAiMentorOpen(true)}
        openProfileModal={openProfileModal}
      />

      {/* Main Content Area */}
      <main className="flex-1 space-y-8 pb-16">
        
        {/* Hero Banner visible on home or first entry */}
        {activeTab === 'home' && (
          <WizardBanner
            userRole={userRole}
            setUserRole={setUserRole}
            setActiveTab={setActiveTab}
            openAiMentor={() => setIsAiMentorOpen(true)}
            openProfileModal={openProfileModal}
          />
        )}

        {/* Tab views */}
        <div className="max-w-7xl mx-auto px-2 sm:px-4">
          {activeTab === 'home' && (
            <CurriculumViewer addXp={addXp} openAiMentor={() => setIsAiMentorOpen(true)} />
          )}

          {activeTab === 'lab' && <SplicingLab addXp={addXp} />}

          {activeTab === 'otdr' && <OtdrAnalyzer addXp={addXp} />}

          {activeTab === 'calculator' && <LinkBudgetCalculator addXp={addXp} />}

          {activeTab === 'atlas' && <FaultAtlas />}

          {activeTab === 'community' && <CommunitySection />}

          {activeTab === 'cert' && <WizardCertificate wizardXp={wizardXp} />}
        </div>

      </main>

      {/* AI Assistant Drawer Modal */}
      <AiMentorModal
        isOpen={isAiMentorOpen}
        onClose={() => setIsAiMentorOpen(false)}
        userRole={userRole}
      />

      {/* Behery Profile & Business Card Modal */}
      <BeheryProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        defaultTab={profileModalTab}
      />

      {/* Global Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-950 rounded-xl border border-orange-500/30 text-orange-400">
              <Zap className="w-5 h-5 fill-orange-500" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">Be7ery Fiber Academy</div>
              <p className="text-[11px] text-slate-500">
                المنصة التعليمية الشاملة لشبكات الألياف الضوئية • المهندس عبد الغفار بحيري • Afro Group
              </p>
            </div>
          </div>

          <div 
            onClick={() => openProfileModal('card')}
            className="flex items-center gap-2 font-mono text-orange-400 font-black text-sm bg-orange-500/10 px-4 py-1.5 rounded-full border border-orange-500/30 cursor-pointer hover:bg-orange-500/20 transition-all"
          >
            <span>#be7ery</span>
            <span className="text-slate-600">•</span>
            <span className="text-white">The FTTH Wizard</span>
            <span className="text-[10px] text-orange-300 font-normal underline">(تواصل مباشر)</span>
          </div>

          <div className="text-center sm:text-left text-slate-500 text-[11px]">
            جميع الحقوق محفوظة © {new Date().getFullYear()} • "الألياف مش سلك.. الألياف نظافة ونظام"
          </div>
        </div>
      </footer>

    </div>
  );
}

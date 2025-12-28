
import React, { useState, useCallback, useEffect } from 'react';
import { ViewState } from './types';
import { PLANS, HOW_IT_WORKS } from './constants';
import PlanCard from './components/PlanCard';
import StepItem from './components/StepItem';
import { getPlanRecommendation } from './services/geminiService';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('how-it-works');
  const [aiInput, setAiInput] = useState('');
  const [aiResult, setAiResult] = useState<{ recommendedPlanId: string; reason: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleAiConsult = async () => {
    if (!aiInput.trim()) return;
    setIsLoading(true);
    try {
      const result = await getPlanRecommendation(aiInput);
      setAiResult(result);
    } catch (error) {
      alert("Consultation failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 flex flex-col relative overflow-x-hidden">
      {/* Header */}
      <header className="px-6 pt-8 pb-4 bg-slate-50 sticky top-0 z-10">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">S</div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">SwiftPOS</h1>
          </div>
          <button className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
             <svg className="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-6 pb-24 overflow-y-auto no-scrollbar">
        {currentView === 'how-it-works' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Ready to sell?</h2>
              <p className="text-slate-500">Streamline your business operations in 4 simple steps.</p>
            </div>
            
            <div className="space-y-4 mb-8">
              {HOW_IT_WORKS.map((step) => (
                <StepItem key={step.id} step={step} />
              ))}
            </div>

            <div className="bg-indigo-600 rounded-3xl p-6 text-white overflow-hidden relative">
              <div className="relative z-10">
                <h3 className="text-lg font-bold mb-2">Mobile First POS</h3>
                <p className="text-indigo-100 text-sm mb-4 leading-relaxed">Turn your smartphone into a powerful register. No bulky hardware required.</p>
                <button 
                   onClick={() => setCurrentView('pricing')}
                   className="px-4 py-2 bg-white text-indigo-600 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-indigo-50 transition-colors">
                  View Plans
                </button>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500 rounded-full opacity-50 blur-2xl"></div>
            </div>
          </div>
        )}

        {currentView === 'pricing' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="mb-8 text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Simple Pricing</h2>
              <p className="text-slate-500">Choose the plan that fits your growth.</p>
            </div>
            
            <div className="space-y-6">
              {PLANS.map((plan) => (
                <PlanCard key={plan.id} plan={plan} />
              ))}
            </div>
          </div>
        )}

        {currentView === 'ai-helper' && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-slate-900 mb-2">AI Consultant</h2>
              <p className="text-slate-500">Not sure which plan is right? Tell our AI about your business.</p>
            </div>

            <div className="space-y-6">
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
                <label className="block text-sm font-semibold text-slate-700 mb-2">Describe your business</label>
                <textarea 
                  value={aiInput}
                  onChange={(e) => setAiInput(e.target.value)}
                  placeholder="e.g. I run a local bakery with 3 staff members, doing about 50 transactions a day..."
                  className="w-full h-32 p-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 resize-none text-slate-900 text-sm placeholder:text-slate-400"
                />
                <button 
                  onClick={handleAiConsult}
                  disabled={isLoading || !aiInput}
                  className="w-full mt-4 py-4 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-colors disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                      Find My Plan
                    </>
                  )}
                </button>
              </div>

              {aiResult && (
                <div className="bg-white p-6 rounded-3xl border-2 border-indigo-600 shadow-lg animate-in fade-in zoom-in-95 duration-300">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded">RECCOMENDATION</span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    {aiResult.recommendedPlanId}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">
                    {aiResult.reason}
                  </p>
                  <button 
                    onClick={() => setCurrentView('pricing')}
                    className="w-full py-3 bg-slate-900 text-white rounded-xl font-semibold text-sm">
                    View Plan Details
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-md border-t border-slate-100 px-6 py-4 flex justify-between items-center z-20">
        <NavButton 
          active={currentView === 'how-it-works'} 
          onClick={() => setCurrentView('how-it-works')}
          label="Guide"
          icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>}
        />
        <NavButton 
          active={currentView === 'pricing'} 
          onClick={() => setCurrentView('pricing')}
          label="Plans"
          icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
        />
        <NavButton 
          active={currentView === 'ai-helper'} 
          onClick={() => setCurrentView('ai-helper')}
          label="AI Helper"
          icon={<svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
        />
      </nav>
    </div>
  );
};

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: React.ReactNode;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, label, icon }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center gap-1 transition-all duration-300 ${active ? 'text-indigo-600' : 'text-slate-400'}`}
  >
    <div className={`p-1 rounded-lg transition-colors ${active ? 'bg-indigo-50' : ''}`}>
      {icon}
    </div>
    <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
  </button>
);

export default App;

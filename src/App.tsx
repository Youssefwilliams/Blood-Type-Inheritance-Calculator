import { useState, useMemo, useEffect } from 'react';
import { Sparkles, Dna, RotateCcw, HeartPulse, Printer, Sun, Moon } from 'lucide-react';
import { ParentState, Language } from './types';
import { calculateGenetics } from './utils/genetics';
import { translations } from './utils/translations';
import LanguageSelector from './components/LanguageSelector';
import BloodSelectorCard from './components/BloodSelectorCard';
import OffspringChart from './components/OffspringChart';
import PunnettSquareView from './components/PunnettSquareView';
import RhIncompatibilityWarning from './components/RhIncompatibilityWarning';
import EducationalGuide from './components/EducationalGuide';
import HistoricalCulturalHub from './components/HistoricalCulturalHub';
import PrintableReport from './components/PrintableReport';

export default function App() {
  const [language, setLanguage] = useState<Language>('ar');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('blood_group_theme');
    return (saved as 'light' | 'dark') || 'light';
  });

  useEffect(() => {
    localStorage.setItem('blood_group_theme', theme);
  }, [theme]);

  // Default Parent State (O+ and O+)
  const defaultFatherState: ParentState = {
    abo: 'O',
    rh: '+',
    aboGenotype: 'unknown',
    rhGenotype: 'unknown',
  };

  const defaultMotherState: ParentState = {
    abo: 'O',
    rh: '+',
    aboGenotype: 'unknown',
    rhGenotype: 'unknown',
  };

  const [father, setFather] = useState<ParentState>(defaultFatherState);
  const [mother, setMother] = useState<ParentState>(defaultMotherState);

  const t = useMemo(() => translations[language], [language]);
  const isRtl = language === 'ar';

  const geneticResults = useMemo(() => {
    return calculateGenetics(father, mother);
  }, [father, mother]);

  const handleReset = () => {
    setFather(defaultFatherState);
    setMother(defaultMotherState);
  };

  const updateFather = (updated: Partial<ParentState>) => {
    const nextFather = { ...father, ...updated };
    if (updated.abo && updated.abo !== father.abo) {
      nextFather.aboGenotype = 'unknown';
    }
    if (updated.rh && updated.rh !== father.rh) {
      nextFather.rhGenotype = 'unknown';
    }
    setFather(nextFather);
  };

  const updateMother = (updated: Partial<ParentState>) => {
    const nextMother = { ...mother, ...updated };
    if (updated.abo && updated.abo !== mother.abo) {
      nextMother.aboGenotype = 'unknown';
    }
    if (updated.rh && updated.rh !== mother.rh) {
      nextMother.rhGenotype = 'unknown';
    }
    setMother(nextMother);
  };

  return (
    <>
      <div
        id="app-root-container"
        dir={isRtl ? 'rtl' : 'ltr'}
        className={`min-h-screen font-sans transition-all duration-300 pb-16 ${
          theme === 'dark' ? 'dark bg-slate-950 text-slate-100' : 'bg-[#F3F4F6] text-slate-900'
        }`}
      >
      {/* 1. Header Navigation Bar (Minimal Bento Bar) */}
      <header
        id="main-header"
        className={`border-b sticky top-0 z-40 backdrop-blur-md transition-all duration-300 ${
          theme === 'dark' ? 'border-slate-900 bg-slate-900/95 text-slate-100' : 'border-slate-200/80 bg-white/95 text-slate-900'
        }`}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-rose-500 to-red-600 flex items-center justify-center text-white shadow-xs">
              <HeartPulse className="w-5 h-5" />
            </div>
            <div>
              <h1
                id="brand-title"
                className={`text-sm sm:text-base font-black tracking-tight flex items-center gap-1.5 leading-none transition-colors ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}
              >
                {t.title}
                <Sparkles className="w-4 h-4 text-amber-500 fill-current" />
              </h1>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block mt-1">
                {isRtl ? 'علم وراثة فصائل الدم' : 'Mendelian Blood Genetics'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              id="theme-toggle-btn"
              onClick={() => setTheme(prev => prev === 'dark' ? 'light' : 'dark')}
              className={`p-2.5 rounded-xl border cursor-pointer transition-all flex items-center justify-center active:scale-95 ${
                theme === 'dark'
                  ? 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800'
                  : 'border-slate-200 bg-white text-slate-500 hover:text-slate-900 hover:bg-slate-50'
              }`}
              aria-label="Toggle Theme"
              title={theme === 'dark' ? t.lightTheme : t.darkTheme}
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-500 fill-current" />
              ) : (
                <Moon className="w-4 h-4 text-indigo-600 fill-current" />
              )}
            </button>
            <LanguageSelector currentLanguage={language} onLanguageChange={setLanguage} />
          </div>
        </div>
      </header>

      {/* 2. Main Bento Layout Wrapper */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6 sm:space-y-8">
        
        {/* Hero Title Deck Cell */}
        <div className={`rounded-[2rem] p-6 sm:p-8 text-center max-w-lg sm:max-w-none mx-auto space-y-3 relative overflow-hidden border transition-all duration-300 ${
          theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
        }`}>
          {/* Subtle grid decorative background */}
          <div className={`absolute inset-0 [background-size:16px_16px] opacity-60 pointer-events-none ${
            theme === 'dark' ? 'bg-[radial-gradient(#1e293b_1px,transparent_1px)]' : 'bg-[radial-gradient(#e2e8f0_1px,transparent_1px)]'
          }`} />
          
          <div className={`relative z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest ${
            theme === 'dark' ? 'bg-rose-950/40 text-rose-400 border border-rose-900/35' : 'bg-rose-50 text-rose-600'
          }`}>
            <Dna className="w-3.5 h-3.5 animate-spin-slow" />
            {isRtl ? 'حساب الاحتمالات الوراثية' : 'Genotype Cross Mechanism'}
          </div>
          <h2 id="hero-subtitle" className={`relative z-10 text-xl sm:text-2xl md:text-3xl font-black tracking-tight leading-tight ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            {t.subtitle}
          </h2>
        </div>

        {/* 3. Double Input Bento Dashboard Cells */}
        <div id="parents-config-grid" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BloodSelectorCard
            idPrefix="father-card"
            role="father"
            state={father}
            onChange={updateFather}
            t={t}
            theme={theme}
          />
          <BloodSelectorCard
            idPrefix="mother-card"
            role="mother"
            state={mother}
            onChange={updateMother}
            t={t}
            theme={theme}
          />
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap justify-center gap-4" id="action-belt">
          <button
            id="reset-state-btn"
            onClick={handleReset}
            className={`inline-flex items-center gap-2 py-3 px-6 text-xs font-black uppercase tracking-widest rounded-full border transition-all active:scale-95 cursor-pointer shadow-3xs ${
              theme === 'dark'
                ? 'border-slate-800 bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800/80 hover:border-slate-700'
                : 'border-slate-200 bg-white text-slate-500 hover:text-slate-950 hover:bg-slate-50 hover:border-slate-300'
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            {t.reset}
          </button>

          <button
            id="export-pdf-btn"
            onClick={() => window.print()}
            className={`inline-flex items-center gap-2 py-3 px-6 text-xs font-black uppercase tracking-widest rounded-full border border-transparent shadow-sm cursor-pointer transition-all active:scale-95 ${
              theme === 'dark'
                ? 'bg-rose-600 text-white hover:bg-rose-500 shadow-rose-950/20'
                : 'bg-slate-900 text-white hover:bg-slate-850 shadow-slate-950/20'
            }`}
          >
            <Printer className="w-4 h-4" />
            {t.exportPDF}
          </button>
        </div>

        {/* 4. Cross Outcome Bento Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch" id="results-and-diagrams-grid">
          {/* Offspring Probability and Warnings Panel (Left: 7 columns) */}
          <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
            <OffspringChart
              phenotypes={geneticResults.phenotypes}
              t={t}
              theme={theme}
              father={father}
              mother={mother}
              language={language}
            />
            
            <RhIncompatibilityWarning
              fatherABO={father.abo}
              motherABO={mother.abo}
              fatherRh={father.rh}
              motherRh={mother.rh}
              t={t}
              theme={theme}
            />
          </div>

          {/* Interactive Punnett Grid (Right: 5 columns) */}
          <div className="lg:col-span-5">
            <PunnettSquareView
              aboGrids={geneticResults.aboGrids}
              rhGrids={geneticResults.rhGrids}
              t={t}
              isRtl={isRtl}
              theme={theme}
            />
          </div>
        </div>

        {/* 5. Dark Bento Education Deck */}
        <section id="educational-reference-deck" className="space-y-6 sm:space-y-8">
          <EducationalGuide t={t} father={father} mother={mother} language={language} />
          <HistoricalCulturalHub t={t} isRtl={isRtl} theme={theme} />
        </section>
      </main>

      {/* 6. Legal / Clinical Disclaimer Footer */}
      <footer id="app-footer" className="max-w-6xl mx-auto px-4 sm:px-6 mt-12 text-center text-slate-400 font-bold text-[11px]">
        <div className={`rounded-[1.5rem] border py-5 px-6 flex flex-col sm:flex-row items-center justify-between gap-4 transition-all duration-300 ${
          theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
        }`}>
          <span>
            {language === 'ar'
              ? 'تطبيق تعليمي مبني على قوانين مندل الوراثية المستقلة. لأغراض المعرفة فقط.'
              : 'Educational simulation application based on Mendelian Independent Assortment laws. For reference only.'}
          </span>
          <span>
            {language === 'ar'
              ? '٢٠٢٦ حاسبة فصائل الدم'
              : '2026 Blood Type Inheritance Calculator'}
          </span>
        </div>
      </footer>
      </div>

      <PrintableReport
        father={father}
        mother={mother}
        phenotypes={geneticResults.phenotypes}
        t={t}
        isRtl={isRtl}
      />
    </>
  );
}

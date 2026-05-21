import { useState, useMemo } from 'react';
import { BookOpen, HelpCircle, Users, Save, CheckCircle2, AlertTriangle, ArrowDown, Network, Sparkles, Check } from 'lucide-react';
import { TranslationDict, ParentState, PhenotypeABO, PhenotypeRh } from '../types';
import { calculateGenetics } from '../utils/genetics';

interface EducationalGuideProps {
  t: TranslationDict;
  father: ParentState;
  mother: ParentState;
}

export default function EducationalGuide({ t, father, mother }: EducationalGuideProps) {
  const isAr = t.alleleSymbol === 'أليل';

  // 1. Initial local state for the 4 grandparents loaded from localStorage or standard fallbacks
  const [patGfAbo, setPatGfAbo] = useState<PhenotypeABO>(() => {
    const saved = localStorage.getItem('blood_tree_pat_gf_abo');
    return (saved as PhenotypeABO) || 'A';
  });
  const [patGfRh, setPatGfRh] = useState<PhenotypeRh>(() => {
    const saved = localStorage.getItem('blood_tree_pat_gf_rh');
    return (saved as PhenotypeRh) || '+';
  });

  const [patGmAbo, setPatGmAbo] = useState<PhenotypeABO>(() => {
    const saved = localStorage.getItem('blood_tree_pat_gm_abo');
    return (saved as PhenotypeABO) || 'B';
  });
  const [patGmRh, setPatGmRh] = useState<PhenotypeRh>(() => {
    const saved = localStorage.getItem('blood_tree_pat_gm_rh');
    return (saved as PhenotypeRh) || '+';
  });

  const [matGfAbo, setMatGfAbo] = useState<PhenotypeABO>(() => {
    const saved = localStorage.getItem('blood_tree_mat_gf_abo');
    return (saved as PhenotypeABO) || 'O';
  });
  const [matGfRh, setMatGfRh] = useState<PhenotypeRh>(() => {
    const saved = localStorage.getItem('blood_tree_mat_gf_rh');
    return (saved as PhenotypeRh) || '+';
  });

  const [matGmAbo, setMatGmAbo] = useState<PhenotypeABO>(() => {
    const saved = localStorage.getItem('blood_tree_mat_gm_abo');
    return (saved as PhenotypeABO) || 'AB';
  });
  const [matGmRh, setMatGmRh] = useState<PhenotypeRh>(() => {
    const saved = localStorage.getItem('blood_tree_mat_gm_rh');
    return (saved as PhenotypeRh) || '+';
  });

  const [savedFeedback, setSavedFeedback] = useState(false);

  // 2. Persistent storage trigger
  const handleSaveTree = () => {
    localStorage.setItem('blood_tree_pat_gf_abo', patGfAbo);
    localStorage.setItem('blood_tree_pat_gf_rh', patGfRh);
    localStorage.setItem('blood_tree_pat_gm_abo', patGmAbo);
    localStorage.setItem('blood_tree_pat_gm_rh', patGmRh);
    localStorage.setItem('blood_tree_mat_gf_abo', matGfAbo);
    localStorage.setItem('blood_tree_mat_gf_rh', matGfRh);
    localStorage.setItem('blood_tree_mat_gm_abo', matGmAbo);
    localStorage.setItem('blood_tree_mat_gm_rh', matGmRh);

    setSavedFeedback(true);
    setTimeout(() => {
      setSavedFeedback(false);
    }, 4000);
  };

  // 3. Perform genetics crosses between Grandparents to verify feasibility with Father and Mother
  const paternalCross = useMemo(() => {
    return calculateGenetics(
      { abo: patGfAbo, rh: patGfRh, aboGenotype: 'unknown', rhGenotype: 'unknown' },
      { abo: patGmAbo, rh: patGmRh, aboGenotype: 'unknown', rhGenotype: 'unknown' }
    );
  }, [patGfAbo, patGfRh, patGmAbo, patGmRh]);

  const maternalCross = useMemo(() => {
    return calculateGenetics(
      { abo: matGfAbo, rh: matGfRh, aboGenotype: 'unknown', rhGenotype: 'unknown' },
      { abo: matGmAbo, rh: matGmRh, aboGenotype: 'unknown', rhGenotype: 'unknown' }
    );
  }, [matGfAbo, matGfRh, matGmAbo, matGmRh]);

  // Is Parent's actual blood type possible from entered grandparent profiles?
  const isFatherConsistent = useMemo(() => {
    return paternalCross.phenotypes.some(
      (p) => p.abo === father.abo && p.rh === father.rh
    );
  }, [paternalCross, father]);

  const isMotherConsistent = useMemo(() => {
    return maternalCross.phenotypes.some(
      (p) => p.abo === mother.abo && p.rh === mother.rh
    );
  }, [maternalCross, mother]);

  const aboOptions: PhenotypeABO[] = ['A', 'B', 'AB', 'O'];
  const rhOptions: PhenotypeRh[] = ['+', '-'];

  return (
    <div id="educational-guide-container" className="bg-slate-950 text-white rounded-[2rem] p-6 sm:p-8 space-y-8 relative overflow-hidden">
      {/* Visual background atmospheric effects */}
      <div className="absolute -bottom-12 -left-12 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -top-12 -right-12 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex items-center gap-3.5 pb-5 border-b border-slate-800 relative z-10">
        <span className="p-3 bg-white/10 text-white rounded-2xl shrink-0 shadow-sm">
          <BookOpen className="w-5 h-5" />
        </span>
        <div>
          <h3 id="edu-heading" className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
            {t.eduTitle}
          </h3>
          <p id="edu-subheading" className="text-xs text-slate-400 font-semibold mt-0.5">
            {t.eduSubtitle}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {/* ABO System */}
        <div id="edu-abo-section" className="space-y-2">
          <h4 className="text-sm font-extrabold text-white tracking-tight border-l-3 border-rose-500 pl-2.5">
            {t.eduAboTitle}
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {t.eduAboText}
          </p>
        </div>

        {/* Rh System */}
        <div id="edu-rh-section" className="space-y-2">
          <h4 className="text-sm font-extrabold text-white tracking-tight border-l-3 border-blue-500 pl-2.5">
            {t.eduRhTitle}
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {t.eduRhText}
          </p>
        </div>

        {/* Homozygous vs Heterozygous */}
        <div id="edu-homo-hetero-section" className="space-y-2">
          <h4 className="text-sm font-extrabold text-white tracking-tight border-l-3 border-emerald-500 pl-2.5">
            {t.eduHomoHeteroTitle}
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed font-medium">
            {t.eduHomoHeteroText}
          </p>
        </div>
      </div>

      {/* Structured Reference Table */}
      <div id="genetics-reference-table" className="border border-slate-800 rounded-2xl overflow-hidden mt-6 bg-slate-900/50 p-5 relative z-10">
        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
          <HelpCircle className="w-4 h-4 text-slate-500" />
          <span>{isAr ? 'خرائط جينات فصائل الدم (ABO + Rh)' : 'Blood group allele maps (ABO + Rh)'}</span>
        </div>
        
        <div className="overflow-x-auto text-xs text-slate-300">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-slate-500 font-bold uppercase text-[11px] tracking-wider">
                <th className="pb-2.5 font-bold text-slate-400">{t.offspringPhenotype}</th>
                <th className="pb-2.5 font-bold font-mono text-slate-400">{isAr ? 'الجينات المتاحة' : 'Possible Alleles'}</th>
                <th className="pb-2.5 font-bold text-slate-400">{isAr ? 'طبيعة السلوك' : 'Nature'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium font-semibold">
              <tr>
                <td className="py-2.5 font-bold text-rose-400">A</td>
                <td className="py-2.5 font-mono font-bold text-white">IᴬIᴬ, Iᴬi</td>
                <td className="py-2.5 text-slate-400">{isAr ? 'الجين A سائد تماماً على جين i المتنحي' : 'Iᴬ is Dominant over i'}</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-blue-400">B</td>
                <td className="py-2.5 font-mono font-bold text-white">IᴮIᴮ, Iᴮi</td>
                <td className="py-2.5 text-slate-400">{isAr ? 'الجين B سائد تماماً على جين i المتنحي' : 'Iᴮ is Dominant over i'}</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-purple-400">AB</td>
                <td className="py-2.5 font-mono font-bold text-white">IᴬIᴮ</td>
                <td className="py-2.5 text-slate-400">{isAr ? 'كلا الجينين سائدان معاً سائدة مشتركة' : 'Iᴬ and Iᴮ are Codominant'}</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-emerald-400">O</td>
                <td className="py-2.5 font-mono font-bold text-white">ii</td>
                <td className="py-2.5 text-slate-400">{isAr ? 'جين i متنحي نقي بالكامل' : 'i is purely Recessive'}</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-slate-300">Rh+</td>
                <td className="py-2.5 font-mono font-bold text-white">DD, Dd</td>
                <td className="py-2.5 text-slate-400">{isAr ? 'عامل موجب سائد (D)' : 'D allele is Dominant'}</td>
              </tr>
              <tr>
                <td className="py-2.5 font-bold text-slate-300">Rh-</td>
                <td className="py-2.5 font-mono font-bold text-white">dd</td>
                <td className="py-2.5 text-slate-400">{isAr ? 'عامل سالب متنحي نقي (dd)' : 'd allele is Recessive'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* NEW: Multi-Generational Family History Section */}
      <div id="family-history-deck" className="border border-slate-800 rounded-2xl bg-slate-900/40 p-5 sm:p-6 mt-6 space-y-6 relative z-10">
        
        {/* Title Block */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="p-2.5 bg-rose-500/10 text-rose-400 rounded-xl">
              <Users className="w-5 h-5" />
            </span>
            <div>
              <h4 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
                {t.familyHistorySectionTitle}
              </h4>
              <p className="text-[11px] text-slate-400 font-semibold mt-0.5 max-w-lg">
                {t.familyHistorySectionDesc}
              </p>
            </div>
          </div>

          <button
            onClick={handleSaveTree}
            className="inline-flex items-center gap-1.5 py-2 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-rose-600 hover:bg-rose-500 text-white cursor-pointer active:scale-95 transition-all self-start sm:self-center shrink-0"
          >
            <Save className="w-3.5 h-3.5" />
            <span>{t.saveHistoryBtnText}</span>
          </button>
        </div>

        {/* Feedback Alert toast */}
        {savedFeedback && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs py-3 px-4 rounded-xl flex items-center gap-2 animate-fade-in">
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-semibold">{t.historySavedToast}</span>
          </div>
        )}

        {/* Input selectors grid for the Grandparents */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* Paternal Grandfather */}
          <div className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-xl space-y-3">
            <span className="text-[10px] uppercase font-black text-slate-400 block tracking-wider">
              👴 {t.paternalGrandfatherName}
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">ABO</label>
                <select
                  value={patGfAbo}
                  onChange={(e) => setPatGfAbo(e.target.value as PhenotypeABO)}
                  className="w-full bg-slate-900 border border-slate-700 text-white text-xs font-bold p-1.5 rounded-md cursor-pointer focus:outline-hidden"
                >
                  {aboOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Rh</label>
                <select
                  value={patGfRh}
                  onChange={(e) => setPatGfRh(e.target.value as PhenotypeRh)}
                  className="w-full bg-slate-900 border border-slate-700 text-white text-xs font-bold p-1.5 rounded-md cursor-pointer focus:outline-hidden"
                >
                  {rhOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Paternal Grandmother */}
          <div className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-xl space-y-3">
            <span className="text-[10px] uppercase font-black text-slate-400 block tracking-wider">
              👵 {t.paternalGrandmotherName}
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">ABO</label>
                <select
                  value={patGmAbo}
                  onChange={(e) => setPatGmAbo(e.target.value as PhenotypeABO)}
                  className="w-full bg-slate-900 border border-slate-700 text-white text-xs font-bold p-1.5 rounded-md cursor-pointer focus:outline-hidden"
                >
                  {aboOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Rh</label>
                <select
                  value={patGmRh}
                  onChange={(e) => setPatGmRh(e.target.value as PhenotypeRh)}
                  className="w-full bg-slate-900 border border-slate-700 text-white text-xs font-bold p-1.5 rounded-md cursor-pointer focus:outline-hidden"
                >
                  {rhOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Maternal Grandfather */}
          <div className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-xl space-y-3">
            <span className="text-[10px] uppercase font-black text-slate-400 block tracking-wider">
              👴 {t.maternalGrandfatherName}
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">ABO</label>
                <select
                  value={matGfAbo}
                  onChange={(e) => setMatGfAbo(e.target.value as PhenotypeABO)}
                  className="w-full bg-slate-900 border border-slate-700 text-white text-xs font-bold p-1.5 rounded-md cursor-pointer focus:outline-hidden"
                >
                  {aboOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Rh</label>
                <select
                  value={matGfRh}
                  onChange={(e) => setMatGfRh(e.target.value as PhenotypeRh)}
                  className="w-full bg-slate-900 border border-slate-700 text-white text-xs font-bold p-1.5 rounded-md cursor-pointer focus:outline-hidden"
                >
                  {rhOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Maternal Grandmother */}
          <div className="bg-slate-950/80 border border-slate-800/80 p-4 rounded-xl space-y-3">
            <span className="text-[10px] uppercase font-black text-slate-400 block tracking-wider">
              👵 {t.maternalGrandmotherName}
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">ABO</label>
                <select
                  value={matGmAbo}
                  onChange={(e) => setMatGmAbo(e.target.value as PhenotypeABO)}
                  className="w-full bg-slate-900 border border-slate-700 text-white text-xs font-bold p-1.5 rounded-md cursor-pointer focus:outline-hidden"
                >
                  {aboOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Rh</label>
                <select
                  value={matGmRh}
                  onChange={(e) => setMatGmRh(e.target.value as PhenotypeRh)}
                  className="w-full bg-slate-900 border border-slate-700 text-white text-xs font-bold p-1.5 rounded-md cursor-pointer focus:outline-hidden"
                >
                  {rhOptions.map((opt) => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Multi-Generational Inheritance Map Structure */}
        <div className="border border-slate-800 rounded-2xl bg-slate-950/40 p-5 mt-6 space-y-6">
          <div className="flex items-center gap-1.5">
            <Network className="w-4 h-4 text-rose-400" />
            <span className="text-xs uppercase font-extrabold text-slate-300 tracking-wider">
              {t.multiGenMapTitle}
            </span>
          </div>

          <div className="flex flex-col space-y-6 relative">
            
            {/* Generation Tier 1: Grandparents (4 Columns) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
              {/* Paternal Grandfather */}
              <div className="bg-slate-900/40 border border-slate-800 p-3.5 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 block font-bold mb-1 opacity-75">{t.paternalGrandfatherName}</span>
                <span className="inline-flex items-center justify-center w-8 h-8 font-extrabold rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                  {patGfAbo}{patGfRh}
                </span>
              </div>
              {/* Paternal Grandmother */}
              <div className="bg-slate-900/40 border border-slate-800 p-3.5 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 block font-bold mb-1 opacity-75">{t.paternalGrandmotherName}</span>
                <span className="inline-flex items-center justify-center w-8 h-8 font-extrabold rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                  {patGmAbo}{patGmRh}
                </span>
              </div>
              {/* Maternal Grandfather */}
              <div className="bg-slate-900/40 border border-slate-800 p-3.5 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 block font-bold mb-1 opacity-75">{t.maternalGrandfatherName}</span>
                <span className="inline-flex items-center justify-center w-8 h-8 font-extrabold rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs">
                  {matGfAbo}{matGfRh}
                </span>
              </div>
              {/* Maternal Grandmother */}
              <div className="bg-slate-900/40 border border-slate-800 p-3.5 rounded-xl text-center">
                <span className="text-[10px] text-slate-400 block font-bold mb-1 opacity-75">{t.maternalGrandmotherName}</span>
                <span className="inline-flex items-center justify-center w-8 h-8 font-extrabold rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs">
                  {matGmAbo}{matGmRh}
                </span>
              </div>
            </div>

            {/* Dotted merge indicator line */}
            <div className="hidden lg:grid grid-cols-2 text-center pointer-events-none text-slate-600 gap-4">
              <div className="flex justify-center"><ArrowDown className="w-5 h-5 text-rose-500/40 animate-bounce" /></div>
              <div className="flex justify-center"><ArrowDown className="w-5 h-5 text-blue-500/40 animate-bounce" /></div>
            </div>

            {/* Generation Tier 2: Parents (Father & Mother) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
              
              {/* Father Node with Mendelian Alignment badge */}
              <div className={`border p-4 rounded-xl flex items-center justify-between ${isFatherConsistent ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-amber-500/5 border-amber-500/20'}`}>
                <div className="flex items-center gap-3">
                  <span className="text-xl">👨‍🔬</span>
                  <div>
                    <span className="text-xs font-black text-white">{t.father}</span>
                    <span className="block text-[10px] text-slate-400 font-semibold mt-0.5">{t.grandparentsToParentsText}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-9 h-9 border font-black text-xs rounded-full bg-slate-900 flex items-center justify-center text-white shrink-0">
                    {father.abo}{father.rh}
                  </span>
                  {isFatherConsistent ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-500/10">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {t.consistentChain}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 px-2 py-0.5 rounded-md bg-amber-500/10" title="Mendelian segregation issue">
                      <AlertTriangle className="w-3 h-3 text-amber-400" />
                      {t.inconsistentChain}
                    </span>
                  )}
                </div>
              </div>

              {/* Mother Node with Mendelian Alignment badge */}
              <div className={`border p-4 rounded-xl flex items-center justify-between ${isMotherConsistent ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-amber-500/5 border-amber-500/20'}`}>
                <div className="flex items-center gap-3">
                  <span className="text-xl">👩‍🔬</span>
                  <div>
                    <span className="text-xs font-black text-white">{t.mother}</span>
                    <span className="block text-[10px] text-slate-400 font-semibold mt-0.5">{t.grandparentsToParentsText}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-9 h-9 border font-black text-xs rounded-full bg-slate-900 flex items-center justify-center text-white shrink-0">
                    {mother.abo}{mother.rh}
                  </span>
                  {isMotherConsistent ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-400 px-2 py-0.5 rounded-md bg-emerald-500/10">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      {t.consistentChain}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-amber-400 px-2 py-0.5 rounded-md bg-amber-500/10" title="Mendelian segregation issue">
                      <AlertTriangle className="w-3 h-3 text-amber-400" />
                      {t.inconsistentChain}
                    </span>
                  )}
                </div>
              </div>

            </div>

            {/* Mismatch Alert Notes */}
            {(!isFatherConsistent || !isMotherConsistent) && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-3.5 flex items-start gap-2 text-[11px] text-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5 animate-pulse" />
                <p className="leading-relaxed font-semibold">
                  {isAr 
                    ? 'تم الكشف عن انقطاع ظاهري لقوانين مندل في هذا السجل العائلي. فمثلاً، لا يمكن لوالدين فصيلتهما O إنجاب شخص فصيلته A أو B أو AB. هذا قد يشير فقط إلى افتراض أن الوالد هجين متباين الألائل، أو يُمكن تفسير الحالات النادرة للغاية علمياً مثل طفرة "بومباي" (Bombay Phenotype) أو التدخلات اللاصقة للمورثات.'
                    : 'A Mendelian genotype discrepancy was flagged. For instance, parents both of group O cannot normally yield an A or B child. In rare immunological settings like the Bombay Phenotype or modifier alleles, blood types can morph. Verify with exact allele sequence sequencing or refer to genetic counselor advice.'}
                </p>
              </div>
            )}

            {/* Generation Tier 3: Offspring Flow (Targeting to the baby outcome) */}
            <div className="border border-slate-800 bg-slate-900/40 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400 fill-current animate-pulse" />
                <div>
                  <span className="font-extrabold text-white">{isAr ? 'تكامل الأجيال مع مربع بانيت' : 'Multi-Generational Projection Complete'}</span>
                  <span className="block text-[10px] text-slate-400 mt-0.5 font-semibold">{t.parentsToOffspringText}</span>
                </div>
              </div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-[#F3F4F6] text-right bg-rose-500/10 px-3 py-1.5 rounded-md border border-rose-500/20 shrink-0 self-start sm:self-center">
                📊 {isAr ? 'النتائج معروضة بالتفصيل أعلاه' : 'Full interactive metrics listed above'}
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

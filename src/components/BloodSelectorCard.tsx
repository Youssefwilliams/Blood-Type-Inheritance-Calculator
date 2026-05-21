import { ShieldCheck, HelpCircle } from 'lucide-react';
import {
  PhenotypeABO,
  PhenotypeRh,
  GenotypeABOOption,
  GenotypeRhOption,
  ParentState,
  TranslationDict,
} from '../types';
import { formatGenotypeDisplay, sortABOGenotype, getPossibleABOGenotypes, getPossibleRhGenotypes } from '../utils/genetics';

interface BloodSelectorCardProps {
  idPrefix: string;
  role: 'father' | 'mother';
  state: ParentState;
  onChange: (updated: Partial<ParentState>) => void;
  t: TranslationDict;
  theme?: 'light' | 'dark';
}

export default function BloodSelectorCard({
  idPrefix,
  role,
  state,
  onChange,
  t,
  theme = 'light',
}: BloodSelectorCardProps) {
  const { abo, rh, aboGenotype, rhGenotype } = state;

  // Determine if Genotype selection is applicable
  const isAboGenotypeSelectable = abo === 'A' || abo === 'B';
  const isRhGenotypeSelectable = rh === '+';

  const isFather = role === 'father';

  const config = {
    title: isFather ? t.father : t.mother,
    descAr: isFather ? 'ملف الأب' : 'ملف الأم',
    descEn: isFather ? "Father's Profile" : "Mother's Profile",
    genderGlyph: isFather ? '♂' : '♀',
    glyphBg: isFather
      ? theme === 'dark'
        ? 'bg-blue-950/50 text-blue-450 border border-blue-900/30'
        : 'bg-blue-100 text-blue-600'
      : theme === 'dark'
      ? 'bg-rose-950/50 text-rose-450 border border-rose-900/30'
      : 'bg-rose-100 text-rose-500',
    selectedButtonClass: isFather
      ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-900/10'
      : 'bg-rose-500 text-white font-bold shadow-md shadow-rose-900/10',
    accentColor: isFather ? 'text-blue-600 bg-blue-50' : 'text-rose-600 bg-rose-50',
  };

  // Compute genotype visual representation for the bottom badge
  const displayGenotype = () => {
    const aboConfigs = getPossibleABOGenotypes(abo, aboGenotype);
    const rhConfigs = getPossibleRhGenotypes(rh, rhGenotype);
    
    const formattedAbo = aboConfigs
      .map(c => sortABOGenotype(c.alleles[0], c.alleles[1]))
      .map(g => formatGenotypeDisplay(g))
      .join(' / ');
      
    const formattedRh = rhConfigs
      .map(c => c.alleles.join(''))
      .join(' / ');

    return `${formattedAbo} • ${formattedRh}`;
  };

  return (
    <div
      id={`${idPrefix}-card`}
      className={`rounded-[2rem] p-6 border flex flex-col transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-slate-900 border-slate-800 text-slate-100'
          : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      {/* 1. Header with Bento Glyphs */}
      <div className="flex items-center gap-3.5 mb-6">
        <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold italic text-xl shrink-0 shadow-3xs ${config.glyphBg}`}>
          {config.genderGlyph}
        </div>
        <div>
          <h2 id={`${idPrefix}-title`} className={`font-extrabold tracking-tight text-base sm:text-lg ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {config.title}
          </h2>
          <p className="text-xs text-slate-400 font-medium">
            {t.alleleSymbol === 'أليل' ? config.descAr : config.descEn}
          </p>
        </div>
      </div>

      {/* 2. ABO Blood Group Buttons */}
      <div className="mb-5">
        <label id={`${idPrefix}-abo-label`} className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
          {t.bloodType}
        </label>
        <div id={`${idPrefix}-abo-grid`} className="grid grid-cols-4 gap-2">
          {(['A', 'B', 'AB', 'O'] as PhenotypeABO[]).map((type) => {
            const isSelected = abo === type;
            return (
              <button
                key={type}
                id={`${idPrefix}-abo-${type}`}
                type="button"
                onClick={() => onChange({ abo: type })}
                className={`py-3 px-2 rounded-xl text-sm font-bold border transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? `${config.selectedButtonClass} border-transparent`
                    : theme === 'dark'
                    ? 'bg-slate-950/45 text-slate-400 border-slate-850 hover:bg-slate-950/70 hover:text-slate-200'
                    : 'bg-slate-50 text-slate-400 border-slate-150 hover:bg-slate-100 hover:text-slate-700'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Rh Factor Selector */}
      <div className="mb-6">
        <label id={`${idPrefix}-rh-label`} className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider">
          {t.rhFactor}
        </label>
        <div id={`${idPrefix}-rh-grid`} className="grid grid-cols-2 gap-2.5">
          {(['+', '-'] as PhenotypeRh[]).map((factor) => {
            const isSelected = rh === factor;
            const factorLabel = factor === '+' ? 'Positive (+)' : 'Negative (-)';
            const factorLabelAr = factor === '+' ? 'إيجابي (+)' : 'سالب (-)';
            const displayLabel = t.alleleSymbol === 'أليل' ? factorLabelAr : factorLabel;

            // Highlight Rh negative beautifully with alternative dark colors
            const selectedRhClass = isSelected
              ? factor === '+'
                ? config.selectedButtonClass
                : theme === 'dark'
                ? 'bg-slate-100 text-slate-950 font-bold shadow-md shadow-white/5 border-transparent'
                : 'bg-slate-900 text-white font-bold shadow-md border-transparent'
              : theme === 'dark'
              ? 'bg-slate-950/45 text-slate-400 border-slate-850 hover:bg-slate-950/70 hover:text-slate-200'
              : 'bg-slate-50 text-slate-400 border-slate-150 hover:bg-slate-100 hover:text-slate-700';

            return (
              <button
                key={factor}
                id={`${idPrefix}-rh-${factor === '+' ? 'pos' : 'neg'}`}
                type="button"
                onClick={() => onChange({ rh: factor })}
                className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition-all duration-200 cursor-pointer ${selectedRhClass}`}
              >
                {displayLabel}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Advanced Genotypes Details */}
      <div id={`${idPrefix}-genotype-panel`} className={`border-t pt-5 mt-auto transition-colors duration-300 ${theme === 'dark' ? 'border-slate-800' : 'border-slate-100'}`}>
        <div className="flex items-center justify-between mb-3.5">
          <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
            {t.advancedGenotype}
          </span>
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
        </div>

        {/* ABO Genotypes Options */}
        <div className="mb-4">
          <div className="flex items-baseline justify-between mb-1.5">
            <span className={`text-xs font-bold transition-colors duration-300 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>{t.bloodType} {t.genotype}</span>
            <span id={`${idPrefix}-abo-genotype-caption`} className="text-[10px] font-mono font-medium text-slate-400">
              {abo === 'A'
                ? `(IᴬIᴬ vs Iᴬi)`
                : abo === 'B'
                ? `(IᴮIᴮ vs Iᴮi)`
                : abo === 'AB'
                ? `(IᴬIᴮ)`
                : `(ii)`}
            </span>
          </div>

          {isAboGenotypeSelectable ? (
            <div id={`${idPrefix}-abo-genotype-options`} className="grid grid-cols-3 gap-1.5 text-xs">
              {(['unknown', 'homozygous', 'heterozygous'] as GenotypeABOOption[]).map((opt) => {
                const isSelected = aboGenotype === opt;
                const labels: Record<string, string> = {
                  unknown: t.unknown.split(' ')[0],
                  homozygous: opt === 'homozygous' ? (abo === 'A' ? 'IᴬIᴬ' : 'IᴮIᴮ') : '',
                  heterozygous: opt === 'heterozygous' ? (abo === 'A' ? 'Iᴬi' : 'Iᴮi') : '',
                };
                const displayLabel = opt === 'unknown' ? t.unknown.split('(')[0].trim() : labels[opt];

                return (
                  <button
                    key={opt}
                    id={`${idPrefix}-abo-opt-${opt}`}
                    type="button"
                    onClick={() => onChange({ aboGenotype: opt })}
                    className={`py-2 px-1 text-center font-bold rounded-lg border cursor-pointer transition-all duration-150 ${
                      isSelected
                        ? theme === 'dark'
                          ? 'bg-slate-100 text-slate-950 border-transparent shadow-xs font-extrabold'
                          : 'bg-slate-800 text-white border-transparent shadow-xs font-extrabold'
                        : theme === 'dark'
                        ? 'bg-slate-950/45 border-slate-850 text-slate-500 hover:bg-slate-950/70 hover:text-slate-300'
                        : 'bg-slate-50 border-slate-150 text-slate-400 hover:bg-slate-100/50'
                    }`}
                  >
                    {displayLabel}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className={`py-2.5 px-3 rounded-xl border text-[11px] font-medium transition-colors duration-300 ${
              theme === 'dark'
                ? 'bg-slate-950/30 border-slate-850 text-slate-400'
                : 'bg-slate-50 border-slate-100/50 text-slate-500'
            }`}>
              {abo === 'AB' 
                ? 'AB is always Heterozygous Co-dominant (IᴬIᴮ)' 
                : 'O is always Homozygous Recessive (ii)'}
            </div>
          )}
        </div>

        {/* Rh Genotype Options */}
        <div className="mb-5">
          <div className="flex items-baseline justify-between mb-1.5">
            <span className={`text-xs font-bold transition-colors duration-300 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>{t.rhFactor} {t.genotype}</span>
            <span id={`${idPrefix}-rh-genotype-caption`} className="text-[10px] font-mono font-medium text-slate-400">
              {rh === '+' ? '(DD vs Dd)' : '(dd)'}
            </span>
          </div>

          {isRhGenotypeSelectable ? (
            <div id={`${idPrefix}-rh-genotype-options`} className="grid grid-cols-3 gap-1.5 text-xs">
              {(['unknown', 'homozygous', 'heterozygous'] as GenotypeRhOption[]).map((opt) => {
                const isSelected = rhGenotype === opt;
                const labels: Record<string, string> = {
                  unknown: t.unknown.split(' ')[0],
                  homozygous: 'DD',
                  heterozygous: 'Dd',
                };
                return (
                  <button
                    key={opt}
                    id={`${idPrefix}-rh-opt-${opt}`}
                    type="button"
                    onClick={() => onChange({ rhGenotype: opt })}
                    className={`py-2 px-1 text-center font-bold rounded-lg border cursor-pointer transition-all duration-150 ${
                      isSelected
                        ? theme === 'dark'
                          ? 'bg-slate-100 text-slate-950 border-transparent shadow-xs font-extrabold'
                          : 'bg-slate-800 text-white border-transparent shadow-xs font-extrabold'
                        : theme === 'dark'
                        ? 'bg-slate-950/45 border-slate-850 text-slate-500 hover:bg-slate-950/70 hover:text-slate-300'
                        : 'bg-slate-50 border-slate-150 text-slate-400 hover:bg-slate-100/50'
                    }`}
                  >
                    {opt === 'unknown' ? t.unknown.split('(')[0].trim() : labels[opt]}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className={`py-2.5 px-3 rounded-xl border text-[11px] font-medium font-sans transition-colors duration-300 ${
              theme === 'dark'
                ? 'bg-slate-950/30 border-slate-850 text-slate-400'
                : 'bg-slate-50 border-slate-150 text-slate-500'
            }`}>
              Rh- negative is always Homozygous Recessive (dd)
            </div>
          )}
        </div>

        {/* Genotype Summary Status Bar */}
        <div className={`p-3 rounded-2xl flex items-center justify-between mt-4 transition-colors duration-300 ${
          theme === 'dark' ? 'bg-slate-950/60' : 'bg-slate-50'
        }`}>
          <span className="text-xs font-bold text-slate-500">{t.genotype}</span>
          <span className={`font-mono font-extrabold text-xs uppercase tracking-tight transition-colors duration-300 ${
            theme === 'dark' ? 'text-rose-400' : 'text-slate-800'
          }`}>
            {displayGenotype()}
          </span>
        </div>
      </div>
    </div>
  );
}

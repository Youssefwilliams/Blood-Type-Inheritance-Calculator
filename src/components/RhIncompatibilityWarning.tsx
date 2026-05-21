import { ShieldAlert, Info, Droplet, ShieldCheck } from 'lucide-react';
import { TranslationDict, PhenotypeABO, PhenotypeRh } from '../types';
import { checkRhIncompatibility, checkAboIncompatibility } from '../utils/genetics';

interface RhIncompatibilityWarningProps {
  fatherABO: PhenotypeABO;
  motherABO: PhenotypeABO;
  fatherRh: PhenotypeRh;
  motherRh: PhenotypeRh;
  t: TranslationDict;
  theme?: 'light' | 'dark';
}

export default function RhIncompatibilityWarning({
  fatherABO,
  motherABO,
  fatherRh,
  motherRh,
  t,
  theme = 'light',
}: RhIncompatibilityWarningProps) {
  const showRhWarning = checkRhIncompatibility(fatherRh, motherRh);
  const showAboNote = checkAboIncompatibility(fatherABO, motherABO);

  if (!showRhWarning && !showAboNote) {
    return (
      <div
        id="medical-advisory-panel"
        className={`rounded-[2rem] p-6 md:p-8 flex flex-col md:flex-row items-center gap-5 transition-all relative overflow-hidden ${
          theme === 'dark'
            ? 'bg-emerald-900 border border-emerald-850 text-white shadow-md shadow-emerald-950/20'
            : 'bg-emerald-600 text-white shadow-lg shadow-emerald-100/50'
        }`}
      >
        {/* Decorative ambient bubble */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mr-4 -mt-4 pointer-events-none" />

        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold shrink-0 text-white">
          <ShieldCheck className="w-6 h-6 text-white" />
        </div>
        <div className="space-y-1 text-center md:text-left">
          <h4 className="font-extrabold text-base tracking-tight text-white mb-0.5">
            {t.alleleSymbol === 'أليل' ? '🔬 متطابق ومستقر بالكامل' : '🔬 Fully Compatible Genetic Structure'}
          </h4>
          <p className="text-xs text-emerald-100 leading-relaxed font-semibold">
            {t.alleleSymbol === 'أليل'
              ? 'ممتاز! لا توجد مخاطر طبية ناتجة عن عدم توافق العامل الرايزيسي (Rh) بين الأم والجنين في هذا الاختيار.'
              : 'Excellent! Your blood group combination presents no medical risks of maternal-fetal Rh factor incompatibility.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div id="medical-advisory-panel" className="space-y-5">
      {/* 1. Priming Rh Incompatibility Warning Card */}
      {showRhWarning && (
        <div
          id="rh-warning-card"
          className={`text-white rounded-[2rem] p-6 md:p-8 flex flex-col transition-all relative overflow-hidden shadow-xl ${
            theme === 'dark' ? 'bg-red-950 border border-red-900/40 shadow-red-950/20' : 'bg-red-600 shadow-red-100'
          }`}
        >
          {/* Subtle Decorative Gradient background */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-white/5 rounded-full blur-3xl -mr-8 -mt-8 pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-start gap-4">
            <span className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center font-bold text-white shrink-0 shadow-sm">
              <ShieldAlert id="rh-alert-icon" className="w-6 h-6" />
            </span>
            <div className="space-y-3 flex-1">
              <div>
                <h4 id="rh-warning-title" className="font-extrabold text-white text-base sm:text-lg tracking-tight leading-snug">
                  {t.warningTitle}
                </h4>
                <p id="rh-warning-lead" className="text-xs font-semibold text-red-100 leading-relaxed mt-1">
                  {t.warningText}
                </p>
              </div>

              <p id="rh-warning-description" className="text-xs text-red-50/90 leading-relaxed font-medium">
                {t.warningDetail}
              </p>

              {/* Protective standard advice badge */}
              <div
                id="rh-warning-advice"
                className={`p-4 rounded-xl font-semibold text-xs leading-relaxed border transition-colors ${
                  theme === 'dark'
                    ? 'bg-slate-950/60 text-red-200 border-red-900/40'
                    : 'bg-white text-red-950 border-red-500/20'
                }`}
              >
                {t.warningAdvice}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Secondary ABO minor note card */}
      {showAboNote && (
        <div
          id="abo-note-card"
          className={`p-6 rounded-[2rem] border transition-all duration-300 relative overflow-hidden ${
            theme === 'dark'
              ? 'bg-slate-900 border-slate-800 text-white'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <div className="flex items-start gap-4">
            <span className={`p-2.5 rounded-xl shrink-0 mt-0.5 border flex items-center justify-center ${
              theme === 'dark'
                ? 'bg-amber-950/40 text-amber-400 border-amber-900/30'
                : 'bg-amber-50 text-amber-500 border-amber-100'
            }`}>
              <Info className="w-5 h-5 animate-pulse" />
            </span>
            <div>
              <h5 id="abo-warning-title" className={`font-extrabold text-xs sm:text-sm tracking-tight ${theme === 'dark' ? 'text-amber-400' : 'text-slate-900'}`}>
                {t.warningAboIncompatibilityTitle}
              </h5>
              <p id="abo-warning-desc" className="text-xs text-slate-400 leading-relaxed mt-1 font-medium">
                {t.warningAboIncompatibilityText}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

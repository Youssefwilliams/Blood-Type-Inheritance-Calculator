import { useState } from 'react';
import { motion } from 'motion/react';
import { Copy, Check } from 'lucide-react';
import { PhenotypeProbability, TranslationDict, ParentState, Language } from '../types';

interface OffspringChartProps {
  phenotypes: PhenotypeProbability[];
  t: TranslationDict;
  theme?: 'light' | 'dark';
  father?: ParentState;
  mother?: ParentState;
  language?: Language;
}

export default function OffspringChart({
  phenotypes,
  t,
  theme = 'light',
  father,
  mother,
  language = 'en',
}: OffspringChartProps) {
  const [copied, setCopied] = useState(false);

  // Color mapper based on blood group
  const getBloodGroupColor = (abo: string) => {
    const isDark = theme === 'dark';
    switch (abo) {
      case 'A':
        return {
          bar: 'bg-rose-500',
          bg: isDark ? 'bg-rose-950/45 text-rose-350 border-rose-900/40' : 'bg-rose-100/60 text-rose-700 border-rose-200',
          accent: isDark ? 'text-rose-400' : 'text-rose-600',
        };
      case 'B':
        return {
          bar: 'bg-blue-500',
          bg: isDark ? 'bg-blue-950/45 text-blue-350 border-blue-900/40' : 'bg-blue-100/60 text-blue-700 border-blue-200',
          accent: isDark ? 'text-blue-400' : 'text-blue-600',
        };
      case 'AB':
        return {
          bar: 'bg-purple-500',
          bg: isDark ? 'bg-purple-950/45 text-purple-350 border-purple-900/40' : 'bg-purple-100/60 text-purple-700 border-purple-200',
          accent: isDark ? 'text-purple-400' : 'text-purple-600',
        };
      case 'O':
        return {
          bar: 'bg-emerald-500',
          bg: isDark ? 'bg-emerald-950/45 text-emerald-350 border-emerald-900/40' : 'bg-emerald-100/60 text-emerald-700 border-emerald-200',
          accent: isDark ? 'text-emerald-400' : 'text-emerald-600',
        };
      default:
        return {
          bar: 'bg-slate-500',
          bg: isDark ? 'bg-slate-800 text-slate-350 border-slate-700' : 'bg-slate-100 text-slate-700 border-slate-200',
          accent: isDark ? 'text-slate-400' : 'text-slate-600',
        };
    }
  };

  const handleCopy = () => {
    let summary = '';

    if (language === 'ar') {
      summary += `--- تحليل وراثة فصيلة الدم للأبناء ---\n`;
      if (father && mother) {
        summary += `البيانات الأبوية:\n`;
        summary += `- الأم: فصيلة ${mother.abo}${mother.rh}\n`;
        summary += `- الأب: فصيلة ${father.abo}${father.rh}\n\n`;
      }
      summary += `الاحتمالات المتوقعة للأبناء:\n`;
      phenotypes.forEach(({ bloodType, probability }) => {
        summary += `- فصيلة ${bloodType}: ${(probability * 100).toFixed(1)}%\n`;
      });
      summary += `-------------------------------`;
    } else if (language === 'fr') {
      summary += `--- ANALYSE DE L'HÉRITAGE DES GROUPES SANGUINS ---\n`;
      if (father && mother) {
        summary += `Données Parentales:\n`;
        summary += `- Mère: Groupe ${mother.abo}${mother.rh}\n`;
        summary += `- Père: Groupe ${father.abo}${father.rh}\n\n`;
      }
      summary += `Probabilités pour les Enfants de la F1:\n`;
      phenotypes.forEach(({ bloodType, probability }) => {
        summary += `- Groupe Sanguin ${bloodType}: ${(probability * 100).toFixed(1)}%\n`;
      });
      summary += `--------------------------------------------------`;
    } else if (language === 'es') {
      summary += `--- ANÁLISIS DE HERENCIA DE GRUPOS SANGUÍNEOS ---\n`;
      if (father && mother) {
        summary += `Datos Parentales:\n`;
        summary += `- Madre: Grupo ${mother.abo}${mother.rh}\n`;
        summary += `- Padre: Grupo ${father.abo}${father.rh}\n\n`;
      }
      summary += `Probabilidades de los Descendientes:\n`;
      phenotypes.forEach(({ bloodType, probability }) => {
        summary += `- Grupo Sanguíneo ${bloodType}: ${(probability * 100).toFixed(1)}%\n`;
      });
      summary += `--------------------------------------------------`;
    } else {
      summary += `--- BLOOD TYPE INHERITANCE ANALYSIS REPORT ---\n`;
      if (father && mother) {
        summary += `Parental Scientific Profiles:\n`;
        summary += `- Mother: Blood Type ${mother.abo}${mother.rh}\n`;
        summary += `- Father: Blood Type ${father.abo}${father.rh}\n\n`;
      }
      summary += `Predicted Offspring Probabilities:\n`;
      phenotypes.forEach(({ bloodType, probability }) => {
        summary += `- Blood Group ${bloodType}: ${(probability * 100).toFixed(1)}%\n`;
      });
      summary += `----------------------------------------------`;
    }

    navigator.clipboard.writeText(summary).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    });
  };

  return (
    <div
      id="offspring-chart-container"
      className={`rounded-[2rem] border p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-slate-900 border-slate-800 text-slate-100 shadow-xs'
          : 'bg-white border-slate-200 text-slate-900 shadow-xs'
      }`}
    >
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 id="chart-title" className={`text-xl font-bold tracking-tight transition-colors duration-300 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {t.resultsTitle}
          </h3>
          <p id="chart-subtitle" className="text-xs text-slate-400 font-medium mt-1">
            {t.resultsSubtitle}
          </p>
        </div>

        <button
          onClick={handleCopy}
          className={`inline-flex items-center gap-1.5 py-2 px-4 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer active:scale-95 border ${
            copied
              ? 'bg-emerald-500/10 border-emerald-500/35 text-emerald-500 dark:text-emerald-400'
              : theme === 'dark'
                ? 'bg-slate-950/60 border-slate-800 text-slate-300 hover:text-white hover:bg-slate-900'
                : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>{t.copied}</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5 text-rose-500 shrink-0 animate-pulse" />
              <span>{t.copyResults}</span>
            </>
          )}
        </button>
      </div>

      <div id="chart-list" className="space-y-5">
        {phenotypes.map(({ bloodType, abo, rh, probability }) => {
          const colors = getBloodGroupColor(abo);
          const percentage = (probability * 100).toFixed(1);

          return (
            <div
              key={bloodType}
              id={`result-${bloodType}`}
              className="space-y-2 group transition-all"
            >
              <div className="flex items-center justify-between font-sans">
                <div className="flex items-center gap-3">
                  {/* Miniature round token for blood group */}
                  <span
                    id={`badge-${bloodType}`}
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-extrabold border shadow-3xs transition-all duration-300 group-hover:scale-105 ${colors.bg}`}
                  >
                    {bloodType}
                  </span>
                  <div>
                    <span id={`label-${bloodType}`} className={`font-extrabold text-sm transition-colors duration-300 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                      {t.bloodType} {abo} {rh === '+' ? 'POS' : 'NEG'}
                    </span>
                    <span className="hidden sm:inline-block ml-2 text-[10px] text-slate-400 font-bold uppercase tracking-widest font-mono">
                      F1 Generation
                    </span>
                  </div>
                </div>

                <span id={`percent-${bloodType}`} className={`text-base font-black transition-colors duration-300 ${colors.accent}`}>
                  {percentage}%
                </span>
              </div>

              {/* Bento Progress indicator */}
              <div className={`w-full h-2.5 rounded-full overflow-hidden transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-950/70' : 'bg-slate-100'}`}>
                <motion.div
                  id={`progress-bar-fill-${bloodType}`}
                  className={`${colors.bar} h-full rounded-full`}
                  initial={{ width: '0%' }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
                />
              </div>
            </div>
          );
        })}

        {/* Legend / Info footer for O+ O+ case */}
        {phenotypes.length === 1 && phenotypes[0].bloodType === 'O+' && (
          <div className={`text-[11px] rounded-2xl p-4 border leading-relaxed font-bold mt-4 transition-all duration-300 ${
            theme === 'dark'
              ? 'text-amber-400 bg-amber-950/30 border-amber-900/40'
              : 'text-amber-700 bg-amber-50 border-amber-100/60'
          }`}>
            🧬 {t.alleleSymbol === 'أليل' ? 'ملاحظة: بما أن كلا الوالدين يحملان جينات متنحية نقية للاستحقاق (O+ 100%)، فإن الأبناء جميعهم سيرثون فصيلة O+ بالكامل.' : 'Notice: Parent genes lead directly to 100% O+.'}
          </div>
        )}
      </div>
    </div>
  );
}

import { Landmark, Award, ShieldAlert, Globe, Compass, Users } from 'lucide-react';
import { TranslationDict } from '../types';

interface HistoricalCulturalHubProps {
  t: TranslationDict;
  isRtl: boolean;
  theme?: 'light' | 'dark';
}

export default function HistoricalCulturalHub({
  t,
  isRtl,
  theme = 'light',
}: HistoricalCulturalHubProps) {
  // Mini table helper for Ketsuekigata traits depending on language
  const ketsuekigataTraits = isRtl
    ? [
        { type: 'A', archetype: 'الفنان الحذر (Meticulous)', description: 'منظم، كتوم، دقيق للغاية ومخلص في عمله، يفضل الطمأنينة والتخطيط.' },
        { type: 'B', archetype: 'الشغوف المستقل (Individualist)', description: 'منظم ومستقل، متمرد ضد الروتين ويحب الحرية.' },
        { type: 'AB', archetype: 'العقلاني المزدوج (Diplomat)', description: 'مزيج من التفكير النقدي وقابلية التكيف الاجتماعي، روحي وفني.' },
        { type: 'O', archetype: 'القيادي الصلب (Warrior)', description: 'طموح، يتمتع بصلابة جسدية وبديهة قيادية عالية ويرحب بالمخاطر.' },
      ]
    : [
        { type: 'A', archetype: 'The Organizer (Meticulous)', description: 'Calm, highly systematic, responsible, and intensely loyal, but can be anxious.' },
        { type: 'B', archetype: 'The Creator (Passionate)', description: 'Strong-willed, creative, highly passionate, and deeply individualistic.' },
        { type: 'AB', archetype: 'The Rationalist (Dualist)', description: 'Logical, artistic, controlled, and adaptable, often representing humanitarian outlooks.' },
        { type: 'O', archetype: 'The Trailblazer (Confident)', description: 'Outgoing, natural leader, robust, positive, and determined, with strong intuition.' },
      ];

  return (
    <div
      id="historical-cultural-hub"
      className="space-y-6 sm:space-y-8"
    >
      {/* Visual Header */}
      <div className={`border p-6 sm:p-8 rounded-[2rem] flex flex-col sm:flex-row items-center justify-between gap-4 transition-colors duration-300 ${
        theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className="flex items-center gap-3.5">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
            theme === 'dark' ? 'bg-slate-950 text-white border border-slate-800' : 'bg-slate-900 text-white'
          }`}>
            <Landmark className="w-5 h-5" />
          </div>
          <div>
            <h3 id="cultural-hub-heading" className={`text-base sm:text-lg font-extrabold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {t.historyHubTitle}
            </h3>
            <p id="cultural-hub-subheading" className="text-xs text-slate-400 font-medium">
              {t.historyHubDesc}
            </p>
          </div>
        </div>
        <div className={`rounded-full py-1 text-[10px] uppercase font-bold tracking-widest px-3 flex items-center gap-1 ${
          theme === 'dark' ? 'bg-slate-950 text-slate-400 border border-slate-800' : 'bg-slate-200/60 text-slate-500'
        }`}>
          <Globe className="w-3.5 h-3.5 text-slate-400 animate-spin-slow" />
          <span>{isRtl ? 'إرث إنساني وثقافي' : 'Global Cultural Heritage'}</span>
        </div>
      </div>

      {/* Grid Bento Cards (2x2 Structure) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Card 1: Karl Landsteiner */}
        <div
          id="landsteiner-card"
          className={`rounded-[2rem] border p-6 sm:p-7 flex flex-col justify-between hover:shadow-xs transition-colors duration-300 relative overflow-hidden ${
            theme === 'dark'
              ? 'bg-slate-900 border-slate-800 text-slate-100'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          {/* Subtle Background Watermark Decoration */}
          <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-2xl -mr-4 -mt-4 pointer-events-none ${
            theme === 'dark' ? 'bg-slate-950/20' : 'bg-slate-50'
          }`} />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={`p-2.5 rounded-xl border flex items-center justify-center shadow-3xs ${
                theme === 'dark' ? 'bg-rose-950/40 text-rose-350 border-rose-900/30' : 'bg-rose-50 text-rose-500 border-rose-100'
              }`}>
                <Award className="w-5 h-5" />
              </span>
              <span className="text-[10px] font-mono uppercase bg-slate-950/60 border border-slate-800 text-slate-400 rounded-sm py-0.5 px-2 font-bold tracking-wider relative z-10">
                NOBEL PRIZE 1930
              </span>
            </div>

            <h4 id="landsteiner-title" className={`text-sm sm:text-base font-extrabold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {t.historyLandsteinerTitle}
            </h4>

            <p id="landsteiner-desc" className={`text-xs leading-relaxed font-semibold ${theme === 'dark' ? 'text-slate-350' : 'text-slate-600'}`}>
              {t.historyLandsteinerText}
            </p>
          </div>
        </div>

        {/* Card 2: Blood Transfusion Milestones */}
        <div
          id="transfusion-card"
          className={`rounded-[2rem] border p-6 sm:p-7 flex flex-col justify-between hover:shadow-xs transition-colors duration-300 relative overflow-hidden ${
            theme === 'dark'
              ? 'bg-slate-900 border-slate-800 text-slate-100'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={`p-2.5 rounded-xl border flex items-center justify-center shadow-3xs ${
                theme === 'dark' ? 'bg-red-950/40 text-red-350 border-red-900/30' : 'bg-red-50 text-red-600 border-red-100'
              }`}>
                <ShieldAlert className="w-5 h-5" />
              </span>
              <span className={`text-[10px] font-mono uppercase rounded-sm py-0.5 px-2 font-bold tracking-wider ${
                theme === 'dark' ? 'bg-red-950/50 text-red-400 border border-red-905/30' : 'bg-red-100 text-red-700'
              }`}>
                {isRtl ? 'علم نقل الدم' : 'TRANSFUSION STANDARD'}
              </span>
            </div>

            <h4 id="transfusion-title" className={`text-sm sm:text-base font-extrabold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {t.historyTransfusionTitle}
            </h4>

            <p id="transfusion-desc" className={`text-xs leading-relaxed font-semibold ${theme === 'dark' ? 'text-slate-355' : 'text-slate-600'}`}>
              {t.historyTransfusionText}
            </p>
          </div>
        </div>

        {/* Card 3: Anthropology and Ancestry Tracking */}
        <div
          id="anthropology-card"
          className={`rounded-[2rem] border p-6 sm:p-7 flex flex-col justify-between hover:shadow-xs transition-colors duration-300 relative overflow-hidden ${
            theme === 'dark'
              ? 'bg-slate-900 border-slate-800 text-slate-100'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={`p-2.5 rounded-xl border flex items-center justify-center shadow-3xs ${
                theme === 'dark' ? 'bg-emerald-950/40 text-emerald-350 border-emerald-900/30' : 'bg-emerald-50 text-emerald-600 border-emerald-100'
              }`}>
                <Compass className="w-5 h-5" />
              </span>
              <span className={`text-[10px] font-mono uppercase rounded-sm py-0.5 px-2 font-bold tracking-wider ${
                theme === 'dark' ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-905/30' : 'bg-emerald-100 text-emerald-700'
              }`}>
                {isRtl ? 'خرائط جغرافية للبشر' : 'GENETIC GEOGRAPHY'}
              </span>
            </div>

            <h4 id="anthropology-title" className={`text-sm sm:text-base font-extrabold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {t.historyAnthropologyTitle}
            </h4>

            <p id="anthropology-desc" className={`text-xs leading-relaxed font-semibold ${theme === 'dark' ? 'text-slate-355' : 'text-slate-600'}`}>
              {t.historyAnthropologyText}
            </p>
          </div>
        </div>

        {/* Card 4: Ketsuekigata (Japanese Personality Blood Group Theory) */}
        <div
          id="ketsuekigata-personality-card"
          className={`rounded-[2rem] border p-6 sm:p-7 hover:shadow-xs transition-colors duration-300 flex flex-col justify-between md:col-span-1 lg:col-span-1 ${
            theme === 'dark'
              ? 'bg-slate-900 border-slate-800 text-slate-100'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className={`p-2.5 rounded-xl border flex items-center justify-center shadow-3xs ${
                theme === 'dark' ? 'bg-purple-950/40 text-purple-350 border-purple-900/30' : 'bg-purple-50 text-purple-650 border-purple-100'
              }`}>
                <Users className="w-5 h-5" />
              </span>
              <span className={`text-[10px] font-mono uppercase rounded-sm py-0.5 px-2 font-bold tracking-wider ${
                theme === 'dark' ? 'bg-purple-950/50 text-purple-400 border border-purple-905/30' : 'bg-purple-100 text-purple-700'
              }`}>
                {isRtl ? 'مفهوم كيتسويكيغاتا' : 'KETSUEKIGATA CULTURE'}
              </span>
            </div>

            <h4 id="ketsuekigata-title" className={`text-sm sm:text-base font-extrabold tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              {t.historyCulturalPersonalityTitle}
            </h4>

            <p id="ketsuekigata-desc" className={`text-xs leading-relaxed font-semibold ${theme === 'dark' ? 'text-slate-355' : 'text-slate-600'}`}>
              {t.historyCulturalPersonalityText}
            </p>
          </div>
        </div>

      </div>

      {/* Interactive Personality Alignment Deck Map Table */}
      <div id="ketsuekigata-table-block" className={`border rounded-[2rem] p-5 sm:p-7 relative overflow-hidden transition-colors duration-300 ${
        theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-slate-50 border-slate-200'
      }`}>
        <div className={`flex items-center justify-between border-b pb-3.5 mb-5 ${
          theme === 'dark' ? 'border-slate-800' : 'border-slate-200'
        }`}>
          <h5 className={`text-xs sm:text-sm font-extrabold uppercase tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
            🇯🇵 {isRtl ? 'مصفوفة تحليل كيتسويكيغاتا للطبائع' : 'Ketsuekigata Archetype Analysis Matrix'}
          </h5>
          <span className="text-[10px] font-mono uppercase text-slate-400 font-extrabold">
            {isRtl ? 'ثقافة شعبية شرق آسيا' : 'East Asian Popular Archetypes'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {ketsuekigataTraits.map((tItem) => {
            // Get color highlight for each group
            const groupColors = () => {
              switch (tItem.type) {
                case 'A': return theme === 'dark' ? 'bg-rose-950/50 border-rose-900/40 text-rose-300' : 'bg-rose-50 border-rose-200 text-rose-700';
                case 'B': return theme === 'dark' ? 'bg-blue-950/50 border-blue-900/40 text-blue-300' : 'bg-blue-50 border-blue-200 text-blue-700';
                case 'AB': return theme === 'dark' ? 'bg-purple-950/50 border-purple-900/40 text-purple-300' : 'bg-purple-50 border-purple-200 text-purple-700';
                case 'O': return theme === 'dark' ? 'bg-emerald-950/50 border-emerald-900/40 text-emerald-300' : 'bg-emerald-50 border-emerald-200 text-emerald-700';
                default: return theme === 'dark' ? 'bg-slate-800 border-slate-705 text-slate-300' : 'bg-slate-50 border-slate-200 text-slate-700';
              }
            };
            return (
              <div key={tItem.type} className={`border rounded-2xl p-4 hover:scale-[1.02] hover:shadow-3xs transition-all duration-200 ${
                theme === 'dark' ? 'bg-slate-950 border-slate-850' : 'bg-white border-slate-150'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`w-8 h-8 rounded-full border flex items-center justify-center font-extrabold text-xs shrink-0 ${groupColors()}`}>
                    {tItem.type}
                  </span>
                  <span className={`font-extrabold text-xs shrink-0 tracking-tight ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                    {tItem.archetype}
                  </span>
                </div>
                <p className={`text-[11px] font-semibold leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  {tItem.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

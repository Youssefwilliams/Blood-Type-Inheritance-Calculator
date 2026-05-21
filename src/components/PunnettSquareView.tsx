import { useState } from 'react';
import { PunnettGrid, TranslationDict } from '../types';
import { formatGenotypeDisplay, getABOPhenotype, getRhPhenotype } from '../utils/genetics';

interface PunnettSquareProps {
  aboGrids: PunnettGrid[];
  rhGrids: PunnettGrid[];
  t: TranslationDict;
  isRtl: boolean;
  theme?: 'light' | 'dark';
}

export default function PunnettSquareView({
  aboGrids,
  rhGrids,
  t,
  isRtl,
  theme = 'light',
}: PunnettSquareProps) {
  const [activeTab, setActiveTab] = useState<'abo' | 'rh'>('abo');
  const [aboIndex, setAboIndex] = useState(0);
  const [rhIndex, setRhIndex] = useState(0);
  const [hoveredCell, setHoveredCell] = useState<{ row: number; col: number } | null>(null);

  const grids = activeTab === 'abo' ? aboGrids : rhGrids;
  const currentIndex = activeTab === 'abo' ? aboIndex : rhIndex;
  const setCurrentIndex = activeTab === 'abo' ? setAboIndex : setRhIndex;

  const currentGrid = grids[currentIndex] || grids[0];

  if (!currentGrid) {
    return (
      <div className={`rounded-[2rem] border p-8 shadow-xs text-center transition-all duration-300 ${
        theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
      }`}>
        {t.noPossibilityText}
      </div>
    );
  }

  // Helper to stylize allele labels (A, B, O, D, d)
  const formatAllele = (allele: string) => {
    if (allele === 'IA') return 'Iᴬ';
    if (allele === 'IB') return 'Iᴮ';
    if (allele === 'i') return 'i';
    return allele; // D or d
  };

  const getPhenotypeDesc = (genotype: string) => {
    if (activeTab === 'abo') {
      return getABOPhenotype(genotype);
    } else {
      return getRhPhenotype(genotype) === '+' ? 'Rh+' : 'Rh-';
    }
  };

  return (
    <div
      id="punnett-view-container"
      className={`rounded-[2rem] md:rounded-[2.5rem] border p-6 sm:p-8 shadow-sm flex flex-col h-full justify-between transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-slate-900 border-slate-800 text-slate-100'
          : 'bg-white border-slate-200 text-slate-900'
      }`}
    >
      <div>
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 id="punnett-title" className={`text-xl font-bold tracking-tight flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              🧬 {t.punnettSquare}
            </h2>
            <p id="punnett-desc" className="text-xs text-slate-400 mt-1 font-medium">
              {t.punnettSubtitle}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-black text-blue-500 uppercase">
              {isRtl ? 'مربع بانيت' : 'MATRIX CROSS'}
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className={`inline-flex rounded-xl p-1 mb-6 w-full ${theme === 'dark' ? 'bg-slate-950' : 'bg-slate-100'}`} id="punnett-tabs">
          <button
            id="tab-abo"
            onClick={() => setActiveTab('abo')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'abo'
                ? theme === 'dark'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'bg-white text-slate-950 shadow-xs'
                : theme === 'dark'
                ? 'text-slate-450 hover:text-white'
                : 'text-slate-500 hover:text-slate-950'
            }`}
          >
            {t.bloodType} (ABO)
          </button>
          <button
            id="tab-rh"
            onClick={() => setActiveTab('rh')}
            className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              activeTab === 'rh'
                ? theme === 'dark'
                  ? 'bg-slate-800 text-white shadow-xs'
                  : 'bg-white text-slate-950 shadow-xs'
                : theme === 'dark'
                ? 'text-slate-450 hover:text-white'
                : 'text-slate-500 hover:text-slate-950'
            }`}
          >
            {t.rhFactor} (Rh)
          </button>
        </div>

        <p className={`text-xs leading-relaxed mb-6 p-4 rounded-2xl border font-medium ${
          theme === 'dark' ? 'bg-slate-950/60 border-slate-800/80 text-slate-350' : 'bg-slate-50 border-slate-100 text-slate-600'
        }`}>
          {t.punnettExplanation}
        </p>

        {/* Selection Dropdown */}
        {grids.length > 1 && (
          <div className={`mb-6 p-3.5 rounded-2xl border ${
            theme === 'dark' ? 'bg-slate-950/20 border-slate-850' : 'bg-slate-50/50 border-slate-100'
          }`} id="cross-selector-panel">
            <span className={`block text-[11px] font-bold mb-1.5 flex items-center gap-1 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-800'}`}>
              ✨ {t.selectCross}
            </span>
            <select
              id="cross-select-dropdown"
              value={currentIndex}
              onChange={(e) => {
                setCurrentIndex(Number(e.target.value));
                setHoveredCell(null);
              }}
              className={`w-full text-xs font-bold py-2.5 px-3 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-blue-500/10 cursor-pointer border ${
                theme === 'dark'
                  ? 'bg-slate-950 border-slate-800 text-slate-300 focus:border-slate-705'
                  : 'bg-white border-slate-200 text-slate-700'
              }`}
            >
              {grids.map((grid, index) => (
                <option key={index} value={index}>
                  {grid.title}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Punnett Table */}
        <div className="flex flex-col items-center justify-center py-2" id="punnett-interactive-grid">
          <div className="text-[10px] font-bold text-slate-400 font-mono tracking-widest uppercase mb-4 text-center">
            {currentGrid.title}
          </div>

          <div className="relative max-w-xs sm:max-w-sm w-full font-mono text-sm">
            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              
              {/* Top-Left Splitle Label */}
              <div className={`relative aspect-square flex items-center justify-center rounded-2xl border shadow-3xs overflow-hidden ${
                theme === 'dark' ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-100'
              }`}>
                <div className="absolute inset-0 bg-linear-to-br from-blue-500/5 via-transparent to-rose-500/5" />
                <div className={`absolute w-[141%] h-[1px] rotate-45 transform origin-center ${theme === 'dark' ? 'bg-slate-800' : 'bg-slate-200'}`} />
                <span className={`absolute bottom-3.5 ${isRtl ? 'right-3.5' : 'left-3.5'} text-[10px] font-extrabold text-blue-500`}>
                  {isRtl ? 'الأب' : 'PAT'}
                </span>
                <span className={`absolute top-3.5 ${isRtl ? 'left-3.5' : 'right-3.5'} text-[10px] font-extrabold text-rose-500`}>
                  {isRtl ? 'الأم' : 'MAT'}
                </span>
              </div>

              {/* Mother Allele 1 */}
              <div className={`aspect-square flex flex-col items-center justify-center rounded-2xl border transition-all duration-200 ${
                hoveredCell?.col === 0
                  ? 'bg-rose-500 text-white border-transparent scale-[1.03] shadow-md shadow-rose-950/10'
                  : theme === 'dark'
                  ? 'bg-rose-950/25 border-rose-900/40 text-rose-400 font-extrabold shadow-3xs'
                  : 'bg-rose-50/60 border-rose-100 text-rose-600 font-extrabold shadow-3xs'
              }`}>
                <span className={`text-[8px] sm:text-[9px] font-black uppercase tracking-wider mb-1 ${hoveredCell?.col === 0 ? 'text-rose-100' : 'text-rose-500/60'}`}>
                  {isRtl ? 'مورث الأم ١' : 'MAT 1'}
                </span>
                <span className="text-base sm:text-lg font-black">{formatAllele(currentGrid.motherAlleles[0])}</span>
              </div>

              {/* Mother Allele 2 */}
              <div className={`aspect-square flex flex-col items-center justify-center rounded-2xl border transition-all duration-200 ${
                hoveredCell?.col === 1
                  ? 'bg-rose-500 text-white border-transparent scale-[1.03] shadow-md shadow-rose-950/10'
                  : theme === 'dark'
                  ? 'bg-rose-950/25 border-rose-900/40 text-rose-400 font-extrabold shadow-3xs'
                  : 'bg-rose-50/60 border-rose-100 text-rose-600 font-extrabold shadow-3xs'
              }`}>
                <span className={`text-[8px] sm:text-[9px] font-black uppercase tracking-wider mb-1 ${hoveredCell?.col === 1 ? 'text-rose-100' : 'text-rose-500/60'}`}>
                  {isRtl ? 'مورث الأم ٢' : 'MAT 2'}
                </span>
                <span className="text-base sm:text-lg font-black">{formatAllele(currentGrid.motherAlleles[1])}</span>
              </div>

              {/* Father Allele 1 */}
              <div className={`aspect-square flex flex-col items-center justify-center rounded-2xl border transition-all duration-200 ${
                hoveredCell?.row === 0
                  ? 'bg-blue-600 text-white border-transparent scale-[1.03] shadow-md shadow-blue-950/10'
                  : theme === 'dark'
                  ? 'bg-blue-950/25 border-blue-900/40 text-blue-400 font-extrabold shadow-3xs'
                  : 'bg-blue-50/60 border-blue-100 text-blue-600 font-extrabold shadow-3xs'
              }`}>
                <span className={`text-[8px] sm:text-[9px] font-black uppercase tracking-wider mb-1 ${hoveredCell?.row === 0 ? 'text-blue-100' : 'text-blue-500/60'}`}>
                  {isRtl ? 'مورث الأب ١' : 'PAT 1'}
                </span>
                <span className="text-base sm:text-lg font-black">{formatAllele(currentGrid.fatherAlleles[0])}</span>
              </div>

              {/* Combined Cell 1 */}
              <div
                id="punnett-cell-0-0"
                onMouseEnter={() => setHoveredCell({ row: 0, col: 0 })}
                onMouseLeave={() => setHoveredCell(null)}
                className={`relative aspect-square flex flex-col items-center justify-center rounded-2xl border border-dashed p-2 transition-all duration-200 hover:shadow-md hover:scale-[1.05] cursor-pointer ${
                  theme === 'dark' ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                } ${
                  hoveredCell?.row === 0 && hoveredCell?.col === 0
                    ? theme === 'dark'
                      ? 'border-slate-500 ring-2 ring-white/10'
                      : 'border-slate-800 ring-2 ring-slate-950/10'
                    : ''
                }`}
              >
                <span className={`text-sm font-black ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                  {formatGenotypeDisplay(currentGrid.cells[0][0].resultGenotype)}
                </span>
                <span className={`mt-1 px-1.5 py-0.5 text-[10px] font-bold rounded-lg ${
                  theme === 'dark' ? 'bg-rose-950/55 text-rose-400 border border-rose-900/35' : 'bg-red-100 text-red-600'
                }`}>
                  {getPhenotypeDesc(currentGrid.cells[0][0].resultGenotype)}
                </span>
              </div>

              {/* Combined Cell 2 */}
              <div
                id="punnett-cell-0-1"
                onMouseEnter={() => setHoveredCell({ row: 0, col: 1 })}
                onMouseLeave={() => setHoveredCell(null)}
                className={`relative aspect-square flex flex-col items-center justify-center rounded-2xl border border-dashed p-2 transition-all duration-200 hover:shadow-md hover:scale-[1.05] cursor-pointer ${
                  theme === 'dark' ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                } ${
                  hoveredCell?.row === 0 && hoveredCell?.col === 1
                    ? theme === 'dark'
                      ? 'border-slate-500 ring-2 ring-white/10'
                      : 'border-slate-800 ring-2 ring-slate-950/10'
                    : ''
                }`}
              >
                <span className={`text-sm font-black ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                  {formatGenotypeDisplay(currentGrid.cells[0][1].resultGenotype)}
                </span>
                <span className={`mt-1 px-1.5 py-0.5 text-[10px] font-bold rounded-lg ${
                  theme === 'dark' ? 'bg-rose-950/55 text-rose-400 border border-rose-900/35' : 'bg-red-100 text-red-600'
                }`}>
                  {getPhenotypeDesc(currentGrid.cells[0][1].resultGenotype)}
                </span>
              </div>

              {/* Father Allele 2 */}
              <div className={`aspect-square flex flex-col items-center justify-center rounded-2xl border transition-all duration-200 ${
                hoveredCell?.row === 1
                  ? 'bg-blue-600 text-white border-transparent scale-[1.03] shadow-md shadow-blue-950/10'
                  : theme === 'dark'
                  ? 'bg-blue-950/25 border-blue-900/40 text-blue-400 font-extrabold shadow-3xs'
                  : 'bg-blue-50/60 border-blue-100 text-blue-600 font-extrabold shadow-3xs'
              }`}>
                <span className={`text-[8px] sm:text-[9px] font-black uppercase tracking-wider mb-1 ${hoveredCell?.row === 1 ? 'text-blue-100' : 'text-blue-500/60'}`}>
                  {isRtl ? 'مورث الأب ٢' : 'PAT 2'}
                </span>
                <span className="text-base sm:text-lg font-black">{formatAllele(currentGrid.fatherAlleles[1])}</span>
              </div>

              {/* Combined Cell 3 */}
              <div
                id="punnett-cell-1-0"
                onMouseEnter={() => setHoveredCell({ row: 1, col: 0 })}
                onMouseLeave={() => setHoveredCell(null)}
                className={`relative aspect-square flex flex-col items-center justify-center rounded-2xl border border-dashed p-2 transition-all duration-200 hover:shadow-md hover:scale-[1.05] cursor-pointer ${
                  theme === 'dark' ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                } ${
                  hoveredCell?.row === 1 && hoveredCell?.col === 0
                    ? theme === 'dark'
                      ? 'border-slate-500 ring-2 ring-white/10'
                      : 'border-slate-800 ring-2 ring-slate-950/10'
                    : ''
                }`}
              >
                <span className={`text-sm font-black ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                  {formatGenotypeDisplay(currentGrid.cells[1][0].resultGenotype)}
                </span>
                <span className={`mt-1 px-1.5 py-0.5 text-[10px] font-bold rounded-lg ${
                  theme === 'dark' ? 'bg-rose-950/55 text-rose-400 border border-rose-900/35' : 'bg-red-100 text-red-600'
                }`}>
                  {getPhenotypeDesc(currentGrid.cells[1][0].resultGenotype)}
                </span>
              </div>

              {/* Combined Cell 4 */}
              <div
                id="punnett-cell-1-1"
                onMouseEnter={() => setHoveredCell({ row: 1, col: 1 })}
                onMouseLeave={() => setHoveredCell(null)}
                className={`relative aspect-square flex flex-col items-center justify-center rounded-2xl border border-dashed p-2 transition-all duration-200 hover:shadow-md hover:scale-[1.05] cursor-pointer ${
                  theme === 'dark' ? 'bg-slate-950/50 border-slate-800' : 'bg-slate-50 border-slate-200'
                } ${
                  hoveredCell?.row === 1 && hoveredCell?.col === 1
                    ? theme === 'dark'
                      ? 'border-slate-500 ring-2 ring-white/10'
                      : 'border-slate-800 ring-2 ring-slate-950/10'
                    : ''
                }`}
              >
                <span className={`text-sm font-black ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>
                  {formatGenotypeDisplay(currentGrid.cells[1][1].resultGenotype)}
                </span>
                <span className={`mt-1 px-1.5 py-0.5 text-[10px] font-bold rounded-lg ${
                  theme === 'dark' ? 'bg-rose-950/55 text-rose-400 border border-rose-900/35' : 'bg-red-100 text-red-600'
                }`}>
                  {getPhenotypeDesc(currentGrid.cells[1][1].resultGenotype)}
                </span>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import { ParentState, PhenotypeProbability, TranslationDict } from '../types';
import { checkRhIncompatibility, checkAboIncompatibility } from '../utils/genetics';

interface PrintableReportProps {
  father: ParentState;
  mother: ParentState;
  phenotypes: PhenotypeProbability[];
  t: TranslationDict;
  isRtl: boolean;
}

export default function PrintableReport({
  father,
  mother,
  phenotypes,
  t,
  isRtl,
}: PrintableReportProps) {
  const showRhWarning = checkRhIncompatibility(father.rh, mother.rh);
  const showAboNote = checkAboIncompatibility(father.abo, mother.abo);

  // Formulate a unique dummy document hash to look like a official medical/genetic advisory certificate
  const docHash = `BGR-${father.abo}${father.rh === '+' ? 'P' : 'N'}-${mother.abo}${mother.rh === '+' ? 'P' : 'N'}-2026`;
  const formattedDate = "2026-05-21"; // Current local time is 2026-05-21T21:50:42Z

  return (
    <div
      id="printable-report-doc"
      dir={isRtl ? 'rtl' : 'ltr'}
      className="hidden print:flex flex-col min-h-screen bg-white text-slate-900 p-8 sm:p-12 font-sans border-[8px] border-double border-slate-200"
      style={{ printColorAdjust: 'exact', WebkitPrintColorAdjust: 'exact' }}
    >
      {/* Clinician Header Branding */}
      <div className="flex items-center justify-between border-b-2 border-slate-900 pb-6 mb-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 uppercase">
            {t.reportGeneticsTitle}
          </h1>
          <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">
            {t.reportSubTitle}
          </p>
        </div>
        <div className="text-right shrink-0">
          <div className="inline-block border-2 border-dashed border-red-600 px-3 py-1.5 text-red-600 font-mono font-black text-xs uppercase transform -rotate-3 rounded-md">
            {isRtl ? 'معالجة جينية معتمدة' : 'OFFICIAL SIMULATION CERTIFICATE'}
          </div>
        </div>
      </div>

      {/* Meta details dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-slate-50 border border-slate-200 p-5 rounded-2xl mb-8 font-mono text-xs">
        <div>
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            {isRtl ? 'معرف الوثيقة' : 'DOCUMENT ID'}
          </span>
          <span className="font-bold text-slate-800">{docHash}</span>
        </div>
        <div>
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            {t.reportDate}
          </span>
          <span className="font-bold text-slate-800">{formattedDate}</span>
        </div>
        <div>
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            {t.reportStatus}
          </span>
          <span className="font-bold text-emerald-700 uppercase">
            {isRtl ? 'مستقر ومعتمد' : 'VERIFIED PROJECTIONS'}
          </span>
        </div>
        <div>
          <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            {isRtl ? 'القوانين الحاكمة' : 'GOVERNING LAW'}
          </span>
          <span className="font-bold text-slate-800">MENDELIAN CROSS</span>
        </div>
      </div>

      {/* Parental Profiles Columns */}
      <div className="grid grid-cols-2 gap-8 mb-8">
        {/* Father's Profile */}
        <div className="border border-slate-200 p-5 rounded-2xl bg-slate-50/50">
          <h3 className="font-black text-sm text-slate-950 uppercase border-b border-slate-200 pb-2 mb-3 tracking-tight flex items-center gap-1.5">
            👨‍🔬 {t.fatherProfile}
          </h3>
          <table className="w-full text-xs text-slate-700">
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2 text-slate-450 font-bold">{t.bloodType}</td>
                <td className="py-2 text-right font-extrabold text-slate-900">{father.abo}</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 text-slate-450 font-bold">{t.rhFactor}</td>
                <td className="py-2 text-right font-extrabold text-slate-900">{father.rh === '+' ? 'POS (+)' : 'NEG (-)'}</td>
              </tr>
              <tr>
                <td className="py-2 text-slate-450 font-bold">{t.genotype}</td>
                <td className="py-2 text-right font-mono font-bold text-slate-800">
                  {father.aboGenotype === 'homozygous' ? (father.abo === 'A' ? 'IA IA' : father.abo === 'B' ? 'IB IB' : 'ii') : father.aboGenotype === 'heterozygous' ? (father.abo === 'A' ? 'IA i' : father.abo === 'B' ? 'IB i' : 'ii') : (father.abo === 'A' ? 'IA IA / IA i' : father.abo === 'B' ? 'IB IB / IB i' : father.abo === 'AB' ? 'IA IB' : 'ii')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Mother's Profile */}
        <div className="border border-slate-200 p-5 rounded-2xl bg-slate-50/50">
          <h3 className="font-black text-sm text-slate-950 uppercase border-b border-slate-200 pb-2 mb-3 tracking-tight flex items-center gap-1.5">
            👩‍🔬 {t.motherProfile}
          </h3>
          <table className="w-full text-xs text-slate-700">
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2 text-slate-450 font-bold">{t.bloodType}</td>
                <td className="py-2 text-right font-extrabold text-slate-900">{mother.abo}</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 text-slate-450 font-bold">{t.rhFactor}</td>
                <td className="py-2 text-right font-extrabold text-slate-900">{mother.rh === '+' ? 'POS (+)' : 'NEG (-)'}</td>
              </tr>
              <tr>
                <td className="py-2 text-slate-450 font-bold">{t.genotype}</td>
                <td className="py-2 text-right font-mono font-bold text-slate-800">
                  {mother.aboGenotype === 'homozygous' ? (mother.abo === 'A' ? 'IA IA' : mother.abo === 'B' ? 'IB IB' : 'ii') : mother.aboGenotype === 'heterozygous' ? (mother.abo === 'A' ? 'IA i' : mother.abo === 'B' ? 'IB i' : 'ii') : (mother.abo === 'A' ? 'IA IA / IA i' : mother.abo === 'B' ? 'IB IB / IB i' : mother.abo === 'AB' ? 'IA IB' : 'ii')}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Projected Offspring Matrix */}
      <div className="mb-8">
        <h3 className="font-black text-sm text-slate-950 uppercase mb-4 tracking-tight flex items-center gap-2">
          🧬 {isRtl ? 'جدول توزيع احتمالات الفصائل والوراثة للأبناء (الجيل الأول F1)' : 'PROJECTED OFFSPRING PHENOTYPE DISTRIBUTION (F1)'}
        </h3>
        <table className="w-full text-left border border-slate-200 rounded-xl overflow-hidden font-sans text-xs">
          <thead>
            <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 uppercase font-black text-[10px] tracking-wider">
              <th className="py-3 px-4 text-left">{t.offspringPhenotype}</th>
              <th className="py-3 px-4 text-center">{isRtl ? 'نوع الأليل الموروث' : 'Inferred Allele Combo'}</th>
              <th className="py-3 px-4 text-right">{t.probability}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-150 font-medium">
            {phenotypes.map((p) => {
              const formattedPercentage = (p.probability * 100).toFixed(2);
              return (
                <tr key={p.bloodType} className="hover:bg-slate-50/50">
                  <td className="py-3 px-4 text-slate-900 font-extrabold flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full border border-slate-300 bg-slate-100 flex items-center justify-center font-black text-[11px] text-slate-800">
                      {p.bloodType}
                    </span>
                    <span>{t.bloodType} {p.abo} {p.rh === '+' ? 'POS' : 'NEG'}</span>
                  </td>
                  <td className="py-3 px-4 text-center font-mono font-bold text-slate-500">
                    {p.abo === 'AB' ? 'IA IB' : p.abo === 'O' ? 'ii' : `I${p.abo} -`} • {p.rh === '+' ? 'D -' : 'dd'}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-black text-slate-900 text-sm">
                    {formattedPercentage}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Advisory warnings section */}
      <div className="space-y-4 mb-10">
        <h3 className="font-black text-sm text-slate-950 uppercase tracking-tight">
          📝 {t.reportClinicalNote}
        </h3>

        {/* Rh warning advisories */}
        {showRhWarning ? (
          <div className="border border-red-300 bg-red-50 text-red-950 p-4 rounded-xl text-xs space-y-2 font-medium">
            <h4 className="font-bold text-red-900 flex items-center gap-1.5 uppercase leading-none">
              ⚠️ {t.warningTitle}
            </h4>
            <p className="leading-relaxed">{t.warningText}</p>
            <p className="italic font-normal">{t.warningDetail}</p>
            <div className="border-t border-red-200 pt-2 text-[11px] font-bold">
              {t.warningAdvice}
            </div>
          </div>
        ) : (
          <div className="border border-emerald-200 bg-emerald-50 text-emerald-950 p-4 rounded-xl text-xs font-semibold">
            🔬 {isRtl ? 'التوافق المناعي والرايسي مستقر بالكامل (Rh Safe). لا توجد إشارة إلى مخاطر عدم تطابق دم الأم الحامل مع جنينها لغياب تحفيز الأجسام الهيدروجينية المضادة.' : 'Maternal-Fetal compatibility verified. No biological triggers indicate Rh antibodies development risks (maternal-fetal Rh immunization is absent in this maternal profile).'}
          </div>
        )}

        {/* ABO hemolytic note */}
        {showAboNote && (
          <div className="border border-amber-200 bg-amber-50 text-amber-950 p-4 rounded-xl text-xs font-medium">
            <h4 className="font-bold text-amber-800 mb-1">
              ℹ️ {t.warningAboIncompatibilityTitle}
            </h4>
            <p className="leading-relaxed">{t.warningAboIncompatibilityText}</p>
          </div>
        )}
      </div>

      {/* Signatures and Sign-off */}
      <div className="mt-auto grid grid-cols-2 gap-12 pt-8 border-t border-slate-200">
        <div>
          <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">
            {isRtl ? 'إخلاء المسؤولية الطبية والتعليمية' : 'MEDICAL & SIMULATION DISCLAIMER'}
          </span>
          <p className="text-[9px] text-slate-400 leading-normal font-medium">
            {isRtl
              ? 'هذه الوثيقة عبارة عن تقرير محاكاة مستند لوارثة مندل المستقلة لأهداف علمية وتوضيحية ترفيهية فقط. لا يُغني عن الفحوصات المخبرية الطبية والسريرية المعتمدة ومراجعة طبيب الأطفال والمناعة.'
              : 'This document presents genetic projections governed by Mendelian sorting templates. It remains exclusively an educational simulation and does not replace actual clinically administered laboratory assays.'}
          </p>
        </div>

        <div className="text-right flex flex-col items-end justify-between">
          <span className="block text-[9px] font-black text-slate-400 uppercase tracking-widest mb-8">
            {t.reportSignature}
          </span>
          <div className="w-48 border-b-2 border-slate-400 pb-1 flex flex-col items-center">
            {/* Minimal SVG Stamp illustration or placeholder space */}
            <span className="text-[10px] font-mono text-slate-400 font-bold italic tracking-wide">
              {t.reportGeneratedBy}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

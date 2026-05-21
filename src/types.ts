export type PhenotypeABO = 'A' | 'B' | 'AB' | 'O';
export type PhenotypeRh = '+' | '-';

export type GenotypeABOOption = 'unknown' | 'homozygous' | 'heterozygous';
export type GenotypeRhOption = 'unknown' | 'homozygous' | 'heterozygous';

export interface ParentState {
  abo: PhenotypeABO;
  rh: PhenotypeRh;
  aboGenotype: GenotypeABOOption;
  rhGenotype: GenotypeRhOption;
}

export interface AlleleWithWeight<T> {
  allele: T;
  weight: number;
}

export interface BloodGenotypeInfo {
  alleles: [string, string];
  probability: number;
}

export interface OffspringOutcome {
  abo: PhenotypeABO;
  rh: PhenotypeRh;
  aboGenotype: string;
  rhGenotype: string;
  bloodType: string; // e.g. "A+"
  probability: number;
}

export interface PhenotypeProbability {
  bloodType: string;
  abo: PhenotypeABO;
  rh: PhenotypeRh;
  probability: number;
}

export interface PunnettCell {
  fatherAllele: string;
  motherAllele: string;
  resultGenotype: string;
  isMatch?: boolean;
}

export interface PunnettGrid {
  fatherAlleles: string[];
  motherAlleles: string[];
  cells: PunnettCell[][]; // 2x2 grid
  title: string;
}

export type Language = 'ar' | 'en' | 'fr' | 'es';

export interface TranslationDict {
  title: string;
  subtitle: string;
  father: string;
  mother: string;
  bloodType: string;
  rhFactor: string;
  genotype: string;
  advancedGenotype: string;
  advancedGenotypeHelp: string;
  unknown: string;
  homozygous: string;
  heterozygous: string;
  calculate: string;
  resultsTitle: string;
  resultsSubtitle: string;
  punnettSquare: string;
  punnettSubtitle: string;
  punnettExplanation: string;
  probability: string;
  warningTitle: string;
  warningText: string;
  warningDetail: string;
  warningAdvice: string;
  warningAboIncompatibilityTitle: string;
  warningAboIncompatibilityText: string;
  eduTitle: string;
  eduSubtitle: string;
  eduAboTitle: string;
  eduAboText: string;
  eduRhTitle: string;
  eduRhText: string;
  eduHomoHeteroTitle: string;
  eduHomoHeteroText: string;
  alleleSymbol: string;
  motherGenotypeLabel: string;
  fatherGenotypeLabel: string;
  offspringGenotype: string;
  offspringPhenotype: string;
  reset: string;
  aboutRhTitle: string;
  noPossibilityText: string;
  viewAllCrosses: string;
  selectCross: string;
  showGenotypes: string;
  hideGenotypes: string;
  // Historical and Cultural Hub translating strings
  historyHubTitle: string;
  historyHubDesc: string;
  historyLandsteinerTitle: string;
  historyLandsteinerText: string;
  historyTransfusionTitle: string;
  historyTransfusionText: string;
  historyAnthropologyTitle: string;
  historyAnthropologyText: string;
  historyCulturalPersonalityTitle: string;
  historyCulturalPersonalityText: string;
  // Printable PDF Report translations
  exportPDF: string;
  reportGeneticsTitle: string;
  reportSubTitle: string;
  reportDate: string;
  reportStatus: string;
  reportClinicalNote: string;
  reportSignature: string;
  reportGeneratedBy: string;
  motherProfile: string;
  fatherProfile: string;
  // Family History translations
  familyHistorySectionTitle: string;
  familyHistorySectionDesc: string;
  paternalGrandfatherName: string;
  paternalGrandmotherName: string;
  maternalGrandfatherName: string;
  maternalGrandmotherName: string;
  saveHistoryBtnText: string;
  historySavedToast: string;
  consistentChain: string;
  inconsistentChain: string;
  grandparentsToParentsText: string;
  parentsToOffspringText: string;
  multiGenMapTitle: string;
  darkTheme: string;
  lightTheme: string;
  copyResults: string;
  copied: string;
}

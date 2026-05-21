import {
  PhenotypeABO,
  PhenotypeRh,
  GenotypeABOOption,
  GenotypeRhOption,
  ParentState,
  OffspringOutcome,
  PhenotypeProbability,
  PunnettGrid,
} from '../types';

// Standard allele representations
// A -> IA, B -> IB, O -> i
// + -> D, - -> d

export function getPossibleABOGenotypes(
  phenotype: PhenotypeABO,
  option: GenotypeABOOption
): { alleles: [string, string]; probability: number }[] {
  switch (phenotype) {
    case 'A':
      if (option === 'homozygous') {
        return [{ alleles: ['IA', 'IA'], probability: 1.0 }];
      } else if (option === 'heterozygous') {
        return [{ alleles: ['IA', 'i'], probability: 1.0 }];
      } else {
        // Unknown, assume equal probability for heterozygous vs homozygous for simplicity in prediction
        return [
          { alleles: ['IA', 'IA'], probability: 0.5 },
          { alleles: ['IA', 'i'], probability: 0.5 },
        ];
      }
    case 'B':
      if (option === 'homozygous') {
        return [{ alleles: ['IB', 'IB'], probability: 1.0 }];
      } else if (option === 'heterozygous') {
        return [{ alleles: ['IB', 'i'], probability: 1.0 }];
      } else {
        return [
          { alleles: ['IB', 'IB'], probability: 0.5 },
          { alleles: ['IB', 'i'], probability: 0.5 },
        ];
      }
    case 'AB':
      // AB is always heterozygous co-dominant
      return [{ alleles: ['IA', 'IB'], probability: 1.0 }];
    case 'O':
      // O is always homozygous recessive
      return [{ alleles: ['i', 'i'], probability: 1.0 }];
  }
}

export function getPossibleRhGenotypes(
  phenotype: PhenotypeRh,
  option: GenotypeRhOption
): { alleles: [string, string]; probability: number }[] {
  switch (phenotype) {
    case '+':
      if (option === 'homozygous') {
        return [{ alleles: ['D', 'D'], probability: 1.0 }];
      } else if (option === 'heterozygous') {
        return [{ alleles: ['D', 'd'], probability: 1.0 }];
      } else {
        return [
          { alleles: ['D', 'D'], probability: 0.5 },
          { alleles: ['D', 'd'], probability: 0.5 },
        ];
      }
    case '-':
      return [{ alleles: ['d', 'd'], probability: 1.0 }];
  }
}

// Sort alleles consistently: IA before IB, IB before i. D before d
export function sortABOGenotype(g1: string, g2: string): string {
  const rank = (a: string) => {
    if (a === 'IA') return 1;
    if (a === 'IB') return 2;
    return 3; // 'i'
  };
  return rank(g1) <= rank(g2) ? `${g1}${g2}` : `${g2}${g1}`;
}

export function formatGenotypeDisplay(g: string): string {
  // Format beautifully for standard users or biological notation
  return g
    .replace(/IA/g, 'Iᴬ')
    .replace(/IB/g, 'Iᴮ')
    .replace(/i/g, 'i');
}

export function sortRhGenotype(g1: string, g2: string): string {
  return g1 === 'D' || g2 === 'D' ? 'Dd' : g1 === 'd' && g2 === 'd' ? 'dd' : 'DD';
}

export function getABOPhenotype(genotype: string): PhenotypeABO {
  if (genotype.includes('IA') && genotype.includes('IB')) return 'AB';
  if (genotype.includes('IA')) return 'A';
  if (genotype.includes('IB')) return 'B';
  return 'O';
}

export function getRhPhenotype(genotype: string): PhenotypeRh {
  return genotype.includes('D') ? '+' : '-';
}

export function calculateGenetics(
  father: ParentState,
  mother: ParentState
): {
  phenotypes: PhenotypeProbability[];
  outcomes: OffspringOutcome[];
  aboGrids: PunnettGrid[];
  rhGrids: PunnettGrid[];
} {
  const fatherABOConfigs = getPossibleABOGenotypes(father.abo, father.aboGenotype);
  const motherABOConfigs = getPossibleABOGenotypes(mother.abo, mother.aboGenotype);
  const fatherRhConfigs = getPossibleRhGenotypes(father.rh, father.rhGenotype);
  const motherRhConfigs = getPossibleRhGenotypes(mother.rh, mother.rhGenotype);

  const outcomes: OffspringOutcome[] = [];
  const aboGrids: PunnettGrid[] = [];
  const rhGrids: PunnettGrid[] = [];

  // 1. Calculate combined Punnett grids & outcome weights
  for (const fABO of fatherABOConfigs) {
    for (const mABO of motherABOConfigs) {
      // Create ABO Punnett Grid for this specific combination
      const cellsABO = fABO.alleles.map((fAllele) =>
        mABO.alleles.map((mAllele) => {
          const res = sortABOGenotype(fAllele, mAllele);
          return {
            fatherAllele: fAllele,
            motherAllele: mAllele,
            resultGenotype: res,
          };
        })
      );
      
      const gridTitle = `ABO: Father (${formatGenotypeDisplay(sortABOGenotype(fABO.alleles[0], fABO.alleles[1]))}) × Mother (${formatGenotypeDisplay(sortABOGenotype(mABO.alleles[0], mABO.alleles[1]))})`;
      
      aboGrids.push({
        fatherAlleles: fABO.alleles,
        motherAlleles: mABO.alleles,
        cells: cellsABO,
        title: gridTitle,
      });

      for (const fRh of fatherRhConfigs) {
        for (const mRh of motherRhConfigs) {
          // Compute Rh Punnett Grid for this combination
          // To register grids once, check if it's already there
          const gridRhTitle = `Rh: Father (${fRh.alleles.join('')}) × Mother (${mRh.alleles.join('')})`;
          const exists = rhGrids.some((g) => g.title === gridRhTitle);
          if (!exists) {
            const cellsRh = fRh.alleles.map((fAllele) =>
              mRh.alleles.map((mAllele) => {
                const res = fAllele === 'D' || mAllele === 'D' ? 'Dd' : 'dd'; // simplify Dd vs DD
                // More precise sorting:
                const preciseRes = fAllele === 'D' && mAllele === 'D' ? 'DD' : (fAllele === 'D' || mAllele === 'D' ? 'Dd' : 'dd');
                return {
                  fatherAllele: fAllele,
                  motherAllele: mAllele,
                  resultGenotype: preciseRes,
                };
              })
            );
            rhGrids.push({
              fatherAlleles: fRh.alleles,
              motherAlleles: mRh.alleles,
              cells: cellsRh,
              title: gridRhTitle,
            });
          }

          // Compute individual cell combination probabilities
          const jointProb = fABO.probability * mABO.probability * fRh.probability * mRh.probability;

          for (const fA of fABO.alleles) {
            for (const mA of motherABOConfigs[0].alleles) { // We can loop through alleles directly
              // Just do classic 4x4 matrix multiplication for combination
            }
          }

          // Let's do the standard Punnett cross:
          // Father ABO alleles cross Mother ABO alleles
          // Father Rh alleles cross Mother Rh alleles
          for (let ai = 0; ai < 2; ai++) {
            const fA = fABO.alleles[ai];
            for (let aj = 0; aj < 2; aj++) {
              const mA = mABO.alleles[aj];
              const childABOGenotype = sortABOGenotype(fA, mA);
              const childABOPhenotype = getABOPhenotype(childABOGenotype);

              for (let ri = 0; ri < 2; ri++) {
                const fR = fRh.alleles[ri];
                for (let rj = 0; rj < 2; rj++) {
                  const mR = mRh.alleles[rj];
                  const childRhGenotype = fR === 'D' && mR === 'D' ? 'DD' : (fR === 'D' || mR === 'D' ? 'Dd' : 'dd');
                  const childRhPhenotype = getRhPhenotype(childRhGenotype);

                  const childBloodType = `${childABOPhenotype}${childRhPhenotype}`;
                  const singleCellProbability = jointProb * (1 / 16); // 1/4 (ABO) * 1/4 (Rh)

                  outcomes.push({
                    abo: childABOPhenotype,
                    rh: childRhPhenotype,
                    aboGenotype: childABOGenotype,
                    rhGenotype: childRhGenotype,
                    bloodType: childBloodType,
                    probability: singleCellProbability,
                  });
                }
              }
            }
          }
        }
      }
    }
  }

  // Aggregate outcomes by Phenotype (bloodType)
  const phenotypeMap = new Map<string, { abo: PhenotypeABO; rh: PhenotypeRh; probability: number }>();

  for (const out of outcomes) {
    const key = out.bloodType;
    const existing = phenotypeMap.get(key);
    if (existing) {
      existing.probability += out.probability;
    } else {
      phenotypeMap.set(key, {
        abo: out.abo,
        rh: out.rh,
        probability: out.probability,
      });
    }
  }

  const phenotypes: PhenotypeProbability[] = Array.from(phenotypeMap.entries())
    .map(([bloodType, details]) => ({
      bloodType,
      abo: details.abo,
      rh: details.rh,
      probability: details.probability,
    }))
    .sort((a, b) => b.probability - a.probability);

  return {
    phenotypes,
    outcomes,
    aboGrids,
    rhGrids,
  };
}

// Medical warnings checks
export function checkRhIncompatibility(fatherRh: PhenotypeRh, motherRh: PhenotypeRh): boolean {
  // Dangerous compatibility situation: Mother is Rh- and Father is Rh+
  return motherRh === '-' && fatherRh === '+';
}

export function checkAboIncompatibility(father: PhenotypeABO, mother: PhenotypeABO): boolean {
  // ABO Incompatibility occasionally causes mild newborn jaundice, e.g., when Mother is O and baby is A or B.
  // We can flag it as a secondary, very mild, educational warning
  return mother === 'O' && (father === 'A' || father === 'B' || father === 'AB');
}

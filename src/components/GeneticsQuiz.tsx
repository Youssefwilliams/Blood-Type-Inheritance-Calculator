import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, X, HelpCircle, Award, RotateCcw } from 'lucide-react';
import { Language } from '../types';

interface GeneticsQuizProps {
  language: Language;
}

interface Question {
  id: number;
  question: {
    en: string;
    ar: string;
    fr: string;
    es: string;
  };
  options: {
    en: string[];
    ar: string[];
    fr: string[];
    es: string[];
  };
  correctIndex: number;
  explanation: {
    en: string;
    ar: string;
    fr: string;
    es: string;
  };
}

export default function GeneticsQuiz({ language }: GeneticsQuizProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // 3 Scientific Questions in all four supported languages
  const questions: Question[] = [
    {
      id: 1,
      question: {
        en: 'What genetic rule is demonstrated when a person has blood group AB?',
        ar: 'ما هي القاعدة الوراثية التي تتضح عندما تكون فصيلة دم الشخص AB؟',
        fr: "Quelle règle génétique est démontrée lorsqu'une personne possède le groupe sanguin AB ?",
        es: '¿Qué regla genética se demuestra cuando una persona tiene el grupo sanguíneo AB?',
      },
      options: {
        en: ['Codominance (both alleles express)', 'Mendelian Simple Dominance', 'Incomplete Dominance (blending)'],
        ar: ['السيادة المشتركة (كلا الأليلين يظهران معاً)', 'السيادة المندلية البسيطة', 'السيادة غير التامة (امتزاج الصفات)'],
        fr: ['La codominance (les deux allèles s’expriment)', 'La dominance simple mendélienne', 'La dominance incomplète (mélange)'],
        es: ['Codominancia (ambos alelos se expresan)', 'Dominancia Mendeliána Simple', 'Dominancia Incompleta (fusión de rasgos)'],
      },
      correctIndex: 0,
      explanation: {
        en: 'A and B alleles are completely codominant, meaning they both express themselves fully to produce both antigens, resulting in blood type AB.',
        ar: 'الأليلات A وB سائدة معاً (سيادة مشتركة)، مما يعني أنها تعبر عن نفسها بالكامل لإنتاج كلا المستضدات، مما يؤدي إلى فصيلة الدم AB.',
        fr: "Les allèles A et B sont complètement codominants, ce qui signifie qu'ils s'expriment tous les deux pleinement pour produire les deux antigènes, donnant le groupe AB.",
        es: 'Los alelos A y B son completamente codominantes, lo que significa que ambos se expresan plenamente para producir ambos antígenos, dando como resultado el tipo AB.',
      },
    },
    {
      id: 2,
      question: {
        en: 'Can two parents with Blood Type A (both genotype AO) have a child with Blood Type O?',
        ar: 'هل يمكن لأبوين فصيلة دم كل منهما A (كلاهما يحمل الجين الهجين AO) إنجاب طفل فصيلة دمه O؟',
        fr: 'Deux parents de groupe sanguin A (tous deux de génotype AO) peuvent-ils avoir un enfant de groupe sanguin O ?',
        es: '¿Pueden dos padres con tipo de sangre A (ambos con genotipo AO) tener un hijo con tipo de sangre O?',
      },
      options: {
        en: ['No, offspring can only inherit Type A', 'Yes, there is a 25% chance of Type O', 'Yes, with a 100% chance of Type O'],
        ar: ['لا، يمكن للطفل فقط وراثة الفصيلة A', 'نعم، هناك احتمالية بنسبة 25٪ للفصيلة O', 'نعم، باحتمالية 100٪ للفصيلة O'],
        fr: ["Non, l'enfant ne peut hériter que du type A", "Oui, il y a 25% de chances d'avoir un type O", "Oui, avec 100% de chances d'avoir un type O"],
        es: ['No, la descendencia solo puede heredar el tipo A', 'Sí, hay una probabilidad de 25% de tener tipo O', 'Sí, con 100% de probabilidad de tener tipo O'],
      },
      correctIndex: 1,
      explanation: {
        en: 'If both parents pass down their recessive O (i) allele, the offspring will inherit genotype ii (Type O) with a 25% (1 in 4) probability.',
        ar: 'إذا مرر كلا الوالدين الأليل المتنحي O (i)، فسيرث الطفل التركيب الجيني ii (فصيلة O) بنسبة احتمال قدرها 25٪ (1 من أصل 4).',
        fr: "Si les deux parents transmettent leur allèle récessif O (i), l'enfant héritera du génotype ii (type O) avec une probabilité de 25% (1 chance sur 4).",
        es: 'Si ambos padres transmiten su alelo recesivo O (i), el descendiente heredará el genotipo ii (tipo O) con una probabilidad de 25% (1 de cada 4).',
      },
    },
    {
      id: 3,
      question: {
        en: 'If a person is Rh-negative (–), what is their exact genotype?',
        ar: 'إذا كان الشخص سالب عامل الرايزيسي (-Rh)، فما هو تركيبه الجيني الدقيق؟',
        fr: "Si une personne est Rh-négative (–), quel est son génotype exact ?",
        es: 'Si una persona es Rh-negativo (–), ¿cuál es su genotipo exacto?',
      },
      options: {
        en: ['Homozygous recessive (dd)', 'Heterozygous (Dd)', 'Homozygous dominant (DD)'],
        ar: ['متنحي نقي (dd)', 'متغاير الأليلات / هجين (Dd)', 'سائد نقي (DD)'],
        fr: ['Récessif homozygote (dd)', 'Hétérogénete (Dd)', 'Dominant homozygote (DD)'],
        es: ['Recesivo homocigoto (dd)', 'Heterocigoto (Dd)', 'Dominante homocigoto (DD)'],
      },
      correctIndex: 0,
      explanation: {
        en: 'The Rh-negative factor is simple recessive, meaning it is only expressed phenotypically when the individual inherits two recessive "d" alleles (dd).',
        ar: 'عامل الرايزيسي السالب هو صفة متنحية بسيطة، مما يعني أنه لا يتم التعبير عنه ظاهرياً إلا عندما يرث الفرد أليلين متنحيين "d" (dd).',
        fr: "Le facteur Rh négatif est récessif simple, ce qui signifie qu'il ne s'exprime phénotypiquement que lorsque l'individu hérite de deux allèles récessifs d (dd).",
        es: 'El factor Rh-negativo es recesivo simple, lo que significa que solo se expresa fenotípicamente cuando el individuo hereda dos alelos recesivos "d" (dd).',
      },
    },
  ];

  // Strings translated based on configured language
  const labels = {
    en: {
      title: '🧬 Blood Genetics Quick Quiz',
      subtitle: 'Test your understanding of ABO/Rh Mendelian inheritance in 3 interactive questions!',
      questionLabel: 'Question',
      of: 'of',
      nextBtn: 'Next Question',
      submitBtn: 'Confirm Answer',
      resultsBtn: 'Show Results',
      retryBtn: 'Try Again',
      explanationTitle: 'Scientific Explanation:',
      correctStatus: 'Correct Answer!',
      incorrectStatus: 'Incorrect Answer',
      scoreLabel: 'Your Quiz Score:',
      outOf: 'out of 3 questions',
      achieveMaster: '🎓 Genetics Master! Perfect score!',
      achieveIntermediate: '📚 Almost there! Great work!',
      achieveBeginner: '🔬 Keep learning to unlock blood patterns.',
    },
    ar: {
      title: '🧬 اختبار جينات فصائل الدم السريع',
      subtitle: 'اختبر مدى وعيك بقوانين مندل للتوارث ABO/Rh في 3 أسئلة تفاعلية سريعة!',
      questionLabel: 'السؤال',
      of: 'من أصل',
      nextBtn: 'السؤال التالي',
      submitBtn: 'تأكيد الإجابة',
      resultsBtn: 'عرض التقييم النهائي',
      retryBtn: 'إعادة الاختبار',
      explanationTitle: 'التوضيح العلمي:',
      correctStatus: 'إجابة صحيحة!',
      incorrectStatus: 'إجابة غير صحيحة',
      scoreLabel: 'حصيلة إجاباتك الصحيحة:',
      outOf: 'من أصل 3 أسئلة',
      achieveMaster: '🎓 خبير وراثة فريد! درجة كاملة!',
      achieveIntermediate: '📚 رائع جداً! معرفة ممتازة بالتوارث!',
      achieveBeginner: '🔬 واصل القراءة والاطلاع لتتقن فصائل الدم.',
    },
    fr: {
      title: '🧬 Mini-Quiz de Génétique Sanguine',
      subtitle: "Validez vos connaissances sur l'hérédité mendélienne ABO/Rh en 3 questions interactives !",
      questionLabel: 'Question',
      of: 'sur',
      nextBtn: 'Question Suivante',
      submitBtn: 'Valider la Réponse',
      resultsBtn: 'Afficher les Résultats',
      retryBtn: 'Recommencer le Quiz',
      explanationTitle: 'Explication Scientifique :',
      correctStatus: 'Bonne Réponse !',
      incorrectStatus: 'Mauvaise Réponse',
      scoreLabel: 'Votre Score Final :',
      outOf: 'sur 3 questions',
      achieveMaster: '🎓 Maître Absolu de la Génétique !',
      achieveIntermediate: '📚 Très bien ! Presque un sans-faute !',
      achieveBeginner: '🔬 Continuez de réviser les diagrammes mendéliens.',
    },
    es: {
      title: '🧬 Cuestionario Rápido de Genética',
      subtitle: '¡Valora tu comprensión de la herencia mendeliana ABO/Rh en solo 3 preguntas rápidas!',
      questionLabel: 'Pregunta',
      of: 'de',
      nextBtn: 'Siguiente Pregunta',
      submitBtn: 'Confirmar Respuesta',
      resultsBtn: 'Mostrar Calificación',
      retryBtn: 'Intentar de Nuevo',
      explanationTitle: 'Explicación Científica:',
      correctStatus: '¡Respuesta Correcta!',
      incorrectStatus: 'Respuesta Incorrecta',
      scoreLabel: 'Tu Puntos Obtenidos:',
      outOf: 'de 3 preguntas',
      achieveMaster: '🎓 ¡Maestro del Linaje Genético! ¡Excelente!',
      achieveIntermediate: '📚 ¡Muy bien! Casi dominio completo.',
      achieveBeginner: '🔬 Sigue estudiando las leyes de segregación.',
    },
  };

  const activeLang = labels[language] || labels.en;
  const currentQ = questions[currentIndex];

  const handleOptionSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedIdx(index);
  };

  const handleSubmit = () => {
    if (selectedIdx === null || isAnswered) return;
    setIsAnswered(true);

    if (selectedIdx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedIdx(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRetry = () => {
    setCurrentIndex(0);
    setSelectedIdx(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  const getPercentage = () => Math.round((score / questions.length) * 100);

  return (
    <div
      id="genetics-quiz-card"
      className="border border-slate-800 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 p-5 sm:p-7 relative overflow-hidden mt-6"
    >
      {/* Decorative ambient background rings */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full blur-2xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none" />

      <AnimatePresence mode="wait">
        {!isCompleted ? (
          <motion.div
            key={`question-${currentIndex}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Header / Meta */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/80 pb-3 gap-2">
              <div>
                <h4 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-2">
                  <span>{activeLang.title}</span>
                </h4>
                <p className="text-[10px] sm:text-xs text-slate-400 font-medium">
                  {activeLang.subtitle}
                </p>
              </div>

              <div className="self-start sm:self-center px-3 py-1 bg-slate-800/80 border border-slate-700/60 rounded-full text-[10px] font-mono font-bold text-rose-400">
                {activeLang.questionLabel} {currentIndex + 1} {activeLang.of} {questions.length}
              </div>
            </div>

            {/* Quiz Progress Bar */}
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-rose-500 to-rose-600 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <h5 className="text-sm sm:text-base font-bold text-slate-100 leading-snug">
              {currentQ.question[language] || currentQ.question.en}
            </h5>

            {/* Answers List */}
            <div className="space-y-2.5">
              {(currentQ.options[language] || currentQ.options.en).map((option, idx) => {
                const isSelected = selectedIdx === idx;
                const isCorrectOption = idx === currentQ.correctIndex;

                let btnStyle = 'border-slate-800 bg-slate-900/60 text-slate-300 hover:bg-slate-850 hover:border-slate-700';

                if (isAnswered) {
                  if (isCorrectOption) {
                    btnStyle = 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400 font-bold';
                  } else if (isSelected) {
                    btnStyle = 'border-rose-500/40 bg-rose-500/10 text-rose-400 font-bold';
                  } else {
                    btnStyle = 'border-slate-850 bg-slate-900/40 text-slate-500 opacity-60';
                  }
                } else if (isSelected) {
                  btnStyle = 'border-rose-500 bg-rose-500/15 text-white font-extrabold';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    disabled={isAnswered}
                    className={`w-full text-left p-3.5 rounded-2xl border text-xs sm:text-sm font-semibold transition-all flex items-center justify-between gap-3 ${btnStyle} ${
                      !isAnswered ? 'cursor-pointer active:scale-[0.99]' : 'cursor-default'
                    }`}
                  >
                    <span>{option}</span>

                    {/* Check / Close Indicators */}
                    {isAnswered && isCorrectOption && (
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/40">
                        <Check className="w-3 h-3 text-emerald-400" />
                      </span>
                    )}
                    {isAnswered && isSelected && !isCorrectOption && (
                      <span className="w-5 h-5 rounded-full bg-rose-500/20 flex items-center justify-center shrink-0 border border-rose-500/40">
                        <X className="w-3 h-3 text-rose-400" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation card */}
            {isAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-3.5 sm:p-4 rounded-2xl border text-xs leading-relaxed space-y-1 ${
                  selectedIdx === currentQ.correctIndex
                    ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-300'
                    : 'bg-rose-500/5 border-rose-500/20 text-rose-300'
                }`}
              >
                <div className="font-extrabold flex items-center gap-1.5 uppercase text-[10px] sm:text-xs tracking-wider">
                  {selectedIdx === currentQ.correctIndex ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <X className="w-4 h-4 text-rose-400" />
                  )}
                  <span>
                    {selectedIdx === currentQ.correctIndex
                      ? activeLang.correctStatus
                      : activeLang.incorrectStatus}
                  </span>
                </div>
                <div className="font-bold pt-1 text-white text-[11px] sm:text-xs">
                  {activeLang.explanationTitle}
                </div>
                <p className="font-medium text-slate-300">
                  {currentQ.explanation[language] || currentQ.explanation.en}
                </p>
              </motion.div>
            )}

            {/* Actions panel */}
            <div className="flex justify-end pt-2 border-t border-slate-800/40">
              {!isAnswered ? (
                <button
                  onClick={handleSubmit}
                  disabled={selectedIdx === null}
                  className={`py-2.5 px-6 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all duration-200 ${
                    selectedIdx === null
                      ? 'bg-slate-850 text-slate-500 border border-slate-800 opacity-50 cursor-not-allowed'
                      : 'bg-rose-600 hover:bg-rose-500 text-white cursor-pointer active:scale-95'
                  }`}
                >
                  {activeLang.submitBtn}
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="py-2.5 px-6 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-rose-600 hover:bg-rose-500 text-white cursor-pointer active:scale-95 transition-all"
                >
                  {currentIndex === questions.length - 1 ? activeLang.resultsBtn : activeLang.nextBtn}
                </button>
              )}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="quiz-results"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6 sm:py-8 space-y-6"
          >
            {/* Crown / Trophy icon with pulse animation */}
            <div className="relative inline-flex items-center justify-center">
              <span className="absolute inset-0 bg-rose-500/20 rounded-full blur-xl scale-110 animate-ping" />
              <div className="w-16 h-16 rounded-2xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 relative z-10">
                <Award className="w-8 h-8" />
              </div>
            </div>

            {/* Score Statement */}
            <div className="space-y-2">
              <h4 className="text-lg sm:text-xl font-extrabold text-white tracking-tight">
                {activeLang.scoreLabel}
              </h4>
              <div className="text-3xl sm:text-4xl font-extrabold text-rose-500 font-mono">
                {score} / {questions.length}
              </div>
              <p className="text-xs text-slate-400 font-bold">
                ({getPercentage()}% {activeLang.outOf})
              </p>
            </div>

            {/* Achievement Text */}
            <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-900 border border-slate-800/80">
              <p className="text-xs sm:text-sm font-extrabold text-[#F3F4F6] leading-relaxed">
                {score === 3
                  ? activeLang.achieveMaster
                  : score >= 1
                    ? activeLang.achieveIntermediate
                    : activeLang.achieveBeginner}
              </p>
            </div>

            {/* Action buttons */}
            <div className="flex justify-center pt-2">
              <button
                onClick={handleRetry}
                className="inline-flex items-center gap-2 py-2.5 px-6 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider bg-rose-600 hover:bg-rose-500 text-white cursor-pointer active:scale-95 transition-all"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>{activeLang.retryBtn}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

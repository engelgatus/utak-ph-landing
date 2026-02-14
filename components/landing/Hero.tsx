'use client';

import { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hyperspeed from '@/components/background/Hyperspeed';
import { 
  Terminal, 
  Cpu, 
  Wifi, 
  ChevronRight, 
  ChevronLeft
} from 'lucide-react';

// --- Configuration ---

const HYPERSPEED_OPTIONS = {
  distortion: "turbulentDistortion",
  length: 400,
  roadWidth: 10,
  islandWidth: 2,
  lanesPerRoad: 3,
  fov: 90,
  fovSpeedUp: 150,
  speedUp: 2,
  carLightsFade: 0.4,
  totalSideLightSticks: 20,
  lightPairsPerRoadWay: 40,
  shoulderLinesWidthPercentage: 0.05,
  brokenLinesWidthPercentage: 0.1,
  brokenLinesLengthPercentage: 0.5,
  lightStickWidth: [0.12, 0.5] as [number, number],
  lightStickHeight: [1.3, 1.7] as [number, number],
  movingAwaySpeed: [60, 80] as [number, number],
  movingCloserSpeed: [-120, -160] as [number, number],
  carLightsLength: [12, 80] as [number, number],
  carLightsRadius: [0.05, 0.14] as [number, number],
  carWidthPercentage: [0.3, 0.5] as [number, number],
  carShiftX: [-0.8, 0.8] as [number, number],
  carFloorSeparation: [0, 5] as [number, number],
  colors: {
    roadColor: 0x080808,
    islandColor: 0x0a0a0a,
    background: 0x000000,
    shoulderLines: 0x131318,
    brokenLines: 0x131318,
    leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
    rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
    sticks: 0x03b3c3
  }
};

const STEPS = [
  {
    id: '01',
    title: 'STRATEGY_PROTOCOL',
    subtitle: 'LLM: PERPLEXITY',
    icon: <Terminal className="h-12 w-12 sm:h-20 sm:w-20" />,
    description: "I begin by consulting Perplexity to architect the solution. We iterate on the logic, generate core code blueprints, and validate the entire strategy before I write a single line of code.",
  },
  {
    id: '02',
    title: 'ASSEMBLY_PHASE',
    subtitle: 'ENV: VS_CODE',
    icon: <Cpu className="h-12 w-12 sm:h-20 sm:w-20" />,
    description: "Next, I switch to VS Code to bring the project to life. I integrate the generated modules, manage dependencies, and refine the codebase into a cohesive, production-ready application.",
  },
  {
    id: '03',
    title: 'DEPLOYMENT_CHECK',
    subtitle: 'TARGET: GITHUB_PAGES',
    icon: <Wifi className="h-12 w-12 sm:h-20 sm:w-20" />,
    description: "Finally, I run system diagnostics and performance optimizations. Once the build is verified and fully responsive, I deploy it directly to GitHub Pages for public access.",
  }
];

// --- Sub-Components ---

// 1. Stable Background
const HyperspeedBackground = memo(() => (
  <div className="absolute inset-0 z-0">
    <Hyperspeed
      className="w-full h-full"
      effectOptions={HYPERSPEED_OPTIONS}
    />
    <div 
      className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10"
      style={{ backgroundSize: "100% 2px, 3px 100%" }} 
    />
  </div>
));
HyperspeedBackground.displayName = 'HyperspeedBackground';

// 2. Stable Typewriter Effect
const Typewriter = ({ 
  text, 
  speed = 30, 
  start = false, 
  onComplete, 
  className 
}: { 
  text: string; 
  speed?: number; 
  start: boolean; 
  onComplete?: () => void;
  className?: string; 
}) => {
  const [displayText, setDisplayText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!start) {
        setDisplayText('');
        setIsDone(false);
        return;
    }

    setDisplayText('');
    setIsDone(false);

    let i = 0;
    const timer = setInterval(() => {
      if (i <= text.length) {
        setDisplayText(text.slice(0, i));
        i++;
      } else {
        clearInterval(timer);
        setIsDone(true);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, start]); 

  return (
    <span className={className}>
      {displayText}
      <span 
        className={`ml-1 inline-block h-4 w-2 bg-green-500 align-middle ${
          !isDone && start ? "animate-pulse" : "opacity-0"
        }`} 
      />
    </span>
  );
};

// 3. Sequenced Terminal Content
const TerminalContent = ({ data }: { data: typeof STEPS[0] }) => {
  const [stage, setStage] = useState(0); 

  return (
    <div className="flex flex-col justify-center text-left h-full">
      {/* Title */}
      <div className="h-16 flex items-center mb-2">
        <h2 className="text-3xl font-bold uppercase tracking-tighter sm:text-5xl text-green-400 drop-shadow-[0_0_5px_rgba(34,197,94,0.8)] leading-none">
          <Typewriter 
            text={data.title} 
            start={true} 
            speed={30}
            onComplete={() => setStage(1)} 
          />
        </h2>
      </div>
      
      {/* Subtitle */}
      <div className="h-8 flex items-center mb-6">
        <p className="text-lg font-bold uppercase tracking-widest text-green-600 leading-none">
          <Typewriter 
            text={data.subtitle} 
            start={stage >= 1} 
            speed={20}
            onComplete={() => setStage(2)} 
          />
        </p>
      </div>
      
      {/* Description */}
      <div className="min-h-24 sm:min-h-28">
        <p className="text-base leading-relaxed sm:text-xl opacity-90">
          <span className="mr-2 text-green-400">{'>'}</span>
          <Typewriter 
            text={data.description} 
            start={stage >= 2} 
            speed={15} 
          />
        </p>
      </div>
    </div>
  );
};

// --- Main Component ---

export default function Hero() {
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setDirection(1);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((prev) => prev - 1);
    }
  };

  const jumpToStep = (index: number) => {
    if (index === currentStep) return;
    setDirection(index > currentStep ? 1 : -1);
    setCurrentStep(index);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 50 : -50,
      opacity: 0,
    })
  };

  const currentData = STEPS[currentStep];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black font-mono text-green-500 selection:bg-green-500 selection:text-black">
      
      {/* Background */}
      <HyperspeedBackground />

      {/* Main Terminal Container */}
      <div className="relative z-10 flex h-full w-full items-center justify-center p-4">
        
        {/* The "Screen" Box */}
        <div className="relative w-full max-w-6xl border-2 border-green-500 bg-black/80 p-6 shadow-[0_0_30px_rgba(34,197,94,0.2)] backdrop-blur-sm sm:p-12">
          
          {/* Header Status Bar */}
          <div className="mb-10 flex flex-col gap-2 border-b border-green-500/30 pb-4 text-xs uppercase tracking-widest opacity-80 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
            <div className="flex gap-4">
              <span className="font-bold text-green-400">SYSTEM_STATUS: ONLINE</span>
              <span>[MODEL: PERPLEXITY_GEMINI_PRO]</span>
            </div>
            <div className="flex gap-4">
               <span>UPTIME: 99.9%</span>
               <span>USER: ENGEL</span>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-12 lg:grid-cols-[1fr_2fr]">
            
            {/* Left Col: Icon & Progress */}
            <div className="flex flex-col items-center justify-center border-b border-green-500/30 pb-8 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-12">
              <div className="mb-8 rounded-none border border-green-500 bg-green-500/10 p-8 shadow-[0_0_15px_rgba(34,197,94,0.2)]">
                {currentData.icon}
              </div>
              
              {/* Block Progress Bar - Now Interactive */}
              <div className="flex gap-3">
                {STEPS.map((step, idx) => (
                  <button 
                    key={step.id}
                    onClick={() => jumpToStep(idx)}
                    className={`h-3 w-3 sm:h-5 sm:w-5 border border-green-500 transition-all duration-300 cursor-pointer hover:bg-green-500/50 hover:shadow-[0_0_8px_rgba(34,197,94,0.6)] ${
                      idx === currentStep ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]' : 'bg-transparent opacity-30'
                    }`}
                    aria-label={`Go to step ${step.id}`}
                  />
                ))}
              </div>
              <div className="mt-4 text-sm font-bold tracking-widest">PHASE {currentData.id} / 03</div>
            </div>

            {/* Right Col: Sequenced Typewriter Content */}
            <div className="relative h-64 sm:h-52">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="absolute inset-0"
                >
                  <TerminalContent data={currentData} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Controls */}
          <div className="mt-16 flex items-center justify-between border-t border-green-500/30 pt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="group flex items-center gap-2 text-base font-bold uppercase tracking-widest transition-all hover:text-green-300 hover:shadow-[0_0_10px_rgba(34,197,94,0.4)] disabled:opacity-20 disabled:hover:shadow-none"
            >
              <span className="text-xl">[</span>
              <ChevronLeft className="h-5 w-5" />
              <span>PREV</span>
              <span className="text-xl">]</span>
            </button>

            <button
              onClick={nextStep}
              disabled={currentStep === STEPS.length - 1}
              className="group flex items-center gap-2 text-base font-bold uppercase tracking-widest transition-all hover:text-green-300 hover:shadow-[0_0_10px_rgba(34,197,94,0.4)] disabled:opacity-20 disabled:hover:shadow-none"
            >
              <span className="text-xl">[</span>
              <span>{currentStep === STEPS.length - 1 ? 'FINISH' : 'NEXT'}</span>
              <ChevronRight className="h-5 w-5" />
              <span className="text-xl">]</span>
            </button>
          </div>

          {/* Job Requirement Disclaimer (Footer) */}
          <div className="mt-8 border-t border-dashed border-green-900/50 pt-4 text-[10px] sm:text-xs font-bold text-green-700/80">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <span className="block text-green-600 mb-1">{'>> TARGET: UTAK_POS [REMOTE_VIBECODER]'}</span>
                <p className="leading-tight">REQ: REACT/NODE | GIT | PRODUCT_SENSE | INDEPENDENT</p>
                <p className="leading-tight">STACK: NEXT.JS 14 | TYPESCRIPT | TAILWIND | THREE.JS</p>
              </div>
              <div className="sm:text-right">
                <span className="block text-green-600 mb-1">{'>> SUBMISSION_PROTOCOL'}</span>
                <p className="leading-tight">DEPLOY_URL: info@utak.ph</p>
                <p className="leading-tight">STATUS: APPLICATION_READY</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}

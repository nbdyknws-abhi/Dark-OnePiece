import { NarrativeProvider, useNarrative } from './context/NarrativeContext';
import { AnimatePresence } from 'framer-motion';
import CanvasBackground from './components/CanvasBackground';
import LandingOverlay from './components/LandingOverlay';
import UniverseGraph from './components/UniverseGraph';
import DarkProfile from './components/DarkProfile';
import CinematicJourney from './components/CinematicJourney';
import Forbidden from './components/Forbidden';

function AppContent() {
  const { 
    exploreState, 
    setIsCodexOpen, 
    isGeopoliticalToggled, 
    setIsGeopoliticalToggled,
    startJourney,
    activeNode
  } = useNarrative();

  return (
    <div className="relative h-screen w-screen overflow-hidden text-parchment font-sans selection:bg-gold selection:text-charcoal bg-[#040506]">
      {/* 1. Cinematic Film Grain Overlay */}
      <div className="noise-overlay pointer-events-none fixed inset-0 z-50 opacity-60 mix-blend-overlay" />

      {/* 2. Interactive Ambient Weather Background - Fixed beneath everything */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <CanvasBackground />
      </div>

      {/* 3. The Core Universe Experience */}
      <LandingOverlay />
      
      {/* Exploration HUD Control Bar */}
      {exploreState === 'exploring' && (
        <div className="absolute top-2 left-2 right-2 md:top-6 md:left-6 md:right-6 z-30 flex flex-col xl:flex-row items-center justify-between p-3 md:px-6 rounded bg-[#090b0e]/85 backdrop-blur-xl border border-gold/15 shadow-[0_0_20px_rgba(0,0,0,0.8)] animate-fade-in gap-3 xl:gap-0 max-h-[40vh] overflow-y-auto overflow-x-hidden no-scrollbar">
          {/* Brand/Indicator */}
          <div className="flex items-center space-x-3 w-full xl:w-auto justify-center xl:justify-start">
            <div className="w-2 h-2 rounded-full bg-gold shrink-0" />
            <div className="flex flex-col text-center xl:text-left">
              <span className="text-[11px] font-serif font-black tracking-widest text-parchment uppercase">
                THE GRAND ERA
              </span>
              <span className="text-[8px] font-mono tracking-wider text-gold/60 uppercase">
                LORE REPOSITORY MATRIX
              </span>
            </div>
          </div>

          {/* Interactive Controls */}
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 w-full xl:w-auto">
            {/* Toggle faction boundaries */}
            <button
              onClick={() => setIsGeopoliticalToggled(!isGeopoliticalToggled)}
              className={`px-3 py-1.5 rounded border text-[9px] font-mono tracking-widest uppercase transition-all cursor-pointer whitespace-nowrap ${
                isGeopoliticalToggled
                  ? 'bg-gold/15 border-gold text-gold text-glow-gold'
                  : 'bg-transparent border-white/10 text-fog/60 hover:text-parchment hover:border-gold/30'
              }`}
            >
              Territory Overlay: {isGeopoliticalToggled ? 'ACTIVE' : 'OFF'}
            </button>

            {/* Quick Travel Voyages */}
            <div className="flex flex-wrap justify-center items-center gap-1.5 bg-black/40 border border-white/5 p-1.5 md:px-2.5 md:py-1.5 rounded w-full sm:w-auto">
              <span className="text-[8px] font-mono text-fog/40 tracking-wider uppercase mr-1 whitespace-nowrap">
                Voyage Paths:
              </span>
              {['luffy', 'robin', 'law', 'shanks', 'blackbeard', 'koby'].map((vKey) => (
                <button
                  key={vKey}
                  onClick={() => startJourney(vKey)}
                  className="px-2 py-0.5 rounded bg-gold/5 border border-gold/25 hover:border-gold hover:bg-gold/15 text-gold text-[8px] font-mono tracking-widest uppercase transition-all cursor-pointer animate-pulse-slow"
                >
                  {vKey}
                </button>
              ))}
            </div>

            {/* Open Forbidden */}
            <button
              onClick={() => setIsCodexOpen(true)}
              className="px-4 py-1.5 rounded border border-crimson/50 hover:border-crimson bg-crimson/10 hover:bg-crimson/25 text-crimson-light hover:text-white text-[9px] font-mono tracking-widest uppercase transition-all flex items-center justify-center space-x-1.5 cursor-pointer whitespace-nowrap"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-crimson animate-ping shrink-0" />
              <span>Forbidden</span>
            </button>
          </div>
        </div>
      )}

      {exploreState === 'journey' ? (
        <CinematicJourney />
      ) : (
        <>
          <UniverseGraph />
          <AnimatePresence>
            {activeNode && <DarkProfile />}
          </AnimatePresence>
        </>
      )}

      {/* 4. Fullscreen Forbidden Overlay */}
      <Forbidden />
    </div>
  );
}

export default function App() {
  return (
    <NarrativeProvider>
      <AppContent />
    </NarrativeProvider>
  );
}

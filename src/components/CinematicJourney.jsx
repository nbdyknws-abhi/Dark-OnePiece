import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, ArrowLeft, ArrowRight, X, Volume2, Anchor } from 'lucide-react';
import { useNarrative } from '../context/NarrativeContext';
import { JOURNEYS } from '../data/loreData';

const SCENE_MAP = {
  // Core scene locations
  'marineford': '/assets/scenes/marineford.png',
  'east-blue': '/assets/scenes/landing_bg.png',
  'wano': '/assets/scenes/wano.png',
  'onigashima': '/assets/scenes/wano.png',
  'enies-lobby': '/assets/scenes/enies-lobby.png',
  'sabaody': '/assets/scenes/landing_bg.png',
  'impel-down': '/assets/scenes/marineford.png',
  'dressrosa': '/assets/scenes/enies-lobby.png',
  'whole-cake': '/assets/scenes/landing_bg.png',
  'egghead': '/assets/scenes/egghead.png',
  'elbaph': '/assets/scenes/elbaph.png',
  'ohara': '/assets/scenes/ohara.png',
  'hachinosu': '/assets/scenes/hachinosu.png',
  'hachinosu-escape': '/assets/scenes/hachinosu.png',
  'laughtale': '/assets/scenes/laughtale.png',

  // Voyage-specific additional waypoints mapping to high-quality fallbacks
  'alabasta': '/assets/scenes/wano.png',
  'baltigo': '/assets/scenes/landing_bg.png',
  'flevance': '/assets/scenes/ohara.png',
  'corazon': '/assets/scenes/ohara.png',
  'winner-island': '/assets/scenes/hachinosu.png',
  'loguetown': '/assets/scenes/landing_bg.png',
  'foosha': '/assets/scenes/landing_bg.png',
  'wano-coast': '/assets/scenes/wano.png',
  'moby-dick': '/assets/scenes/landing_bg.png',
  'banaro': '/assets/scenes/marineford.png',
  'rocky-port': '/assets/scenes/marineford.png',
};

const PORTRAIT_MAP = {
  'luffy': '/assets/portraits/luffy.png',
  'robin': '/assets/portraits/robin.png',
  'dragon': '/assets/portraits/dragon.png',
  'sakazuki': '/assets/portraits/sakazuki.png',
  'shanks': '/assets/portraits/shanks.png',
  'roger': '/assets/portraits/roger.png',
  'whitebeard': '/assets/portraits/whitebeard.png',
  'kaido': '/assets/portraits/kaido.png',
  'vegapunk': '/assets/portraits/vegapunk.png',
  'saturn': '/assets/portraits/saturn.png',
  'kuma': '/assets/portraits/kuma.png',
  'bonney': '/assets/portraits/bonney.png',
  'koby': '/assets/portraits/koby.png',
  'loki': '/assets/portraits/loki.png',
  'blackbeard': '/assets/portraits/blackbeard.png',
  'garp': '/assets/portraits/garp.png',
  'kid': '/assets/portraits/kid.png',
  'law': '/assets/portraits/law.png',
};

export default function CinematicJourney() {
  const {
    activeJourney,
    activeWaypointIndex,
    nextWaypoint,
    prevWaypoint,
    jumpToWaypoint,
    exitJourney,
    selectNode
  } = useNarrative();

  const nameToId = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('luffy')) return 'luffy';
    if (lower.includes('robin')) return 'robin';
    if (lower.includes('law')) return 'law';
    if (lower.includes('dragon')) return 'dragon';
    if (lower.includes('sakazuki')) return 'sakazuki';
    if (lower.includes('shanks')) return 'shanks';
    if (lower.includes('roger')) return 'roger';
    if (lower.includes('whitebeard') || lower.includes('newgate')) return 'whitebeard';
    if (lower.includes('kaido')) return 'kaido';
    if (lower.includes('vegapunk')) return 'vegapunk';
    if (lower.includes('saturn')) return 'saturn';
    if (lower.includes('kuma')) return 'kuma';
    if (lower.includes('bonney')) return 'bonney';
    if (lower.includes('koby')) return 'koby';
    if (lower.includes('loki')) return 'loki';
    if (lower.includes('blackbeard') || lower.includes('teach')) return 'blackbeard';
    if (lower.includes('garp')) return 'garp';
    if (lower.includes('kid')) return 'kid';

    if (lower.includes('straw hat')) return 'straw-hats';
    if (lower.includes('revolution')) return 'revolutionaries';
    if (lower.includes('marine')) return 'marines';
    if (lower.includes('sovereign') || lower.includes('world-gov') || lower.includes('elders')) return 'world-gov';

    if (lower.includes('ohara')) return 'ohara';
    if (lower.includes('marineford')) return 'marineford';
    if (lower.includes('wano')) return 'wano';
    if (lower.includes('egghead')) return 'egghead';
    if (lower.includes('hachinosu')) return 'hachinosu';
    if (lower.includes('elbaph')) return 'elbaph';
    if (lower.includes('laughtale') || lower.includes('laugh tale')) return 'laughtale';

    if (lower.includes('void century')) return 'void-century';
    if (lower.includes('poneglyph')) return 'poneglyphs';
    if (lower.includes('summit war') || lower.includes('summit-war')) return 'summit-war';
    return null;
  };

  const handleTagClick = (nodeId) => {
    exitJourney();
    setTimeout(() => {
      selectNode(nodeId);
    }, 400);
  };

  const journey = JOURNEYS[activeJourney];

  // Viewport camera states
  const [zoomScale, setZoomScale] = useState(1.4);
  const [mapOffset, setMapOffset] = useState({ x: 0, y: 0 });
  const [showIntro, setShowIntro] = useState(true);
  const [introDismounted, setIntroDismounted] = useState(false);

  // Trigger camera movement and chapter intro on waypoint change
  useEffect(() => {
    if (!journey) return;
    const waypoint = journey.waypoints[activeWaypointIndex];
    if (!waypoint) return;

    // Defer state updates to avoid synchronous cascade renders flagged by linter
    const stateTimeout = setTimeout(() => {
      setShowIntro(true);
      setIntroDismounted(false);
      // 1. First zoom out slightly for the travel effect
      setZoomScale(0.9);
    }, 0);

    // 2. Pan to the target coordinates after a brief delay
    const panTimeout = setTimeout(() => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      // Calculate translate coordinates to center the active node
      const scaleVal = 1.6;
      setMapOffset({
        x: centerX - waypoint.x * scaleVal,
        y: centerY - waypoint.y * scaleVal
      });
      
      // 3. Zoom back in on the destination
      const zoomTimeout = setTimeout(() => {
        setZoomScale(1.4);
      }, 500);
      return () => clearTimeout(zoomTimeout);
    }, 200);

    // Auto-dissolve intro screen after 3.5 seconds if they don't click manually
    const autoTimeout = setTimeout(() => {
      setIntroDismounted(true);
    }, 3800);

    return () => {
      clearTimeout(stateTimeout);
      clearTimeout(panTimeout);
      clearTimeout(autoTimeout);
    };
  }, [activeWaypointIndex, journey]);

  // Safe checks after hooks
  if (!journey) return null;

  const currentWaypoint = journey.waypoints[activeWaypointIndex];
  const totalWaypoints = journey.waypoints.length;

  // Handle manual intro dismiss
  const dismissIntro = () => {
    setIntroDismounted(true);
  };

  // Helper to generate a curved ocean route between waypoints
  const getCurvePath = (p1, p2) => {
    const scaleVal = 1.6;
    const x1 = p1.x * scaleVal;
    const y1 = p1.y * scaleVal;
    const x2 = p2.x * scaleVal;
    const y2 = p2.y * scaleVal;
    
    const dx = x2 - x1;
    const dy = y2 - y1;
    // Create a perpendicular curve offset
    const cx = x1 + dx * 0.5 - dy * 0.15;
    const cy = y1 + dy * 0.5 + dx * 0.15;
    return `M ${x1} ${y1} Q ${cx} ${cy} ${x2} ${y2}`;
  };

  return (
    <div className="absolute inset-0 z-40 bg-[#020304] overflow-hidden select-none">
      
      {/* 1. COMPASS HUD & COORDINATES */}
      <div className="absolute left-8 top-8 z-30 flex items-center space-x-4 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="text-gold/30 hover:text-gold/60 transition-colors"
        >
          <Compass className="w-10 h-10 stroke-[1]" />
        </motion.div>
        <div>
          <h5 className="text-[10px] font-mono tracking-widest text-gold/40 uppercase">
            VOYAGE SCANNING
          </h5>
          <h4 className="text-xs font-mono font-bold text-parchment tracking-wider uppercase mt-0.5">
            {journey.name} // {currentWaypoint.chapter.split(":")[0]}
          </h4>
        </div>
      </div>

      <div className="absolute right-8 top-8 z-30 flex items-center space-x-6">
        <div className="text-right pointer-events-none">
          <span className="text-[8px] font-mono text-fog/40 uppercase block tracking-widest">
            CURRENT ATMOSPHERE
          </span>
          <span className="text-xs font-mono text-gold tracking-widest uppercase font-semibold">
            {currentWaypoint.weather.replace("-", " ")}
          </span>
        </div>
        <button
          onClick={exitJourney}
          className="w-10 h-10 rounded-full border border-gold/15 bg-black/60 flex items-center justify-center text-gold/60 hover:text-gold hover:border-gold/50 hover:bg-black/90 transition-all cursor-pointer"
          title="Exit Journey"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* 2. THE MAP CANVAS CONTAINER */}
      <motion.div
        animate={{
          x: mapOffset.x,
          y: mapOffset.y,
          scale: zoomScale
        }}
        transition={{
          type: "spring",
          damping: 24,
          stiffness: 70,
          mass: 1.2
        }}
        className="w-full h-full origin-center cursor-grab active:cursor-grabbing"
      >
        <svg 
          width="2000" 
          height="1500" 
          viewBox="0 0 2000 1500" 
          className="absolute top-0 left-0 pointer-events-none"
        >
          {/* Grid lines */}
          <defs>
            <pattern id="sea-grid" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(212, 175, 55, 0.03)" strokeWidth="0.5" />
            </pattern>
            
            {/* Volumetric Fog SVG Filter */}
            <filter id="fog-filter" x="-20%" y="-20%" width="140%" height="140%">
              <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="4" result="noise" />
              <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.8 0" />
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="35" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>

          {/* Sea Grid Background */}
          <rect width="100%" height="100%" fill="url(#sea-grid)" />

          {/* Drifting currents lines */}
          <path
            d="M 50 100 Q 300 150 500 50 T 1000 150 T 1500 80 T 1900 200"
            fill="none"
            stroke="rgba(212, 175, 55, 0.04)"
            strokeWidth="1"
            strokeDasharray="100, 300"
            className="animate-pulse"
          />
          <path
            d="M 100 800 Q 400 900 700 750 T 1300 850 T 1800 700"
            fill="none"
            stroke="rgba(212, 175, 55, 0.03)"
            strokeWidth="1.5"
            strokeDasharray="150, 400"
            className="animate-pulse"
          />

          {/* GLOWING SEA ROUTES (WAYPOINT PATHS) */}
          {journey.waypoints.map((wp, idx) => {
            if (idx === 0) return null;
            const prevWp = journey.waypoints[idx - 1];
            
            const isRevealed = idx <= activeWaypointIndex;
            const isCurrentSegment = idx === activeWaypointIndex;
            
            const segmentPath = getCurvePath(prevWp, wp);
            
            return (
              <g key={`route-${idx}`}>
                {/* Underlay route */}
                <path
                  d={segmentPath}
                  fill="none"
                  stroke={isRevealed ? "rgba(212, 175, 55, 0.25)" : "rgba(255, 255, 255, 0.05)"}
                  strokeWidth="1"
                  strokeDasharray="3, 5"
                />
                
                {/* Active Glowing Animated Line */}
                {isRevealed && (
                  <motion.path
                    d={segmentPath}
                    fill="none"
                    stroke="#d4af37"
                    strokeWidth="1.5"
                    strokeDasharray="10, 15"
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: -200 }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      filter: 'drop-shadow(0px 0px 4px rgba(212, 175, 55, 0.45))',
                      opacity: isCurrentSegment ? 0.95 : 0.4
                    }}
                  />
                )}
              </g>
            );
          })}

          {/* ISLAND WAYPOINT NODES */}
          {journey.waypoints.map((wp, idx) => {
            const scaleVal = 1.6;
            const x = wp.x * scaleVal;
            const y = wp.y * scaleVal;
            
            const isVisited = idx <= activeWaypointIndex;
            const isActive = idx === activeWaypointIndex;
            const isSelectable = idx <= activeWaypointIndex + 1; // can see immediate next

            return (
              <g
                key={`wp-${wp.id}`}
                transform={`translate(${x}, ${y})`}
                className="cursor-pointer"
                onClick={() => isSelectable && jumpToWaypoint(idx)}
                style={{ pointerEvents: isSelectable ? 'auto' : 'none' }}
              >
                {/* Outer Glow for Active */}
                {isActive && (
                  <>
                    <motion.circle
                      r="16"
                      fill="none"
                      stroke="#d4af37"
                      strokeWidth="0.5"
                      initial={{ scale: 0.8, opacity: 0.8 }}
                      animate={{ scale: 1.6, opacity: 0 }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                    />
                    <circle r="8" fill="none" stroke="#d4af37" strokeWidth="0.8" className="animate-pulse" />
                  </>
                )}

                {/* Main Node Circle */}
                <circle
                  r="5"
                  fill={isActive ? "#d4af37" : (isVisited ? "#121924" : "#080c12")}
                  stroke={isVisited ? "#d4af37" : "rgba(255, 255, 255, 0.15)"}
                  strokeWidth="1.5"
                  className="transition-colors duration-1000"
                />

                {/* Waypoint Label */}
                {isSelectable && (
                  <text
                    y="22"
                    fill={isActive ? "#d4af37" : (isVisited ? "#eae0d5" : "rgba(234, 224, 213, 0.3)")}
                    fontSize="7"
                    fontFamily="Cinzel, Georgia, serif"
                    textAnchor="middle"
                    className="font-bold tracking-wider select-none uppercase transition-colors duration-1000"
                  >
                    {wp.name}
                  </text>
                )}
                
                {/* Node Symbol Placeholder (Hidden if not revealed) */}
                {isActive && (
                  <text
                    y="-12"
                    fontSize="10"
                    textAnchor="middle"
                    className="select-none pointer-events-none filter drop-shadow"
                  >
                    {wp.symbol}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* 3. VOLUMETRIC FOG OVERLAY (Fades as the user explores) */}
        {/* We map absolute divs with svg filters to act as realistic mist clouds. */}
        <div className="absolute inset-0 pointer-events-none mix-blend-color-dodge opacity-20">
          <div className="absolute top-1/4 left-1/4 w-[800px] h-[500px] bg-fog/20 rounded-full blur-[80px]" style={{ filter: 'url(#fog-filter)' }} />
          <div className="absolute top-1/2 left-2/3 w-[900px] h-[600px] bg-fog/15 rounded-full blur-[100px]" style={{ filter: 'url(#fog-filter)' }} />
        </div>
      </motion.div>

      {/* 4. CHAPTER INTRO OVERLAY CARD */}
      <AnimatePresence>
        {showIntro && !introDismounted && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            onClick={dismissIntro}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black/90 cursor-pointer"
          >
            {/* Atmospheric scene background */}
            {SCENE_MAP[currentWaypoint.id] && (
              <motion.img
                key={currentWaypoint.id}
                src={SCENE_MAP[currentWaypoint.id]}
                alt=""
                initial={{ scale: 1, opacity: 0 }}
                animate={{ scale: 1.15, opacity: 0.18 }}
                transition={{ scale: { duration: 10, ease: "linear" }, opacity: { duration: 2, ease: "easeIn" } }}
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
              />
            )}
            {/* Dark overlay to keep text readable */}
            <div className="absolute inset-0 bg-black/70 pointer-events-none" />
            <div className="relative z-10 text-center max-w-3xl px-6 space-y-6">
              <motion.span
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 0.4, y: 0 }}
                transition={{ delay: 0.3, duration: 1 }}
                className="text-[10px] font-mono tracking-[0.5em] text-gold uppercase block"
              >
                {currentWaypoint.chapter}
              </motion.span>
              
              <motion.h2
                initial={{ opacity: 0, filter: "blur(8px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ delay: 0.6, duration: 1.5 }}
                className="font-serif text-5xl md:text-7xl text-parchment font-black tracking-tight leading-tight uppercase"
              >
                {currentWaypoint.name}
              </motion.h2>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="h-[1px] w-24 bg-gold/30 mx-auto"
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 1.4, duration: 1.2 }}
                className="font-serif italic text-lg text-gold-dark"
              >
                "{currentWaypoint.tagline}"
              </motion.p>
              
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 2.2, duration: 1 }}
                className="text-[8px] font-mono text-fog uppercase tracking-[0.3em] block pt-10"
              >
                [ CLICK SEA TO PENETRATE MEMORY ]
              </motion.span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 5. VOYAGE DESCRIPTION BOTTOM CONSOLE */}
      <div className="absolute bottom-8 left-8 right-8 z-30 flex justify-center pointer-events-none">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1, type: "spring" }}
          className="glass-panel w-full max-w-5xl rounded-lg p-6 flex flex-col md:flex-row md:items-stretch justify-between pointer-events-auto gap-6 shadow-2xl relative overflow-hidden"
        >
          {/* Left Block - Chapter & Stakes */}
          <div className="flex-1 space-y-4">
            <div className="flex items-center space-x-3 text-[10px] font-mono text-gold/50 tracking-wider">
              <Anchor className="w-3.5 h-3.5 text-gold/60" />
              <span>WAYPOINT {activeWaypointIndex + 1} OF {totalWaypoints}</span>
              <span>•</span>
              <span className="flex items-center">
                <Volume2 className="w-3.5 h-3.5 mr-1" />
                {currentWaypoint.sound}
              </span>
            </div>

            <div className="flex items-center gap-3">
              {PORTRAIT_MAP[journey.characterId] && (
                <img
                  src={PORTRAIT_MAP[journey.characterId]}
                  alt={journey.name}
                  className="w-9 h-9 rounded-full object-cover border border-gold/30 flex-shrink-0"
                />
              )}
              <div>
                <h3 className="font-serif text-2xl font-bold text-parchment uppercase leading-none">
                  {currentWaypoint.name}
                </h3>
                <p className="text-[10px] font-mono text-gold-dark tracking-widest uppercase mt-1">
                  {currentWaypoint.tagline}
                </p>
              </div>
            </div>

            <p className="text-xs font-light text-fog/90 leading-relaxed max-w-3xl">
              {currentWaypoint.lore}
            </p>
          </div>

          <div className="w-[1px] bg-gold/10 hidden md:block" />

          {/* Center Block - Stakes and details */}
          <div className="flex-1 space-y-3 flex flex-col justify-center">
            <div>
              <h5 className="text-[9px] font-mono tracking-widest text-gold/40 uppercase block mb-1">
                EMOTIONAL STAKES & NARRATIVE TENSION
              </h5>
              <p className="text-xs text-parchment/90 italic font-serif leading-relaxed">
                "{currentWaypoint.stakes}"
              </p>
            </div>

            <div className="flex flex-wrap gap-2 pt-1.5">
              {currentWaypoint.factions.map(f => {
                const nodeId = nameToId(f);
                return nodeId ? (
                  <button
                    key={f}
                    onClick={() => handleTagClick(nodeId)}
                    className="text-[9px] font-mono text-crimson-light border border-crimson/30 hover:border-crimson hover:bg-crimson/10 px-2 py-0.5 rounded bg-crimson/5 uppercase cursor-pointer transition-all pointer-events-auto"
                    title={`Focus on ${f}`}
                  >
                    {f} ◱
                  </button>
                ) : (
                  <span key={f} className="text-[9px] font-mono text-crimson-light border border-crimson/25 px-2 py-0.5 rounded bg-crimson/5 uppercase">
                    {f}
                  </span>
                );
              })}
              {currentWaypoint.characters.map(c => {
                const nodeId = nameToId(c);
                return nodeId ? (
                  <button
                    key={c}
                    onClick={() => handleTagClick(nodeId)}
                    className="text-[9px] font-mono text-gold-dark border border-gold/30 hover:border-gold hover:bg-gold/10 px-2 py-0.5 rounded bg-gold/5 uppercase cursor-pointer transition-all pointer-events-auto"
                    title={`Focus on ${c}`}
                  >
                    {c} ◱
                  </button>
                ) : (
                  <span key={c} className="text-[9px] font-mono text-gold-dark border border-gold/25 px-2 py-0.5 rounded bg-gold/5 uppercase">
                    {c}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="w-[1px] bg-gold/10 hidden md:block" />

          {/* Right Block - Navigation */}
          <div className="flex flex-row md:flex-col justify-between items-center md:justify-center md:items-end gap-4 min-w-[120px]">
            {/* Step Controls */}
            <div className="flex space-x-2 w-full md:justify-end">
              <button
                disabled={activeWaypointIndex === 0}
                onClick={prevWaypoint}
                className="w-10 h-10 rounded border border-gold/15 bg-black/40 text-gold/60 hover:text-gold hover:border-gold/50 transition-colors disabled:opacity-20 disabled:pointer-events-none flex items-center justify-center cursor-pointer"
                title="Previous Chapter"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              
              <button
                disabled={activeWaypointIndex === totalWaypoints - 1}
                onClick={nextWaypoint}
                className="flex-1 md:flex-none py-2.5 px-4 rounded border border-gold/30 bg-gold/5 text-gold text-xs font-mono tracking-widest uppercase hover:bg-gold/10 hover:border-gold/60 transition-colors disabled:opacity-20 disabled:pointer-events-none flex items-center justify-center space-x-2 cursor-pointer"
                title="Next Chapter"
              >
                <span>SAIL</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            {/* Quick mini timeline indicator dots */}
            <div className="flex space-x-1.5 pt-1">
              {journey.waypoints.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => jumpToWaypoint(idx)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    idx === activeWaypointIndex 
                      ? 'bg-gold w-4' 
                      : (idx < activeWaypointIndex ? 'bg-gold/50' : 'bg-white/10')
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  );
}

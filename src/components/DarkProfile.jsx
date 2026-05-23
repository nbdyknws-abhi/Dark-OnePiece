import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNarrative } from '../context/NarrativeContext';
import { NODES, EDGES, JOURNEYS } from '../data/loreData';
import { FIGURES } from '../data/relationships';
import { Compass, Calendar } from 'lucide-react';

const SCENE_MAP = {
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
  luffy: '/assets/portraits/luffy.png',
  robin: '/assets/portraits/robin.png',
  dragon: '/assets/portraits/dragon.png',
  sakazuki: '/assets/portraits/sakazuki.png',
  shanks: '/assets/portraits/shanks.png',
  roger: '/assets/portraits/roger.png',
  whitebeard: '/assets/portraits/whitebeard.png',
  kaido: '/assets/portraits/kaido.png',
  vegapunk: '/assets/portraits/vegapunk.png',
  saturn: '/assets/portraits/saturn.png',
  kuma: '/assets/portraits/kuma.png',
  bonney: '/assets/portraits/bonney.png',
  koby: '/assets/portraits/koby.png',
  loki: '/assets/portraits/loki.png',
  blackbeard: '/assets/portraits/blackbeard.png',
  garp: '/assets/portraits/garp.png',
  kid: '/assets/portraits/kid.png',
  law: '/assets/portraits/law.png',
  ohara: '/assets/scenes/ohara.png',
  marineford: '/assets/scenes/marineford.png',
  wano: '/assets/scenes/wano.png',
  egghead: '/assets/scenes/egghead.png',
  hachinosu: '/assets/scenes/hachinosu.png',
  elbaph: '/assets/scenes/elbaph.png',
  laughtale: '/assets/scenes/laughtale.png',
  'summit-war': '/assets/scenes/marineford.png',
  'enies-lobby': '/assets/scenes/enies-lobby.png',
};

export default function DarkProfile() {
  const { 
    activeNode, 
    selectNode, 
    exploreState, 
    activeTimelineWaypointId, 
    setActiveTimelineWaypointId,
    setWeatherEffect,
    transitionCoords,
    setTransitionCoords
  } = useNarrative();
  
  const [lastNode, setLastNode] = useState(null);
  const [lastWaypointId, setLastWaypointId] = useState(null);

  // Preserve node and waypoint states during exit animation when activeNode becomes null
  if (activeNode) {
    const currentNode = NODES.find(n => n.id === activeNode);
    if (currentNode && (!lastNode || currentNode.id !== lastNode.id)) {
      setLastNode(currentNode);
    }
    if (activeTimelineWaypointId !== lastWaypointId) {
      setLastWaypointId(activeTimelineWaypointId);
    }
  }

  const node = activeNode ? NODES.find(n => n.id === activeNode) : lastNode;
  if (exploreState !== 'exploring' || !node) return null;

  // Retrieve relationship metadata if available
  const figure = FIGURES.find(f => f.id === node.id || (node.id === 'kid' && f.id === 'kidd'));

  // Get timeline for the active node
  const getTimeline = (nodeId) => {
    // 1. Node has its own journey
    if (JOURNEYS[nodeId]) {
      return JOURNEYS[nodeId].waypoints.map(wp => ({
        ...wp,
        type: 'waypoint',
        sourceJourney: nodeId
      }));
    }
    
    // 2. Node is referenced in other journeys (locations, factions, or characters)
    const timeline = [];
    Object.entries(JOURNEYS).forEach(([journeyKey, journey]) => {
      journey.waypoints.forEach(wp => {
        const matchesLocation = wp.id === nodeId || wp.weather === nodeId;
        const matchesCharacter = wp.characters && wp.characters.some(char => {
          const nodeObj = NODES.find(n => n.id === nodeId);
          if (!nodeObj) return false;
          const cName = char.toLowerCase();
          const nName = nodeObj.name.toLowerCase();
          const nId = nodeObj.id.toLowerCase();
          return cName.includes(nId) || nName.includes(cName) || cName.includes(nName);
        });
        const matchesFaction = wp.factions && wp.factions.some(fac => {
          const nodeObj = NODES.find(n => n.id === nodeId);
          if (!nodeObj) return false;
          const fName = fac.toLowerCase();
          const nName = nodeObj.name.toLowerCase();
          const nId = nodeObj.id.toLowerCase();
          return fName.includes(nId) || nName.includes(fName) || fName.includes(nName);
        });
        
        if (matchesLocation || matchesCharacter || matchesFaction) {
          if (!timeline.some(t => t.id === wp.id)) {
            timeline.push({
              ...wp,
              type: 'waypoint',
              sourceJourney: journeyKey
            });
          }
        }
      });
    });
    
    if (timeline.length > 0) {
      return timeline;
    }

    // 3. Fallback to direct connections from EDGES
    const connectedEdges = EDGES.filter(e => e.source === nodeId || e.target === nodeId);
    return connectedEdges.map((e, idx) => {
      const connectedId = e.source === nodeId ? e.target : e.source;
      const targetNode = NODES.find(n => n.id === connectedId);
      return {
        id: connectedId,
        name: targetNode ? targetNode.name : connectedId,
        chapter: `Lore Connection ${idx + 1}`,
        tagline: e.label,
        lore: targetNode ? targetNode.description : `Linked via: ${e.label}`,
        stakes: `Relationship: ${e.type}`,
        characters: targetNode && targetNode.type === 'character' ? [targetNode.name] : [],
        factions: targetNode && targetNode.type === 'faction' ? [targetNode.name] : [],
        type: 'connection'
      };
    });
  };

  const timeline = getTimeline(node.id);
  const currentActiveWaypointId = activeNode ? activeTimelineWaypointId : lastWaypointId;
  const activeIndex = currentActiveWaypointId 
    ? timeline.findIndex(wp => wp.id === currentActiveWaypointId)
    : -1;
  const currentWaypoint = activeIndex !== -1 ? timeline[activeIndex] : null;

  // Find waypoint-specific connections
  const getWaypointConnections = (wp) => {
    if (!wp) return [];
    const connections = [];
    
    // Add characters in waypoint
    if (wp.characters) {
      wp.characters.forEach(charName => {
        const found = NODES.find(n => {
          const cName = charName.toLowerCase();
          const nName = n.name.toLowerCase();
          const nId = n.id.toLowerCase();
          return (cName.includes(nId) || nName.includes(cName) || cName.includes(nName)) && n.id !== node.id;
        });
        if (found && !connections.some(c => c.id === found.id)) {
          connections.push(found);
        }
      });
    }
    
    // Add factions in waypoint
    if (wp.factions) {
      wp.factions.forEach(facName => {
        const found = NODES.find(n => {
          const fName = facName.toLowerCase();
          const nName = n.name.toLowerCase();
          const nId = n.id.toLowerCase();
          return (fName.includes(nId) || nName.includes(fName) || fName.includes(nName)) && n.id !== node.id;
        });
        if (found && !connections.some(c => c.id === found.id)) {
          connections.push(found);
        }
      });
    }
    
    // Add location node itself if it's not node.id
    const locNode = NODES.find(n => n.id === wp.id || n.id === wp.weather);
    if (locNode && locNode.id !== node.id && !connections.some(c => c.id === locNode.id)) {
      connections.push(locNode);
    }
    
    return connections;
  };

  // Determine left and right navigation targets
  let leftConnection = null;
  let rightConnection = null;

  if (currentWaypoint) {
    const wpConnections = getWaypointConnections(currentWaypoint);
    leftConnection = wpConnections.length > 0 ? wpConnections[0] : null;
    rightConnection = wpConnections.length > 1 ? wpConnections[1] : (wpConnections.length > 0 ? wpConnections[0] : null);
  } else {
    // Overview connections
    const connectedEdges = EDGES.filter(e => e.source === node.id || e.target === node.id);
    const connectedNodes = connectedEdges.map(e => {
      const connectedId = e.source === node.id ? e.target : e.source;
      return NODES.find(n => n.id === connectedId);
    }).filter(Boolean);
    
    leftConnection = connectedNodes.length > 0 ? connectedNodes[0] : null;
    rightConnection = connectedNodes.length > 1 ? connectedNodes[1] : (connectedNodes.length > 0 ? connectedNodes[0] : null);
  }



  const handleDragEnd = (e, info) => {
    const swipeThreshold = 60;
    const { offset } = info;

    // Swipe UP (scroll forward in timeline)
    if (offset.y < -swipeThreshold) {
      if (activeIndex < timeline.length - 1) {
        const nextWp = timeline[activeIndex + 1];
        setTransitionCoords({ x: '50%', y: '100%' });
        setActiveTimelineWaypointId(nextWp.id);
        if (nextWp.weather) setWeatherEffect(nextWp.weather);
      }
    } 
    // Swipe DOWN (scroll backward / exit)
    else if (offset.y > swipeThreshold) {
      if (activeIndex > 0) {
        const prevWp = timeline[activeIndex - 1];
        setTransitionCoords({ x: '50%', y: '0%' });
        setActiveTimelineWaypointId(prevWp.id);
        if (prevWp.weather) setWeatherEffect(prevWp.weather);
      } else if (activeIndex === 0) {
        setTransitionCoords({ x: '50%', y: '0%' });
        setActiveTimelineWaypointId(null);
        setWeatherEffect(node.id);
      } else {
        setTransitionCoords({ x: '50%', y: '50%' });
        selectNode(null);
      }
    } 
    // Swipe LEFT (transition connection)
    else if (offset.x < -swipeThreshold && leftConnection) {
      const wpId = currentWaypoint ? currentWaypoint.id : null;
      const coords = { x: '100%', y: '50%' };
      selectNode(leftConnection.id, wpId, coords);
    } 
    // Swipe RIGHT (transition connection)
    else if (offset.x > swipeThreshold && rightConnection) {
      const wpId = currentWaypoint ? currentWaypoint.id : null;
      const coords = { x: '0%', y: '50%' };
      selectNode(rightConnection.id, wpId, coords);
    }
  };

  const backgroundImage = currentWaypoint
    ? (SCENE_MAP[currentWaypoint.id] || SCENE_MAP[currentWaypoint.weather] || PORTRAIT_MAP[node.id] || '/assets/scenes/landing_bg.png')
    : (PORTRAIT_MAP[node.id] || '/assets/scenes/landing_bg.png');

  // Screen key to identify layout state changes for AnimatePresence
  const screenKey = `${node.id}-${currentWaypoint ? currentWaypoint.id : 'overview'}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 bg-[#040506] touch-none overflow-hidden select-none"
    >
      <AnimatePresence mode="popLayout">
        <motion.div
          key={screenKey}
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 1.0, ease: [0.16, 1, 0.3, 1] } }}
          className="absolute inset-0 flex flex-col justify-between apple-screen-ripple-transition"
          style={{
            '--ripple-x': transitionCoords?.x ?? '50%',
            '--ripple-y': transitionCoords?.y ?? '50%',
            clipPath: 'circle(0px at var(--ripple-x) var(--ripple-y))'
          }}
        >
          {/* Gesture Capture Handler Overlay (drag handles timeline swipes) */}
          <motion.div 
            drag
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            dragElastic={0.15}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 z-40 cursor-grab active:cursor-grabbing"
          />

          {/* Cinematic Background Scene */}
          <div className="absolute inset-0 w-full h-full -z-10">
            <img 
              src={backgroundImage} 
              alt={node.name}
              className="w-full h-full object-cover object-center opacity-65"
              decoding="async"
            />
            {/* Dark cinematic overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#040506]/90 via-transparent to-[#040506]/95" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040506] via-transparent to-[#040506]/40" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#040506_100%)] opacity-55" />
          </div>

          {/* Floating Emoji Symbol Watermark */}
          {currentWaypoint && currentWaypoint.symbol && (
            <div
              className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
              style={{ opacity: 0.08 }}
            >
              <div className="text-[220px] md:text-[340px] leading-none select-none blur-[1px]">
                {currentWaypoint.symbol}
              </div>
            </div>
          )}

          {/* Top HUD Header - Return Button */}
          <div className="relative z-50 p-6 flex justify-between items-center pointer-events-none">
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                setTransitionCoords({ x: '50%', y: '50%' });
                selectNode(null); 
              }}
              className="pointer-events-auto flex items-center space-x-2 text-parchment/60 hover:text-gold border border-gold/15 hover:border-gold/50 bg-[#090b0e]/40 backdrop-blur px-3 py-1.5 rounded transition-all duration-300 group"
            >
              <div className="w-6 h-px bg-parchment/40 group-hover:bg-gold transition-colors" />
              <span className="text-[8px] font-mono tracking-[0.3em] uppercase">Return to Map</span>
            </button>
            
            {/* Small Character Emblem in Header if in Waypoint view */}
            {currentWaypoint && PORTRAIT_MAP[node.id] && (
              <div className="flex items-center space-x-3 border border-white/10 bg-black/40 rounded-full py-1 pl-1 pr-3">
                <img 
                  src={PORTRAIT_MAP[node.id]} 
                  alt={node.name} 
                  className="w-6 h-6 rounded-full object-cover border border-gold/40"
                />
                <div className="flex flex-col">
                  <span className="text-[8px] font-mono text-gold font-bold tracking-wider uppercase leading-none">{node.name}</span>
                  <span className="text-[6px] font-mono text-parchment/50 tracking-widest uppercase mt-0.5 leading-none">TRAVELLER</span>
                </div>
              </div>
            )}
          </div>

          {/* Centered Content - Main Title and Story Data */}
          <div className="relative z-40 flex flex-col items-center justify-center flex-1 p-6 text-center select-none pointer-events-none">
            {/* Dotted Connection Spine Background line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-gold/15 to-transparent border-r border-dotted border-gold/25 -translate-x-1/2 pointer-events-none -z-10" />

            {!currentWaypoint ? (
              // --- OVERVIEW PANEL ---
              <div className="flex flex-col items-center max-w-2xl px-4">
                <span className="text-[10px] font-mono tracking-[0.4em] text-gold/80 uppercase mb-4 text-glow-gold flex items-center space-x-2">
                  <Compass className="w-3.5 h-3.5" />
                  <span>CHARACTER OVERVIEW</span>
                </span>

                <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif text-parchment tracking-widest uppercase drop-shadow-2xl">
                  {node.name}
                </h1>

                <span className="mt-4 text-[10px] font-mono tracking-[0.3em] text-gold-dark uppercase border border-gold/20 px-3 py-1 rounded bg-[#090b0e]/30">
                  {node.title || node.role}
                </span>

                {figure && figure.bounty && (
                  <span className="mt-3 text-[9px] font-mono tracking-[0.25em] text-crimson-light uppercase font-bold">
                    BOUNTY: {figure.bounty}
                  </span>
                )}

                <p className="mt-8 text-sm md:text-base font-serif text-parchment/90 leading-relaxed md:leading-loose max-w-xl">
                  {node.description || `The enigmatic presence of ${node.name} shifts the balance of the world.`}
                </p>

                {figure && figure.will && (
                  <div className="mt-6 border-t border-gold/10 pt-4 w-full text-center">
                    <span className="text-[8px] font-mono tracking-[0.3em] text-gold/50 block mb-2 uppercase">RESOLVE / WILL</span>
                    <p className="text-xs font-sans text-parchment/70 italic max-w-md mx-auto leading-relaxed">
                      "{figure.will}"
                    </p>
                  </div>
                )}

                {/* Swipe Help HUD */}
                <div className="mt-12 flex flex-col items-center text-[7px] font-mono tracking-[0.3em] text-parchment/30 uppercase space-y-2">
                  <span>Swipe UP to step into timeline</span>
                  <div className="w-px h-6 bg-gradient-to-b from-transparent to-parchment/40" />
                </div>
              </div>
            ) : (
              // --- TIMELINE WAYPOINT PANEL ---
              <div className="flex flex-col items-center max-w-2xl px-4">
                <span className="text-[10px] font-mono tracking-[0.4em] text-gold/80 uppercase mb-4 text-glow-gold flex items-center space-x-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{currentWaypoint.chapter || 'TIMELINE STEP'}</span>
                </span>

                <h2 className="text-3xl md:text-5xl lg:text-6xl font-serif text-parchment tracking-widest uppercase drop-shadow-2xl">
                  {currentWaypoint.name}
                </h2>

                {currentWaypoint.tagline && (
                  <span className="mt-3 text-[10px] font-mono tracking-[0.3em] text-gold-dark/95 uppercase italic">
                    "{currentWaypoint.tagline}"
                  </span>
                )}

                <p className="mt-8 text-sm md:text-base font-serif text-parchment/90 leading-relaxed md:leading-loose max-w-xl">
                  {currentWaypoint.lore || currentWaypoint.stakes || `Events unfold around ${node.name} at this coordinate.`}
                </p>

                {/* Waypoint Meta Cards */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md pt-6 border-t border-white/5">
                  {currentWaypoint.characters && currentWaypoint.characters.length > 0 && (
                    <div className="p-3 border border-white/5 rounded bg-[#090b0e]/30 text-left">
                      <span className="text-[7px] font-mono tracking-wider text-gold/50 uppercase block mb-1">Key Entities Involved</span>
                      <div className="text-[10px] font-sans text-parchment/80 leading-relaxed">
                        {currentWaypoint.characters.join(', ')}
                      </div>
                    </div>
                  )}
                  {currentWaypoint.factions && currentWaypoint.factions.length > 0 && (
                    <div className="p-3 border border-white/5 rounded bg-[#090b0e]/30 text-left">
                      <span className="text-[7px] font-mono tracking-wider text-gold/50 uppercase block mb-1">Affiliated Powers</span>
                      <div className="text-[10px] font-sans text-parchment/80 leading-relaxed">
                        {currentWaypoint.factions.join(', ')}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right-Side Interactive Vertical Timeline Tracker */}
          {timeline.length > 0 && (
            <div className="absolute right-4 md:right-10 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center pointer-events-auto">
              <div className="absolute top-4 bottom-4 w-[1px] bg-gradient-to-b from-gold/50 via-gold/15 to-transparent border-r border-dotted border-gold/30 pointer-events-none" />
              
              <div className="flex flex-col space-y-6 relative py-4">
                {/* Overview Dot */}
                <div 
                  className="flex items-center justify-end group cursor-pointer" 
                  onClick={() => {
                    setTransitionCoords({ x: '100%', y: '50%' });
                    setActiveTimelineWaypointId(null);
                    setWeatherEffect(node.id);
                  }}
                >
                  <span className={`mr-4 text-[9px] font-mono tracking-widest transition-all duration-300 hidden lg:block ${
                    activeIndex === -1 ? 'text-gold text-glow-gold font-bold scale-105' : 'text-parchment/35 group-hover:text-parchment/70'
                  }`}>
                    OVERVIEW
                  </span>
                  <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all duration-300 ${
                    activeIndex === -1 
                      ? 'border-gold bg-gold/25 shadow-[0_0_12px_rgba(212,175,55,0.5)] scale-110' 
                      : 'border-white/20 bg-black/60 group-hover:border-gold/50'
                  }`}>
                    <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${activeIndex === -1 ? 'bg-gold' : 'bg-transparent'}`} />
                  </div>
                </div>

                {/* Waypoint Dots */}
                {timeline.map((wp, idx) => {
                  const isActive = activeIndex === idx;
                  const isPassed = activeIndex > idx;
                  return (
                    <div 
                      key={wp.id} 
                      className="flex items-center justify-end group cursor-pointer" 
                      onClick={() => {
                        setTransitionCoords({ x: '100%', y: '50%' });
                        setActiveTimelineWaypointId(wp.id);
                        if (wp.weather) setWeatherEffect(wp.weather);
                      }}
                    >
                      <span className={`mr-4 text-[9px] font-mono tracking-widest transition-all duration-300 hidden lg:block max-w-[120px] truncate text-right uppercase ${
                        isActive ? 'text-gold text-glow-gold font-bold scale-105' : 'text-parchment/35 group-hover:text-parchment/70'
                      }`}>
                        {wp.name}
                      </span>
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center transition-all duration-300 ${
                        isActive 
                          ? 'border-gold bg-gold/25 shadow-[0_0_12px_rgba(212,175,55,0.5)] scale-110' 
                          : (isPassed ? 'border-gold-dark/40 bg-gold-dark/5' : 'border-white/20 bg-black/60 group-hover:border-gold/50')
                      }`}>
                        <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          isActive ? 'bg-gold' : (isPassed ? 'bg-gold-dark/40' : 'bg-transparent')
                        }`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Bottom HUD Footer - Navigation Helpers & Connected Targets */}
          <div className="relative z-50 p-6 md:p-12 w-full flex flex-col items-center pointer-events-none">
            {/* Gesture Helper UI */}
            <div className="flex items-center justify-between w-full max-w-2xl px-6 py-2 border-t border-white/5 bg-black/25 backdrop-blur-sm rounded-lg text-[8px] font-mono tracking-[0.25em] text-parchment/40 uppercase">
              {/* Swipe Left Connection */}
              <div className="flex items-center space-x-2">
                {leftConnection ? (
                  <button 
                    onClick={() => {
                      const wpId = currentWaypoint ? currentWaypoint.id : null;
                      const coords = { x: '0%', y: '50%' };
                      selectNode(leftConnection.id, wpId, coords);
                    }}
                    className="pointer-events-auto flex items-center text-left hover:text-gold transition-colors text-glow-gold"
                  >
                    <span>← {leftConnection.name}</span>
                  </button>
                ) : (
                  <span className="opacity-20">← END</span>
                )}
              </div>

              {/* Vertical Swipe Info */}
              <div className="hidden sm:flex flex-col items-center space-y-1">
                <span className="text-[7px] text-gold/60">
                  {activeIndex === -1 
                    ? 'SWIPE UP TO DECODE TIMELINE' 
                    : (activeIndex === timeline.length - 1 ? 'SWIPE DOWN TO ROLL BACK' : 'SWIPE UP/DOWN TO NAVIGATE TIME')}
                </span>
              </div>

              {/* Swipe Right Connection */}
              <div className="flex items-center space-x-2">
                {rightConnection ? (
                  <button 
                    onClick={() => {
                      const wpId = currentWaypoint ? currentWaypoint.id : null;
                      const coords = { x: '100%', y: '50%' };
                      selectNode(rightConnection.id, wpId, coords);
                    }}
                    className="pointer-events-auto flex items-center text-right hover:text-gold transition-colors text-glow-gold"
                  >
                    <span>{rightConnection.name} →</span>
                  </button>
                ) : (
                  <span className="opacity-20">END →</span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

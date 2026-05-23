import { useState, useEffect } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { motion, AnimatePresence } from 'framer-motion';
import { NODES, EDGES } from '../data/loreData';
import { useNarrative } from '../context/NarrativeContext';

const PORTRAIT_MAP = {
  // Characters
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

  // Locations
  ohara: '/assets/scenes/ohara.png',
  marineford: '/assets/scenes/marineford.png',
  wano: '/assets/scenes/wano.png',
  egghead: '/assets/scenes/egghead.png',
  hachinosu: '/assets/scenes/hachinosu.png',
  elbaph: '/assets/scenes/elbaph.png',
  laughtale: '/assets/scenes/laughtale.png',
};

function GraphNode({ node, activeNode, selectNode, zoomToElement }) {
  const [isHovered, setIsHovered] = useState(false);

  const isActive = activeNode === node.id;
  
  // Determine if this node is connected to the active node
  const isConnected = EDGES.some(e => 
    (e.source === node.id && e.target === activeNode) || 
    (e.target === node.id && e.source === activeNode)
  );
  
  const opacity = activeNode ? (isActive || isConnected ? 1 : 0.08) : 0.85;
  
  // Color mapping
  let stroke = "#d4af37"; // gold default
  let shadowColor = "rgba(212, 175, 55, 0.4)";
  if (node.type === "faction") {
    stroke = "#e63946";
    shadowColor = "rgba(230, 57, 70, 0.4)";
  } else if (node.type === "concept" || node.type === "arc") {
    stroke = "#00b4d8";
    shadowColor = "rgba(0, 180, 216, 0.4)";
  }

  const layoutScale = 25;
  const nodeX = node.x * layoutScale;
  const nodeY = node.y * layoutScale;

  const handleNodeClick = (e) => {
    if (e) e.stopPropagation();
    const isTogglingOff = activeNode === node.id;
    const coords = e ? { x: `${e.clientX}px`, y: `${e.clientY}px` } : null;
    selectNode(isTogglingOff ? null : node.id, null, coords);
    if (zoomToElement && !isTogglingOff) {
      zoomToElement(node.id, 2.5, 1500, "easeInOutCubic");
    }
  };

  const scale = isActive ? 1.35 : (isHovered ? 1.15 : 1.0);

  return (
    <g 
      id={node.id}
      transform={`translate(${nodeX}, ${nodeY})`}
      style={{ cursor: 'pointer', opacity, transition: 'opacity 0.3s ease' }}
      onClick={handleNodeClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <g 
        style={{
          transform: `scale(${scale})`,
          transition: 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          transformOrigin: '0px 0px',
          filter: isHovered ? "url(#node-glow)" : "none"
        }}
      >
        {/* Glow aura if active */}
        {isActive && (
          <circle 
            r="24" 
            fill="none" 
            stroke={stroke} 
            strokeWidth="1.5" 
            className="animate-pulse" 
            style={{ filter: `drop-shadow(0px 0px 8px ${shadowColor})` }}
          />
        )}

        {/* Background base circle */}
        <circle 
          r="13" 
          fill="#090a0c" 
          stroke={PORTRAIT_MAP[node.id] ? "none" : stroke} 
          strokeWidth={PORTRAIT_MAP[node.id] ? "0" : "2"} 
          filter="url(#node-shadow)"
        />

        {/* Portrait image for characters and scenes */}
        {PORTRAIT_MAP[node.id] && (
          <>
            <circle r="12.2" fill={`url(#pattern-${node.id})`} />
            <circle r="13" fill="none" stroke={stroke} strokeWidth="2.5" />
          </>
        )}
        
        {/* Node Text Label */}
        <text
          y="-22"
          fill={isActive ? "#ffd700" : "#eae0d5"}
          fontSize={isActive ? "13" : "10.5"}
          fontWeight={isActive ? "bold" : "normal"}
          textAnchor="middle"
          className="font-serif tracking-wide select-none"
          style={{ 
            transition: 'fill 0.3s ease',
            textShadow: isActive ? '0 0 8px rgba(255,215,0,0.6), 0 2px 4px #000' : '0 2px 4px #000'
          }}
        >
          {node.name}
        </text>
        
        {/* Subtitle */}
        {(isActive || !activeNode) && (
          <text
            y="26"
            fill="#eae0d5"
            fontSize="7"
            textAnchor="middle"
            className="font-mono tracking-widest opacity-40 select-none uppercase"
          >
            {node.type}
          </text>
        )}
      </g>
    </g>
  );
}

export default function UniverseGraph() {
  const { activeNode, selectNode, exploreState, isGeopoliticalToggled } = useNarrative();
  const [isFullyHidden, setIsFullyHidden] = useState(false);

  useEffect(() => {
    let timer;
    if (activeNode) {
      timer = setTimeout(() => {
        setIsFullyHidden(true);
      }, 1100);
    } else {
      timer = setTimeout(() => {
        setIsFullyHidden(false);
      }, 0);
    }
    return () => clearTimeout(timer);
  }, [activeNode]);

  const [initialScale] = useState(() => {
    if (typeof window === 'undefined') return 0.45;
    // Instead of shrinking the massive map to fit a tiny mobile screen (which makes text unreadable),
    // we set a legible baseline scale and let the user pan around naturally.
    const isMobile = window.innerWidth < 768;
    return isMobile ? 0.4 : 0.45;
  });

  // If we aren't exploring yet, don't mount the complex SVG or keep it hidden
  if (exploreState !== 'exploring') return null;

  return (
    <div 
      className={`absolute inset-0 z-10 bg-transparent flex items-center justify-center overflow-hidden transition-opacity duration-500 ${
        activeNode ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={isFullyHidden ? { display: 'none' } : undefined}
    >
      
      {/* Background cinematic grid */}
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-10 bg-[radial-gradient(rgba(212,175,55,0.2)_1px,transparent_1px)] [background-size:40px_40px]"></div>

      <TransformWrapper
        initialScale={initialScale}
        minScale={initialScale * 0.8}
        maxScale={4.0}
        centerOnInit={true}
        centerZoomedOut={true}
        limitToBounds={false}
        wheel={{ step: 0.08, smoothStep: 0.005 }}
        panning={{ 
          velocityDisabled: true, 
          wheelPanning: true, 
          excluded: ["input", "button", "select", "textarea", "a"]
        }}
        doubleClick={{ disabled: true }}
      >
        {({ zoomToElement }) => (
          <TransformComponent wrapperClass="w-full h-full" wrapperStyle={{ width: "100%", height: "100%" }}>
            <div 
              style={{ width: "3000px", height: "2250px", position: "relative" }}
            >
              <motion.svg 
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 2.2, ease: "easeOut" }}
                viewBox="0 0 3000 2250" 
                width={3000}
                height={2250}
                className="w-full h-full"
                style={{ overflow: 'visible' }}
              >

              <defs>
                {/* Visual glow and drop shadow filters */}
                <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feComponentTransfer in="blur" result="glow">
                    <feFuncA type="linear" slope="0.8" />
                  </feComponentTransfer>
                  <feMerge>
                    <feMergeNode in="glow" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>

                <filter id="node-shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#000000" floodOpacity="0.8" />
                </filter>

                <filter id="glow-wg" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="25" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="glow-emp" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="30" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="glow-rev" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="25" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="glow-sh" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="25" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                {/* Territory Gradients */}
                <radialGradient id="wg-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(0, 150, 255, 0.14)" />
                  <stop offset="70%" stopColor="rgba(0, 80, 200, 0.04)" />
                  <stop offset="100%" stopColor="rgba(0, 80, 200, 0)" />
                </radialGradient>
                <radialGradient id="emp-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(230, 50, 60, 0.14)" />
                  <stop offset="70%" stopColor="rgba(139, 0, 0, 0.04)" />
                  <stop offset="100%" stopColor="rgba(139, 0, 0, 0)" />
                </radialGradient>
                <radialGradient id="rev-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(16, 185, 129, 0.14)" />
                  <stop offset="70%" stopColor="rgba(6, 78, 59, 0.04)" />
                  <stop offset="100%" stopColor="rgba(6, 78, 59, 0)" />
                </radialGradient>
                <radialGradient id="sh-grad" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(255, 215, 0, 0.14)" />
                  <stop offset="70%" stopColor="rgba(212, 175, 55, 0.04)" />
                  <stop offset="100%" stopColor="rgba(212, 175, 55, 0)" />
                </radialGradient>

                {/* Patterns for portraits */}
                {Object.entries(PORTRAIT_MAP).map(([id, url]) => (
                  <pattern
                    key={`pattern-${id}`}
                    id={`pattern-${id}`}
                    width="1"
                    height="1"
                    patternContentUnits="objectBoundingBox"
                  >
                    <image
                      href={url}
                      x="0"
                      y="0"
                      width="1"
                      height="1"
                      preserveAspectRatio="xMidYMid slice"
                    />
                  </pattern>
                ))}
              </defs>

              {/* GEOPOLITICAL INFLUENCE BOUNDARIES */}
              <AnimatePresence>
                {isGeopoliticalToggled && (
                  <motion.g
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2, ease: "easeInOut" }}
                  >
                    {/* World Government (Blue-Grey) */}
                    <motion.polygon
                      points="1150,400 1850,400 1900,1050 1300,1050"
                      fill="url(#wg-grad)"
                      stroke="rgba(0, 160, 255, 0.45)"
                      strokeWidth="2.5"
                      strokeDasharray="15, 15"
                      animate={{ 
                        strokeDashoffset: [0, 60],
                        opacity: [0.8, 1.0, 0.8],
                        scale: [0.97, 1.03, 0.97]
                      }}
                      transition={{ 
                        strokeDashoffset: { duration: 12, repeat: Infinity, ease: "linear" },
                        opacity: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                        scale: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                      }}
                      style={{ originX: "1550px", originY: "725px" }}
                      filter="url(#glow-wg)"
                    />
                    <text x="1500" y="470" fill="rgba(90, 160, 220, 0.7)" fontSize="18" textAnchor="middle" className="font-mono tracking-[0.3em] uppercase pointer-events-none select-none text-glow-gold">
                      WG SOVEREIGNTY ZONE
                    </text>
 
                    {/* Emperors (Crimson) */}
                    <motion.polygon
                      points="1550,950 2150,900 2450,1250 2050,1750 1600,1650"
                      fill="url(#emp-grad)"
                      stroke="rgba(230, 57, 70, 0.45)"
                      strokeWidth="2.5"
                      strokeDasharray="15, 15"
                      animate={{ 
                        strokeDashoffset: [0, -60],
                        opacity: [0.8, 1.0, 0.8],
                        scale: [0.98, 1.02, 0.98]
                      }}
                      transition={{ 
                        strokeDashoffset: { duration: 12, repeat: Infinity, ease: "linear" },
                        opacity: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                        scale: { duration: 7, repeat: Infinity, ease: "easeInOut" }
                      }}
                      style={{ originX: "1960px", originY: "1300px" }}
                      filter="url(#glow-emp)"
                    />
                    <text x="1950" y="1450" fill="rgba(230, 80, 90, 0.7)" fontSize="18" textAnchor="middle" className="font-mono tracking-[0.3em] uppercase pointer-events-none select-none">
                      EMPEROR SPHERES OF INFLUENCE
                    </text>
 
                    {/* Revolutionaries (Emerald) */}
                    <motion.polygon
                      points="650,900 1050,900 1250,1850 850,1850 650,1400"
                      fill="url(#rev-grad)"
                      stroke="rgba(16, 185, 129, 0.45)"
                      strokeWidth="2.5"
                      strokeDasharray="15, 15"
                      animate={{ 
                        strokeDashoffset: [0, 60],
                        opacity: [0.8, 1.0, 0.8],
                        scale: [0.97, 1.03, 0.97]
                      }}
                      transition={{ 
                        strokeDashoffset: { duration: 12, repeat: Infinity, ease: "linear" },
                        opacity: { duration: 4.5, repeat: Infinity, ease: "easeInOut" },
                        scale: { duration: 6.5, repeat: Infinity, ease: "easeInOut" }
                      }}
                      style={{ originX: "890px", originY: "1380px" }}
                      filter="url(#glow-rev)"
                    />
                    <text x="850" y="1150" fill="rgba(16, 185, 129, 0.7)" fontSize="18" textAnchor="middle" className="font-mono tracking-[0.3em] uppercase pointer-events-none select-none">
                      REVOLUTIONARY CORRIDORS
                    </text>
 
                    {/* Straw Hats (Gold) */}
                    <motion.polygon
                      points="1050,1150 1450,1150 1950,1350 1550,1550 1050,1450"
                      fill="url(#sh-grad)"
                      stroke="rgba(255, 215, 0, 0.45)"
                      strokeWidth="2.5"
                      strokeDasharray="15, 15"
                      animate={{ 
                        strokeDashoffset: [0, -60],
                        opacity: [0.8, 1.0, 0.8],
                        scale: [0.98, 1.02, 0.98]
                      }}
                      transition={{ 
                        strokeDashoffset: { duration: 12, repeat: Infinity, ease: "linear" },
                        opacity: { duration: 3.8, repeat: Infinity, ease: "easeInOut" },
                        scale: { duration: 5.8, repeat: Infinity, ease: "easeInOut" }
                      }}
                      style={{ originX: "1410px", originY: "1330px" }}
                      filter="url(#glow-sh)"
                    />
                    <text x="1350" y="1500" fill="rgba(212, 175, 55, 0.7)" fontSize="18" textAnchor="middle" className="font-mono tracking-[0.3em] uppercase pointer-events-none select-none text-glow-gold">
                      STRAW HAT ALIGNMENTS
                    </text>
                  </motion.g>
                )}
              </AnimatePresence>
              
              {/* EDGES */}
              {EDGES.map((edge, idx) => {
                const sourceNode = NODES.find(n => n.id === edge.source);
                const targetNode = NODES.find(n => n.id === edge.target);
                if (!sourceNode || !targetNode) return null;

                const layoutScale = 25;
                const sourceX = sourceNode.x * layoutScale;
                const sourceY = sourceNode.y * layoutScale;
                const targetX = targetNode.x * layoutScale;
                const targetY = targetNode.y * layoutScale;

                const isConnectedToActive = activeNode === edge.source || activeNode === edge.target;
                const opacity = activeNode ? (isConnectedToActive ? 0.95 : 0.04) : 0.25;
                const strokeColor = edge.type === 'rivalry' ? '#8b0000' : '#d4af37';
                
                const portraitId = sourceNode.type === 'character' ? sourceNode.id : (targetNode.type === 'character' ? targetNode.id : null);
                const hasPortrait = portraitId && PORTRAIT_MAP[portraitId];
                
                return (
                  <g key={`edge-${idx}`} style={{ transition: 'opacity 0.6s ease' }} opacity={opacity}>
                    {/* Background link line */}
                    <line
                      x1={sourceX}
                      y1={sourceY}
                      x2={targetX}
                      y2={targetY}
                      stroke={strokeColor}
                      strokeWidth={2}
                      strokeDasharray={edge.type === 'alliance' ? "none" : "8, 8"}
                    />
                    
                    {/* Animated Flowing Line Overlay for Active Connections */}
                    {isConnectedToActive && (
                      <motion.line
                        x1={sourceX}
                        y1={sourceY}
                        x2={targetX}
                        y2={targetY}
                        stroke={edge.type === 'rivalry' ? '#ff3b30' : '#ffd700'}
                        strokeWidth={2.5}
                        strokeDasharray="12, 18"
                        initial={{ strokeDashoffset: 0 }}
                        animate={{ strokeDashoffset: -120 }}
                        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                        style={{ 
                          filter: `drop-shadow(0px 0px 5px ${edge.type === 'rivalry' ? 'rgba(255,59,48,0.8)' : 'rgba(255,215,0,0.8)'})`,
                          strokeLinecap: 'round'
                        }}
                      />
                    )}

                    {isConnectedToActive && (
                      <>
                        {hasPortrait && (
                          <circle
                            cx={(sourceX + targetX) / 2}
                            cy={(sourceY + targetY) / 2 - 20}
                            r="9"
                            fill={`url(#pattern-${portraitId})`}
                            stroke={edge.type === 'rivalry' ? '#ff3b30' : '#ffd700'}
                            strokeWidth="1.5"
                            style={{ filter: 'drop-shadow(0px 2px 4px rgba(0,0,0,0.8))' }}
                          />
                        )}
                        <text
                          x={(sourceX + targetX) / 2}
                          y={(sourceY + targetY) / 2 - (hasPortrait ? 6 : 8)}
                          fill="#eae0d5"
                          fontSize="9"
                          textAnchor="middle"
                          className="font-mono opacity-80 pointer-events-none font-bold"
                          style={{ textShadow: '0 0 6px #000' }}
                        >
                          {edge.label}
                        </text>
                      </>
                    )}
                  </g>
                );
              })}

              {/* NODES */}
              {NODES.map((node) => (
                <GraphNode
                  key={node.id}
                  node={node}
                  activeNode={activeNode}
                  selectNode={selectNode}
                  zoomToElement={zoomToElement}
                />
              ))}
            </motion.svg>
          </div>
        </TransformComponent>
      )}
    </TransformWrapper>
    </div>
  );
}

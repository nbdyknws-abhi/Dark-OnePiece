import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { motion, AnimatePresence } from 'framer-motion';
import { NODES, EDGES } from '../data/loreData';
import { useNarrative } from '../context/NarrativeContext';

export default function UniverseGraph() {
  const { activeNode, selectNode, exploreState, isGeopoliticalToggled } = useNarrative();

  // If we aren't exploring yet, don't mount the complex SVG or keep it hidden
  if (exploreState !== 'exploring') return null;

  const handleNodeClick = (nodeId, zoomToElement) => {
    selectNode(nodeId);
    if (zoomToElement) {
      zoomToElement(nodeId, 2.5, 1500, "easeInOutCubic");
    }
  };

  return (
    <div className="absolute inset-0 z-10 bg-transparent flex items-center justify-center overflow-hidden">
      
      {/* Background cinematic grid */}
      <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-10 bg-[radial-gradient(rgba(212,175,55,0.2)_1px,transparent_1px)] [background-size:40px_40px]"></div>

      <TransformWrapper
        initialScale={0.8}
        minScale={0.1}
        maxScale={12}
        centerOnInit={true}
        limitToBounds={false}
        wheel={{ step: 0.05, smoothStep: 0.005 }}
        pinch={{ step: 5 }}
        panning={{ velocityDisabled: false, wheelPanning: true }}
        doubleClick={{ disabled: true }}
      >
        {({ zoomToElement }) => (
          <TransformComponent wrapperClass="w-full h-full" contentClass="w-full h-full" wrapperStyle={{ width: "100%", height: "100%" }} contentStyle={{ width: "100%", height: "100%" }}>
            <motion.svg 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 3, ease: "easeOut" }}
              viewBox="0 0 300 300" 
              className="w-full h-full min-w-[2000px] min-h-[1500px]"
              style={{ overflow: 'visible' }}
            >
              <defs>
                <filter id="glow-wg" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="glow-emp" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="glow-rev" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="glow-sh" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
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
                    <polygon
                      points="115,40 185,40 190,105 130,105"
                      fill="rgba(27, 73, 101, 0.08)"
                      stroke="rgba(58, 134, 200, 0.35)"
                      strokeWidth="0.8"
                      strokeDasharray="2, 2"
                      filter="url(#glow-wg)"
                    />
                    <text x="150" y="47" fill="rgba(90, 160, 220, 0.5)" fontSize="1.8" textAnchor="middle" className="font-mono tracking-[0.3em] uppercase pointer-events-none select-none">
                      WG SOVEREIGNTY ZONE
                    </text>

                    {/* Emperors (Crimson) */}
                    <polygon
                      points="155,95 215,90 245,125 205,175 160,165"
                      fill="rgba(139, 0, 0, 0.07)"
                      stroke="rgba(230, 57, 70, 0.35)"
                      strokeWidth="0.8"
                      strokeDasharray="2, 2"
                      filter="url(#glow-emp)"
                    />
                    <text x="195" y="145" fill="rgba(230, 80, 90, 0.5)" fontSize="1.8" textAnchor="middle" className="font-mono tracking-[0.3em] uppercase pointer-events-none select-none">
                      EMPEROR SPHERES OF INFLUENCE
                    </text>

                    {/* Revolutionaries (Emerald) */}
                    <polygon
                      points="65,90 105,90 125,185 85,185 65,140"
                      fill="rgba(6, 78, 59, 0.07)"
                      stroke="rgba(16, 185, 129, 0.35)"
                      strokeWidth="0.8"
                      strokeDasharray="2, 2"
                      filter="url(#glow-rev)"
                    />
                    <text x="85" y="115" fill="rgba(16, 185, 129, 0.5)" fontSize="1.8" textAnchor="middle" className="font-mono tracking-[0.3em] uppercase pointer-events-none select-none">
                      REVOLUTIONARY CORRIDORS
                    </text>

                    {/* Straw Hats (Gold) */}
                    <polygon
                      points="105,115 145,115 195,135 155,155 105,145"
                      fill="rgba(212, 175, 55, 0.07)"
                      stroke="rgba(255, 215, 0, 0.35)"
                      strokeWidth="0.8"
                      strokeDasharray="2, 2"
                      filter="url(#glow-sh)"
                    />
                    <text x="135" y="150" fill="rgba(212, 175, 55, 0.5)" fontSize="1.8" textAnchor="middle" className="font-mono tracking-[0.3em] uppercase pointer-events-none select-none">
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

                const layoutScale = 2.5;
                const sourceX = sourceNode.x * layoutScale;
                const sourceY = sourceNode.y * layoutScale;
                const targetX = targetNode.x * layoutScale;
                const targetY = targetNode.y * layoutScale;

                const isConnectedToActive = activeNode === edge.source || activeNode === edge.target;
                const opacity = activeNode ? (isConnectedToActive ? 0.6 : 0.05) : 0.2;
                const strokeColor = edge.type === 'rivalry' ? '#8b0000' : '#d4af37';
                
                return (
                  <g key={`edge-${idx}`} style={{ transition: 'opacity 1s ease' }} opacity={opacity}>
                    <line
                      x1={sourceX}
                      y1={sourceY}
                      x2={targetX}
                      y2={targetY}
                      stroke={strokeColor}
                      strokeWidth={0.2}
                      strokeDasharray={edge.type === 'alliance' ? "none" : "1, 1"}
                    />
                    {isConnectedToActive && (
                      <text
                        x={(sourceX + targetX) / 2}
                        y={(sourceY + targetY) / 2}
                        fill="#eae0d5"
                        fontSize="0.8"
                        textAnchor="middle"
                        className="font-mono opacity-60 pointer-events-none"
                      >
                        {edge.label}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* NODES */}
              {NODES.map((node) => {
                const layoutScale = 2.5;
                const nodeX = node.x * layoutScale;
                const nodeY = node.y * layoutScale;
                
                const isActive = activeNode === node.id;
                
                // Determine if this node is connected to the active node
                const isConnected = EDGES.some(e => 
                  (e.source === node.id && e.target === activeNode) || 
                  (e.target === node.id && e.source === activeNode)
                );
                
                const opacity = activeNode ? (isActive || isConnected ? 1 : 0.1) : 0.8;
                const scale = isActive ? 1.5 : 1;
                
                // Color mapping
                let fill = "#090a0c";
                let stroke = "#d4af37";
                if (node.type === "faction") stroke = "#8b0000";
                if (node.type === "concept") stroke = "#1b4965";

                return (
                  <g 
                    key={node.id} 
                    id={node.id}
                    transform={`translate(${nodeX}, ${nodeY}) scale(${scale})`} 
                    style={{ transition: 'all 1s ease', opacity, cursor: 'pointer' }}
                    onClick={() => handleNodeClick(node.id, zoomToElement)}
                  >
                    {/* Glow aura if active */}
                    {isActive && (
                      <circle r="3" fill="none" stroke="#d4af37" strokeWidth="0.1" className="animate-pulse opacity-50" />
                    )}

                    <circle r="1" fill={fill} stroke={stroke} strokeWidth="0.2" />
                    
                    {/* Node Text Label */}
                    <text
                      y="-1.5"
                      fill={isActive ? "#d4af37" : "#eae0d5"}
                      fontSize={isActive ? "1.2" : "1"}
                      textAnchor="middle"
                      className="font-serif tracking-wide select-none drop-shadow-md"
                      style={{ transition: 'fill 0.5s ease, font-size 0.5s ease' }}
                    >
                      {node.name}
                    </text>
                    
                    {/* Subtitle */}
                    {(isActive || !activeNode) && (
                      <text
                        y="1.8"
                        fill="#eae0d5"
                        fontSize="0.5"
                        textAnchor="middle"
                        className="font-mono tracking-widest opacity-40 select-none uppercase"
                      >
                        {node.type}
                      </text>
                    )}
                  </g>
                );
              })}
            </motion.svg>
          </TransformComponent>
        )}
      </TransformWrapper>
    </div>
  );
}

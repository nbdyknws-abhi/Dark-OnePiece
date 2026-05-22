import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, GitCommit, MapPin, Shield, BookOpen } from 'lucide-react';
import { useNarrative } from '../context/NarrativeContext';
import { NODES, EDGES, JOURNEYS } from '../data/loreData';

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

  // Locations / Concepts / Arcs
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

export default function NodeDossier() {
  const { activeNode, goBack, exploreState, startJourney } = useNarrative();

  if (exploreState !== 'exploring') return null;

  const node = NODES.find(n => n.id === activeNode);

  // Determine connected nodes for recursive discovery list
  const connectedEdges = EDGES.filter(e => e.source === activeNode || e.target === activeNode);
  const connectedNodes = connectedEdges.map(e => {
    const connectedId = e.source === activeNode ? e.target : e.source;
    return {
      node: NODES.find(n => n.id === connectedId),
      label: e.label,
      type: e.type
    };
  }).filter(c => c.node);

  return (
    <AnimatePresence>
      {activeNode && node && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          className="absolute right-0 top-0 bottom-0 w-full md:w-[500px] bg-black/70 backdrop-blur-2xl border-l border-gold/10 flex flex-col z-40"
        >
          {/* Header Controls */}
          <div className="p-6 border-b border-gold/15 flex items-center justify-between bg-charcoal/40">
            <button 
              onClick={goBack}
              className="flex items-center text-[10px] font-mono tracking-widest text-gold/60 hover:text-gold transition-colors uppercase"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Retract Focus
            </button>
            <span className="text-[10px] font-mono text-fog/40 uppercase tracking-widest">
              NARRATIVE DOSSIER
            </span>
          </div>

          {/* Dossier Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-8 space-y-10">

            {/* Portrait / Scene Image */}
            {PORTRAIT_MAP[node.id] && (
              <motion.div
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className={`relative w-full rounded overflow-hidden mb-6 ${
                  node.type === 'character' ? 'aspect-[4/3] md:aspect-[4/3]' : 'h-48 md:h-56'
                }`}
              >
                <img
                  src={PORTRAIT_MAP[node.id]}
                  alt={node.name}
                  className={`object-cover w-full h-full ${
                    node.type === 'character' ? 'object-[center_15%]' : 'object-center'
                  }`}
                />
                {/* Cinematic gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                {/* Golden border bottom glow */}
                <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
              </motion.div>
            )}

            {/* Title Block */}
            <div>
              <div className="flex items-center space-x-3 mb-3">
                {node.type === 'character' && <Shield className="w-5 h-5 text-gold" />}
                {node.type === 'location' && <MapPin className="w-5 h-5 text-gold" />}
                {node.type === 'faction' && <GitCommit className="w-5 h-5 text-gold" />}
                {node.type === 'arc' && <BookOpen className="w-5 h-5 text-gold" />}
                <span className="text-[10px] font-mono tracking-widest text-gold/60 uppercase">
                  RECORD TYPE // {node.type}
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-serif font-black text-parchment leading-tight tracking-tight mb-2">
                {node.name}
              </h2>
              <p className="text-gold-dark font-serif italic text-lg">
                "{node.title}"
              </p>
            </div>

            {/* Core Description */}
            <div className="space-y-2">
              <h4 className="text-[10px] font-mono text-gold/40 tracking-widest uppercase border-b border-white/5 pb-2 mb-4">
                ARCHIVE SUMMARY
              </h4>
              <p className="text-sm text-fog/90 leading-relaxed font-sans font-light">
                {node.description}
              </p>
            </div>

            {/* Journey Entry Point */}
            {JOURNEYS[node.id] && (
              <motion.button
                whileHover={{ scale: 1.02, borderColor: 'rgba(212, 175, 55, 0.6)' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => startJourney(node.id)}
                className="w-full py-4 px-6 rounded border border-gold/30 bg-gold/5 text-gold text-xs font-mono tracking-[0.2em] uppercase transition-all flex items-center justify-center space-x-3 cursor-pointer"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
                </span>
                <span>TRACE VOYAGE PATH</span>
              </motion.button>
            )}

            {/* Contextual Timelines & Relations (Recursive Discovery System) */}
            <div>
              <h4 className="text-[10px] font-mono text-gold/40 tracking-widest uppercase border-b border-white/5 pb-2 mb-4">
                KNOWN CONNECTIONS
              </h4>
              {connectedNodes.length > 0 ? (
                <div className="space-y-4">
                  {connectedNodes.map((conn, idx) => (
                    <div key={idx} className="flex items-start border-l border-gold/20 pl-4 py-1">
                      {PORTRAIT_MAP[conn.node.id] && (
                        <img
                          src={PORTRAIT_MAP[conn.node.id]}
                          alt={conn.node.name}
                          className="w-6 h-6 rounded-full object-cover border border-gold/30 mr-3 mt-0.5 flex-shrink-0"
                        />
                      )}
                      <div className="flex flex-col">
                      <span className="text-xs font-serif text-parchment font-bold">
                        {conn.node.name}
                      </span>
                      <span className="text-[10px] font-mono text-fog/50 uppercase mt-1">
                        Relation: {conn.label}
                      </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs font-mono text-fog/30 italic">No direct connections documented.</p>
              )}
            </div>

          </div>

          {/* Footer Status */}
          <div className="p-6 border-t border-white/5 bg-charcoal/60 text-[9px] font-mono text-fog/30 flex justify-between uppercase">
            <span>COORDINATES: {node.x}.{node.y}</span>
            <span>SYNC: COMPLETE</span>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldAlert, 
  Terminal, 
  Lock, 
  Unlock, 
  Calendar, 
  BookOpen, 
  FileText, 
  RefreshCw,
  X
} from 'lucide-react';
import { useNarrative } from '../context/NarrativeContext';

// 1. Redacted Text Block with Character Decryption Animation
function RedactedBlock({ text }) {
  const [revealed, setRevealed] = useState(false);
  const [displayText, setDisplayText] = useState(() => '█'.repeat(text.length || 10));

  useEffect(() => {
    if (!revealed) return;

    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (index < iterations) return text[index];
            if (char === ' ') return ' ';
            const glyphs = 'XØÆΞΨΩαβγδεζηθικλμνξοπρστυφχψω0123456789%@&*';
            return glyphs[Math.floor(Math.random() * glyphs.length)];
          })
          .join('')
      );
      if (iterations >= text.length) {
        clearInterval(interval);
      }
      iterations += 0.5; // slow down slightly for visibility
    }, 25);
    return () => clearInterval(interval);
  }, [revealed, text]);

  return (
    <span
      onClick={() => setRevealed(true)}
      className={`inline-block px-1 rounded transition-all duration-300 font-mono text-xs cursor-pointer ${
        revealed
          ? 'bg-transparent text-gold font-light text-glow-gold'
          : 'bg-[#d4af37]/15 text-gold border border-gold/10 hover:bg-[#d4af37]/30 hover:border-gold/30'
      }`}
      title="Declassify block"
    >
      {displayText}
    </span>
  );
}

export default function ForbiddenCodex() {
  const { isCodexOpen, setIsCodexOpen, activeCodexTab, setActiveCodexTab } = useNarrative();

  // State for Classified Files Tab
  const [selectedFileId, setSelectedFileId] = useState('wg-0089');
  
  // State for Poneglyph Translation Mini-game
  const [decryptedKeys, setDecryptedKeys] = useState({});
  const [matrixLog, setMatrixLog] = useState(['[SYSTEM INITIALIZED]: WAITING FOR INPUT MATRIX...']);
  
  const poneglyphGlyphs = [
    { glyph: '᚛', text: 'TO THE GENERATIONS OF THE FUTURE:', id: 1 },
    { glyph: '᚜', text: 'WE ARE THE CITIZENS OF THE GREAT KINGDOM.', id: 2 },
    { glyph: 'ᚢ', text: 'OUR CIVILIZATION FLOURISHED WITH FREEDOM.', id: 3 },
    { glyph: 'ᚦ', text: 'BUT AN ALLIANCE OF TWENTY KINGS CONSPIRED AGAINST US.', id: 4 },
    { glyph: 'ᚨ', text: 'THEY FEARED OUR PROGRESS AND OUR WILL TO SHATTER BOUNDARIES.', id: 5 },
    { glyph: 'ᚱ', text: 'AS WE FACE EXTERMINATION, WE CARVE OUR LEGACY.', id: 6 },
    { glyph: 'ᚲ', text: 'THESE STONES ARE INDESTRUCTIBLE, FORGED BY WANO SAMURAI.', id: 7 },
    { glyph: 'ᚷ', text: 'THE TRUTH OF THE VOID CENTURY WILL SURVIVE THE TIDES.', id: 8 },
    { glyph: 'ᚹ', text: 'THE ANCIENT WEAPONS MUST NOT FALL INTO THE COLD THRONES.', id: 9 },
    { glyph: 'ᚺ', text: 'THE WORLD IS SINKING, AND THE WATERS WILL RISE AGAIN.', id: 10 },
    { glyph: 'ᚾ', text: 'AWAITS THE ONE WHO WILL BEAR THE HAT OF STRAW.', id: 11 },
    { glyph: 'ᛁ', text: 'LET THEM HEAR OUR VOICES ACROSS THE DEEP SEA.', id: 12 },
  ];

  const handleTranslateGlyph = (glyphObj) => {
    if (decryptedKeys[glyphObj.id]) return;
    
    // Set decrypted status
    setDecryptedKeys(prev => ({ ...prev, [glyphObj.id]: true }));
    
    // Log decryption progress
    setMatrixLog(prev => [
      `[DECRYPTION SUCCESSFUL]: GLYPH "${glyphObj.glyph}" MATCHED TO VECTOR ${glyphObj.id}`,
      ...prev
    ]);
  };

  const resetPoneglyphTranslator = () => {
    setDecryptedKeys({});
    setMatrixLog(['[SYSTEM RESET]: WAITING FOR INPUT MATRIX...']);
  };

  // Percentage completion
  const decryptedCount = Object.keys(decryptedKeys).length;
  const progressPercent = Math.round((decryptedCount / poneglyphGlyphs.length) * 100);

  if (!isCodexOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed inset-0 z-50 bg-[#060709]/95 backdrop-blur-2xl flex flex-col font-sans text-parchment"
      >
        {/* Cinematic Grid scanlines background */}
        <div className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-5 bg-[linear-gradient(rgba(18,24,38,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] [background-size:100%_4px,3px_100%]" />
        
        {/* Terminal Header */}
        <div className="px-8 py-4 border-b border-gold/15 flex items-center justify-between bg-charcoal/80 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-2.5 h-2.5 bg-crimson animate-ping rounded-full" />
            <div className="flex flex-col">
              <span className="text-[10px] font-mono tracking-widest text-gold font-bold uppercase">
                WORLD GOVERNMENT RESTRICTED LORE DATABASE // LEVEL V ACCESS
              </span>
              <span className="text-[8px] font-mono text-fog/40 tracking-wider">
                COORDINATES: REDLINE.MARIEJOIS.8902 // NODE STATUS: SECURE
              </span>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={() => setIsCodexOpen(false)}
            className="flex items-center space-x-2 text-[10px] font-mono tracking-[0.2em] text-gold/60 hover:text-gold border border-gold/20 hover:border-gold/60 px-4 py-2 rounded bg-charcoal transition-all uppercase cursor-pointer"
          >
            <span>Disconnect Archive</span>
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Tab Controls Bar */}
        <div className="px-8 py-3 bg-[#0d1015]/60 border-b border-white/5 flex items-center space-x-2 z-10">
          <button
            onClick={() => setActiveCodexTab('files')}
            className={`flex items-center space-x-2 px-4 py-2 text-[10px] font-mono tracking-widest uppercase border rounded transition-all cursor-pointer ${
              activeCodexTab === 'files'
                ? 'bg-gold/10 border-gold/40 text-gold text-glow-gold'
                : 'bg-transparent border-transparent text-fog/50 hover:text-parchment hover:bg-white/5'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Classified Files</span>
          </button>

          <button
            onClick={() => setActiveCodexTab('poneglyphs')}
            className={`flex items-center space-x-2 px-4 py-2 text-[10px] font-mono tracking-widest uppercase border rounded transition-all cursor-pointer ${
              activeCodexTab === 'poneglyphs'
                ? 'bg-gold/10 border-gold/40 text-gold text-glow-gold'
                : 'bg-transparent border-transparent text-fog/50 hover:text-parchment hover:bg-white/5'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Poneglyph Translator</span>
          </button>

          <button
            onClick={() => setActiveCodexTab('chronology')}
            className={`flex items-center space-x-2 px-4 py-2 text-[10px] font-mono tracking-widest uppercase border rounded transition-all cursor-pointer ${
              activeCodexTab === 'chronology'
                ? 'bg-gold/10 border-gold/40 text-gold text-glow-gold'
                : 'bg-transparent border-transparent text-fog/50 hover:text-parchment hover:bg-white/5'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>Era Chronology</span>
          </button>
        </div>

        {/* Tab Content Display Area */}
        <div className="flex-1 overflow-hidden relative z-10 flex">
          
          {/* TAB 1: CLASSIFIED FILES */}
          {activeCodexTab === 'files' && (
            <div className="w-full h-full flex flex-col md:flex-row">
              {/* Left sidebar: File directory */}
              <div className="w-full md:w-80 border-r border-white/5 bg-[#090b0e] overflow-y-auto p-6 space-y-4">
                <h3 className="text-[10px] font-mono tracking-[0.2em] text-fog/40 uppercase mb-4">
                  CLASSIFIED DIRECTORY
                </h3>
                
                {[
                  { id: 'wg-0089', title: 'Ohara Annihilation report', code: 'WG-0089', level: 'LEVEL V CLEARANCE' },
                  { id: 'wg-0104', title: 'God Valley suppression', code: 'WG-0104', level: 'FORBIDDEN LEVEL' },
                  { id: 'wg-0722', title: 'Great Sinking Prophecy', code: 'WG-0722', level: 'EXTREME WARNING' },
                ].map(file => (
                  <button
                    key={file.id}
                    onClick={() => setSelectedFileId(file.id)}
                    className={`w-full text-left p-4 rounded border transition-all cursor-pointer flex flex-col space-y-2 ${
                      selectedFileId === file.id
                        ? 'bg-gold/5 border-gold/30 text-gold'
                        : 'bg-transparent border-white/5 text-fog hover:bg-white/5'
                    }`}
                  >
                    <span className="text-[9px] font-mono tracking-widest text-crimson font-black uppercase">
                      {file.level}
                    </span>
                    <span className="text-sm font-serif font-bold tracking-wide">
                      {file.title}
                    </span>
                    <span className="text-[9px] font-mono opacity-50">
                      INDEX // {file.code}
                    </span>
                  </button>
                ))}
              </div>

              {/* Right panel: File viewer */}
              <div className="flex-1 bg-[#050608] p-8 overflow-y-auto relative flex justify-center">
                <div className="absolute inset-0 pointer-events-none opacity-5 bg-[radial-gradient(rgba(212,175,55,0.15)_1.5px,transparent_1.5px)] [background-size:24px_24px]" />
                
                <div className="max-w-2xl w-full border border-gold/15 bg-charcoal/70 p-10 relative rounded shadow-2xl backdrop-blur">
                  
                  {/* File Watermark */}
                  <div className="absolute top-10 right-10 border-2 border-crimson/30 text-crimson/30 font-mono font-black text-[10px] tracking-[0.3em] uppercase p-2 select-none pointer-events-none transform rotate-12">
                    CLASSIFIED RESTRICTED
                  </div>

                  {selectedFileId === 'wg-0089' && (
                    <div className="space-y-6">
                      <div className="space-y-2 pb-4 border-b border-white/5 font-mono text-[10px] text-fog/40">
                        <div>RECORD INDEX: WG-0089</div>
                        <div>OPERATIVE REF: CP9-SPANDINE</div>
                        <div>SUBJECT: THE OHARA BUSTER CALL CONSPIRACY</div>
                      </div>

                      <h2 className="text-2xl font-serif text-gold tracking-wide">
                        OHARA ANNIHILATION DOSSIER
                      </h2>

                      <p className="text-sm leading-relaxed text-parchment-dark font-sans space-y-4 font-light">
                        In the Year 1500, a Buster Call fleet was dispatched to{' '}
                        <RedactedBlock text="Ohara, West Blue" /> to eliminate scholars investigating
                        the <RedactedBlock text="Void Century" />. The operation was ordered by the{' '}
                        <RedactedBlock text="Five Elders" />.
                      </p>
                      
                      <p className="text-sm leading-relaxed text-parchment-dark font-sans space-y-4 font-light">
                        Admiral <RedactedBlock text="Sakazuki (Akainu)" /> personally ordered the destruction of
                        the civilian evacuation vessel, stating that absolute justice requires no compromises, lest
                        a scholar slip past. Scholarly assets and the thousand-year-old{' '}
                        <RedactedBlock text="Tree of Knowledge" /> were completely incinerated.
                      </p>
                      
                      <p className="text-sm leading-relaxed text-parchment-dark font-sans space-y-4 font-light">
                        One target, <RedactedBlock text="Nico Robin" />, aged 8, escaped the net. She was labeled the
                        "Devil Child" and assigned a <RedactedBlock text="79,000,000 Berry bounty" /> to ensure her immediate
                        apprehension by bounty hunters or pirate elements. Her survival remains a critical threat to
                        global informational stability.
                      </p>

                      <div className="pt-8 border-t border-white/5 flex items-center space-x-3 text-xs text-crimson font-mono font-bold">
                        <ShieldAlert className="w-4 h-4" />
                        <span>WARNING: COPIES OF THIS DIGITIZED LOG ARE PUNISHABLE BY IMMEDIATE SUMMONS</span>
                      </div>
                    </div>
                  )}

                  {selectedFileId === 'wg-0104' && (
                    <div className="space-y-6">
                      <div className="space-y-2 pb-4 border-b border-white/5 font-mono text-[10px] text-fog/40">
                        <div>RECORD INDEX: WG-0104</div>
                        <div>OPERATIVE REF: SENGOKU.NAVY</div>
                        <div>SUBJECT: THE GOD VALLEY INCIDENT & ERADICATION</div>
                      </div>

                      <h2 className="text-2xl font-serif text-gold tracking-wide">
                        THE GOD VALLEY CONFLICT REPORT
                      </h2>

                      <p className="text-sm leading-relaxed text-parchment-dark font-sans space-y-4 font-light">
                        On the island of God Valley, a highly classified conflict occurred involving the Rocks Pirates,
                        a coalition of <RedactedBlock text="Vice Admiral Garp" />, and the Roger Pirates. The island
                        was currently hosting a World Nobles' hunting tournament.
                      </p>
                      
                      <p className="text-sm leading-relaxed text-parchment-dark font-sans space-y-4 font-light">
                        The confrontation resulted in the complete annihilation of{' '}
                        <RedactedBlock text="Rocks D. Xebec" /> and his crew's dissolution. Following the battle, the World
                        Government ordered the <RedactedBlock text="erasure of God Valley" /> from all global maps and
                        navigational logs, erasing the physical landmass through hidden weaponry.
                      </p>
                      
                      <p className="text-sm leading-relaxed text-parchment-dark font-sans space-y-4 font-light">
                        To maintain the public narrative of Navy invincibility, Garp was labeled the{' '}
                        <RedactedBlock text="Hero of the Marines" />, systematically omitting his alliance with the{' '}
                        <RedactedBlock text="Roger Pirates" />.
                      </p>

                      <div className="pt-8 border-t border-white/5 flex items-center space-x-3 text-xs text-crimson font-mono font-bold">
                        <ShieldAlert className="w-4 h-4" />
                        <span>WARNING: KNOWLEDGE OF GOD VALLEY COORDINATES CONSTITUTES GLOBAL TREASON</span>
                      </div>
                    </div>
                  )}

                  {selectedFileId === 'wg-0722' && (
                    <div className="space-y-6">
                      <div className="space-y-2 pb-4 border-b border-white/5 font-mono text-[10px] text-fog/40">
                        <div>RECORD INDEX: WG-0722</div>
                        <div>OPERATIVE REF: VEGAPUNK.EGGHEAD</div>
                        <div>SUBJECT: SEISMIC FORECASTING AND PROPHECY</div>
                      </div>

                      <h2 className="text-2xl font-serif text-gold tracking-wide">
                        THE GREAT SINKING MEMORANDUM
                      </h2>

                      <p className="text-sm leading-relaxed text-parchment-dark font-sans space-y-4 font-light">
                        Intercepted Vegapunk audio-transmission from Egghead Island: The world is undergoing a terminal tectonic
                        adjustment. Research of core sea temperature indicators confirms that{' '}
                        <RedactedBlock text="sea levels will rise by 200 meters" /> globally.
                      </p>
                      
                      <p className="text-sm leading-relaxed text-parchment-dark font-sans space-y-4 font-light">
                        This is not a natural climatic shift, but the deliberate reactivation of{' '}
                        <RedactedBlock text="Ancient Weapons (Pluton, Poseidon, Uranus)" />. The world's previous civilizations was doused
                        by the same means 800 years ago, resulting in the sinking of a massive continent.
                      </p>
                      
                      <p className="text-sm leading-relaxed text-parchment-dark font-sans space-y-4 font-light">
                        The current continents are merely mountain peaks surviving the ancient flood. The race to Laugh Tale is a race
                        to claim the keys to the <RedactedBlock text="Ancient Weapons" /> which will decide which islands sink next.
                      </p>

                      <div className="pt-8 border-t border-white/5 flex items-center space-x-3 text-xs text-crimson font-mono font-bold">
                        <ShieldAlert className="w-4 h-4" />
                        <span>WARNING: BROADCAST CENSORSHIP ORDER 09 // EXTERMINATE ALL EGGHEAD WITNESSES</span>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          )}

          {/* TAB 2: PONEGLYPH TRANSLATOR */}
          {activeCodexTab === 'poneglyphs' && (
            <div className="w-full h-full flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden p-6 lg:p-10 space-y-6 lg:space-y-0 lg:space-x-8">
              
              {/* Left Side: Interactive Slab */}
              <div className="flex-1 flex flex-col items-center justify-center bg-[#090b0e] border border-white/5 rounded p-6 relative">
                <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:16px_16px]" />
                
                <h4 className="text-[10px] font-mono tracking-widest text-gold/60 uppercase mb-6 flex items-center">
                  <Terminal className="w-3.5 h-3.5 mr-2" />
                  PONEGLYPH SLAB SECTOR MATRIX
                </h4>
                
                {/* The Red Slab */}
                <div className="relative w-80 h-96 bg-gradient-to-br from-[#4d0c11] to-[#1e0305] border border-crimson/50 rounded-lg p-6 flex flex-col justify-between shadow-[0_0_50px_rgba(139,0,0,0.3)]">
                  {/* Ancient stone cracks texture */}
                  <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_20%,#000_100%)]" />
                  
                  {/* Glyph Grid */}
                  <div className="grid grid-cols-3 gap-4 flex-1">
                    {poneglyphGlyphs.map(item => {
                      const isDecrypted = decryptedKeys[item.id];
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleTranslateGlyph(item)}
                          className={`relative border text-xl flex items-center justify-center font-serif rounded transition-all cursor-pointer duration-500 h-16 ${
                            isDecrypted
                              ? 'bg-gold/25 border-gold text-gold text-glow-gold scale-102'
                              : 'bg-black/35 border-crimson/40 text-crimson-light hover:border-gold/60 hover:text-gold hover:bg-black/60'
                          }`}
                        >
                          {item.glyph}
                          {isDecrypted && (
                            <span className="absolute bottom-1 right-1">
                              <Unlock className="w-2 h-2 text-gold animate-pulse" />
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Encryption status bar */}
                  <div className="mt-4 pt-4 border-t border-crimson/30 flex items-center justify-between text-[9px] font-mono text-fog/60">
                    <span>SECTOR INTEGRITY: DECODED</span>
                    <span className={`font-bold ${progressPercent === 100 ? 'text-gold' : 'text-crimson-light'}`}>
                      {progressPercent}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Side: Translator output */}
              <div className="w-full lg:w-[500px] bg-[#07080a] border border-white/5 rounded p-6 flex flex-col">
                <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-mono tracking-widest text-gold uppercase">
                      TRANSLATION MATRIX OUTPUT
                    </span>
                    <span className="text-[8px] font-mono text-fog/30 uppercase mt-0.5">
                      COGNITIVE SYNCHRONIZATION VIA NICO ROBIN SCHOLARSHIP
                    </span>
                  </div>
                  
                  <button 
                    onClick={resetPoneglyphTranslator}
                    className="flex items-center space-x-1 text-[9px] font-mono text-crimson-light hover:text-gold border border-crimson/25 hover:border-gold/30 px-2.5 py-1 rounded bg-[#090b0e] transition-colors"
                  >
                    <RefreshCw className="w-2.5 h-2.5" />
                    <span>Reset Matrix</span>
                  </button>
                </div>

                {/* Live decrypted readout */}
                <div className="flex-1 bg-charcoal/50 border border-gold/10 p-4 rounded overflow-y-auto font-mono text-[10px] leading-relaxed space-y-3 max-h-[300px] lg:max-h-none">
                  {progressPercent === 0 ? (
                    <div className="h-full flex items-center justify-center text-fog/30 italic text-center p-4">
                      INTERACT WITH SLAB GLYPHS TO GENERATE LORE OUTPUT VECTORS
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {poneglyphGlyphs.map(g => (
                        <div key={g.id} className="transition-all duration-1000">
                          {decryptedKeys[g.id] ? (
                            <motion.div
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              className="text-gold flex space-x-2"
                            >
                              <span className="text-gold/50">{g.glyph}:</span>
                              <span className="text-parchment font-sans text-xs">{g.text}</span>
                            </motion.div>
                          ) : (
                            <div className="text-fog/20 select-none">
                              {g.glyph}: ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {progressPercent === 100 && (
                    <motion.div
                      initial={{ scale: 0.95, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="border border-gold bg-gold/15 p-4 rounded mt-4 text-center font-sans space-y-1.5"
                    >
                      <div className="text-gold font-mono tracking-widest text-[9px] font-bold">
                        VOID CENTURY BROADCAST ONLINE
                      </div>
                      <p className="text-xs text-parchment font-light italic">
                        "The Great Kingdom survives not in maps, but in the heart. The dawn is coming."
                      </p>
                    </motion.div>
                  )}
                </div>

                {/* System logs console */}
                <div className="mt-4 border-t border-white/5 pt-4">
                  <span className="text-[8px] font-mono text-fog/30 uppercase block mb-2">
                    DECRYPT TERMINAL LOGS
                  </span>
                  <div className="bg-black/85 h-24 rounded p-3 overflow-y-auto font-mono text-[8px] text-green-500/80 leading-normal space-y-1">
                    {matrixLog.map((log, idx) => (
                      <div key={idx}>{log}</div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 3: CHRONOLOGY TIMELINE */}
          {activeCodexTab === 'chronology' && (
            <div className="w-full h-full overflow-y-auto p-6 md:p-12 relative flex justify-center">
              <div className="absolute inset-0 pointer-events-none opacity-5 bg-[linear-gradient(to_bottom,rgba(212,175,55,0.08)_1px,transparent_1px)] [background-size:100%_20px]" />
              
              <div className="max-w-3xl w-full relative">
                
                {/* Visual center vertical spine line */}
                <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-gold/50 via-gold/15 to-transparent transform -translate-x-1/2" />
                
                <div className="space-y-12 pb-16">
                  
                  {[
                    {
                      time: '900 YEARS AGO',
                      title: 'The Great Clash & The Void Century',
                      desc: 'A planetary civilization of profound advancement, centered around the Great Kingdom, clashes with a coalition of twenty monarchs. To secure their memory against absolute erasure, they forge the ancient indestructible Poneglyph stones across the oceans.',
                      icon: ShieldAlert,
                      align: 'left'
                    },
                    {
                      time: '800 YEARS AGO',
                      title: 'Establishment of the World Nobles',
                      desc: 'The nineteen victorious kings establish the World Government at the summit of the Red Line in Mariejois. The twenty crowns are merged, except for Alabasta, establishing the Empty Throne. Active study of the Void Century is outlawed on pain of immediate execution.',
                      icon: Lock,
                      align: 'right'
                    },
                    {
                      time: '24 YEARS AGO',
                      title: 'The Conquest of Laugh Tale',
                      desc: 'Gol D. Roger sails his crew through the Grand Line and successfully locates the final hidden island. Finding the true history, he laughs. Following his surrender, his public execution statement starts the great golden era of pirates.',
                      icon: Unlock,
                      align: 'left'
                    },
                    {
                      time: '2 YEARS AGO',
                      title: 'The Battle of Marineford',
                      desc: 'The greatest military clash in contemporary history between the Whitebeard Pirates and Navy Headquarters. Whitebeards final breath reinforces Rogers claim, confirming the existence of the One Piece to a global audience.',
                      icon: Terminal,
                      align: 'right'
                    },
                    {
                      time: 'PRESENT DAY',
                      title: 'The Sinking Revelation',
                      desc: 'Dr. Vegapunk releases a worldwide digital broadcast from the burning research island of Egghead, declaring that the world is submerging into the sea. The race for the ancient weapons begins as faction boundaries crystallize.',
                      icon: BookOpen,
                      align: 'left'
                    }
                  ].map((event, idx) => {
                    const IconComponent = event.icon;
                    return (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-50px' }}
                        transition={{ duration: 0.8, delay: idx * 0.15 }}
                        className={`relative flex flex-col md:flex-row items-start md:justify-between w-full pl-12 md:pl-0 ${
                          event.align === 'right' ? 'md:flex-row-reverse' : ''
                        }`}
                      >
                        {/* Center Dot Marker */}
                        <div className="absolute left-4 md:left-1/2 top-1.5 w-7 h-7 rounded-full border border-gold/45 bg-charcoal flex items-center justify-center transform -translate-x-1/2 z-10 shadow-[0_0_10px_rgba(212,175,55,0.2)]">
                          <IconComponent className="w-3.5 h-3.5 text-gold" />
                        </div>

                        {/* Content Container */}
                        <div className="w-full md:w-[45%] border border-white/5 hover:border-gold/30 bg-[#0a0d12]/80 backdrop-blur p-6 rounded transition-all duration-500">
                          <span className="text-[10px] font-mono tracking-widest text-gold font-bold block mb-1">
                            {event.time}
                          </span>
                          <h3 className="text-lg font-serif font-black tracking-wide text-parchment mb-3">
                            {event.title}
                          </h3>
                          <p className="text-xs text-fog leading-relaxed font-sans font-light">
                            {event.desc}
                          </p>
                        </div>

                        {/* Empty spacing box on large screens to balance grid */}
                        <div className="hidden md:block w-[45%]" />
                      </motion.div>
                    );
                  })}

                </div>

              </div>
            </div>
          )}

        </div>

        {/* Console status footer */}
        <div className="px-8 py-3 border-t border-white/5 bg-[#060709] flex items-center justify-between text-[9px] font-mono text-fog/30 relative z-10">
          <span>CLASSIFICATION STATUS: EYES ONLY</span>
          <span className="animate-pulse text-gold font-bold">SECURE CHANNEL DECRYPTION ENGINE v3.44</span>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

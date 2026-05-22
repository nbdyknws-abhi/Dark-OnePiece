import { motion, AnimatePresence } from 'framer-motion';
import { useNarrative } from '../context/NarrativeContext';

export default function LandingOverlay() {
  const { exploreState, enterArchive } = useNarrative();

  return (
    <AnimatePresence>
      {exploreState === 'landing' && (
        <motion.div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 2, ease: "easeInOut" }}
        >
          {/* Cinematic background image with slow zoom */}
          <motion.div
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3, ease: "easeOut" }}
          >
            <motion.img
              src="/assets/scenes/landing_bg.png"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ scale: 1.0 }}
              animate={{ scale: 1.1 }}
              transition={{ duration: 30, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
            />
          </motion.div>

          {/* Dark gradient overlay for text readability */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black via-black/70 to-black/50" />

          {/* Radial vignette */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_0%,#000000_100%)] opacity-80" />
          
          <div className="relative z-10 text-center flex flex-col items-center max-w-3xl px-6">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ delay: 0.5, duration: 1.5 }}
              className="text-gold font-sans font-bold text-[10px] tracking-[0.5em] uppercase block mb-6"
            >
              RESTRICTED MYTHOLOGY ARCHIVE
            </motion.span>
            
            <motion.h1 
              initial={{ opacity: 0, filter: "blur(10px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 1, duration: 2.5 }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl text-parchment leading-tight tracking-tight drop-shadow-2xl"
            >
              THE GRAND ERA
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "60px" }}
              transition={{ delay: 2.5, duration: 1.5 }}
              className="h-[1px] bg-gold/40 my-8"
            />
            
            <motion.button
              onClick={enterArchive}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              whileHover={{ opacity: 1, scale: 1.05 }}
              transition={{ delay: 3, duration: 1 }}
              className="group flex flex-col items-center space-y-3 cursor-pointer"
            >
              <span className="text-[10px] font-mono text-gold tracking-widest uppercase transition-all group-hover:text-glow-gold">
                INITIALIZE RECURSIVE DISCOVERY
              </span>
              <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center group-hover:border-gold/80 transition-colors">
                <div className="w-1.5 h-1.5 bg-gold rounded-full animate-ping opacity-75" />
              </div>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

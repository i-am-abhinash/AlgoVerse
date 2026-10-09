import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-algoverse-bg-main relative overflow-hidden flex flex-col items-center justify-center">
      {/* Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-algoverse-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-algoverse-accent/20 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="z-10 text-center max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 flex justify-center"
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-algoverse-primary to-algoverse-accent flex items-center justify-center text-white text-4xl font-bold shadow-[0_0_40px_rgba(139,92,246,0.5)]">
            AV
          </div>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70 mb-6"
        >
          Master DSA. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-algoverse-primary to-algoverse-accent">One Adventure at a Time.</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl text-algoverse-text-secondary mb-12 max-w-2xl mx-auto"
        >
          Explore algorithmic worlds, solve interactive quests, and learn alongside your own magical mentor.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Link to="/world" className="px-8 py-4 rounded-xl bg-algoverse-primary text-white font-bold text-lg hover:bg-violet-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all flex items-center gap-2 w-full sm:w-auto justify-center">
            Enter AlgoVerse
          </Link>
          <Link to="/world" className="px-8 py-4 rounded-xl bg-white/10 text-white font-bold text-lg hover:bg-white/20 transition-all border border-white/10 w-full sm:w-auto justify-center">
            Explore the Realms
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

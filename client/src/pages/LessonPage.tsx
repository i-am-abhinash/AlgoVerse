import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LessonPage() {
  const { id } = useParams();

  return (
    <div className="w-full h-full flex flex-col bg-algoverse-bg-main overflow-hidden">
      {/* Top Bar */}
      <header className="h-16 border-b border-white/10 bg-algoverse-elevated px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/world" className="text-algoverse-text-secondary hover:text-white transition-colors">&larr; Exit</Link>
          <div className="h-4 w-px bg-white/20" />
          <h1 className="font-bold text-white">Quest: {id?.replace('-', ' ')}</h1>
        </div>
        <div className="flex gap-2">
          <div className="px-3 py-1 rounded-full bg-algoverse-reward/20 text-algoverse-reward text-sm font-bold flex items-center gap-1">
            <span>+50 XP</span>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Instructions & Context */}
        <div className="w-1/3 min-w-[300px] max-w-[400px] border-r border-white/10 bg-algoverse-elevated overflow-y-auto p-6">
          <h2 className="text-2xl font-bold text-white mb-4">Learning Objective</h2>
          <p className="text-algoverse-text-secondary mb-8">
            In this quest, you will learn the mechanics behind this algorithm. Read the instructions carefully and interact with the visualizer to understand the steps.
          </p>
          
          <div className="bg-black/20 p-4 rounded-xl border border-white/5 mb-6">
            <h3 className="font-bold text-algoverse-accent mb-2">Challenge</h3>
            <p className="text-sm text-gray-300">Complete the simulation to unlock the final quiz.</p>
          </div>
        </div>

        {/* Center Panel: Interactive Visualizer */}
        <div className="flex-1 flex flex-col items-center justify-center relative p-8">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-algoverse-primary via-transparent to-transparent pointer-events-none" />
          
          <div className="z-10 bg-algoverse-elevated/50 backdrop-blur-md border border-white/10 p-12 rounded-2xl w-full max-w-2xl aspect-video flex flex-col items-center justify-center shadow-2xl">
            <h3 className="text-xl text-white mb-8">Algorithm Visualizer Area</h3>
            <div className="flex gap-4">
              {[4, 2, 8, 1, 9, 3].map((num, i) => (
                <motion.div 
                  key={i}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="w-12 h-12 bg-algoverse-primary rounded-lg flex items-center justify-center font-bold text-xl text-white shadow-lg border border-white/20"
                >
                  {num}
                </motion.div>
              ))}
            </div>
          </div>
          
          <div className="mt-8 flex gap-4 z-10">
            <button className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-bold transition-colors">Reset</button>
            <button className="px-6 py-2 bg-algoverse-primary hover:bg-violet-500 rounded-lg text-white font-bold shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all">Next Step</button>
          </div>
        </div>

        {/* Right Panel: AI Mentor */}
        <div className="w-80 border-l border-white/10 bg-algoverse-elevated flex flex-col shadow-[-10px_0_30px_rgba(0,0,0,0.2)] z-20">
          <div className="p-4 border-b border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center text-white border-2 border-algoverse-elevated shadow-[0_0_10px_rgba(56,189,248,0.5)]">
              ✨
            </div>
            <div>
              <div className="font-bold text-white">Mentor</div>
              <div className="text-xs text-algoverse-accent">AI Companion</div>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
            <div className="bg-algoverse-bg-main p-3 rounded-lg rounded-tl-none border border-white/5 text-sm text-gray-300">
              Hello! I'm your mentor. I'm here to help you understand this algorithm. What would you like to know?
            </div>
          </div>
          
          <div className="p-4 border-t border-white/10 bg-black/20">
            <input 
              type="text" 
              placeholder="Ask for a hint..." 
              className="w-full bg-algoverse-bg-main border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-algoverse-primary"
            />
            <div className="flex gap-2 mt-2">
              <button className="flex-1 text-xs py-1.5 bg-white/5 hover:bg-white/10 rounded border border-white/5 text-gray-300">Explain</button>
              <button className="flex-1 text-xs py-1.5 bg-white/5 hover:bg-white/10 rounded border border-white/5 text-gray-300">Hint</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

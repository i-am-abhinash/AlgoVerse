import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';

const REALMS = [
  { id: 'crystal-valley', name: 'Crystal Valley', topic: 'Arrays & Basics', color: 'from-blue-500 to-cyan-400', x: '10%', y: '20%', unlocked: true },
  { id: 'searchwood', name: 'Searchwood', topic: 'Searching Algorithms', color: 'from-emerald-500 to-green-400', x: '40%', y: '40%', unlocked: true },
  { id: 'sorting-forge', name: 'Sorting Forge', topic: 'Sorting Algorithms', color: 'from-orange-500 to-red-500', x: '70%', y: '10%', unlocked: true },
  { id: 'linked-lakes', name: 'Linked Lakes', topic: 'Linked Lists', color: 'from-purple-500 to-pink-500', x: '80%', y: '60%', unlocked: false },
];

export default function WorldMapPage() {
  return (
    <div className="w-full h-full relative bg-algoverse-bg-main overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-algoverse-primary/30 via-algoverse-bg-main to-algoverse-bg-main pointer-events-none" />
      
      {/* Player HUD */}
      <div className="absolute top-6 left-6 z-20 flex gap-4">
        <div className="bg-algoverse-elevated/80 backdrop-blur-md p-4 rounded-xl border border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-algoverse-primary flex items-center justify-center font-bold text-lg">P1</div>
          <div>
            <div className="font-bold text-white">Player</div>
            <div className="text-sm text-algoverse-text-secondary">Level 1 Novice</div>
          </div>
          <div className="ml-4 w-32 h-2 bg-black/50 rounded-full overflow-hidden">
            <div className="h-full bg-algoverse-reward w-1/4 rounded-full" />
          </div>
        </div>
      </div>

      {/* Map Content */}
      <div className="relative w-full h-full min-h-[800px] min-w-[1000px]">
        {/* Draw paths between realms later via SVG */}
        {REALMS.map((realm, index) => (
          <motion.div
            key={realm.id}
            className={`absolute flex flex-col items-center justify-center`}
            style={{ left: realm.x, top: realm.y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, type: 'spring' }}
            whileHover={realm.unlocked ? { scale: 1.1 } : {}}
          >
            {realm.unlocked ? (
              <Link to={`/realm/${realm.id}`} className="relative group flex flex-col items-center">
                <div className={`w-32 h-32 rounded-3xl bg-gradient-to-br ${realm.color} shadow-[0_0_30px_rgba(0,0,0,0.5)] transform rotate-45 group-hover:rotate-0 transition-all duration-500 flex items-center justify-center`}>
                  <div className="w-28 h-28 rounded-2xl bg-algoverse-elevated/50 backdrop-blur-sm -rotate-45 group-hover:rotate-0 transition-all duration-500 border border-white/20" />
                </div>
                <div className="mt-8 bg-algoverse-elevated/90 px-4 py-2 rounded-lg border border-white/10 shadow-lg text-center backdrop-blur-sm">
                  <h3 className="font-bold text-white whitespace-nowrap">{realm.name}</h3>
                  <p className="text-xs text-algoverse-accent">{realm.topic}</p>
                </div>
              </Link>
            ) : (
              <div className="relative flex flex-col items-center opacity-50 cursor-not-allowed">
                <div className={`w-32 h-32 rounded-3xl bg-gray-800 shadow-lg transform rotate-45 flex items-center justify-center`}>
                  <Lock className="text-gray-500 w-8 h-8 -rotate-45" />
                </div>
                <div className="mt-8 bg-algoverse-elevated px-4 py-2 rounded-lg text-center">
                  <h3 className="font-bold text-gray-400 whitespace-nowrap">Locked Realm</h3>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

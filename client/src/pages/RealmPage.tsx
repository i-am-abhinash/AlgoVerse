import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, CheckCircle } from 'lucide-react';

const REALM_DATA: Record<string, any> = {
  'crystal-valley': {
    name: 'Crystal Valley',
    topic: 'Arrays and Basic Operations',
    description: 'Learn the foundational building blocks of all data structures. Arrays store multiple elements in a single contiguous block of memory.',
    quests: [
      { id: 'understanding-arrays', title: 'The First Crystal', description: 'Understand how arrays store data sequentially.', completed: true },
      { id: 'array-insertion', title: 'Forging New Gems', description: 'Insert elements into an array.', completed: false },
      { id: 'array-deletion', title: 'Clearing the Path', description: 'Remove elements from an array.', completed: false },
    ]
  },
  'searchwood': {
    name: 'Searchwood',
    topic: 'Searching Algorithms',
    description: 'Discover how to find what you are looking for efficiently.',
    quests: [
      { id: 'linear-search', title: 'The Lost Artifact', description: 'Search element by element.', completed: false },
      { id: 'binary-search', title: 'Divide and Conquer', description: 'Search faster using sorted data.', completed: false },
    ]
  }
};

export default function RealmPage() {
  const { slug } = useParams();
  const realm = slug ? REALM_DATA[slug] : null;

  if (!realm) return <div className="p-8 text-white">Realm not found.</div>;

  return (
    <div className="w-full h-full bg-algoverse-bg-secondary overflow-y-auto p-8 relative">
      <div className="max-w-4xl mx-auto mt-12 relative z-10">
        <Link to="/world" className="text-algoverse-accent hover:underline mb-8 inline-block">&larr; Back to World Map</Link>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">{realm.name}</h1>
          <h2 className="text-2xl text-algoverse-primary mb-4">{realm.topic}</h2>
          <p className="text-lg text-algoverse-text-secondary">{realm.description}</p>
        </motion.div>

        <div className="space-y-4">
          <h3 className="text-xl font-bold text-white mb-6">Available Quests</h3>
          {realm.quests.map((quest: any, index: number) => (
            <motion.div 
              key={quest.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-6 rounded-xl border flex items-center justify-between transition-all hover:-translate-y-1 ${
                quest.completed 
                  ? 'bg-algoverse-elevated/50 border-algoverse-success/30' 
                  : 'bg-algoverse-elevated border-white/10 hover:border-algoverse-primary/50'
              }`}
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  {quest.completed && <CheckCircle className="text-algoverse-success w-5 h-5" />}
                  <h4 className="text-xl font-bold text-white">{quest.title}</h4>
                </div>
                <p className="text-algoverse-text-secondary">{quest.description}</p>
              </div>
              <Link 
                to={`/lesson/${quest.id}`} 
                className={`px-6 py-3 rounded-lg flex items-center gap-2 font-bold transition-all ${
                  quest.completed 
                    ? 'bg-white/10 text-white hover:bg-white/20' 
                    : 'bg-algoverse-primary text-white hover:bg-violet-500 hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]'
                }`}
              >
                {quest.completed ? 'Review' : 'Start Quest'} <Play className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

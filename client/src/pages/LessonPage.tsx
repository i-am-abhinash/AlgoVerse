import { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

export default function LessonPage() {
  const { id } = useParams();
  
  // Lesson State
  const array = [4, 2, 8, 1, 9, 3];
  const target = 9;
  
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [found, setFound] = useState(false);
  
  // User & Challenge State
  const [user, setUser] = useState<any>(null);
  const [answer, setAnswer] = useState('');
  const [challengeStatus, setChallengeStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');
  
  // Mentor State
  const [messages, setMessages] = useState([{ role: 'mentor', content: "Hello! I'm your mentor. I'm here to help you understand Linear Search. What would you like to know?" }]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Authenticate dev user
    fetch('http://localhost:5000/api/auth/me')
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    let timer: any;
    if (isPlaying && !found && currentIndex < array.length - 1) {
      timer = setTimeout(() => {
        const nextIndex = currentIndex + 1;
        setCurrentIndex(nextIndex);
        if (array[nextIndex] === target) {
          setFound(true);
          setIsPlaying(false);
        }
      }, 1000);
    } else if (isPlaying && (found || currentIndex >= array.length - 1)) {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentIndex, found]);

  const handleNextStep = () => {
    if (found || currentIndex >= array.length - 1) return;
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
    if (array[nextIndex] === target) setFound(true);
  };

  const handleReset = () => {
    setCurrentIndex(-1);
    setFound(false);
    setIsPlaying(false);
  };

  const submitChallenge = async () => {
    if (!user || !answer) return;
    setChallengeStatus('submitting');
    
    try {
      const res = await fetch(`http://localhost:5000/api/challenges/${id}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id, answer: parseInt(answer) })
      });
      const data = await res.json();
      
      if (data.success) {
        setChallengeStatus('success');
        setUser(data.user);
        setFeedback(`Correct! ${data.xpAwarded > 0 ? `+${data.xpAwarded} XP Earned!` : 'XP already claimed.'}`);
      } else {
        setChallengeStatus('error');
        setFeedback(data.message);
      }
    } catch (e) {
      setChallengeStatus('error');
      setFeedback('Error connecting to server.');
    }
  };

  const sendMentorMessage = async (text: string) => {
    if (!text.trim()) return;
    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);
    setChatInput('');
    setIsTyping(true);

    try {
      const res = await fetch('http://localhost:5000/api/mentor/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages, context: { lesson: id } })
      });
      const data = await res.json();
      setMessages([...newMessages, { role: 'mentor', content: data.reply }]);
    } catch (e) {
      setMessages([...newMessages, { role: 'mentor', content: "I'm having trouble connecting to my magic right now." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col bg-algoverse-bg-main overflow-hidden">
      {/* Top Bar */}
      <header className="h-16 border-b border-white/10 bg-algoverse-elevated px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <Link to="/world" className="text-algoverse-text-secondary hover:text-white transition-colors">&larr; Back to World</Link>
          <div className="h-4 w-px bg-white/20" />
          <h1 className="font-bold text-white capitalize">Quest: {id?.replace('-', ' ')}</h1>
        </div>
        <div className="flex items-center gap-4">
          {user && (
            <div className="text-sm font-bold text-white">
              <span className="text-algoverse-text-secondary font-normal">Level {user.level}</span> • {user.xp} XP
            </div>
          )}
          <div className="px-3 py-1 rounded-full bg-algoverse-reward/20 text-algoverse-reward text-sm font-bold flex items-center gap-1">
            <span>+50 XP</span>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <div className="w-1/3 min-w-[300px] max-w-[400px] border-r border-white/10 bg-algoverse-elevated flex flex-col">
          <div className="p-6 overflow-y-auto flex-1">
            <h2 className="text-2xl font-bold text-white mb-4">The Lost Artifact</h2>
            <p className="text-algoverse-text-secondary mb-6 leading-relaxed">
              A crystal has disappeared from the valley. We believe it is hidden among these stones. 
              Linear search is the simplest way to find it. We will check each stone one by one, from left to right, until we find the target.
            </p>
            
            <div className="bg-black/20 p-5 rounded-xl border border-white/5 mb-6">
              <h3 className="font-bold text-algoverse-accent mb-2">Goal</h3>
              <p className="text-sm text-gray-300">Find the target value <strong className="text-white px-1 py-0.5 bg-white/10 rounded">{target}</strong> in the array.</p>
            </div>

            <div className="bg-algoverse-bg-main/50 p-5 rounded-xl border border-white/10">
              <h3 className="font-bold text-white mb-4">Challenge</h3>
              <p className="text-sm text-gray-300 mb-4">
                After observing the algorithm, at what <strong className="text-algoverse-accent">index</strong> (0-based) is the target {target} located?
              </p>
              <div className="flex gap-2">
                <input 
                  type="number" 
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-20 bg-black/40 border border-white/20 rounded-lg px-3 py-2 text-white text-center focus:outline-none focus:border-algoverse-primary"
                  placeholder="idx"
                  disabled={challengeStatus === 'success'}
                />
                <button 
                  onClick={submitChallenge}
                  disabled={challengeStatus === 'submitting' || challengeStatus === 'success' || !answer}
                  className="flex-1 bg-algoverse-primary hover:bg-violet-500 disabled:opacity-50 disabled:hover:bg-algoverse-primary text-white font-bold rounded-lg transition-colors"
                >
                  {challengeStatus === 'submitting' ? 'Checking...' : challengeStatus === 'success' ? 'Completed' : 'Submit'}
                </button>
              </div>
              
              <AnimatePresence>
                {feedback && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: 'auto' }} 
                    className={`mt-4 text-sm font-bold p-3 rounded-lg ${challengeStatus === 'success' ? 'bg-algoverse-success/20 text-algoverse-success' : 'bg-algoverse-error/20 text-algoverse-error'}`}
                  >
                    {feedback}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Center Panel */}
        <div className="flex-1 flex flex-col items-center justify-center relative p-8">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-algoverse-primary via-transparent to-transparent pointer-events-none" />
          
          <div className="z-10 bg-algoverse-elevated/80 backdrop-blur-md border border-white/10 p-12 rounded-2xl w-full max-w-2xl flex flex-col items-center justify-center shadow-2xl">
            <h3 className="text-lg text-white mb-2 tracking-wide font-medium">Linear Search</h3>
            <p className="text-sm text-algoverse-text-secondary mb-12">Target: {target}</p>
            
            <div className="flex gap-4 mb-4 relative">
              {array.map((num, i) => {
                const isActive = i === currentIndex;
                const isFound = found && isActive;
                const isPast = i < currentIndex;

                return (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <span className="text-xs text-algoverse-text-secondary">[{i}]</span>
                    <motion.div 
                      layout
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ 
                        y: isActive ? -10 : 0, 
                        opacity: 1,
                        scale: isActive ? 1.1 : 1,
                      }}
                      className={`w-14 h-14 rounded-lg flex items-center justify-center font-bold text-2xl shadow-lg border-2 transition-colors duration-300 ${
                        isFound 
                          ? 'bg-algoverse-success text-white border-algoverse-success shadow-[0_0_20px_rgba(52,211,153,0.5)]' 
                          : isActive
                            ? 'bg-algoverse-accent text-white border-algoverse-accent shadow-[0_0_20px_rgba(56,189,248,0.5)]'
                            : isPast
                              ? 'bg-black/40 text-gray-400 border-white/5'
                              : 'bg-algoverse-elevated text-white border-white/10'
                      }`}
                    >
                      {num}
                    </motion.div>
                  </div>
                );
              })}
            </div>
            
            <div className="h-8 mt-4 text-algoverse-accent font-medium">
              {currentIndex >= 0 && !found && `Comparing array[${currentIndex}] (${array[currentIndex]}) with target (${target})...`}
              {found && `Target found at index ${currentIndex}!`}
              {currentIndex >= array.length - 1 && !found && `Target not found in array.`}
            </div>
          </div>
          
          <div className="mt-8 flex gap-4 z-10">
            <button onClick={handleReset} className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-bold transition-colors">
              Reset
            </button>
            <button 
              onClick={() => setIsPlaying(!isPlaying)}
              disabled={found || currentIndex >= array.length - 1}
              className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-bold transition-colors disabled:opacity-50"
            >
              {isPlaying ? 'Pause' : 'Play'}
            </button>
            <button 
              onClick={handleNextStep}
              disabled={isPlaying || found || currentIndex >= array.length - 1}
              className="px-6 py-2 bg-algoverse-primary hover:bg-violet-500 rounded-lg text-white font-bold shadow-[0_0_15px_rgba(139,92,246,0.5)] transition-all disabled:opacity-50"
            >
              Next Step
            </button>
          </div>
        </div>

        {/* Right Panel: AI Mentor */}
        <div className="w-80 border-l border-white/10 bg-algoverse-elevated flex flex-col shadow-[-10px_0_30px_rgba(0,0,0,0.2)] z-20">
          <div className="p-4 border-b border-white/10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center text-white border-2 border-algoverse-elevated shadow-[0_0_10px_rgba(56,189,248,0.5)] text-lg">
              ✨
            </div>
            <div>
              <div className="font-bold text-white">Mentor</div>
              <div className="text-xs text-algoverse-accent">AI Companion</div>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-xl text-sm ${
                  msg.role === 'user' 
                    ? 'bg-algoverse-primary text-white rounded-br-sm' 
                    : 'bg-black/30 border border-white/5 text-gray-200 rounded-tl-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="max-w-[85%] p-3 rounded-xl bg-black/30 border border-white/5 text-gray-400 rounded-tl-sm flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100" />
                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200" />
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          
          <div className="p-4 border-t border-white/10 bg-black/20">
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMentorMessage(chatInput)}
              placeholder="Ask for a hint..." 
              className="w-full bg-algoverse-bg-main border border-white/10 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-algoverse-primary mb-2"
            />
            <div className="flex gap-2">
              <button onClick={() => sendMentorMessage('Explain linear search time complexity.')} className="flex-1 text-xs py-1.5 bg-white/5 hover:bg-white/10 rounded border border-white/5 text-gray-300 transition-colors">Explain</button>
              <button onClick={() => sendMentorMessage('Can I get a hint?')} className="flex-1 text-xs py-1.5 bg-white/5 hover:bg-white/10 rounded border border-white/5 text-gray-300 transition-colors">Hint</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

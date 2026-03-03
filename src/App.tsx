import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { CONCEPTS, CATEGORIES, Concept, CategoryId } from './data/concepts';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Info, RotateCcw, Trophy, XCircle, CheckCircle2, BookOpen } from 'lucide-react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [gameStatus, setGameStatus] = useState<'intro' | 'playing' | 'finished' | 'review'>('intro');
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [shuffledConcepts, setShuffledConcepts] = useState<Concept[]>([]);
  const [lastResult, setLastResult] = useState<'correct' | 'wrong' | null>(null);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    if (gameStatus === 'playing') {
      // Shuffle concepts when game starts
      const shuffled = [...CONCEPTS].sort(() => Math.random() - 0.5);
      setShuffledConcepts(shuffled);
      setCurrentCardIndex(0);
      setScore(0);
      setStreak(0);
      setLastResult(null);
    }
  }, [gameStatus]);

  const handleCategorySelect = (categoryId: CategoryId) => {
    const currentConcept = shuffledConcepts[currentCardIndex];
    
    if (currentConcept.origin === categoryId) {
      // Correct
      setScore(s => s + 10 + (streak * 2)); // Bonus for streak
      setStreak(s => s + 1);
      setLastResult('correct');
      
      if (currentCardIndex >= shuffledConcepts.length - 1) {
        setTimeout(() => {
            setGameStatus('finished');
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        }, 1000);
      } else {
        setTimeout(() => {
          setLastResult(null);
          setCurrentCardIndex(prev => prev + 1);
        }, 800);
      }
    } else {
      // Wrong
      setStreak(0);
      setLastResult('wrong');
      setTimeout(() => {
        setLastResult(null);
      }, 800);
    }
  };

  const currentConcept = shuffledConcepts[currentCardIndex];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setGameStatus('intro')}>
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">C</div>
            <h1 className="font-bold text-lg tracking-tight">CommRoots</h1>
          </div>
          
          {gameStatus === 'playing' && (
            <div className="flex items-center gap-6 text-sm font-medium">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Progress</span>
                <span>{currentCardIndex + 1} / {shuffledConcepts.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Score</span>
                <span className="text-indigo-600 font-bold text-lg">{score}</span>
              </div>
              {streak > 1 && (
                 <div className="flex items-center gap-1 text-orange-500 animate-pulse">
                    <span className="text-xs uppercase tracking-wider">Streak</span>
                    <span className="font-bold">{streak}x</span>
                 </div>
              )}
            </div>
          )}
          
          {gameStatus === 'review' && (
             <button onClick={() => setGameStatus('intro')} className="text-sm font-medium text-slate-500 hover:text-slate-900">
                Back to Home
             </button>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto p-4 min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
        
        {gameStatus === 'intro' && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-2xl"
          >
            <div className="mb-8 relative inline-block">
                <div className="absolute inset-0 bg-indigo-100 rounded-full blur-3xl opacity-50"></div>
                <Trophy className="w-24 h-24 text-indigo-600 relative z-10 mx-auto" />
            </div>
            <h2 className="text-4xl font-bold mb-6 text-slate-900">传播学寻根之旅</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              传播学是一门典型的交叉学科，它的理论大厦建立在众多其他学科的基石之上。
              <br/><br/>
              在这个游戏中，你将面对 <strong>40个</strong> 核心概念。你的任务是识别它们的“原籍”——即它们最初源自哪个学科。
            </p>
            <div className="flex gap-4 justify-center">
                <button 
                onClick={() => setGameStatus('playing')}
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-semibold text-lg shadow-xl shadow-indigo-200 transition-all transform hover:scale-105 active:scale-95"
                >
                开始挑战
                </button>
                <button 
                onClick={() => setGameStatus('review')}
                className="px-8 py-4 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 rounded-2xl font-semibold text-lg shadow-sm transition-all"
                >
                知识库复习
                </button>
            </div>
          </motion.div>
        )}

        {gameStatus === 'finished' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center bg-white p-12 rounded-3xl shadow-xl border border-slate-100 max-w-lg w-full"
          >
            <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-2">挑战完成!</h2>
            <div className="text-5xl font-black text-indigo-600 mb-6">{score} <span className="text-lg text-slate-400 font-medium">分</span></div>
            <p className="text-slate-600 mb-8">
              你已经成功为这40个概念找到了它们的学科归属。这证明了传播学确实是一个海纳百川的领域！
            </p>
            <div className="space-y-3">
                <button 
                onClick={() => setGameStatus('playing')}
                className="flex items-center justify-center gap-2 w-full py-4 bg-slate-900 text-white rounded-xl font-medium hover:bg-slate-800 transition-colors"
                >
                <RotateCcw className="w-4 h-4" />
                再玩一次
                </button>
                <button 
                onClick={() => setGameStatus('review')}
                className="flex items-center justify-center gap-2 w-full py-4 bg-white border border-slate-200 text-slate-700 rounded-xl font-medium hover:bg-slate-50 transition-colors"
                >
                <BookOpen className="w-4 h-4" />
                查看完整知识库
                </button>
            </div>
          </motion.div>
        )}

        {gameStatus === 'review' && (
            <div className="w-full max-w-5xl py-8">
                <h2 className="text-3xl font-bold mb-8 text-center">知识库概览</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {CATEGORIES.map(category => (
                        <div key={category.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                            <div className={cn("p-4 flex items-center gap-3 border-b border-slate-100", category.color.replace('bg-', 'bg-opacity-10 bg-'))}>
                                <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center text-white", category.color)}>
                                    <category.icon className="w-4 h-4" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{category.name}</h3>
                                    <p className="text-xs text-slate-500">{category.description}</p>
                                </div>
                            </div>
                            <div className="p-4">
                                <ul className="space-y-3">
                                    {CONCEPTS.filter(c => c.origin === category.id).map(concept => (
                                        <li key={concept.id} className="text-sm">
                                            <span className="font-bold text-slate-800 block mb-1">{concept.term}</span>
                                            <span className="text-slate-500 leading-relaxed">{concept.definition}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        )}

        {gameStatus === 'playing' && currentConcept && (
          <div className="w-full max-w-4xl flex flex-col items-center gap-8">
            
            {/* Card Area */}
            <div className="relative w-full max-w-md h-64 perspective-1000">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentConcept.id}
                        initial={{ opacity: 0, y: 50, rotateX: -10 }}
                        animate={{ 
                            opacity: 1, 
                            y: 0, 
                            rotateX: 0,
                            x: lastResult === 'wrong' ? [0, -10, 10, -10, 10, 0] : 0 
                        }}
                        exit={{ opacity: 0, scale: 0.8, y: -50 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                            "absolute inset-0 bg-white rounded-3xl shadow-2xl border-2 flex flex-col items-center justify-center p-8 text-center backface-hidden",
                            lastResult === 'correct' ? "border-green-500 bg-green-50" : 
                            lastResult === 'wrong' ? "border-red-500 bg-red-50" : "border-slate-100"
                        )}
                    >
                        <div className="text-sm font-bold tracking-wider text-slate-400 uppercase mb-4">Concept Card</div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-4">{currentConcept.term}</h3>
                        <p className="text-slate-600 leading-relaxed">{currentConcept.definition}</p>

                        {/* Feedback Overlay */}
                        {lastResult && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-3xl z-10"
                            >
                                {lastResult === 'correct' ? (
                                    <div className="flex flex-col items-center text-green-600">
                                        <CheckCircle2 className="w-16 h-16 mb-2" />
                                        <span className="font-bold text-xl">Correct!</span>
                                    </div>
                                ) : (
                                    <div className="flex flex-col items-center text-red-500">
                                        <XCircle className="w-16 h-16 mb-2" />
                                        <span className="font-bold text-xl">Try Again</span>
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Hint/Instruction */}
            <div className="text-slate-400 text-sm flex items-center gap-2">
                <Info className="w-4 h-4" />
                <span>点击下方正确的学科篮子进行归类</span>
            </div>

            {/* Baskets Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                {CATEGORIES.map((category) => {
                    const Icon = category.icon;
                    return (
                        <button
                            key={category.id}
                            onClick={() => !lastResult && handleCategorySelect(category.id)}
                            disabled={!!lastResult}
                            className={cn(
                                "relative group flex flex-col items-center p-4 rounded-2xl border-2 transition-all duration-200",
                                "hover:border-indigo-200 hover:bg-indigo-50 active:scale-95",
                                "disabled:opacity-50 disabled:cursor-not-allowed",
                                "bg-white border-slate-100"
                            )}
                        >
                            <div className={cn("w-12 h-12 rounded-full flex items-center justify-center text-white mb-3 shadow-md", category.color)}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <span className="font-bold text-slate-700 text-sm md:text-base">{category.name}</span>
                            
                            {/* Hover tooltip for description */}
                            <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 bg-slate-800 text-white text-xs p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 text-center">
                                {category.description}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-800"></div>
                            </div>
                        </button>
                    )
                })}
            </div>

          </div>
        )}
      </main>
    </div>
  );
}

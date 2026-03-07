import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      <div className="mx-auto w-full max-w-7xl px-4 flex flex-col items-center text-center">
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
        >
          <Badge variant="gradient" className="mb-6 px-4 py-1.5 text-sm">
            Phase 1 Developer Preview
          </Badge>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl"
        >
          Fresh daily work reports,{' '}
          <span className="text-primary-gradient block mt-2">served hot from your git logs.</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 max-w-2xl text-lg text-gray-400 md:text-xl"
        >
          Automate your daily stand-up updates by extracting beautiful, AI-generated reports directly from your local git activity. No context switching. Just insights.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto sm:max-w-none"
        >
          <Button size="lg" className="w-full sm:w-auto font-semibold">
            Get Started
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto font-semibold">
            View Documentation
          </Button>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 w-full max-w-md mx-auto p-1 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 flex items-center justify-between font-mono text-sm shadow-2xl relative group"
        >
          <div className="absolute inset-0 bg-primary-gradient opacity-0 group-hover:opacity-10 transition-opacity rounded-lg pointer-events-none" />
          <span className="px-4 text-gray-300">$ npm install -g gitmomos</span>
          <Button variant="ghost" size="sm" className="h-8">
            Copy
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

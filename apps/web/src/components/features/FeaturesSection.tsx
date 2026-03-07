import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Terminal, Activity, Archive, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const FEATURES = [
  {
    title: 'Automatic Git Tracking',
    description: 'We read your local git logs safely to understand exactly what you worked on, across all your projects.',
    icon: Activity,
  },
  {
    title: 'AI Generated Reports',
    description: 'Instantly summarize your commits into natural language updates perfect for stand-ups and async reports.',
    icon: Terminal,
  },
  {
    title: 'Career Work Archive',
    description: 'Build a permanent, searchable history of your greatest professional achievements automatically.',
    icon: Archive,
  },
  {
    title: 'Privacy First',
    description: 'Your codebase stays local. Only commit metadata leaves your machine—never your proprietary code.',
    icon: Lock,
  },
];

export function FeaturesSection() {
  return (
    <Section>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
          Everything you need for perfect reports
        </h2>
        <p className="text-gray-400 md:text-lg max-w-2xl mx-auto">
          Gitmomos takes the pain out of reporting by automating it where you already work: the terminal.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {FEATURES.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="bg-slate-900/40 border-slate-800 h-full hover:border-primary-purple/50 transition-colors">
                <CardHeader>
                  <div className="h-10 w-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-2">
                    <Icon className="h-5 w-5 text-primary-purple" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Section>
  );
}

import { Section } from '../ui/Section';
import { CodeBlock } from '../ui/CodeBlock';
import { motion } from 'framer-motion';

const cliOutput = `> gitmomos login
Opening browser for authentication...
Login successful! Welcome to gitmomos.

> gitmomos project add
Detected git repository: frontend-app
Project 'frontend-app' added to tracking.

> gitmomos sync
Syncing 12 new commits...
Generated daily report successfully.

> gitmomos report today
[09:00 AM] Refactored authentication store
[11:30 AM] Implemented UI Badge component
[02:15 PM] Fixed production CORS issue
`;

export function CliPreviewSection() {
  return (
    <Section>
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1 space-y-6"
        >
          <h2 className="text-3xl font-bold tracking-tight">
            Built for the terminal
          </h2>
          <p className="text-gray-400 text-lg">
            Gitmomos is designed to stay out of your way. Our CLI allows you to configure your tracking projects once and generate AI progress summaries with a single command. 
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex-1 w-full relative"
        >
          <div className="absolute -inset-1 bg-primary-gradient rounded-xl blur opacity-30"></div>
          <CodeBlock code={cliOutput} className="min-h-[250px] shadow-2xl relative bg-slate-950 border-slate-800" />
        </motion.div>
      </div>
    </Section>
  );
}

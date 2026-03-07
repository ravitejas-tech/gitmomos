import { Section } from '../ui/Section';
import { CodeBlock } from '../ui/CodeBlock';
import { motion } from 'framer-motion';

import { CLI_OUTPUT } from '~/data/landing-page/cli-preview.data';

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
                    <h2 className="text-3xl font-bold font-heading tracking-tight">
                        Built for the terminal
                    </h2>
                    <p className="text-text-secondary text-lg md:text-xl leading-relaxed mt-4">
                        Gitmomos is designed to stay out of your way. Our CLI allows you to
                        configure your tracking projects once and generate AI progress summaries
                        with a single command.
                    </p>
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    whileHover={{ scale: 1.01 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="flex-1 w-full relative group"
                >
                    <div className="absolute -inset-1 bg-primary-gradient rounded-xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                    <CodeBlock
                        code={CLI_OUTPUT}
                        className="min-h-[250px] shadow-2xl relative bg-slate-950 border-slate-800"
                    />
                </motion.div>
            </div>
        </Section>
    );
}

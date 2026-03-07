import { Container } from '../ui/Container';
import { Section } from '../ui/Section';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { motion } from 'framer-motion';
import { FEATURES } from '~/data/landing-page/features.data';

export function FeaturesSection() {
    return (
        <Section>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-center mb-20"
            >
                <h2 className="text-3xl font-bold font-heading tracking-tight sm:text-4xl mb-6">
                    Everything you need for perfect reports
                </h2>
                <p className="text-text-secondary md:text-lg max-w-2xl mx-auto">
                    Gitmomos takes the pain out of reporting by automating it where you already
                    work: the terminal.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                {FEATURES.map((feature, idx) => {
                    const Icon = feature.icon;
                    return (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -5, scale: 1.02 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                        >
                            <Card className="bg-slate-900/40 border-slate-800/50 h-full hover:border-primary-purple/40 hover:bg-slate-800/60 hover:shadow-2xl hover:shadow-primary-purple/10 transition-all duration-300">
                                <CardHeader>
                                    <div className="h-12 w-12 rounded-xl bg-primary-blue-dark/30 flex items-center justify-center mb-4 border border-primary-purple/20">
                                        <Icon className="h-6 w-6 text-primary-purple" />
                                    </div>
                                    <CardTitle className="font-heading text-xl">
                                        {feature.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-text-secondary leading-relaxed">
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

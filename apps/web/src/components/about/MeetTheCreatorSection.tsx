import { Container } from '../ui/Container';
import { Github, Linkedin, Mail, Quote } from 'lucide-react';

export function MeetTheCreatorSection() {
    return (
        <section className="relative overflow-hidden py-16 md:py-24">
            {/* Background elements to blend with the Gitmomos theme */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary-purple/5 blur-[120px] -z-10 rounded-full pointer-events-none" />

            <Container>
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-extrabold font-heading tracking-tight text-white mb-4">
                        Meet the Creator
                    </h2>
                    <div className="h-1 w-20 bg-primary-gradient mx-auto rounded-full" />
                </div>

                <div className="grid lg:grid-cols-[400px_1fr] gap-12 items-start max-w-6xl mx-auto">
                    {/* Left Column: Image and Role */}
                    <div className="flex flex-col items-center">
                        <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-3xl overflow-hidden border border-white/10 shadow-2xl shadow-primary-purple/20 group">
                            <div className="absolute inset-0 bg-primary-gradient opacity-0 duration-500 z-10 pointer-events-none" />
                            <img
                                src="/images/screenshots/ravitejasalva.webp"
                                alt="Raviteja Salva"
                                className="w-full h-full object-cover transition-transform duration-500 scale-110"
                            />
                        </div>
                        <div className="mt-8 text-center">
                            <h3 className="text-2xl font-bold font-heading text-white">
                                Raviteja Salva
                            </h3>
                            <p className="text-primary-purple font-medium mt-1">
                                Full Stack Engineer
                            </p>
                        </div>

                        {/* Social Links */}
                        <div className="flex items-center gap-4 mt-6">
                            <a
                                href="https://github.com/ravitejas-tech"
                                target="_blank"
                                rel="noreferrer"
                                className="p-3 rounded-full bg-white/5 border border-white/10 text-text-secondary hover:text-white hover:bg-white/10 hover:border-primary-purple/50 transition-all"
                            >
                                <Github className="w-5 h-5" />
                                <span className="sr-only">GitHub</span>
                            </a>
                            <a
                                href="https://www.linkedin.com/in/raviteja-salva-8a1464272"
                                target="_blank"
                                rel="noreferrer"
                                className="p-3 rounded-full bg-white/5 border border-white/10 text-text-secondary hover:text-white hover:bg-white/10 hover:border-primary-blue-dark/50 transition-all"
                            >
                                <Linkedin className="w-5 h-5" />
                                <span className="sr-only">LinkedIn</span>
                            </a>
                            <a
                                href="mailto:ravitejastech@gmail.com"
                                className="p-3 rounded-full bg-white/5 border border-white/10 text-text-secondary hover:text-white hover:bg-white/10 hover:border-primary-purple/50 transition-all"
                            >
                                <Mail className="w-5 h-5" />
                                <span className="sr-only">Email</span>
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Story */}
                    <div className="flex flex-col space-y-6 text-lg text-text-secondary leading-relaxed">
                        <div className="bg-surface/40 border border-white/10 rounded-2xl p-8 relative overflow-hidden shadow-xl">
                            <Quote className="absolute top-4 right-4 w-24 h-24 text-white/5 -z-0 rotate-12" />
                            <p className="relative z-10 text-white font-medium text-xl leading-snug">
                                "Developers already document their work through commits. Gitmomos
                                turns that existing documentation into meaningful progress reports."
                            </p>
                        </div>

                        <p>
                            Gitmomos was born from a real-world problem I faced as a software
                            engineer. Every day, I had to fill out and send work reports, and it
                            often felt repetitive and time-consuming.
                        </p>
                        <p>
                            As developers, our Git commit history is already the most accurate
                            source of truth for the work we do. Every meaningful change is
                            documented through commits. However, when I needed to generate a report
                            for a specific day—especially across multiple repositories—I found
                            GitHub's interface cumbersome and inefficient for this use case.
                        </p>
                        <p>
                            I realized I was already documenting my work through commit messages,
                            but there wasn't a simple way to transform that information into
                            professional daily or weekly reports. That's what inspired me to build
                            Gitmomos: a tool that automatically converts development activity into
                            meaningful, AI-powered progress reports, saving developers time while
                            improving visibility into their work.
                        </p>

                        <div className="mt-8 pt-8 border-t border-white/10">
                            <p className="text-white/80 font-medium">
                                Have feedback, ideas, feature requests, or just want to connect?
                                Feel free to reach out. I'd love to hear from fellow developers and
                                contributors.
                            </p>
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
}

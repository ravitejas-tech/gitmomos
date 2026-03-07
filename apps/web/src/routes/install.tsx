import { Container } from '../components/ui/Container';
import { Section } from '../components/ui/Section';
import { CodeBlock } from '../components/ui/CodeBlock';
import { Badge } from '../components/ui/Badge';

import { INSTALL_STEPS } from '~/data/install/steps.data';

export default function Install() {
    return (
        <Section>
            <Container className="max-w-3xl">
                <div className="mb-12">
                    <Badge variant="outline" className="mb-4">
                        Quick Start
                    </Badge>
                    <h1 className="text-4xl font-bold tracking-tight mb-4">Installation Guide</h1>
                    <p className="text-gray-400 text-lg">
                        Getting set up with the gitmomos CLI is incredibly straightforward. Ensure
                        you have Node installed, and follow the terminal commands below.
                    </p>
                </div>

                <div className="space-y-12">
                    {INSTALL_STEPS.map((step) => (
                        <div key={step.number} className="space-y-4">
                            <h3 className="text-xl font-semibold text-gray-200 flex items-center gap-4">
                                <span className="flex items-center justify-center w-8 h-8 rounded-full bg-primary-blue/20 text-primary-blue text-sm border border-primary-blue/50">
                                    {step.number}
                                </span>
                                {step.title}
                            </h3>
                            <div className="pl-12">
                                {step.description && (
                                    <p className="text-gray-400 text-sm mb-3">
                                        {step.description}
                                    </p>
                                )}
                                <CodeBlock code={step.code} />
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    );
}

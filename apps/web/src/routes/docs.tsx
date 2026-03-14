import { Container } from '../components/ui/Container';
import { CodeBlock } from '../components/ui/CodeBlock';

import { DOCS_STEPS } from '~/data/docs/steps.data';

export default function Docs() {
    return (
        <Container className="py-12 md:py-16 flex justify-center">
            <article className="prose prose-invert max-w-3xl w-full">
                <h1 className="text-4xl font-extrabold font-heading tracking-tight mb-8">
                    Documentation
                </h1>
                <p className="text-text-secondary mb-10 text-lg">
                    Follow this complete guide to get started with gitmomos. We've designed a
                    powerful workflow that stays out of your way while keeping your team
                    consistently informed.
                </p>

                {DOCS_STEPS.map((step, idx) => (
                    <div key={idx} className="mb-10">
                        <h3 className="text-xl font-bold font-heading mt-10 mb-2 text-gray-200">
                            {step.title}
                        </h3>
                        <p className="text-text-secondary mb-4">
                            {step.content}
                            {step.link && (
                                <>
                                    {' '}
                                    <a
                                        href={step.link.href}
                                        className="text-primary-purple hover:underline"
                                    >
                                        {step.link.text}
                                    </a>
                                </>
                            )}
                        </p>
                        {step.image && (
                            <div className="my-8 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                <img 
                                    src={step.image} 
                                    alt={step.title} 
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                        )}
                        {step.code && (
                            <CodeBlock code={step.code} className="mb-6" />
                        )}
                    </div>
                ))}
            </article>
        </Container>
    );
}

import { Container } from '../components/ui/Container';

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
                        {step.code && (
                            <pre className="bg-slate-900 border border-slate-800 rounded-lg p-4 font-mono text-sm mb-6 text-gray-300">
                                {step.code}
                            </pre>
                        )}
                    </div>
                ))}
            </article>
        </Container>
    );
}

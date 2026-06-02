import { CodeBlock } from '../../components/ui/CodeBlock';
import { DOCS_STEPS } from '../../data/docs/steps.data';
import { NavLink } from 'react-router';

export default function QuickStartDocs() {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <h1 className="text-4xl font-extrabold font-heading tracking-tight mb-8">
                Quick Start
            </h1>
            
            <p className="text-text-secondary mb-10 text-lg">
                Follow this complete guide to get started with gitmomos. We've designed a
                powerful workflow that stays out of your way while keeping your team
                consistently informed.
            </p>

            <h2 id="installation-and-setup" className="text-2xl font-bold font-heading mt-12 mb-6 text-white scroll-mt-24">
                Installation & Setup
            </h2>

            {/* Displaying steps 1-4 for Setup */}
            <div className="space-y-12">
                {DOCS_STEPS.slice(0, 4).map((step, idx) => (
                    <div key={idx}>
                        <h3 id={`step-${idx + 1}`} className="text-xl font-bold font-heading mb-2 text-gray-200 scroll-mt-24">
                            {step.title}
                        </h3>
                        <p className="text-text-secondary mb-4">
                            {step.content}
                            {step.link && (
                                <>
                                    {' '}
                                    <NavLink
                                        to={step.link.href}
                                        className="text-primary-purple hover:underline"
                                    >
                                        {step.link.text}
                                    </NavLink>
                                </>
                            )}
                        </p>
                        {step.image && (
                            <div className="my-6 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
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
            </div>

            <h2 id="daily-workflow" className="text-2xl font-bold font-heading mt-16 mb-6 text-white scroll-mt-24">
                Daily Workflow
            </h2>

            {/* Displaying steps 5-9 for Workflow */}
            <div className="space-y-12">
                {DOCS_STEPS.slice(4, 9).map((step, idx) => (
                    <div key={idx + 4}>
                        <h3 id={`step-${idx + 5}`} className="text-xl font-bold font-heading mb-2 text-gray-200 scroll-mt-24">
                            {step.title}
                        </h3>
                        <p className="text-text-secondary mb-4">
                            {step.content}
                        </p>
                        {step.image && (
                            <div className="my-6 rounded-2xl overflow-hidden border border-white/10 shadow-lg">
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
            </div>

            <h2 id="session-management" className="text-2xl font-bold font-heading mt-16 mb-6 text-white scroll-mt-24">
                Session Management
            </h2>

            {/* Displaying step 10 */}
            <div className="space-y-12 mb-12">
                {DOCS_STEPS.slice(9, 10).map((step, idx) => (
                    <div key={idx + 9}>
                        <h3 id={`step-10`} className="text-xl font-bold font-heading mb-2 text-gray-200 scroll-mt-24">
                            {step.title}
                        </h3>
                        <p className="text-text-secondary mb-4">
                            {step.content}
                        </p>
                        {step.code && (
                            <CodeBlock code={step.code} className="mb-6" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

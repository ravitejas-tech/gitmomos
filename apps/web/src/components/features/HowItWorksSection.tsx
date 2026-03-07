import { Section } from '../ui/Section';

const STEPS = [
    {
        step: '01',
        title: 'Install CLI',
        desc: 'Run npm install -g gitmomos to get the tool locally.',
    },
    {
        step: '02',
        title: 'Login via CLI',
        desc: 'Run gitmomos login to authenticate and link your account.',
    },
    {
        step: '03',
        title: 'Track commits',
        desc: 'Add projects with gitmomos project add and commit naturally.',
    },
    {
        step: '04',
        title: 'View reports',
        desc: 'Run gitmomos report today or sync to see your dashboard.',
    },
];

export function HowItWorksSection() {
    return (
        <Section className="border-t border-gray-800/50 bg-black/20">
            <div className="text-center mb-16">
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">How It Works</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {STEPS.map((s, i) => (
                    <div key={i} className="relative group flex flex-col items-center text-center">
                        <div className="absolute top-8 left-1/2 w-full h-[1px] bg-gradient-to-r from-primary-purple/50 to-transparent -z-10 hidden md:block group-last:hidden" />
                        <div className="w-16 h-16 rounded-full bg-gray-950 border border-gray-800 flex items-center justify-center text-xl font-bold text-gray-50 shadow-lg shadow-primary-purple/10 mb-6">
                            {s.step}
                        </div>
                        <h3 className="text-lg font-semibold mb-2">{s.title}</h3>
                        <p className="text-gray-400 text-sm max-w-[200px]">{s.desc}</p>
                    </div>
                ))}
            </div>
        </Section>
    );
}

import { Github, Linkedin, Mail } from 'lucide-react'

export const CREATOR = {
    name: 'Raviteja Salva',
    role: 'Full Stack Engineer',
    photo: '/images/screenshots/ravitejasalva.webp',
    quote: '“Developers already document their work through commits. Gitmomos turns that existing documentation into meaningful progress reports.”',
    story: [
        'Gitmomos was born from a real-world problem I faced as a software engineer. Every day, I had to fill out and send work reports, and it often felt repetitive and time-consuming.',
        "As developers, our Git commit history is already the most accurate source of truth for the work we do. Every meaningful change is documented through commits. However, when I needed to generate a report for a specific day—especially across multiple repositories—I found GitHub's interface cumbersome and inefficient for this use case.",
        "I realized I was already documenting my work through commit messages, but there wasn't a simple way to transform that information into professional daily or weekly reports. That's what inspired me to build Gitmomos: a tool that automatically converts development activity into meaningful, AI-powered progress reports, saving developers time while improving visibility into their work.",
    ],
    closing:
        "Have feedback, ideas, feature requests, or just want to connect? Feel free to reach out. I'd love to hear from fellow developers and contributors.",
}

export const CREATOR_LINKS = [
    { label: 'GitHub', href: 'https://github.com/ravitejas-tech', icon: Github },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/raviteja-salva-8a1464272', icon: Linkedin },
    { label: 'Email', href: 'mailto:ravitejastech@gmail.com', icon: Mail },
] as const

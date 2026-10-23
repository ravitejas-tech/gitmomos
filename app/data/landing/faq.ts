import type { LandingFaq } from '~/types/landing'

export const FAQ_ID = 'faq'

export const FAQ: readonly LandingFaq[] = [
    {
        question: 'What is work report automation?',
        answer: 'Work report automation means your status report writes itself. Instead of piecing your day together from memory, gitmomos reads the git commits you authored and turns them into a clear daily work report you can share with your manager, team or clients.',
    },
    {
        question: 'How does gitmomos turn git commits into a report?',
        answer: 'Connect GitHub or Gitea and add the repositories you work in. Just after midnight in your timezone, gitmomos collects the commits you authored that day on every branch, and AI writes a summary, focus areas, highlights and next steps.',
    },
    {
        question: 'Who is gitmomos for?',
        answer: 'Developers, freelancers and contractors who report their work to a manager, a client or a team. Reports skip the jargon, so people who never open a pull request can still follow along.',
    },
    {
        question: 'Does gitmomos read my source code?',
        answer: 'No. It only reads commit metadata, such as messages and timestamps, from the repositories you add. Your source code and diffs are never downloaded or stored.',
    },
    {
        question: 'Which git platforms does it support?',
        answer: 'GitHub, connected in one click and including private repositories, and any Gitea instance, connected with an access token.',
    },
    {
        question: 'Can I edit and share my reports?',
        answer: 'Yes. Edit any line, copy the report as Markdown for Slack or email, or save it as a PDF. A report you edit is never overwritten by the automation.',
    },
    {
        question: 'Is gitmomos free?',
        answer: 'Yes. gitmomos is free and open source under the MIT license. Reports are written with your own Gemini API key, and Google’s free tier covers them. Use the hosted version, or host your own copy on Supabase and Vercel.',
    },
]

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
        question: 'Which AI providers can I use?',
        answer: 'Gemini, Groq, Claude or OpenAI, with your own API key. You choose one model for reports and one for the chatbot. Gemini and Groq have free tiers that cover a daily report.',
    },
    {
        question: 'How does the timesheet work out my hours?',
        answer: 'From when you committed. Commits up to three and a half hours apart count as one work session, and each session starts half an hour before its first commit. You see the hours for every day in a month calendar, with weekly and monthly totals. It is an estimate from your commits, not a stopwatch, so you can correct any day by hand from your dashboard.',
    },
    {
        question: 'What is a public profile?',
        answer: 'An optional page at your own link that shows managers, clients and recruiters what you shipped: recent highlights, a work log they can search and save as PDFs, and your timesheet. You choose which repositories appear, and repository names are never shown.',
    },
    {
        question: 'Who is Momi?',
        answer: 'Momi is the chatbot on your public profile. Visitors ask questions such as “What did they work on this week?” and Momi answers from your shared reports alone, naming the days it used. It runs on your own AI key.',
    },
    {
        question: 'Can I edit and share my reports?',
        answer: 'Yes. Edit any line, copy the report as Markdown for Slack or email, or save it as a PDF. A report you edit is never overwritten by the automation.',
    },
    {
        question: 'Is gitmomos free?',
        answer: 'Yes. gitmomos is free and open source under the MIT license, and reports are written with your own AI key, which can stay on a free tier. Use the hosted version, or host your own copy on Supabase and Vercel.',
    },
]

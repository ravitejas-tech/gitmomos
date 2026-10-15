import { CheckCircle2, XCircle } from 'lucide-react'
import type { LicenseSummary, TocItem } from '~/types/legal'

export const LICENSE_INTRO =
    'Gitmomos is released under the MIT License. It is a short and simple permissive license that highly favors open-source distribution.'

export const LICENSE_HEADINGS: Record<'summary' | 'text', TocItem> = {
    summary: { id: 'license-summary', title: 'Summary of the MIT License', level: 2 },
    text: { id: 'mit-license-text', title: 'MIT License Text', level: 2 },
}

export const LICENSE_SUMMARY: readonly LicenseSummary[] = [
    {
        heading: { id: 'permissions', title: 'Permissions', level: 3 },
        icon: CheckCircle2,
        tone: 'success',
        terms: [
            { term: 'Commercial use', description: 'You may use this software for commercial purposes.' },
            { term: 'Modification', description: 'You may modify the software.' },
            { term: 'Distribution', description: 'You may distribute this software.' },
            { term: 'Private use', description: 'You may use and modify the software without distributing it.' },
        ],
    },
    {
        heading: { id: 'limitations', title: 'Limitations', level: 3 },
        icon: XCircle,
        tone: 'danger',
        terms: [
            {
                term: 'Liability',
                description: 'The author or license provider cannot be held liable for any damages.',
            },
            { term: 'Warranty', description: 'The software is provided "as is" without any warranty.' },
        ],
    },
]

export const LICENSE_TOC = [
    LICENSE_HEADINGS.summary,
    ...LICENSE_SUMMARY.map(({ heading }) => heading),
    LICENSE_HEADINGS.text,
]

export const MIT_LICENSE = {
    paragraphs: [
        'Copyright (c) 2026 Raviteja Salva',
        'Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:',
        'The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.',
    ],
    disclaimer:
        'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.',
}

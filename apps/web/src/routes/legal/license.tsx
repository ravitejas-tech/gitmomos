import { CheckCircle2, XCircle } from 'lucide-react';

export default function License() {
    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 ease-out">
            <h1 className="text-4xl font-extrabold font-heading tracking-tight mb-8">
                License
            </h1>
            
            <p className="text-text-secondary mb-10 text-lg">
                Gitmomos is released under the MIT License. It is a short and simple permissive license that highly favors open-source distribution.
            </p>

            <h2 id="license-summary" className="text-2xl font-bold font-heading mt-12 mb-6 text-white scroll-mt-24">
                Summary of the MIT License
            </h2>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
                <div className="p-6 rounded-xl border border-white/10 bg-surface/40">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                        <CheckCircle2 className="w-5 h-5 text-green-400" />
                        Permissions
                    </h3>
                    <ul className="space-y-3 text-sm text-text-secondary">
                        <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                            <span><strong>Commercial use:</strong> You may use this software for commercial purposes.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                            <span><strong>Modification:</strong> You may modify the software.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                            <span><strong>Distribution:</strong> You may distribute this software.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-green-400 mt-1.5 shrink-0" />
                            <span><strong>Private use:</strong> You may use and modify the software without distributing it.</span>
                        </li>
                    </ul>
                </div>

                <div className="p-6 rounded-xl border border-white/10 bg-surface/40">
                    <h3 className="text-lg font-bold text-white flex items-center gap-2 mb-4">
                        <XCircle className="w-5 h-5 text-red-400" />
                        Limitations
                    </h3>
                    <ul className="space-y-3 text-sm text-text-secondary">
                        <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                            <span><strong>Liability:</strong> The author or license provider cannot be held liable for any damages.</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                            <span><strong>Warranty:</strong> The software is provided "as is" without any warranty.</span>
                        </li>
                    </ul>
                </div>
            </div>

            <h2 id="mit-license-text" className="text-2xl font-bold font-heading mt-12 mb-6 text-white scroll-mt-24">
                MIT License Text
            </h2>

            <div className="p-8 rounded-2xl bg-[#000112] border border-white/10 font-mono text-sm leading-relaxed text-text-secondary shadow-2xl">
                <p className="mb-4">Copyright (c) 2026 Raviteja Salva</p>
                
                <p className="mb-4">
                    Permission is hereby granted, free of charge, to any person obtaining a copy
                    of this software and associated documentation files (the "Software"), to deal
                    in the Software without restriction, including without limitation the rights
                    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
                    copies of the Software, and to permit persons to whom the Software is
                    furnished to do so, subject to the following conditions:
                </p>
                
                <p className="mb-4">
                    The above copyright notice and this permission notice shall be included in all
                    copies or substantial portions of the Software.
                </p>
                
                <p className="text-white/60">
                    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
                    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
                    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
                    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
                    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
                    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
                    SOFTWARE.
                </p>
            </div>
        </div>
    );
}

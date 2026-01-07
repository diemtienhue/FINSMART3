import React, { useState } from 'react';
import { Project } from '../types';
import { ChevronDown, ChevronUp, BookOpen, CheckCircle2 } from 'lucide-react';

interface GuidePageProps {
    projects: Project[];
}

const GuidePage: React.FC<GuidePageProps> = ({ projects }) => {
    // Filter only Published projects for the guide
    const guideProjects = projects.filter(p => p.status === 'Published').sort((a, b) => a.order - b.order);
    const [openProjectId, setOpenProjectId] = useState<string | null>(null);

    const toggleProject = (id: string) => {
        setOpenProjectId(openProjectId === id ? null : id);
    };

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
            <div className="text-center mb-10 px-4">
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2 uppercase flex items-center justify-center gap-3">
                    <BookOpen className="text-blue-600" /> Hướng dẫn đăng ký
                </h2>
                <p className="text-slate-500 text-sm font-medium">Quy trình chi tiết từng bước để đăng ký hồ sơ thành công 100%</p>
            </div>

            <div className="space-y-4 px-4 sm:px-0">
                {guideProjects.map(project => {
                    const isOpen = openProjectId === project.id;
                    return (
                        <div key={project.id} className={`bg-white rounded-[2rem] border transition-all duration-300 overflow-hidden ${isOpen ? 'border-blue-200 shadow-xl' : 'border-slate-100 shadow-sm hover:shadow-md'}`}>
                            <button
                                onClick={() => toggleProject(project.id)}
                                className="w-full flex items-center justify-between p-6 text-left"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-full border border-slate-100 p-1 flex items-center justify-center shadow-sm">
                                        <img src={project.logo} className="w-full h-full object-cover rounded-full" alt="logo" />
                                    </div>
                                    <div>
                                        <h3 className={`text-sm font-black uppercase tracking-tight ${isOpen ? 'text-blue-600' : 'text-slate-700'}`}>Hướng dẫn {project.name}</h3>
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{project.steps.length} Bước thực hiện</p>
                                    </div>
                                </div>
                                <div className={`p-2 rounded-full transition-colors ${isOpen ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'}`}>
                                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                </div>
                            </button>

                            {isOpen && (
                                <div className="px-6 pb-8 pt-2 animate-in slide-in-from-top-2 duration-300">
                                    <div className="space-y-8 relative">
                                        {/* Connecting Line */}
                                        <div className="absolute left-[19px] top-4 bottom-4 w-0.5 bg-slate-100" />

                                        {project.steps.length > 0 ? (
                                            project.steps.map((step, idx) => (
                                                <div key={idx} className="relative flex gap-6">
                                                    <div className="z-10 w-10 h-10 rounded-full bg-white border-4 border-blue-50 text-blue-600 font-black flex items-center justify-center text-xs shrink-0 shadow-sm">
                                                        {idx + 1}
                                                    </div>
                                                    <div className="flex-1 space-y-3">
                                                        <div>
                                                            <h4 className="font-bold text-slate-800 text-sm">{step.title}</h4>
                                                            <p className="text-xs text-slate-500 leading-relaxed">{step.description}</p>
                                                        </div>
                                                        {step.image && (
                                                            <div className="rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
                                                                <img src={step.image} className="w-full h-auto object-cover" alt={`step-${idx + 1}`} />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-center py-8">
                                                <p className="text-xs text-slate-400 font-medium italic">Chưa có hướng dẫn chi tiết cho sản phẩm này.</p>
                                            </div>
                                        )}

                                        {/* Final Step */}
                                        <div className="relative flex gap-6">
                                            <div className="z-10 w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                                <CheckCircle2 size={20} />
                                            </div>
                                            <div className="pt-2">
                                                <p className="text-xs font-bold text-emerald-600 uppercase tracking-wide">Hoàn tất đăng ký</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default GuidePage;

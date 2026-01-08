import React from 'react';
import { Project } from '../types';
import { ChevronDown, BookOpen, CheckCircle2 } from 'lucide-react';

interface GuidePageProps {
    projects: Project[];
    onOpenDetail: (project: Project) => void;
}

const GuidePage: React.FC<GuidePageProps> = ({ projects, onOpenDetail }) => {
    // Filter only Published projects for the guide
    const guideProjects = projects.filter(p => p.status === 'Published').sort((a, b) => a.order - b.order);

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
            <div className="text-center mb-10 px-4">
                <div className="w-20 h-20 mx-auto bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-[2rem] shadow-xl shadow-blue-200 flex items-center justify-center mb-6 transform rotate-3 hover:rotate-6 transition-all duration-300 group cursor-pointer">
                    <BookOpen size={40} className="text-white drop-shadow-md group-hover:scale-110 transition-transform" />
                    <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg border border-blue-100">
                        <CheckCircle2 size={16} className="text-emerald-500" />
                    </div>
                </div>
                <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2 uppercase flex items-center justify-center gap-3">
                    Hướng dẫn đăng ký
                </h2>
                <p className="text-slate-500 text-sm font-medium">Quy trình chi tiết từng bước để đăng ký hồ sơ thành công 100%</p>
            </div>

            <div className="space-y-4 px-4 sm:px-0">
                {guideProjects.map(project => (
                    <div key={project.id} className="group bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all duration-300 overflow-hidden cursor-pointer relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 via-blue-50/0 to-blue-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />

                        <button
                            onClick={() => onOpenDetail(project)}
                            className="w-full flex items-center justify-between p-6 text-left relative z-10"
                        >
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-white rounded-full border border-slate-100 p-1 flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform overflow-hidden">
                                    <img src={project.logo} className="w-full h-full object-cover rounded-full" alt="logo" />
                                </div>
                                <div>
                                    <h3 className="text-base font-black uppercase tracking-tight text-slate-700 group-hover:text-blue-600 transition-colors">Hướng dẫn {project.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                                            {project.steps.length} Bước thực hiện
                                        </span>
                                        <span className="text-[10px] text-blue-500 font-bold uppercase tracking-wider bg-blue-50 px-2 py-1 rounded-lg border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                            Xem chi tiết
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm group-hover:shadow-md transform group-hover:translate-x-1">
                                <ChevronDown size={20} className="-rotate-90" />
                            </div>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GuidePage;

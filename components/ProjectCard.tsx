
import React from 'react';
import { Project, ProjectType } from '../types';
import { SUPPORT_ZALO } from '../constants';
import { ExternalLink, CheckCircle2, Star, Lock, Eye, Headphones } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
  onOpenDetail: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onOpenDetail }) => {
  const isLoan = project.type === ProjectType.LOAN;

  const handleSupportClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(`https://zalo.me/${SUPPORT_ZALO.replace(/\./g, '')}`, '_blank');
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-100 flex flex-col h-full transition-transform hover:translate-y-[-4px] hover:shadow-lg">
      
      {/* HEADER SECTION */}
      {isLoan ? (
        <div className="p-5 pb-2">
          <div className="flex items-center justify-between mb-4">
            <div className="w-14 h-14 bg-slate-50 p-2 rounded-xl border border-slate-100 flex items-center justify-center">
              <img src={project.logo} alt="logo" className="w-full h-full object-contain" />
            </div>
            <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-black rounded-lg uppercase tracking-wider">
              VAY TIÊU DÙNG
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-1">{project.name}</h3>
        </div>
      ) : (
        <div className="p-0">
          <div className="h-44 bg-slate-100 overflow-hidden flex items-center justify-center relative">
            <img 
              src={project.coverImage} 
              alt={project.name} 
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="absolute top-3 right-3">
              <span className="px-2 py-1 bg-white/90 backdrop-blur-sm text-indigo-600 text-[9px] font-black rounded uppercase">
                THẺ TÍN DỤNG
              </span>
            </div>
          </div>
          <div className="p-5 pb-2">
            <h3 className="text-xl font-bold text-slate-800 mb-1">{project.name}</h3>
          </div>
        </div>
      )}

      {/* RATING SECTION */}
      <div className="px-5 mb-4">
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <div className="flex text-amber-400">
            <Star size={14} fill="currentColor" />
          </div>
          <span className="text-slate-700 font-bold">{project.rating || 4.8}</span>
          <span>({project.userCount || '10k+'} lượt đăng ký)</span>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="px-5 mb-5">
        {!isLoan && project.promo && (
          <div className="mb-4">
            <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-1">ĐẶC QUYỀN NỔI BẬT</p>
            <p className="text-sm font-bold text-slate-700">{project.promo}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-50">
          <div>
            <p className="text-[9px] uppercase tracking-wider text-slate-400 font-black mb-1">HẠN MỨC</p>
            <p className="text-sm font-black text-blue-700">{project.limit}</p>
          </div>
          <div>
            <p className="text-[9px] uppercase tracking-wider text-slate-400 font-black mb-1">
              {isLoan ? 'LÃI SUẤT' : 'MIỄN LÃI'}
            </p>
            <p className="text-sm font-black text-emerald-600">
              {isLoan ? project.interestRate : (project.interestFreePeriod || project.interestRate)}
            </p>
          </div>
        </div>
      </div>

      {/* ADVANTAGES SECTION */}
      <div className="px-5 mb-6 space-y-2">
        {project.advantages.slice(0, 3).map((adv, idx) => (
          <div key={idx} className="flex items-center gap-2.5 text-[11px] text-slate-600 font-medium">
            <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
            <span className="line-clamp-1">{adv}</span>
          </div>
        ))}
      </div>

      {/* CTA SECTION */}
      <div className="px-5 pb-5 mt-auto">
        <a 
          href={project.affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 bg-blue-600 text-white rounded-xl font-black text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-100 mb-3 uppercase"
        >
          {isLoan ? 'KIỂM TRA MỨC VAY' : 'KHÁM PHÁ THẺ'} <ExternalLink size={16} />
        </a>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <button 
            onClick={() => onOpenDetail(project)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-1 bg-slate-50 text-slate-600 text-[10px] font-bold rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
          >
            <Eye size={14} className="text-blue-500" /> Xem chi tiết
          </button>
          <button 
            onClick={handleSupportClick}
            className="flex items-center justify-center gap-1.5 py-2.5 px-1 bg-blue-50 text-blue-700 text-[10px] font-bold rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors"
          >
            <Headphones size={14} /> Hỗ trợ
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[9px] text-slate-400 font-medium">
          <Lock size={10} />
          <span>Không thu phí – Bảo mật 100%</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

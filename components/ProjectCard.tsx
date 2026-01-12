
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
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-slate-100 flex flex-col h-full transition-all hover:shadow-md" style={{ maxWidth: '100%' }}>

      {/* HEADER SECTION */}
      {isLoan ? (
        <div className="p-3 sm:p-5 pb-2">
          <div className="flex items-center justify-between mb-2 sm:mb-4">
            <div className="w-10 h-10 sm:w-14 sm:h-14 bg-white p-1 rounded-full border border-slate-100 flex items-center justify-center overflow-hidden shadow-sm shrink-0">
              <img src={project.logo} alt="logo" className="w-full h-full object-cover rounded-full" />
            </div>
            <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-50 text-blue-600 text-[8px] sm:text-[10px] font-black rounded-lg uppercase tracking-wide">
              VAY TIÊU DÙNG
            </span>
          </div>
          <h3 className="text-sm sm:text-lg md:text-xl font-bold text-slate-800 mb-1 line-clamp-2 leading-tight">{project.name}</h3>
        </div>
      ) : (
        <div className="p-0">
          <div className="h-32 sm:h-40 md:h-44 bg-slate-100 overflow-hidden flex items-center justify-center relative">
            <img
              src={project.coverImage}
              alt={project.name}
              className="h-full w-full object-cover"
            />
            <div className="absolute top-2 sm:top-3 right-2 sm:right-3">
              <span className="px-2 py-0.5 sm:py-1 bg-white/90 backdrop-blur-sm text-indigo-600 text-[7px] sm:text-[9px] font-black rounded uppercase">
                THẺ TÍN DỤNG
              </span>
            </div>
          </div>
          <div className="p-3 sm:p-5 pb-2">
            <h3 className="text-sm sm:text-lg md:text-xl font-bold text-slate-800 mb-1 line-clamp-2 leading-tight">{project.name}</h3>
          </div>
        </div>
      )}

      {/* RATING SECTION */}
      <div className="px-3 sm:px-5 mb-2 sm:mb-4">
        <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
          <div className="flex text-amber-400">
            <Star size={12} fill="currentColor" className="sm:w-[14px] sm:h-[14px]" />
          </div>
          <span className="text-slate-700 font-bold text-[10px] sm:text-xs">{project.rating || 4.8}</span>
          <span className="text-[9px] sm:text-xs">({project.userCount || '10k+'})</span>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="px-3 sm:px-5 mb-3 sm:mb-5">
        {!isLoan && project.promo && (
          <div className="mb-2 sm:mb-4">
            <p className="text-[8px] sm:text-[10px] font-black text-indigo-500 uppercase tracking-wide mb-0.5 sm:mb-1">ĐẶC QUYỀN</p>
            <p className="text-[10px] sm:text-sm font-bold text-slate-700 line-clamp-2 leading-snug">{project.promo}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 sm:gap-4 py-2 sm:py-3 border-y border-slate-50">
          <div className="min-w-0">
            <p className="text-[8px] sm:text-[9px] uppercase tracking-wide text-slate-400 font-black mb-0.5 sm:mb-1">HẠN MỨC</p>
            <p className="text-[11px] sm:text-sm font-black text-blue-700 truncate">{project.limit}</p>
          </div>
          <div className="min-w-0">
            <p className="text-[8px] sm:text-[9px] uppercase tracking-wide text-slate-400 font-black mb-0.5 sm:mb-1">
              {isLoan ? 'LÃI SUẤT' : 'MIỄN LÃI'}
            </p>
            <p className="text-[11px] sm:text-sm font-black text-emerald-600 truncate">
              {isLoan ? project.interestRate : (project.interestFreePeriod || project.interestRate)}
            </p>
          </div>
        </div>
      </div>

      {/* ADVANTAGES SECTION */}
      <div className="px-3 sm:px-5 mb-3 sm:mb-6 space-y-1.5 sm:space-y-2">
        {project.advantages.slice(0, 3).map((adv, idx) => (
          <div key={idx} className="flex items-start gap-1.5 sm:gap-2.5 text-[9px] sm:text-[11px] text-slate-600 font-medium">
            <CheckCircle2 size={11} className="text-emerald-500 shrink-0 sm:w-[14px] sm:h-[14px] mt-0.5" />
            <span className="line-clamp-2 min-w-0 leading-tight">{adv}</span>
          </div>
        ))}
      </div>

      {/* CTA SECTION */}
      <div className="px-3 sm:px-5 pb-3 sm:pb-5 mt-auto">
        <a
          href={project.affiliateLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-2.5 sm:py-3.5 bg-blue-600 text-white rounded-lg sm:rounded-xl font-black text-[10px] sm:text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-1.5 sm:gap-2 shadow-md shadow-blue-100 mb-2 sm:mb-3 uppercase tracking-tight"
        >
          {isLoan ? 'KIỂM TRA MỨC VAY' : 'KHÁM PHÁ THẺ'} <ExternalLink size={12} className="sm:w-4 sm:h-4" />
        </a>

        <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mb-2 sm:mb-4">
          <button
            onClick={() => onOpenDetail(project)}
            className="flex items-center justify-center gap-1 sm:gap-1.5 py-2 sm:py-2.5 px-1 bg-slate-50 text-slate-600 text-[8px] sm:text-[10px] font-bold rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors"
          >
            <Eye size={11} className="text-blue-500 sm:w-[14px] sm:h-[14px]" /> <span className="hidden xs:inline">Xem </span>Chi tiết
          </button>
          <button
            onClick={handleSupportClick}
            className="flex items-center justify-center gap-1 sm:gap-1.5 py-2 sm:py-2.5 px-1 bg-blue-50 text-blue-700 text-[8px] sm:text-[10px] font-bold rounded-lg border border-blue-100 hover:bg-blue-100 transition-colors"
          >
            <Headphones size={11} className="sm:w-[14px] sm:h-[14px]" /> Hỗ trợ
          </button>
        </div>

        <div className="flex items-center justify-center gap-1 text-[8px] sm:text-[9px] text-slate-400 font-medium">
          <Lock size={9} className="sm:w-[10px] sm:h-[10px]" />
          <span>Bảo mật 100%</span>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

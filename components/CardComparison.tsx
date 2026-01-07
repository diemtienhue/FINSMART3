
import React, { useState } from 'react';
import { Project, ProjectType } from '../types';
import { INITIAL_PROJECTS } from '../constants';
import { 
  Layers, CheckCircle2, Star, ChevronRight, ArrowRightLeft, X, 
  Trophy, Percent, Clock, Gift, Sparkles, BadgeCheck, Shield, ExternalLink, Zap
} from 'lucide-react';

interface CardComparisonProps {
  onSelectCard: (project: Project) => void;
}

const CardComparison: React.FC<CardComparisonProps> = ({ onSelectCard }) => {
  const allCards = INITIAL_PROJECTS.filter(p => p.type === ProjectType.CREDIT_CARD);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);

  const toggleCard = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(i => i !== id));
    } else {
      if (selectedIds.length < 2) {
        setSelectedIds([...selectedIds, id]);
      } else {
        setSelectedIds([selectedIds[0], id]);
      }
    }
  };

  const selectedProjects = allCards.filter(p => selectedIds.includes(p.id));

  const ComparisonRow = ({ icon: Icon, label, val1, val2, isLast = false }: { icon: any, label: string, val1: any, val2: any, isLast?: boolean }) => (
    <tr className={`border-b border-slate-100 ${isLast ? 'border-b-0' : ''}`}>
      <td className="py-4 pl-0 pr-2 w-[30%] align-top">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Icon size={14} />
            <span className="text-[10px] font-black uppercase tracking-tighter whitespace-nowrap">{label}</span>
          </div>
        </div>
      </td>
      <td className="py-4 px-2 w-[35%] align-top border-l border-slate-50">
        <div className="text-[11px] sm:text-xs font-bold text-slate-800 leading-snug">
          {val1}
        </div>
      </td>
      <td className="py-4 px-2 w-[35%] align-top border-l border-slate-50">
        <div className="text-[11px] sm:text-xs font-bold text-slate-800 leading-snug">
          {val2}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-24">
      {/* Header & Funnel */}
      <div className="text-center mb-10 px-4">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight mb-2 uppercase">Tìm kiếm và so sánh sản phẩm thẻ phù hợp</h2>
        <p className="text-slate-500 text-sm font-medium">Chọn 2 loại thẻ bất kỳ để xem phân tích đối chiếu chuyên sâu</p>
      </div>

      {/* Selection Tray */}
      <div className="sticky top-20 z-20 mb-8 px-4">
        <div className="bg-white/80 backdrop-blur-xl border border-slate-200 p-4 rounded-3xl shadow-xl flex items-center justify-between">
          <div className="flex -space-x-3">
            {selectedProjects.length > 0 ? (
              selectedProjects.map(p => (
                <div key={p.id} className="w-10 h-10 rounded-full bg-white border-2 border-blue-500 p-1.5 shadow-md animate-in zoom-in">
                  <img src={p.logo} alt="selected" className="w-full h-full object-contain" />
                </div>
              ))
            ) : (
              <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                1
              </div>
            )}
            {selectedProjects.length < 2 && (
              <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-dashed border-slate-300 flex items-center justify-center text-slate-400">
                2
              </div>
            )}
          </div>
          
          <button 
            disabled={selectedIds.length < 2}
            onClick={() => setShowModal(true)}
            className={`px-6 py-2.5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all ${
              selectedIds.length < 2 
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed' 
              : 'bg-blue-600 text-white shadow-lg shadow-blue-200 active:scale-95'
            }`}
          >
            So sánh ngay
          </button>
        </div>
      </div>

      {/* Grid Selection */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 px-2">
        {allCards.map(card => {
          const isSelected = selectedIds.includes(card.id);
          return (
            <button
              key={card.id}
              onClick={() => toggleCard(card.id)}
              className={`group relative flex flex-col items-center p-3 rounded-2xl transition-all duration-300 ${
                isSelected 
                ? 'bg-blue-50' 
                : 'hover:bg-white'
              }`}
            >
              <div className={`relative w-14 h-14 mb-3 rounded-full flex items-center justify-center transition-all ${
                isSelected 
                ? 'bg-white border-2 border-blue-600 shadow-lg scale-110' 
                : 'bg-white border border-slate-100 group-hover:border-blue-200'
              }`}>
                <img src={card.logo} alt={card.name} className="w-9 h-9 object-contain" />
                {isSelected && (
                  <div className="absolute -top-1 -right-1 bg-blue-600 text-white rounded-full p-1 shadow-lg border border-white">
                    <CheckCircle2 size={10} />
                  </div>
                )}
              </div>
              <span className={`text-[9px] font-black text-center uppercase leading-tight ${isSelected ? 'text-blue-700' : 'text-slate-500'}`}>
                {card.name.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* COMPARISON MODAL - Updated for correct data mapping and mobile design */}
      {showModal && selectedProjects.length === 2 && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-xl h-[90vh] sm:h-auto sm:max-h-[95vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-500">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-100 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 text-white rounded-xl flex items-center justify-center">
                  <ArrowRightLeft size={18} />
                </div>
                <h3 className="text-lg font-black text-slate-800 uppercase tracking-tighter">Bảng so sánh chi tiết</h3>
              </div>
              <button 
                onClick={() => setShowModal(false)}
                className="p-2 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Comparison Table Body */}
            <div className="flex-1 overflow-y-auto px-6 py-2 scrollbar-hide bg-white">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b-2 border-slate-900">
                    <th className="py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Tiêu chí</th>
                    <th className="py-4 px-2 text-center align-middle">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-full h-14 rounded-lg overflow-hidden border border-slate-100 shadow-sm bg-slate-50">
                          <img src={selectedProjects[0].coverImage} className="w-full h-full object-cover" alt="card_img_1" />
                        </div>
                        <div className="flex items-center gap-1 justify-center">
                          <span className="text-[8px] font-black text-blue-600 uppercase leading-none block line-clamp-1">{selectedProjects[0].name.split(' ')[0]}</span>
                        </div>
                      </div>
                    </th>
                    <th className="py-4 px-2 text-center align-middle border-l border-slate-100">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-full h-14 rounded-lg overflow-hidden border border-slate-100 shadow-sm bg-slate-50">
                          <img src={selectedProjects[1].coverImage} className="w-full h-full object-cover" alt="card_img_2" />
                        </div>
                        <div className="flex items-center gap-1 justify-center">
                          <span className="text-[8px] font-black text-indigo-600 uppercase leading-none block line-clamp-1">{selectedProjects[1].name.split(' ')[0]}</span>
                        </div>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <ComparisonRow 
                    icon={Clock} 
                    label="⏱ Miễn lãi" 
                    val1={selectedProjects[0].interestFreePeriod || 'Đang cập nhật'}
                    val2={selectedProjects[1].interestFreePeriod || 'Đang cập nhật'}
                  />
                  <ComparisonRow 
                    icon={Percent} 
                    label="📉 Lãi suất" 
                    val1={selectedProjects[0].interestRate}
                    val2={selectedProjects[1].interestRate}
                  />
                  <ComparisonRow 
                    icon={Gift} 
                    label="💳 Phí TN" 
                    val1={selectedProjects[0].advantages.find(a => a.toLowerCase().includes('phí')) || 'Miễn phí năm đầu'}
                    val2={selectedProjects[1].advantages.find(a => a.toLowerCase().includes('phí')) || 'Theo biểu phí'}
                  />
                  <ComparisonRow 
                    icon={Sparkles} 
                    label="💰 Hoàn tiền" 
                    val1={selectedProjects[0].advantages.find(a => a.toLowerCase().includes('hoàn')) || 'Đến 10%'}
                    val2={selectedProjects[1].advantages.find(a => a.toLowerCase().includes('hoàn')) || 'Đến 5%'}
                  />
                  <ComparisonRow 
                    icon={Trophy} 
                    label="🎁 Ưu đãi chính" 
                    val1={
                      <ul className="space-y-1">
                        {selectedProjects[0].advantages.slice(0, 2).map((a, i) => (
                          <li key={i} className="flex items-start gap-1">• {a}</li>
                        ))}
                      </ul>
                    }
                    val2={
                      <ul className="space-y-1">
                        {selectedProjects[1].advantages.slice(0, 2).map((a, i) => (
                          <li key={i} className="flex items-start gap-1">• {a}</li>
                        ))}
                      </ul>
                    }
                  />
                  <ComparisonRow 
                    icon={BadgeCheck} 
                    label="⭐ Finsmart" 
                    isLast
                    val1={
                      <div className="flex flex-col">
                        <span className="text-blue-600 font-black">{selectedProjects[0].rating}/5</span>
                        <span className="text-[9px] uppercase text-emerald-500 font-bold">Rất tốt</span>
                      </div>
                    }
                    val2={
                      <div className="flex flex-col">
                        <span className="text-indigo-600 font-black">{selectedProjects[1].rating}/5</span>
                        <span className="text-[9px] uppercase text-blue-500 font-bold">Tốt</span>
                      </div>
                    }
                  />
                </tbody>
              </table>
            </div>

            {/* Modal Footer CTA */}
            <div className="p-6 bg-slate-50 border-t border-slate-100 shrink-0">
               <div className="grid grid-cols-2 gap-4">
                 <a 
                   href={selectedProjects[0].affiliateLink}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="group relative flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-800 text-white shadow-lg shadow-blue-200 hover:shadow-2xl hover:shadow-blue-300 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                 >
                   <div className="absolute top-0 right-0 w-12 h-12 bg-white/10 rounded-full -mr-6 -mt-6 group-hover:scale-150 transition-transform duration-500" />
                   <div className="relative z-10 flex flex-col items-center gap-2">
                     <div className="flex items-center gap-1.5">
                       <Zap size={12} className="text-blue-200" />
                       <span className="text-[10px] font-black uppercase tracking-tighter">Khám phá {selectedProjects[0].name.split(' ')[0]}</span>
                     </div>
                   </div>
                   <div className="absolute bottom-1 right-2 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                     <ExternalLink size={14} />
                   </div>
                 </a>

                 <a 
                   href={selectedProjects[1].affiliateLink}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="group relative flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-800 text-white shadow-lg shadow-indigo-200 hover:shadow-2xl hover:shadow-indigo-300 hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                 >
                   <div className="absolute top-0 right-0 w-12 h-12 bg-white/10 rounded-full -mr-6 -mt-6 group-hover:scale-150 transition-transform duration-500" />
                   <div className="relative z-10 flex flex-col items-center gap-2">
                     <div className="flex items-center gap-1.5">
                       <Zap size={12} className="text-indigo-200" />
                       <span className="text-[10px] font-black uppercase tracking-tighter">Khám phá {selectedProjects[1].name.split(' ')[0]}</span>
                     </div>
                   </div>
                   <div className="absolute bottom-1 right-2 opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                     <ExternalLink size={14} />
                   </div>
                 </a>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Selection Guide */}
      <div className="mt-12 p-6 bg-blue-50 rounded-3xl border border-blue-100 flex items-start gap-4 mx-2">
        <div className="p-2 bg-blue-600 text-white rounded-xl shadow-lg">
          <Shield size={20} />
        </div>
        <div className="space-y-1">
          <h4 className="text-sm font-black text-blue-900 uppercase">Quy trình so sánh độc lập</h4>
          <p className="text-xs text-blue-700 leading-relaxed font-medium">
            Mọi dữ liệu so sánh được Finsmart cập nhật hàng tuần trực tiếp từ biểu phí của ngân hàng. Chúng tôi cam kết đưa ra kết quả khách quan nhất để bạn có lựa chọn tối ưu.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardComparison;

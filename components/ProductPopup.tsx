
import React, { useState } from 'react';
import { Project } from '../types';
import { X, CheckCircle2, Info, ChevronRight, Copy, HelpCircle, AlertTriangle, ShieldCheck, Target, Zap, CreditCard, PlayCircle, FileText, Globe, Smartphone, MousePointer2, Image as ImageIcon } from 'lucide-react';

interface ProductPopupProps {
  project: Project;
  onClose: () => void;
}

const ProductPopup: React.FC<ProductPopupProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'intro' | 'tips' | 'eligibility'>('intro');

  const copyToClipboard = (text: string) => {
    // Logic cho mã động: Nếu mã chứa "CN + SĐT", ta chỉ lấy prefix (ví dụ "CN")
    let finalCode = text;
    if (text.toUpperCase().includes('SĐT')) {
      finalCode = text.split('+')[0].trim();
    }

    navigator.clipboard.writeText(finalCode);
    alert(`Đã sao chép mã: ${finalCode}`);
  };

  const isLoan = project.type === 'LOAN';
  const ctaText = isLoan ? "Kiểm tra mức vay" : "Khám phá thẻ";

  // Hàm tạo ví dụ cho mã động (CN + SĐT) - CHỈ HIỂN THỊ TRONG POPUP
  const renderReferralExample = () => {
    if (!project.referralCode) return null;
    const isDynamic = project.referralCode.toUpperCase().includes('SĐT');
    if (isDynamic) {
      const prefix = project.referralCode.split('+')[0].trim() || 'CN';
      return (
        <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-100 border-dashed animate-in fade-in slide-in-from-top-1">
          <p className="text-[10px] text-amber-700 font-bold leading-relaxed">
            <span className="text-amber-800 uppercase font-black">Ví dụ cụ thể:</span><br />
            Khách hàng có số điện thoại: <span className="text-blue-600">0988335555</span><br />
            Thì bạn Nhập đúng mã giới thiệu là:
            <span className="bg-white px-1.5 py-0.5 rounded border border-amber-200 font-black ml-1 text-blue-700">"{prefix}0988335555"</span>
          </p>
          <p className="text-[9px] text-slate-400 mt-1.5 italic">
            * Mỗi dự án sẽ ứng với chữ {prefix} hoặc chữ khác nhau, còn số điện thoại là của khách hàng.
          </p>
        </div>
      );
    }
    return null;
  };

  // Danh sách các bước cố định theo yêu cầu cho tab Hướng dẫn
  const fixedSteps = [
    {
      title: `BƯỚC 1: ĐĂNG KÝ`,
      desc: `Ấn vào nút "${ctaText}" bên dưới để chuyển hướng đăng ký hồ sơ chính thức với đối tác thông qua Finsmart.`
    },
    {
      title: `BƯỚC 2: TẢI ỨNG DỤNG`,
      desc: `Hệ thống điều hướng bạn đến cửa hàng ứng dụng (CHPlay/iOS). Hãy tải App chính thức của ${project.name.split(' ')[0]} về máy.`
    },
    {
      title: `BƯỚC 3: NHẬP MÃ GIỚI THIỆU`,
      desc: project.referralCode ? `📌 Quan trọng: Nhập mã giới thiệu để hệ thống ghi nhận bạn là khách hàng ưu tiên của Finsmart.` : `Lưu ý: Dự án này hiện không yêu cầu mã giới thiệu từ hệ thống.`
    },
    {
      title: `BƯỚC 4: ĐIỀN THÔNG TIN`,
      desc: `Tiến hành eKYC (chụp ảnh CCCD) và điền các thông tin cá nhân cơ bản để tổ chức thực hiện phê duyệt tự động.`
    },
    {
      title: `BƯỚC 5: HOÀN TẤT`,
      desc: `Chờ thẩm định trong 5-15 phút. Sau khi duyệt, bạn có thể nhận tiền giải ngân hoặc kích hoạt thẻ sử dụng ngay.`
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm transition-opacity animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-lg h-[92vh] sm:h-auto sm:max-h-[95vh] rounded-t-[32px] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-in slide-in-from-bottom duration-500 border-x border-t border-slate-100 relative">

        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-50 flex items-center justify-between shrink-0 bg-white">
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-slate-50 p-2 rounded-xl border border-slate-100 flex items-center justify-center shadow-sm shrink-0">
              <img src={project.logo} className="w-full h-full object-contain" alt="logo" />
            </div>
            <div className="min-w-0">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-slate-800 leading-tight tracking-tight line-clamp-2">{project.name}</h2>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[9px] font-black text-emerald-600 uppercase tracking-widest">Đang hoạt động</span>
              </div>
            </div>
          </div>
          <button onClick={onClose} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full text-slate-500 transition-colors shrink-0"><X size={20} /></button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex p-1.5 sm:p-2 bg-slate-50/50 shrink-0 border-b border-slate-100 gap-1">
          {[
            { id: 'intro', label: 'Giới thiệu & Hướng dẫn', icon: Smartphone },
            { id: 'tips', label: 'Bí kíp duyệt hồ sơ', icon: Zap },
            { id: 'eligibility', label: 'Đối tượng & Kênh TT', icon: CreditCard }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2 sm:py-3 flex flex-col items-center gap-1 sm:gap-1.5 rounded-xl sm:rounded-2xl transition-all ${activeTab === tab.id
                  ? 'bg-white text-blue-600 shadow-sm border border-slate-200/50'
                  : 'text-slate-400 hover:text-slate-600'
                }`}
            >
              <tab.icon size={14} className="sm:w-4 sm:h-4" />
              <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-tight leading-tight text-center">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-6 sm:space-y-8 scrollbar-hide bg-white pb-24">

          {/* TAB 1: GIỚI THIỆU & HƯỚNG DẪN CHI TIẾT */}
          {activeTab === 'intro' && (
            <div className="animate-in fade-in slide-in-from-left-2 duration-300 space-y-8">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Globe size={16} className="text-blue-600" />
                  <p className="text-xs font-black text-slate-800 uppercase tracking-widest">Thông tin tổ chức phát hành</p>
                </div>
                <div className="bg-slate-50 p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
                  <p className="text-[11px] text-slate-600 leading-relaxed font-bold italic line-clamp-3">
                    "{project.bankIntro || 'Đây là đối tác chiến lược của Finsmart, tổ chức tài chính uy tín được cấp phép hoạt động tại Việt Nam, cam kết bảo mật thông tin và cung cấp các giải pháp tài chính minh bạch.'}"
                  </p>
                  <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Trang web chính thức:</span>
                    <a href={`https://${project.bankWebsite}`} target="_blank" className="text-[11px] font-black text-blue-600 underline decoration-blue-200 underline-offset-4 tracking-tight">{project.bankWebsite || 'Đang cập nhật...'}</a>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {project.tutorialVideoUrl && (
                    <a href={project.tutorialVideoUrl} target="_blank" className="flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 rounded-2xl border border-red-100 font-black text-[9px] uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all shadow-sm">
                      <PlayCircle size={14} /> Video hướng dẫn
                    </a>
                  )}
                  {project.tutorialFileUrl && (
                    <a href={project.tutorialFileUrl} target="_blank" className="flex items-center justify-center gap-2 py-3 bg-blue-50 text-blue-600 rounded-2xl border border-blue-100 font-black text-[9px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                      <FileText size={14} /> File hướng dẫn
                    </a>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-black text-slate-800 uppercase border-l-4 border-blue-600 pl-3 tracking-widest">Hành trình đăng ký</p>
                </div>

                <div className="space-y-6">
                  {fixedSteps.map((step, idx) => (
                    <div key={idx} className="group relative">
                      <div className="flex gap-4 items-start">
                        <div className="flex-1 space-y-2">
                          <h4 className="text-[11px] font-black text-blue-600 uppercase tracking-tighter">{step.title}</h4>
                          <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">{step.desc}</p>

                          {/* Bước 3: Mã giới thiệu trong tab Hướng dẫn */}
                          {idx === 2 && (
                            <div className="mt-4 animate-in zoom-in duration-300">
                              {project.referralCode ? (
                                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border-2 border-dashed border-amber-300 p-4 space-y-4">
                                  <div className="flex flex-col gap-2">
                                    <p className="text-[9px] font-black text-amber-600 uppercase tracking-widest">Mã giới thiệu chính thức:</p>
                                    <div className="flex items-center gap-2">
                                      <div className="flex-1 bg-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl border border-amber-200 shadow-inner flex items-center justify-center overflow-hidden">
                                        <span className="text-[11px] sm:text-xs font-black text-slate-800 tracking-widest truncate">{project.referralCode}</span>
                                      </div>
                                      <button
                                        onClick={() => copyToClipboard(project.referralCode!)}
                                        className="px-3 sm:px-4 py-2 sm:py-2.5 bg-blue-600 text-white rounded-xl font-black text-[9px] sm:text-[10px] uppercase tracking-widest hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-200 flex items-center gap-1.5 sm:gap-2 shrink-0"
                                      >
                                        <Copy size={12} className="sm:w-[14px] sm:h-[14px]" /> COPY MÃ
                                      </button>
                                    </div>
                                  </div>
                                  <div className="p-3 bg-white/80 rounded-xl space-y-2">
                                    <p className="text-[9px] font-black text-amber-600 uppercase">Ưu đãi độc quyền:</p>
                                    <ul className="text-[10px] text-slate-600 font-bold space-y-1">
                                      <li className="flex items-start gap-2">
                                        <div className="w-1 h-1 rounded-full bg-amber-500 mt-1.5" />
                                        <span>Ghi nhận khách hàng ưu tiên của Finsmart</span>
                                      </li>
                                      <li className="flex items-start gap-2">
                                        <div className="w-1 h-1 rounded-full bg-amber-500 mt-1.5" />
                                        <span>Tăng tốc độ phê duyệt tự động từ 3-5 lần</span>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              ) : (
                                <div className="bg-slate-50 rounded-2xl border border-slate-200 p-3 text-center">
                                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">--- Dự án không yêu cầu mã ---</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>

                        <div className="w-20 sm:w-24 md:w-32 aspect-[4/3] rounded-xl sm:rounded-2xl overflow-hidden border border-slate-100 shadow-sm bg-slate-50 shrink-0">
                          {project.steps[idx]?.image ? (
                            <img src={project.steps[idx].image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="step" />
                          ) : (
                            <div className="w-full h-full flex flex-col items-center justify-center opacity-20 bg-slate-200">
                              <ImageIcon size={20} />
                              <span className="text-[8px] font-bold mt-1">NO IMAGE</span>
                            </div>
                          )}
                        </div>
                      </div>
                      {idx < 4 && <div className="mt-6 border-b border-slate-50" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: BÍ KÍP DUYỆT HỒ SƠ */}
          {activeTab === 'tips' && (
            <div className="animate-in fade-in slide-in-from-right-2 duration-300 space-y-6">
              <p className="text-xs font-black text-slate-800 uppercase border-l-4 border-emerald-500 pl-3 tracking-widest">Mẹo để hồ sơ được duyệt 100%</p>

              <div className="bg-white rounded-[2rem] border border-slate-200 overflow-hidden shadow-md">
                <div className="bg-slate-50/50 p-6 space-y-8">
                  {/* Tip 1 */}
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[11px] font-black shrink-0 border border-emerald-200">1</div>
                    <div className="space-y-1">
                      <h5 className="text-[11px] font-black text-slate-800 uppercase tracking-tight">Dùng SIM chính chủ</h5>
                      <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">Sim phải đăng ký đúng tên chính chủ của người đăng ký hồ sơ.</p>
                    </div>
                  </div>

                  {/* Tip 2 */}
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[11px] font-black shrink-0 border border-emerald-200">2</div>
                    <div className="space-y-1">
                      <h5 className="text-[11px] font-black text-slate-800 uppercase tracking-tight">Có tài khoản Zalo thật</h5>
                      <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">SĐT đăng ký phải có Zalo đang hoạt động thường xuyên (tốt nhất là {'>'}3 tháng).</p>
                    </div>
                  </div>

                  {/* Tip 3 - THIẾT KẾ MỚI THEO YÊU CẦU */}
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[11px] font-black shrink-0 border border-emerald-200">3</div>
                    <div className="flex-1 space-y-4">
                      <div className="flex items-center justify-between">
                        <h5 className="text-[11px] font-black text-slate-800 uppercase tracking-tight">Nhập đúng mã giới thiệu</h5>
                        <div className="relative group/tip">
                          <HelpCircle size={18} className="text-blue-500 cursor-help transition-transform hover:scale-110" />
                          <div className="absolute bottom-full right-0 mb-3 w-72 bg-slate-900 text-white text-[9px] p-4 rounded-2xl opacity-0 group-hover/tip:opacity-100 transition-all duration-300 pointer-events-none z-[110] shadow-2xl border border-white/10 translate-y-2 group-hover/tip:translate-y-0">
                            <p className="font-black text-blue-400 mb-2 uppercase tracking-tighter">Tại sao cần nhập đúng mã giới thiệu?</p>
                            <p className="font-bold leading-relaxed">
                              Nhập đúng mã giúp hệ thống ghi nhận bạn là khách hàng ưu tiên của Finsmart. Đồng thời giúp tăng tỷ lệ duyệt và nhận kết quả nhanh hơn.
                            </p>
                            <div className="absolute -bottom-1.5 right-1.5 w-3 h-3 bg-slate-900 rotate-45" />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 shadow-sm space-y-3">
                          <p className="text-[10px] text-slate-700 font-black leading-relaxed uppercase tracking-tighter">
                            Tại sao cần nhập đúng mã giới thiệu?
                          </p>
                          <p className="text-[11px] text-slate-500 font-bold leading-relaxed">
                            Nhập đúng mã giới thiệu giúp hệ thống ghi nhận bạn là khách hàng ưu tiên của Finsmart. Đồng thời Mã giới thiệu giúp tăng tỷ lệ duyệt và nhận kết quả nhanh hơn.
                          </p>

                          {project.referralCode ? (
                            <div className="flex flex-col gap-3 mt-4 pt-4 border-t border-blue-100/50">
                              <div className="flex items-center justify-between gap-3">
                                {/* Bên trái: Nút nhỏ chứa mã */}
                                <div className="flex-1 bg-white px-3 py-2 rounded-xl border border-blue-200 shadow-inner flex items-center justify-center overflow-hidden">
                                  <span className="text-[10px] font-black text-slate-800 tracking-widest truncate">
                                    Mã của dự án là: {project.referralCode}
                                  </span>
                                </div>
                                {/* Bên phải: Nút copy nhỏ */}
                                <button
                                  onClick={() => copyToClipboard(project.referralCode!)}
                                  className="px-3 py-2 bg-blue-600 text-white rounded-xl font-black text-[9px] uppercase tracking-widest hover:bg-blue-700 active:scale-95 transition-all shadow-md flex items-center gap-1.5 shrink-0"
                                >
                                  <Copy size={12} /> Copy mã
                                </button>
                              </div>

                              {/* Ví dụ mã động - CHỈ HIỂN THỊ Ở ĐÂY */}
                              {renderReferralExample()}
                            </div>
                          ) : (
                            <div className="p-2 bg-slate-100 rounded-lg text-center">
                              <span className="text-[10px] font-black text-slate-400 uppercase italic">Dự án không yêu cầu mã</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tip 4 */}
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[11px] font-black shrink-0 border border-emerald-200">4</div>
                    <div className="space-y-1">
                      <h5 className="text-[11px] font-black text-slate-800 uppercase tracking-tight">Chọn đúng mục đích</h5>
                      <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">Phần "Mục đích vay/mở thẻ", hãy luôn điền: <span className="text-blue-600 font-bold">"Mua sắm tiêu dùng"</span>.</p>
                    </div>
                  </div>

                  {/* Tip 5 */}
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-[11px] font-black shrink-0 border border-emerald-200">5</div>
                    <div className="space-y-1">
                      <h5 className="text-[11px] font-black text-slate-800 uppercase tracking-tight">Chụp CCCD rõ nét</h5>
                      <p className="text-[11px] text-slate-500 font-semibold leading-relaxed">Ảnh chụp phải là bản gốc, không bị mờ, không bị lóa sáng và nhìn rõ các thông tin.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-start gap-3 shadow-inner">
                <ShieldCheck size={18} className="text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-emerald-700 font-bold leading-relaxed">Lưu ý: Tuân thủ đúng 5 mẹo trên sẽ giúp tỷ lệ phê duyệt hồ sơ của bạn đạt mức tối đa ngay lần đầu tiên.</p>
              </div>
            </div>
          )}

          {/* TAB 3: ĐỐI TƯỢNG */}
          {activeTab === 'eligibility' && (
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 space-y-6">
              <div className="space-y-4">
                <p className="text-xs font-black text-slate-800 uppercase border-l-4 border-blue-600 pl-3 tracking-widest">Đối tượng được phê duyệt</p>
                <div className="space-y-2">
                  {project.eligibility.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 font-bold text-[11px] text-slate-600">
                      <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 bg-slate-50 rounded-[2rem] border border-slate-200 text-slate-600 space-y-3 shadow-sm">
                <div className="flex items-center gap-2">
                  <AlertTriangle size={16} className="text-amber-500" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-800">Lưu ý</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed font-bold">
                  Tổ chức tài chính có quyền từ chối phê duyệt hồ sơ nếu phát hiện thông tin khai báo không trung thực hoặc lịch sử tín dụng CIC không đạt tiêu chuẩn. Finsmart là nền tảng so sánh độc lập, không tham gia trực tiếp vào quá trình thẩm định.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="shrink-0 p-3 sm:p-4 bg-white border-t border-slate-100 z-50">
          <a href={project.affiliateLink} target="_blank" className="flex items-center justify-between p-3 sm:p-4 bg-blue-600 text-white rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm uppercase tracking-widest shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-95 transition-all">
            <span className="flex items-center gap-2"><MousePointer2 size={16} className="sm:w-[18px] sm:h-[18px]" /> {ctaText}</span>
            <ChevronRight size={18} className="sm:w-5 sm:h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductPopup;

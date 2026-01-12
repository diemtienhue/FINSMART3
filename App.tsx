
import React, { useState, useEffect } from 'react';
import { Home, DollarSign, CreditCard, User, Menu, Calculator, Building2, TrendingUp, X, Info, ChevronRight, Layers, ShieldCheck, AlertCircle, Phone, MessageCircle } from 'lucide-react';
import ProjectCard from './components/ProjectCard';
import ProductPopup from './components/ProductPopup';
import AdminDashboard from './components/AdminDashboard';
import LoanCalculator from './components/LoanCalculator';
import CardComparison from './components/CardComparison';
import GuidePage from './components/GuidePage';
import PartnerSlider from './components/PartnerSlider';
import { Project, ProjectType } from './types';
import { INITIAL_PROJECTS, SUPPORT_ZALO } from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'loans' | 'cards' | 'comparison' | 'calc' | 'profile' | 'guides' | 'insurance' | 'support'>('home');
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Initial Routing Logic
  React.useLayoutEffect(() => {
    const path = window.location.pathname;
    if (path === '/quanlyhethong') {
      setActiveTab('profile');
    } else if (path === '/huong-dan') {
      setActiveTab('guides');
    }
  }, []);

  const [appConfig, setAppConfig] = useState({
    heroTitle: 'Tài Chính Thông Minh',
    heroSubtitle: 'Giải pháp so sánh và lựa chọn sản phẩm tài chính tối ưu nhất dành cho bạn.',
    heroImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200',
    zaloSupport: SUPPORT_ZALO
  });

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { projectService } = await import('./services/projectService');
        const [data, settings] = await Promise.all([
          projectService.getAll(),
          projectService.getSettings()
        ]);
        setProjects(data);
        setAppConfig(settings);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter(p => {
    if (activeTab === 'loans') return p.type === ProjectType.LOAN;
    if (activeTab === 'cards') return p.type === ProjectType.CREDIT_CARD;
    return p.status === 'Published';
  }).sort((a, b) => a.order - b.order);

  const handlePhoneCall = () => {
    window.location.href = `tel:${appConfig.zaloSupport.replace(/\./g, '')}`;
  };

  const handleZaloChat = () => {
    window.open(`https://zalo.me/${appConfig.zaloSupport.replace(/\./g, '')}`, '_blank');
  };

  const HomeSection = () => (
    <div className="space-y-4 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero Banner - Mobile optimized */}
      <div className="relative h-[120px] sm:h-48 md:h-64 rounded-lg sm:rounded-3xl overflow-hidden shadow-md">
        <img src={appConfig.heroImage} className="w-full h-full object-cover" alt="hero" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/70 to-transparent flex items-center p-3 sm:p-6 md:p-10">
          <div className="max-w-[65%] sm:max-w-md">
            <h1 className="text-sm sm:text-2xl md:text-4xl font-bold text-white mb-0.5 sm:mb-2 leading-tight">{appConfig.heroTitle}</h1>
            <p className="text-blue-100 text-[9px] sm:text-sm md:text-lg mb-1.5 sm:mb-6 opacity-90 line-clamp-2 leading-relaxed">{appConfig.heroSubtitle}</p>
            <button
              onClick={() => setActiveTab('loans')}
              className="px-2.5 sm:px-6 py-1 sm:py-3 bg-white text-blue-700 rounded-md sm:rounded-xl font-bold shadow-md hover:bg-blue-50 transition-all flex items-center gap-1 sm:gap-2 text-[9px] sm:text-sm uppercase"
            >
              Khám phá ngay <ChevronRight size={12} className="sm:w-[18px] sm:h-[18px]" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Access - Mobile optimized with clear borders */}
      <div className="quick-access-grid">
        {[
          { id: 'comparison', label: 'So sánh thẻ', icon: Layers, color: 'bg-blue-600' },
          { id: 'calc', label: 'Ước tính vay', icon: Calculator, color: 'bg-amber-500' },
          { id: 'cards', label: 'Thẻ tín dụng', icon: CreditCard, color: 'bg-indigo-500' },
          { id: 'loans', label: 'Vay tiêu dùng', icon: DollarSign, color: 'bg-emerald-500' }
        ].map(item => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as any)}
            className="quick-access-card shadow-sm hover:shadow-md hover:border-slate-300 transition-all group"
          >
            <div className={`w-10 h-10 sm:w-12 sm:h-12 ${item.color} text-white rounded-full flex items-center justify-center mb-1.5 sm:mb-3 group-hover:scale-105 transition-transform shadow-md`}>
              <item.icon size={18} className="sm:w-6 sm:h-6" />
            </div>
            <span className="text-[8px] sm:text-[11px] font-extrabold text-slate-600 uppercase tracking-tight text-center leading-[1.1] px-0.5">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Featured Projects */}
      <div>
        <div className="flex items-center justify-between mb-3 sm:mb-4">
          <h2 className="text-base sm:text-xl font-bold text-slate-800 flex items-center gap-2">
            <TrendingUp size={18} className="text-blue-600 sm:w-5 sm:h-5" /> Dự án nổi bật
          </h2>
          <button onClick={() => setActiveTab('loans')} className="text-xs font-bold text-blue-600">Xem tất cả</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {projects.filter(p => p.status === 'Published').slice(0, 6).map(p => (
            <ProjectCard key={p.id} project={p} onOpenDetail={setSelectedProject} />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col w-full overflow-x-hidden">
      <div className="flex flex-1">
        {/* Sidebar Desktop */}
        {/* Sidebar Desktop - Redesigned */}
        <aside className="hidden lg:flex w-72 flex-col fixed inset-y-0 left-0 bg-white border-r border-slate-100 p-6 z-40">
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <Building2 size={24} />
            </div>
            <span className="text-2xl font-black text-slate-800 tracking-tight">FINSMART</span>
          </div>

          <nav className="flex-1 space-y-2">
            {[
              { id: 'home' as const, label: 'Trang chủ', icon: Home },
              { id: 'cards' as const, label: 'Thẻ tín dụng', icon: CreditCard },
              { id: 'loans' as const, label: 'Vay tiêu dùng', icon: DollarSign },
              { id: 'insurance' as const, label: 'Bảo hiểm ô tô giá rẻ', icon: ShieldCheck },
            ].map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 font-bold rounded-2xl transition-all duration-300 ${activeTab === item.id
                  ? 'bg-blue-50 text-blue-600 shadow-sm translate-x-1'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                  }`}
              >
                <item.icon size={20} className={activeTab === item.id ? 'fill-current opacity-20' : ''} />
                <span className="text-sm tracking-tight">{item.label}</span>
              </button>
            ))}

            <div className="my-4 border-t border-slate-50" />

            {/* Hướng dẫn đăng ký - New Icon */}
            <button
              onClick={() => setActiveTab('guides')}
              className={`w-full flex items-center gap-3 px-4 py-3.5 font-bold rounded-2xl transition-all duration-300 ${activeTab === 'guides'
                ? 'bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-600 shadow-sm translate-x-1'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                }`}
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${activeTab === 'guides' ? 'bg-emerald-200/50' : 'bg-slate-100'}`}>
                <Layers size={16} className={activeTab === 'guides' ? 'text-emerald-700' : 'text-slate-500'} />
              </div>
              <span className="text-sm tracking-tight">Hướng dẫn đăng ký</span>
            </button>

            {/* Liên hệ hỗ trợ */}
            <button
              onClick={() => setActiveTab('support')}
              className={`w-full flex items-center gap-3 px-4 py-3.5 font-bold rounded-2xl transition-all duration-300 ${activeTab === 'support'
                ? 'bg-blue-50 text-blue-600 shadow-sm translate-x-1'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                }`}
            >
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${activeTab === 'support' ? 'bg-blue-200/50' : 'bg-slate-100'}`}>
                <Phone size={16} className={activeTab === 'support' ? 'text-blue-700' : 'text-slate-500'} />
              </div>
              <span className="text-sm tracking-tight">Liên hệ hỗ trợ</span>
            </button>
          </nav>

          {/* Contact Banner Mini */}
          <div className="mt-auto p-4 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl shadow-xl shadow-blue-200 text-center relative overflow-hidden group cursor-pointer" onClick={handleZaloChat}>
            <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10" />
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10" />

            <div className="relative z-10 space-y-3">
              <div className="w-10 h-10 mx-auto bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/10">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div>
                <p className="text-white font-black text-xs uppercase tracking-widest mb-1">Cần hỗ trợ?</p>
                <p className="text-blue-100 text-[10px] font-medium opacity-90">Chat ngay với chuyên viên</p>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 lg:pl-72 flex flex-col">
          {/* Top Navbar */}
          <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 h-16 flex items-center px-4 sm:px-8">
            <div className="lg:hidden w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center mr-3 shadow-md">
              <Building2 size={20} />
            </div>
            <div className="flex-1 lg:hidden">
              <span className="text-xl font-black text-slate-800 tracking-tighter">FINSMART</span>
            </div>

            <nav className="hidden sm:flex items-center gap-8 mr-auto pl-8">
              <button onClick={() => setActiveTab('home')} className={`text-sm font-black uppercase tracking-tight ${activeTab === 'home' ? 'text-blue-600' : 'text-slate-400'}`}>Trang chủ</button>
              <button onClick={() => setActiveTab('loans')} className={`text-sm font-black uppercase tracking-tight ${activeTab === 'loans' ? 'text-blue-600' : 'text-slate-400'}`}>Vay tiêu dùng</button>
              <button onClick={() => setActiveTab('cards')} className={`text-sm font-black uppercase tracking-tight ${activeTab === 'cards' ? 'text-blue-600' : 'text-slate-400'}`}>Thẻ tín dụng</button>
            </nav>

            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
            >
              <Menu size={24} />
            </button>
          </header>

          {/* Body Content */}
          <div className="max-w-6xl mx-auto p-3 sm:p-4 md:p-8 w-full" style={{ maxWidth: '100%' }}>
            {activeTab === 'home' && <HomeSection />}

            {(activeTab === 'loans' || activeTab === 'cards') && (
              <div className="space-y-6">
                <div className="bg-white p-4 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                  <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-800">
                    {activeTab === 'loans' ? 'Khoản Vay Tiêu Dùng' : 'Thẻ Tín Dụng'}
                  </h2>
                  <div className="flex bg-slate-100 p-1 sm:p-1.5 rounded-xl sm:rounded-2xl">
                    <button onClick={() => setActiveTab('loans')} className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black uppercase ${activeTab === 'loans' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Vay</button>
                    <button onClick={() => setActiveTab('cards')} className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black uppercase ${activeTab === 'cards' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}>Thẻ</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
                  {filteredProjects.map(p => (
                    <ProjectCard key={p.id} project={p} onOpenDetail={setSelectedProject} />
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'calc' && <LoanCalculator onNavigate={setActiveTab} />}

            {activeTab === 'comparison' && <CardComparison onSelectCard={setSelectedProject} projects={projects} />}

            {activeTab === 'profile' && <AdminDashboard />}

            {activeTab === 'guides' && <GuidePage projects={projects} onOpenDetail={setSelectedProject} />}

            {activeTab === 'insurance' && (
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="w-24 h-24 bg-blue-100/50 rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck size={48} className="text-blue-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Bảo hiểm ô tô giá rẻ</h2>
                  <p className="text-slate-500 mt-2 max-w-md mx-auto">Hệ thống đang cập nhật danh sách các gói bảo hiểm ưu đãi nhất. Vui lòng quay lại sau.</p>
                </div>
                <button onClick={() => setActiveTab('home')} className="px-6 py-3 bg-slate-800 text-white rounded-xl font-bold hover:bg-black transition-all shadow-lg">
                  Quay về trang chủ
                </button>
              </div>
            )}

            {activeTab === 'support' && (
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-8 animate-in fade-in slide-in-from-bottom duration-500">
                <h2 className="text-2xl font-black text-slate-800 uppercase tracking-tight border-b-4 border-blue-500 pb-2">Liên hệ hỗ trợ</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl px-4">
                  <div onClick={handlePhoneCall} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl hover:shadow-2xl transition-all cursor-pointer group">
                    <div className="w-16 h-16 mx-auto bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Phone size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Gọi Hotline</h3>
                    <p className="text-slate-500 text-sm">Tư vấn trực tiếp 24/7</p>
                  </div>
                  <div onClick={handleZaloChat} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl hover:shadow-2xl transition-all cursor-pointer group">
                    <div className="w-16 h-16 mx-auto bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <MessageCircle size={32} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Chat Zalo</h3>
                    <p className="text-slate-500 text-sm">Hỗ trợ nhanh chóng qua box chat</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* CHÂN TRANG - LƯU Ý PHÁP LÝ */}
          <footer className="mt-auto px-4 sm:px-8 py-8 pb-24 lg:pb-8 border-t border-slate-100 bg-white/50">
            <div className="max-w-6xl mx-auto">
              {/* Partner Slider */}
              <PartnerSlider />

              <div className="flex flex-col items-center text-center space-y-4 mt-8">
                <div className="flex items-center gap-2 text-slate-400">
                  <ShieldCheck size={18} />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Cam kết bảo mật & Minh bạch</span>
                </div>
                <div className="bg-slate-100/50 p-6 rounded-3xl border border-slate-200/50 max-w-3xl">
                  <p className="text-[11px] sm:text-xs text-slate-500 font-medium leading-relaxed flex items-start gap-3 text-left">
                    <AlertCircle size={16} className="text-slate-400 shrink-0 mt-0.5" />
                    <span>
                      <b>Lưu ý quan trọng:</b> Website chỉ cung cấp thông tin so sánh và đánh giá sản phẩm tài chính.
                      Mọi đăng ký (nếu có) được thực hiện trực tiếp tại website chính thức của đơn vị phát hành.
                      Finsmart không phải là đơn vị cho vay và không thu bất kỳ khoản phí nào từ người dùng.
                    </span>
                  </p>
                </div>
                <p className="text-[10px] text-slate-400 font-bold">© 2024 Finsmart - Affiliate Fintech Conversion Engine. All Rights Reserved.</p>
              </div>
            </div>
          </footer>
        </main>
      </div>

      {/* Bottom Navigation Mobile - Optimized */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-[60] bottom-nav safe-area-pb">
        {[
          { id: 'home', label: 'Trang chủ', icon: Home },
          { id: 'comparison', label: 'So sánh thẻ...', icon: Layers },
          { id: 'loans', label: 'Vay', icon: DollarSign },
          { id: 'cards', label: 'Thẻ', icon: CreditCard },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`bottom-nav-item ${activeTab === tab.id ? 'text-blue-600' : 'text-slate-400'}`}
          >
            <tab.icon size={18} />
            <span>{tab.label}</span>
          </button>
        ))}
      </nav>

      {/* Mobile Sidebar - Redesigned */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)} />
          <aside className="absolute top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl animate-in slide-in-from-right duration-500 flex flex-col p-6 rounded-l-[2rem]">
            <div className="flex justify-between items-center mb-8 pl-2">
              <span className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                <Building2 size={24} className="text-blue-600" /> MENU
              </span>
              <button onClick={() => setIsSidebarOpen(false)} className="p-2 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors"><X size={20} /></button>
            </div>

            <nav className="flex-1 space-y-2 overflow-y-auto pr-2">
              {[
                { id: 'home' as const, label: 'Trang chủ', icon: Home },
                { id: 'cards' as const, label: 'Thẻ tín dụng', icon: CreditCard },
                { id: 'loans' as const, label: 'Vay tiêu dùng', icon: DollarSign },
                { id: 'insurance' as const, label: 'Bảo hiểm ô tô giá rẻ', icon: ShieldCheck },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setIsSidebarOpen(false); }}
                  className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${activeTab === item.id
                    ? 'bg-blue-50 text-blue-600 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50'
                    }`}
                >
                  <item.icon size={20} /> {item.label}
                </button>
              ))}

              <div className="my-4 border-t border-slate-50" />

              <button
                onClick={() => { setActiveTab('guides'); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${activeTab === 'guides'
                  ? 'bg-emerald-50 text-emerald-600 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50'
                  }`}
              >
                <Layers size={20} /> Hướng dẫn đăng ký
              </button>

              <button
                onClick={() => { setActiveTab('support'); setIsSidebarOpen(false); }}
                className={`w-full flex items-center gap-4 p-4 rounded-2xl font-bold transition-all ${activeTab === 'support'
                  ? 'bg-blue-50 text-blue-600 shadow-sm'
                  : 'text-slate-600 hover:bg-slate-50'
                  }`}
              >
                <Phone size={20} /> Liên hệ hỗ trợ
              </button>
            </nav>

            <div className="mt-4 p-5 bg-gradient-to-br from-slate-50 to-white rounded-[2rem] border border-slate-100 shadow-inner">
              <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-4 text-center">kênh Hỗ trợ trực tuyến</p>
              <div className="flex items-center justify-center gap-6">
                <button onClick={handlePhoneCall} className="w-14 h-14 bg-white text-blue-600 border border-blue-50 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"><Phone size={24} /></button>
                <button onClick={handleZaloChat} className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg shadow-blue-200 hover:scale-110 transition-transform"><MessageCircle size={24} /></button>
              </div>
            </div>
          </aside>
        </div>
      )}

      {selectedProject && <ProductPopup project={selectedProject} onClose={() => setSelectedProject(null)} />}
    </div>
  );
};

export default App;

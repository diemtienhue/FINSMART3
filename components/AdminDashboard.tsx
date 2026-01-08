
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Project, ProjectType } from '../types';
import { INITIAL_PROJECTS, ADMIN_CREDENTIALS, SUPPORT_ZALO } from '../constants';
import {
  LogOut, Plus, Edit2, Trash2, Save, X, FileText, LayoutGrid,
  Image as ImageIcon, ListPlus, Star, Info, Settings,
  DollarSign, CreditCard, ShieldCheck, Target, ExternalLink,
  ChevronRight, BarChart3, Database, Globe, Smartphone, PlayCircle, Upload, Link2, Camera, FileUp, Zap, MousePointer2, CheckCircle2, HelpCircle,
  Layout, Eye, RefreshCw, Layers, PhoneCall, MessageSquare, Award
} from 'lucide-react';
import ProjectCard from './ProjectCard';
import ProductPopup from './ProductPopup';

// ImageUploader Component (Visual Sync Version)
const ImageUploader: React.FC<{
  label: string;
  value: string;
  onChange: (val: string) => void;
  ratio?: string;
}> = ({ label, value, onChange, ratio = "aspect-video" }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        // Show temporary preview
        const reader = new FileReader();
        reader.onloadend = () => onChange(reader.result as string);
        reader.readAsDataURL(file);

        // Upload to Supabase
        const { projectService } = await import('../services/projectService');
        const publicUrl = await projectService.uploadImage(file);
        onChange(publicUrl); // Update with real URL
      } catch (error) {
        alert('Lỗi tải ảnh: ' + (error as any).message);
      }
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
        <Camera size={12} /> {label}
      </label>
      <div className={`relative group overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 ${ratio} flex items-center justify-center transition-all hover:border-blue-300`}>
        {value ? (
          <>
            <img src={value} className="w-full h-full object-cover" alt="preview" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-white text-blue-600 p-2 rounded-lg shadow-xl hover:scale-110 transition-transform"><Upload size={16} /></button>
              <button type="button" onClick={() => onChange('')} className="bg-white text-red-600 p-2 rounded-lg shadow-xl hover:scale-110 transition-transform"><Trash2 size={16} /></button>
            </div>
          </>
        ) : (
          <button type="button" onClick={() => fileInputRef.current?.click()} className="flex flex-col items-center gap-2 text-slate-400 hover:text-blue-500 transition-colors">
            <Upload size={20} />
            <span className="text-[8px] font-black uppercase tracking-widest">Tải ảnh lên</span>
          </button>
        )}
        <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
      </div>
    </div>
  );
};

const AdminDashboard: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // App-wide Settings (Supabase Sync Simulation)
  const [appSettings, setAppSettings] = useState({
    heroTitle: 'Tài Chính Thông Minh',
    heroSubtitle: 'Giải pháp so sánh và lựa chọn sản phẩm tài chính tối ưu nhất dành cho bạn.',
    heroImage: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=1200',
    zaloSupport: SUPPORT_ZALO
  });

  useEffect(() => {
    // Initial fetch for Admin
    const loadData = async () => {
      try {
        const { projectService } = await import('../services/projectService');
        const [data, settings] = await Promise.all([
          projectService.getAll(),
          projectService.getSettings()
        ]);
        setProjects(data);
        setAppSettings(settings);
      } catch (e) {
        console.error(e);
      }
    };
    loadData();
  }, []);

  const [mainNav, setMainNav] = useState<'hero' | 'products' | 'comparison' | 'settings'>('products');
  const [editorSubTab, setEditorSubTab] = useState<'card' | 'popup'>('card');
  const [isSyncing, setIsSyncing] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === ADMIN_CREDENTIALS.user && password === ADMIN_CREDENTIALS.pass) {
      setIsAuthenticated(true);
    } else {
      alert('Thông tin quản trị không chính xác!');
    }
  };

  const syncWithDatabase = async () => {
    setIsSyncing(true);
    try {
      const { projectService } = await import('../services/projectService');

      // Save settings
      await projectService.saveSettings(appSettings);

      // Re-fetch data
      const data = await projectService.getAll();
      setProjects(data);
      alert('Đã đồng bộ dữ liệu (Bao gồm Cài đặt & Hero Slide) thành công!');
    } catch (e) {
      console.error(e);
      alert('Lỗi đồng bộ: ' + (e as any).message);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleSaveProject = async () => {
    if (!editingProject) return;
    setIsSyncing(true);
    try {
      const { projectService } = await import('../services/projectService');
      const saved = await projectService.upsert(editingProject);

      // Update local list
      setProjects(prev => {
        const index = prev.findIndex(p => p.id === saved.id || (editingProject.id.startsWith('p-') && p.id === editingProject.id));
        if (index >= 0) {
          const newProjs = [...prev];
          newProjs[index] = saved;
          return newProjs;
        }
        return [...prev, saved];
      });

      setEditingProject(null);
      alert('Đã lưu thành công vào Supabase!');
    } catch (e) {
      console.error(e);
      alert('Lỗi khi lưu: ' + (e as any).message);
    } finally {
      setIsSyncing(false);
    }
  };

  const updateComparisonData = (projectId: string, field: string, value: string) => {
    setProjects(prev => prev.map(p => {
      if (p.id === projectId) {
        if (field === 'advantages') {
          const newAdv = [...p.advantages];
          newAdv[0] = value; // Annual fee often stored here
          return { ...p, advantages: newAdv };
        }
        return { ...p, [field]: value };
      }
      return p;
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[90vh] flex items-center justify-center p-4">
        <div className="bg-white w-full max-w-md p-10 rounded-[3rem] shadow-2xl border border-slate-100 animate-in zoom-in duration-500">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-blue-600 text-white rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-xl rotate-3">
              <ShieldCheck size={40} />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">VẬN HÀNH</h2>
            <p className="text-slate-500 font-medium mt-2 uppercase text-[10px] tracking-widest">Hệ thống Fintech Conversion Engine</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Tài khoản quản trị</label>
              <input type="text" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-900 focus:border-blue-500 focus:bg-white transition-all" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase ml-2">Mật khẩu</label>
              <input type="password" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none font-bold text-slate-900 focus:border-blue-500 focus:bg-white transition-all" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-100 mt-4">Xác thực truy cập</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 pb-24 animate-in fade-in duration-500">
      {/* 1. TOP OPERATIONAL NAV */}
      <div className="bg-white p-3 rounded-3xl border border-slate-100 shadow-sm flex flex-wrap items-center justify-between gap-3 mb-8 sticky top-20 z-40 backdrop-blur-md bg-white/90">
        <div className="flex bg-slate-100 p-1 rounded-2xl w-full md:w-auto">
          {[
            { id: 'hero', label: 'Hero Slider', icon: Layout },
            { id: 'products', label: 'Vay & Thẻ', icon: LayoutGrid },
            { id: 'comparison', label: 'So sánh', icon: Layers },
            { id: 'settings', label: 'Cài đặt', icon: Settings }
          ].map(nav => (
            <button
              key={nav.id}
              onClick={() => setMainNav(nav.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-tight transition-all ${mainNav === nav.id ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-800'}`}
            >
              <nav.icon size={14} /> {nav.label}
            </button>
          ))}
        </div>

        <div className="flex gap-2 w-full md:w-auto">
          <button
            onClick={syncWithDatabase}
            disabled={isSyncing}
            className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all ${isSyncing ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSyncing ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
            {isSyncing ? 'Đang đồng bộ...' : 'Đồng bộ Supabase'}
          </button>
          <button onClick={() => setIsAuthenticated(false)} className="p-2.5 bg-slate-100 text-slate-500 hover:text-red-600 rounded-xl transition-all"><LogOut size={18} /></button>
        </div>
      </div>

      {/* 2. OPERATIONAL REGIONS */}
      <div className="space-y-12">

        {/* REGION 1: HERO SLIDER EDITOR */}
        {mainNav === 'hero' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start animate-in slide-in-from-left-4">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
              <p className="text-xs font-black text-blue-600 uppercase tracking-widest border-l-4 border-blue-600 pl-3">Cấu hình Banner chính (Hero)</p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Tiêu đề lớn</label>
                  <input className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm text-slate-900" value={appSettings.heroTitle} onChange={(e) => setAppSettings({ ...appSettings, heroTitle: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase">Mô tả phụ</label>
                  <textarea className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-sm text-slate-900 min-h-[100px]" value={appSettings.heroSubtitle} onChange={(e) => setAppSettings({ ...appSettings, heroSubtitle: e.target.value })} />
                </div>
                <ImageUploader label="Ảnh Banner (1200x600)" value={appSettings.heroImage} onChange={(v) => setAppSettings({ ...appSettings, heroImage: v })} />
              </div>
            </div>

            {/* Visual Sync Preview */}
            <div className="space-y-4">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Mô phỏng Giao diện đầu ra</p>
              <div className="relative h-64 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                <img src={appSettings.heroImage} className="w-full h-full object-cover" alt="hero" />
                <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent flex items-center p-8">
                  <div className="max-w-[250px]">
                    <h1 className="text-xl font-bold text-white mb-2 leading-tight">{appSettings.heroTitle}</h1>
                    <p className="text-blue-100 text-[10px] mb-4 opacity-80 line-clamp-2">{appSettings.heroSubtitle}</p>
                    <div className="inline-block px-4 py-2 bg-white text-blue-700 rounded-lg font-black text-[9px] uppercase shadow-lg">Khám phá ngay</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* REGION 2: PRODUCT STUDIO (CARD & POPUP) */}
        {mainNav === 'products' && (
          <div className="space-y-8 animate-in slide-in-from-left-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-slate-800 uppercase tracking-tighter">Danh sách sản phẩm ({projects.length})</h3>
              <button
                onClick={() => setEditingProject({
                  id: `p-${Date.now()}`, name: 'Dự án mới', type: ProjectType.LOAN, logo: '', coverImage: '', limit: '', interestRate: '', description: '', advantages: ['', '', ''], promo: '', affiliateLink: '', eligibility: [], steps: [], status: 'Draft', order: projects.length + 1
                })}
                className="px-4 py-2 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2"
              >
                <Plus size={14} /> Tạo sản phẩm mới
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map(p => (
                <div key={p.id} className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-6 hover:shadow-xl transition-all border-b-4 border-b-slate-100 hover:border-b-blue-500">
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 bg-white p-1 rounded-full border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm">
                      <img src={p.logo} className="w-full h-full object-cover rounded-full" alt="logo" />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest ${p.status === 'Published' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>{p.status}</span>
                      <span className="text-[9px] font-bold text-slate-400">Order: {p.order}</span>
                    </div>
                  </div>
                  <h4 className="font-black text-slate-800 mb-6 truncate">{p.name}</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <button onClick={() => setEditingProject(p)} className="flex items-center justify-center gap-2 py-3 bg-blue-50 text-blue-600 rounded-xl font-black text-[10px] uppercase hover:bg-blue-600 hover:text-white transition-all shadow-sm"><Edit2 size={14} /> Chỉnh sửa</button>
                    <button onClick={() => setProjects(prev => prev.filter(x => x.id !== p.id))} className="flex items-center justify-center gap-2 py-3 bg-slate-50 text-slate-400 rounded-xl font-black text-[10px] uppercase hover:bg-red-50 hover:text-red-500 transition-all"><Trash2 size={14} /></button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* REGION 3: COMPARISON MATRIX */}
        {mainNav === 'comparison' && (
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8 animate-in slide-in-from-left-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black text-indigo-600 uppercase tracking-widest border-l-4 border-indigo-600 pl-3">Dữ liệu so sánh sản phẩm (Matrix)</p>
                <p className="text-[10px] text-slate-400 font-bold mt-1 ml-4 uppercase">Chỉnh sửa trực tiếp trên bảng để cập nhật dữ liệu so sánh</p>
              </div>
              <button onClick={syncWithDatabase} className="p-2 bg-emerald-50 text-emerald-600 rounded-lg flex items-center gap-2 font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 hover:text-white transition-all"><Save size={16} /> Lưu toàn bộ</button>
            </div>

            <div className="overflow-x-auto rounded-3xl border border-slate-100">
              <table className="w-full text-left">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="p-5 text-[10px] font-black text-slate-400 uppercase">Sản phẩm (Logo & Tên)</th>
                    <th className="p-5 text-[10px] font-black text-slate-400 uppercase">Miễn lãi (Ngày)</th>
                    <th className="p-5 text-[10px] font-black text-slate-400 uppercase">Lãi suất (%)</th>
                    <th className="p-5 text-[10px] font-black text-slate-400 uppercase">Phí thường niên</th>
                    <th className="p-5 text-[10px] font-black text-slate-400 uppercase text-center">Hành động</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {projects.filter(p => p.type === ProjectType.CREDIT_CARD).map(p => (
                    <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="p-5">
                        <div className="flex items-center gap-3">
                          <div className="relative group">
                            <div className="w-10 h-10 rounded-full border border-slate-100 bg-white p-0.5 overflow-hidden shadow-sm flex items-center justify-center">
                              <img src={p.logo} className="w-full h-full object-cover rounded-full" />
                            </div>
                            <button onClick={() => setEditingProject(p)} className="absolute inset-0 bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all"><Camera size={14} /></button>
                          </div>
                          <input
                            className="p-2 bg-transparent border-none rounded-lg text-xs font-black text-slate-900 w-full focus:ring-0"
                            value={p.name}
                            onChange={(e) => updateComparisonData(p.id, 'name', e.target.value)}
                          />
                        </div>
                      </td>
                      <td className="p-5">
                        <input
                          className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-900 w-full"
                          value={p.interestFreePeriod || ''}
                          onChange={(e) => updateComparisonData(p.id, 'interestFreePeriod', e.target.value)}
                        />
                      </td>
                      <td className="p-5">
                        <input
                          className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-900 w-full"
                          value={p.interestRate}
                          onChange={(e) => updateComparisonData(p.id, 'interestRate', e.target.value)}
                        />
                      </td>
                      <td className="p-5">
                        <input
                          className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black text-slate-900 w-full"
                          value={p.advantages[0] || ''}
                          onChange={(e) => updateComparisonData(p.id, 'advantages', e.target.value)}
                        />
                      </td>
                      <td className="p-5 text-center">
                        <button onClick={() => { alert('Đã ghi nhận thay đổi cho ' + p.name) }} className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                          <CheckCircle2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* REGION 4: SETTINGS */}
        {mainNav === 'settings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-in slide-in-from-left-4">
            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
              <p className="text-xs font-black text-emerald-600 uppercase tracking-widest border-l-4 border-emerald-600 pl-3">Thông tin hỗ trợ toàn hệ thống</p>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-slate-400 uppercase flex items-center gap-2"><PhoneCall size={12} /> Zalo / Hotline hỗ trợ</label>
                  <input className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-black text-slate-900" value={appSettings.zaloSupport} onChange={(e) => setAppSettings({ ...appSettings, zaloSupport: e.target.value })} />
                </div>
                <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                  <p className="text-[10px] text-blue-600 font-bold leading-relaxed italic">
                    * Thông tin này sẽ thay đổi số điện thoại hiển thị tại Sidebar, Chân trang và Nút hỗ trợ nhanh trên toàn bộ Website.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
              <p className="text-xs font-black text-red-600 uppercase tracking-widest border-l-4 border-red-600 pl-3">Bảo mật & Database</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-center space-y-2">
                  <Database className="mx-auto text-slate-400" size={24} />
                  <p className="text-[10px] font-black uppercase text-slate-600">Dung lượng DB</p>
                  <p className="text-lg font-black text-slate-800">12.5 MB</p>
                </div>
                <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 text-center space-y-2">
                  <ShieldCheck className="mx-auto text-emerald-500" size={24} />
                  <p className="text-[10px] font-black uppercase text-slate-600">Bảo mật SSL</p>
                  <p className="text-lg font-black text-emerald-600 tracking-tighter uppercase">An toàn</p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* 3. VISUAL EDITOR OVERLAY (FULL SYNC) */}
      {editingProject && (
        <div className="fixed inset-0 z-[300] bg-slate-900/95 backdrop-blur-xl flex items-center justify-center p-0 sm:p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-7xl h-full sm:h-[95vh] rounded-none sm:rounded-[3rem] shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-500">

            {/* Editor Header */}
            <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center shrink-0 bg-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 text-white rounded-[1.2rem] flex items-center justify-center shadow-lg"><Edit2 size={20} /></div>
                <div>
                  <h3 className="text-sm font-black text-slate-800 uppercase tracking-tighter">Visual Editor Studio</h3>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Đang chỉnh sửa: {editingProject.name}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:flex bg-slate-100 p-1 rounded-xl">
                  <button onClick={() => setEditorSubTab('card')} className={`px-5 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${editorSubTab === 'card' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}>Giao diện Card</button>
                  <button onClick={() => setEditorSubTab('popup')} className={`px-5 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${editorSubTab === 'popup' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}>Giao diện Popup</button>
                </div>
                <button onClick={() => setEditingProject(null)} className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-full text-slate-400"><X size={20} /></button>
              </div>
            </div>

            <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
              {/* Left Panel: Form Input (Synchronized structure) */}
              <div className="flex-1 overflow-y-auto p-8 space-y-10 scrollbar-hide border-r border-slate-50">

                {editorSubTab === 'card' && (
                  <div className="space-y-10 animate-in slide-in-from-left-4">
                    <div className="space-y-4">
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest border-l-4 border-blue-600 pl-3">Thông tin cơ bản (Card View)</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[9px] font-black text-slate-400 uppercase">Tên sản phẩm</label>
                          <input className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-xs text-slate-900" value={editingProject.name} onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] font-black text-slate-400 uppercase">Loại hình</label>
                          <select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-xs text-slate-900" value={editingProject.type} onChange={(e) => setEditingProject({ ...editingProject, type: e.target.value as any })}>
                            <option value={ProjectType.LOAN}>Vay tiêu dùng</option>
                            <option value={ProjectType.CREDIT_CARD}>Thẻ tín dụng</option>
                          </select>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[9px] font-black text-slate-400 uppercase">Hạn mức (Vd: Đến 50 Triệu)</label>
                          <input className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-black text-xs text-slate-900" value={editingProject.limit} onChange={(e) => setEditingProject({ ...editingProject, limit: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] font-black text-slate-400 uppercase">Lãi suất / Miễn lãi</label>
                          <input className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-black text-xs text-slate-900" value={editingProject.interestRate} onChange={(e) => setEditingProject({ ...editingProject, interestRate: e.target.value })} />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-[9px] font-black text-slate-400 uppercase">Đặc quyền nổi bật (Viền indigo trên card)</label>
                        <input className="w-full p-4 bg-indigo-50 border border-indigo-100 rounded-2xl font-black text-xs text-slate-900 uppercase tracking-tight" value={editingProject.promo} onChange={(e) => setEditingProject({ ...editingProject, promo: e.target.value })} />
                      </div>
                    </div>

                    {/* NEW SECTION: ADVANTAGES EDITOR */}
                    <div className="space-y-4">
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest border-l-4 border-emerald-600 pl-3">3 Điểm mạnh cốt lõi (Hiển thị trực tiếp trên Card)</p>
                      <div className="space-y-3">
                        {[0, 1, 2].map(idx => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-black text-xs shrink-0 border border-emerald-100 shadow-sm">{idx + 1}</div>
                            <input
                              placeholder={`Điểm mạnh thứ ${idx + 1}...`}
                              className="flex-1 p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-xs text-slate-900 focus:bg-white focus:border-emerald-300 transition-all"
                              value={editingProject.advantages[idx] || ''}
                              onChange={(e) => {
                                const newAdv = [...editingProject.advantages];
                                newAdv[idx] = e.target.value;
                                setEditingProject({ ...editingProject, advantages: newAdv });
                              }}
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest border-l-4 border-blue-600 pl-3">Hình ảnh Nhận diện</p>
                      <div className="grid grid-cols-2 gap-6">
                        <ImageUploader label="Logo Đối tác (SVG/PNG)" ratio="aspect-square rounded-full" value={editingProject.logo} onChange={(v) => setEditingProject({ ...editingProject, logo: v })} />
                        <ImageUploader label="Ảnh bìa (Nếu là thẻ tín dụng)" value={editingProject.coverImage} onChange={(v) => setEditingProject({ ...editingProject, coverImage: v })} />
                      </div>
                    </div>
                  </div>
                )}

                {editorSubTab === 'popup' && (
                  <div className="space-y-10 animate-in slide-in-from-left-4">
                    <div className="space-y-4">
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest border-l-4 border-emerald-600 pl-3">Thông tin Affiliate & Mã giới thiệu</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[9px] font-black text-slate-400 uppercase">Affiliate Link (Nút CTA)</label>
                          <input className="w-full p-4 bg-blue-50 border border-blue-200 rounded-2xl font-bold text-xs text-slate-900" value={editingProject.affiliateLink} onChange={(e) => setEditingProject({ ...editingProject, affiliateLink: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] font-black text-slate-400 uppercase">Mã giới thiệu chính xác</label>
                          <input className="w-full p-4 bg-amber-50 border border-amber-200 rounded-2xl font-black text-xs text-slate-900 uppercase tracking-widest" value={editingProject.referralCode || ''} onChange={(e) => setEditingProject({ ...editingProject, referralCode: e.target.value })} placeholder="Vd: CN + SĐT KHÁCH HÀNG" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest border-l-4 border-emerald-600 pl-3">Quy trình 5 bước (Visual Workflow)</p>
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                        {[0, 1, 2, 3, 4].map(idx => (
                          <ImageUploader key={idx} label={`Ảnh bước ${idx + 1}`} ratio="aspect-[4/3]" value={editingProject.steps[idx]?.image || ''} onChange={(v) => {
                            const newSteps = [...editingProject.steps];
                            newSteps[idx] = { ...newSteps[idx], image: v };
                            setEditingProject({ ...editingProject, steps: newSteps });
                          }} />
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest border-l-4 border-emerald-600 pl-3">Dữ liệu So sánh chi tiết (Topup Matrix)</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-[9px] font-black text-slate-400 uppercase">Thời gian miễn lãi (Vd: 45 Ngày)</label>
                          <input className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-xs text-slate-900" value={editingProject.interestFreePeriod || ''} onChange={(e) => setEditingProject({ ...editingProject, interestFreePeriod: e.target.value })} />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] font-black text-slate-400 uppercase">Lượt đăng ký mô phỏng</label>
                          <input className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl font-bold text-xs text-slate-900" value={editingProject.userCount || '10k+'} onChange={(e) => setEditingProject({ ...editingProject, userCount: e.target.value })} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Panel: Simulator View (100% Visual Sync) */}
              <div className="w-full lg:w-[450px] bg-slate-50 p-8 overflow-y-auto border-l border-slate-100 flex flex-col gap-10 scrollbar-hide">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Visual Sync Simulator</p>

                {/* Simulated Card */}
                <div className="space-y-4 opacity-100">
                  <p className="text-[10px] font-black text-blue-600 uppercase text-center flex items-center justify-center gap-2"><Layout size={12} /> Mô phỏng Card đầu ra</p>
                  <div className="scale-90 origin-top shadow-2xl rounded-2xl overflow-hidden bg-white pointer-events-none">
                    <ProjectCard project={editingProject} onOpenDetail={() => { }} />
                  </div>
                </div>

                {/* Simulated Popup Content (Target Tab) */}
                <div className="space-y-4 mt-8">
                  <p className="text-[10px] font-black text-emerald-600 uppercase text-center flex items-center justify-center gap-2"><Smartphone size={12} /> Mô phỏng Tab {editorSubTab === 'card' ? 'Hướng dẫn' : 'Bí kíp'}</p>
                  <div className="scale-[0.85] origin-top border-4 border-white shadow-2xl rounded-[2.5rem] bg-white overflow-hidden pointer-events-none">
                    <div className="h-[600px] overflow-y-auto pointer-events-none">
                      <ProductPopup project={editingProject} onClose={() => { }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Editor Footer Actions */}
            <div className="p-8 bg-white border-t border-slate-100 flex gap-4 shrink-0">
              <button onClick={handleSaveProject} className="flex-1 py-5 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition-all flex items-center justify-center gap-2">
                <Save size={18} /> Lưu & Đồng bộ ngay
              </button>
              <button onClick={() => setEditingProject(null)} className="flex-1 py-5 bg-white text-slate-500 rounded-2xl font-black text-sm uppercase tracking-widest border border-slate-200 hover:bg-slate-50 transition-all flex items-center justify-center gap-2">Hủy bỏ thay đổi</button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER INFO */}
      <div className="mt-12 text-center">
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Hệ thống vận hành Finsmart v2.5 Final</p>
      </div>
    </div>
  );
};

export default AdminDashboard;

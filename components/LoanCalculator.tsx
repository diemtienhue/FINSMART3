
import React, { useState, useMemo } from 'react';
import { Calculator, DollarSign, Calendar, TrendingUp, ChevronRight, CreditCard, Wallet, AlertCircle, Info } from 'lucide-react';

interface LoanCalculatorProps {
  onNavigate: (tab: 'loans' | 'cards') => void;
}

const LoanCalculator: React.FC<LoanCalculatorProps> = ({ onNavigate }) => {
  const [amount, setAmount] = useState(20000000);
  const [months, setMonths] = useState(12);
  const [rate, setRate] = useState(1.6); // Mặc định 1.6% tháng (phổ biến vay tín chấp)

  const calculation = useMemo(() => {
    const monthlyRate = rate / 100;
    const monthlyPayment = (amount * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - amount;

    return {
      monthlyPayment: Math.round(monthlyPayment),
      totalInterest: Math.round(totalInterest),
      totalPayment: Math.round(totalPayment)
    };
  }, [amount, months, rate]);

  const formatVND = (value: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Title Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-amber-50 text-amber-500 rounded-3xl mb-4 shadow-sm">
          <Calculator size={32} />
        </div>
        <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-2">Máy Tính Ước Lượng Khoản Vay</h2>
        <p className="text-slate-500 font-medium">Lên kế hoạch tài chính thông minh chỉ trong vài giây</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Input Side */}
        <div className="bg-white p-6 sm:p-8 rounded-[32px] border border-slate-100 shadow-xl shadow-slate-200/50 space-y-8">
          {/* Amount Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <DollarSign size={14} className="text-emerald-500" /> Số tiền cần vay
              </label>
              <span className="text-lg font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">{formatVND(amount)}</span>
            </div>
            <input 
              type="range" min="5000000" max="100000000" step="1000000"
              value={amount} onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>5.000.000đ</span>
              <span>100.000.000đ</span>
            </div>
          </div>

          {/* Term Slider */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <Calendar size={14} className="text-blue-500" /> Thời hạn vay
              </label>
              <span className="text-lg font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">{months} Tháng</span>
            </div>
            <input 
              type="range" min="6" max="60" step="6"
              value={months} onChange={(e) => setMonths(Number(e.target.value))}
              className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
            <div className="flex justify-between text-[10px] text-slate-400 font-bold">
              <span>6 tháng</span>
              <span>60 tháng</span>
            </div>
          </div>

          {/* Interest Rate Display */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp size={18} className="text-amber-500" />
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Lãi suất tham chiếu</p>
                <p className="text-xs text-slate-600 font-bold">Áp dụng trung bình thị trường</p>
              </div>
            </div>
            <span className="text-sm font-black text-slate-800">{rate}%/tháng</span>
          </div>
        </div>

        {/* Results Side */}
        <div className="bg-blue-600 p-8 rounded-[32px] text-white shadow-2xl shadow-blue-200 relative overflow-hidden">
          {/* Background Decorative Circles */}
          <div className="absolute top-[-20px] right-[-20px] w-40 h-40 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute bottom-[-20px] left-[-20px] w-32 h-32 bg-blue-400/20 rounded-full blur-xl" />

          <div className="relative z-10 space-y-8">
            <div>
              <p className="text-blue-100 text-[11px] font-black uppercase tracking-widest mb-2 opacity-80">Ước tính trả hàng tháng</p>
              <h3 className="text-4xl sm:text-5xl font-black tracking-tighter">{formatVND(calculation.monthlyPayment)}</h3>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-blue-400/30">
              <div>
                <p className="text-blue-100 text-[10px] font-black uppercase tracking-widest mb-1 opacity-70">Tổng tiền lãi</p>
                <p className="text-xl font-bold">{formatVND(calculation.totalInterest)}</p>
              </div>
              <div>
                <p className="text-blue-100 text-[10px] font-black uppercase tracking-widest mb-1 opacity-70">Tổng phải trả</p>
                <p className="text-xl font-bold">{formatVND(calculation.totalPayment)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-blue-700/40 rounded-2xl border border-blue-400/20">
              <Info size={16} className="shrink-0 mt-0.5" />
              <p className="text-[10px] leading-relaxed font-medium text-blue-50">
                Tính toán dựa trên phương pháp dư nợ giảm dần, mức lãi suất thực tế có thể thấp hơn tùy thuộc vào hồ sơ tín dụng của bạn.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Phểu hút khách (Funnel Section) */}
      <div className="mt-12 bg-white p-8 sm:p-10 rounded-[40px] border border-slate-100 shadow-sm text-center space-y-8">
        <div className="space-y-3">
          <h3 className="text-xl sm:text-2xl font-black text-slate-800 uppercase tracking-tight">
            Bạn muốn tiếp tục khám phá thẻ tín dụng hay Kiểm tra mức vay tín chấp của mình?
          </h3>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto">
            Chúng tôi đã tổng hợp danh sách các sản phẩm có tỷ lệ duyệt cao nhất dựa trên nhu cầu của bạn.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
          <button 
            onClick={() => onNavigate('cards')}
            className="group flex items-center justify-between p-6 bg-indigo-50 border border-indigo-200 rounded-3xl hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white text-indigo-600 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <CreditCard size={28} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-800 mb-1">Lựa chọn 1</p>
                <p className="font-black text-base uppercase text-indigo-950 group-hover:text-white transition-colors">Khám phá thẻ tín dụng</p>
              </div>
            </div>
            <ChevronRight size={24} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </button>

          <button 
            onClick={() => onNavigate('loans')}
            className="group flex items-center justify-between p-6 bg-emerald-50 border border-emerald-200 rounded-3xl hover:bg-emerald-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-xl"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white text-emerald-600 rounded-2xl flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                <Wallet size={28} />
              </div>
              <div className="text-left">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-800 mb-1">Lựa chọn 2</p>
                <p className="font-black text-base uppercase text-emerald-950 group-hover:text-white transition-colors">Kiểm tra mức vay</p>
              </div>
            </div>
            <ChevronRight size={24} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
          </button>
        </div>
      </div>

      {/* Chân trang máy tính (Yêu cầu) */}
      <div className="mt-8 px-6 py-8 border-t border-slate-100">
        <div className="flex items-start gap-4 text-slate-400">
          <AlertCircle size={20} className="shrink-0 mt-1" />
          <div className="space-y-2">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Lưu ý:</p>
            <p className="text-xs font-medium leading-relaxed">
              Kết quả hiển thị chỉ mang tính ước tính sơ bộ nhằm giúp bạn hiểu cách thức vay và trả góp tín chấp. 
              Điều kiện và kết quả thực tế có thể thay đổi tùy theo chính sách thẩm định của từng tổ chức tài chính và ngân hàng.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanCalculator;

import React, { useState, useEffect } from 'react';
import { User, Investment, Project, Transaction } from '../types';
import { TopUpModal, WithdrawModal } from '../components/WalletModals';
import { 
  AreaChart, Area, Tooltip, ResponsiveContainer, XAxis, YAxis, CartesianGrid,
  PieChart, Pie, Cell
} from 'recharts';
import { 
  ArrowDownTrayIcon, 
  ArrowUpTrayIcon, 
  ArrowTrendingUpIcon,
  BanknotesIcon,
  BriefcaseIcon,
  ClockIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ArrowRightIcon,
  ArrowTopRightOnSquareIcon,
  ArrowDownLeftIcon
} from '@heroicons/react/24/outline';

interface Props {
  user: User;
  investments: Investment[];
  projects: Project[];
  transactions: Transaction[]; 
  onBalanceUpdate?: (newBalance: number) => void;
  onViewProject?: (project: Project) => void;
  onAddTransaction?: (type: 'deposit' | 'withdrawal' | 'investment', amount: number, description: string) => void; 
}

// Reusable Animated Progress Bar Component
const AnimatedProgressBar = ({ percentage, colorClass = "bg-[#0A192F]", heightClass = "h-1.5" }: { percentage: number, colorClass?: string, heightClass?: string }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setWidth(percentage), 200);
    return () => clearTimeout(timer);
  }, [percentage]);

  return (
    <div className={`w-full bg-slate-100 rounded-full overflow-hidden ${heightClass}`}>
      <div 
        className={`h-full rounded-full transition-all duration-1000 ease-out ${colorClass}`} 
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};

const Dashboard: React.FC<Props> = ({ 
  user, 
  investments, 
  projects, 
  transactions,
  onBalanceUpdate, 
  onViewProject,
  onAddTransaction
}) => {
  const [timeRange, setTimeRange] = useState('1Y');
  const [isTopUpOpen, setIsTopUpOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  // --- Financial Calculations ---
  const currentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalProfit = currentValue - totalInvested;
  const totalBalance = user.walletBalance + currentValue;
  const profitPercentage = totalInvested > 0 ? (totalProfit / totalInvested) * 100 : 0;

  // --- Chart Data (Mock) ---
  const performanceData = [
    { name: 'Jan', value: 14000000 }, { name: 'Feb', value: 14500000 },
    { name: 'Mar', value: 14200000 }, { name: 'Apr', value: 15800000 },
    { name: 'May', value: 16500000 }, { name: 'Jun', value: 16000000 },
    { name: 'Jul', value: 17800000 }, { name: 'Aug', value: 18200000 },
    { name: 'Sep', value: 19500000 }, { name: 'Oct', value: 20200000 },
    { name: 'Nov', value: totalBalance }, 
  ];

  // --- Sector Allocation Data ---
  const sectorCounts = investments.reduce((acc, inv) => {
    const proj = projects.find(p => p.id === inv.projectId);
    if (proj) {
      acc[proj.sector] = (acc[proj.sector] || 0) + inv.currentValue;
    }
    return acc;
  }, {} as Record<string, number>);

  const allocationData = Object.entries(sectorCounts).map(([name, value]) => ({ name, value }));
  const COLORS = ['#00DC82', '#0A192F', '#0d9488', '#64748b', '#f59e0b'];

  const handleTopUpSuccess = (amount: number) => {
    if (onBalanceUpdate) onBalanceUpdate(user.walletBalance + amount);
    if (onAddTransaction) onAddTransaction('deposit', amount, 'Wallet Deposit');
    setIsTopUpOpen(false);
  };

  const handleWithdrawSuccess = (amount: number) => {
    if (onBalanceUpdate) onBalanceUpdate(user.walletBalance - amount);
    if (onAddTransaction) onAddTransaction('withdrawal', amount, 'Bank Withdrawal');
    setIsWithdrawOpen(false);
  };

  // --- Custom Tooltip for Chart ---
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#0A192F] text-white text-xs rounded-lg py-2 px-3 shadow-xl border border-slate-700">
          <p className="font-medium text-slate-400 mb-1">{label}</p>
          <p className="font-mono font-bold text-base text-[#00DC82]">
            ₦{(Number(payload[0].value) / 1000000).toFixed(2)}M
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="animate-fade-in max-w-7xl mx-auto pb-12 font-inter text-slate-900 space-y-8">
      
      {/* Modals */}
      <TopUpModal 
        isOpen={isTopUpOpen} 
        onClose={() => setIsTopUpOpen(false)} 
        onSuccess={handleTopUpSuccess}
      />
      <WithdrawModal 
        isOpen={isWithdrawOpen} 
        onClose={() => setIsWithdrawOpen(false)} 
        onSuccess={handleWithdrawSuccess}
        currentBalance={user.walletBalance}
      />

      {/* --- Section 1: Header & Wealth Overview --- */}
      <header className="flex flex-col lg:flex-row gap-6">
        
        {/* Total Wealth Card (Dark Navy) */}
        <div className="flex-1 bg-[#0A192F] rounded-3xl p-8 text-white shadow-2xl shadow-slate-900/10 relative overflow-hidden group">
          {/* Decorative Background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-[#00DC82]/20 to-transparent rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#00DC82]/30 transition-colors duration-700"></div>
          
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="flex items-center gap-2 mb-6 opacity-80">
                <div className="p-1.5 bg-white/10 rounded-lg backdrop-blur-sm">
                  <BanknotesIcon className="w-4 h-4 text-[#00DC82]" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest">Total Net Worth</span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold font-mono tracking-tight tabular-nums mb-2">
                <span className="text-[#00DC82] mr-2">₦</span>
                {totalBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </h1>
              
              <div className="flex items-center gap-3 mt-4">
                 <span className="px-3 py-1 rounded-full bg-[#00DC82]/20 text-[#00DC82] border border-[#00DC82]/20 text-xs font-bold flex items-center gap-1">
                   <ArrowTrendingUpIcon className="w-3.5 h-3.5" /> +12.4%
                 </span>
                 <span className="text-sm text-slate-400 font-medium">vs last month</span>
              </div>
            </div>

            <div className="flex gap-4 mt-8">
              <button 
                onClick={() => setIsTopUpOpen(true)}
                className="flex-1 bg-white text-[#0A192F] py-3.5 px-4 rounded-xl font-bold text-sm hover:bg-slate-100 transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <ArrowDownTrayIcon className="w-4 h-4" /> Deposit
              </button>
              <button 
                onClick={() => setIsWithdrawOpen(true)}
                className="flex-1 bg-white/10 text-white border border-white/10 py-3.5 px-4 rounded-xl font-bold text-sm hover:bg-white/20 transition-colors flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                <ArrowUpTrayIcon className="w-4 h-4" /> Withdraw
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Stats (Returns & Active) */}
        <div className="w-full lg:w-1/3 flex flex-col gap-6">
          
          {/* Returns Card */}
          <div className="flex-1 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Total Returns</p>
                  <h3 className="text-2xl font-bold text-[#0A192F] font-mono">
                    <span className="text-teal-600 text-lg mr-1">+</span>
                    ₦{totalProfit.toLocaleString()}
                  </h3>
               </div>
               <div className="p-2 bg-teal-50 rounded-lg group-hover:bg-teal-100 transition-colors">
                  <ArrowTrendingUpIcon className="w-5 h-5 text-teal-600" />
               </div>
            </div>
            
            {/* Animated Progress Bar */}
            <AnimatedProgressBar percentage={65} colorClass="bg-teal-500" />
            
            <p className="text-xs text-slate-400 mt-2 font-medium">
              <span className="text-teal-600 font-bold">{profitPercentage.toFixed(1)}%</span> ROI (All time)
            </p>
          </div>

          {/* Active Projects Card */}
          <div className="flex-1 bg-white rounded-3xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-4">
               <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Active Portfolio</p>
                  <h3 className="text-2xl font-bold text-[#0A192F]">{investments.length} <span className="text-sm font-medium text-slate-400">Projects</span></h3>
               </div>
               <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
                  <BriefcaseIcon className="w-5 h-5 text-indigo-600" />
               </div>
            </div>
             <div className="flex -space-x-2 overflow-hidden py-1">
                {investments.slice(0, 4).map((inv, i) => {
                   const img = projects.find(p => p.id === inv.projectId)?.imageUrl;
                   return (
                     <img key={i} className="inline-block h-8 w-8 rounded-full ring-2 ring-white object-cover" src={img} alt=""/>
                   )
                })}
                <div className="h-8 w-8 rounded-full bg-slate-100 ring-2 ring-white flex items-center justify-center text-xs font-bold text-slate-500">+</div>
             </div>
             <p className="text-xs text-slate-400 mt-2 font-medium">
                Next payout in <span className="text-[#0A192F] font-bold">14 days</span>
             </p>
          </div>
        </div>
      </header>

      {/* --- Section 2: Analytics --- */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
             <div>
                <h3 className="text-lg font-bold text-[#0A192F]">Portfolio Performance</h3>
                <p className="text-xs text-slate-500 mt-1">Real-time asset value tracking</p>
             </div>
             <div className="flex bg-slate-50 p-1 rounded-xl">
                {['1M', '6M', '1Y', 'ALL'].map((range) => (
                  <button
                    key={range}
                    onClick={() => setTimeRange(range)}
                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-all ${
                      timeRange === range
                        ? 'bg-white text-[#0A192F] shadow-sm ring-1 ring-slate-100'
                        : 'text-slate-400 hover:text-slate-600'
                    }`}
                  >
                    {range}
                  </button>
                ))}
             </div>
          </div>
          
          <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={performanceData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                 <defs>
                   <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#00DC82" stopOpacity={0.1}/>
                     <stop offset="95%" stopColor="#00DC82" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                 <XAxis 
                    dataKey="name" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 11, fill: '#94a3b8', fontWeight: 500}} 
                    dy={10} 
                 />
                 <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fontSize: 11, fill: '#94a3b8', fontFamily: 'monospace'}} 
                    tickFormatter={(value: any) => `₦${Number(value)/1000000}M`}
                 />
                 <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1 }} />
                 <Area 
                   type="monotone" 
                   dataKey="value" 
                   stroke="#00DC82" 
                   strokeWidth={2} 
                   fillOpacity={1} 
                   fill="url(#colorValue)" 
                   activeDot={{ r: 6, strokeWidth: 0, fill: '#0A192F' }}
                 />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        </div>

        {/* Sector Allocation Pie Chart */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 flex flex-col">
           <h3 className="text-lg font-bold text-[#0A192F] mb-6">Asset Allocation</h3>
           <div className="flex-grow flex flex-col justify-center min-h-[200px]">
             <div className="h-[220px] w-full relative">
                <ResponsiveContainer width="100%" height="100%">
                   <PieChart>
                      <Pie
                        data={allocationData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {allocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip 
                         formatter={(value: number) => `₦${(value/1000000).toFixed(1)}M`}
                         contentStyle={{backgroundColor: '#0A192F', border: 'none', borderRadius: '8px', color: '#fff', fontSize: '12px'}}
                         itemStyle={{color: '#fff'}}
                      />
                   </PieChart>
                </ResponsiveContainer>
                {/* Center Text for Donut */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                   <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">Total</p>
                   <p className="text-lg font-bold text-[#0A192F]">₦{(currentValue/1000000).toFixed(1)}M</p>
                </div>
             </div>
             
             {/* Legend */}
             <div className="mt-6 space-y-3">
                {allocationData.map((entry, index) => (
                   <div key={entry.name} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                         <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }}></div>
                         <span className="text-slate-600 font-medium">{entry.name}</span>
                      </div>
                      <span className="font-bold text-[#0A192F]">
                         {((Number(entry.value) / (Number(currentValue) || 1)) * 100).toFixed(0)}%
                      </span>
                   </div>
                ))}
                {allocationData.length === 0 && (
                  <p className="text-center text-sm text-slate-400 italic">No active investments</p>
                )}
             </div>
           </div>
        </div>
      </section>

      {/* --- Section 3: Live Investment Tracker & Transactions --- */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col">
            <div className="p-8 border-b border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                  <h3 className="text-lg font-bold text-[#0A192F]">Live Portfolio</h3>
                  <p className="text-xs text-slate-500 mt-1">Real-time progress and funding milestones.</p>
              </div>
              <div className="flex gap-2">
                  <button className="px-4 py-2 bg-slate-50 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-2">
                    <FunnelIcon className="w-3.5 h-3.5" /> Filter
                  </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50/50 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                    <tr>
                        <th className="px-6 py-4">Project</th>
                        <th className="px-6 py-4">Financials</th>
                        <th className="px-6 py-4">Progress</th>
                        <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {investments.map((inv) => {
                        const proj = projects.find(p => p.id === inv.projectId);
                        if (!proj) return null;

                        const roi = ((Number(inv.currentValue) - Number(inv.amount)) / Number(inv.amount)) * 100;
                        const fundingPercent = Math.min(100, Math.round((Number(proj.raisedAmount) / Number(proj.targetAmount)) * 100));
                        
                        return (
                          <tr key={inv.id} className="hover:bg-slate-50/50 transition-colors group">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-slate-100 flex-shrink-0 overflow-hidden shadow-sm">
                                      <img src={proj.imageUrl} alt="" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="max-w-[150px]">
                                      <p className="font-bold text-[#0A192F] text-sm mb-0.5 truncate">{proj.title}</p>
                                      <p className="text-[10px] text-slate-500">{proj.sector}</p>
                                    </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="space-y-0.5">
                                    <div className="flex justify-between w-32 text-[10px]">
                                      <span className="text-slate-500">Inv:</span>
                                      <span className="font-medium text-[#0A192F]">₦{(inv.amount/1000000).toFixed(1)}M</span>
                                    </div>
                                    <div className="flex justify-between w-32 text-[10px]">
                                      <span className="text-slate-500">Val:</span>
                                      <span className="font-bold text-[#00DC82]">₦{(inv.currentValue/1000000).toFixed(1)}M</span>
                                    </div>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="w-full max-w-[140px]">
                                    <div className="flex justify-between items-end mb-1">
                                      <span className="text-[10px] font-bold text-[#0A192F]">{fundingPercent}% Funded</span>
                                    </div>
                                    <AnimatedProgressBar percentage={fundingPercent} heightClass="h-1" />
                                </div>
                              </td>
                              <td className="px-6 py-4 text-right">
                                <button 
                                  onClick={() => onViewProject && onViewProject(proj)}
                                  className="px-3 py-1.5 border border-slate-200 rounded-lg text-[10px] font-bold text-[#0A192F] hover:bg-[#0A192F] hover:text-white transition-colors"
                                >
                                  View
                                </button>
                              </td>
                          </tr>
                        );
                    })}
                  </tbody>
              </table>
            </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 flex flex-col h-full max-h-[600px]">
           <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-[#0A192F]">Recent Activity</h3>
              <button className="text-xs font-bold text-teal-600 hover:underline">View All</button>
           </div>

           <div className="flex-grow overflow-y-auto space-y-4 pr-1 custom-scrollbar">
              {transactions && transactions.length > 0 ? (
                transactions.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-50">
                     <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          tx.type === 'deposit' ? 'bg-emerald-50 text-[#00DC82]' : 
                          tx.type === 'withdrawal' ? 'bg-red-50 text-red-500' : 'bg-blue-50 text-blue-500'
                        }`}>
                           {tx.type === 'deposit' && <ArrowDownTrayIcon className="w-4 h-4" />}
                           {tx.type === 'withdrawal' && <ArrowTopRightOnSquareIcon className="w-4 h-4" />}
                           {tx.type === 'investment' && <ArrowDownLeftIcon className="w-4 h-4" />}
                        </div>
                        <div>
                           <p className="text-sm font-bold text-[#0A192F] line-clamp-1">{tx.description}</p>
                           <p className="text-xs text-slate-400">{tx.date}</p>
                        </div>
                     </div>
                     <p className={`text-sm font-mono font-bold ${tx.type === 'deposit' ? 'text-[#00DC82]' : 'text-[#0A192F]'}`}>
                        {tx.type === 'deposit' ? '+' : '-'}₦{(Number(tx.amount)).toLocaleString(undefined, {notation: 'compact'})}
                     </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-slate-400 text-sm">No recent transactions</div>
              )}
           </div>
        </div>
      </section>

      {/* --- Section 4: Recommended Opportunities --- */}
      <section>
         <div className="flex justify-between items-end mb-6 px-2">
            <div>
               <h3 className="text-xl font-bold text-[#0A192F]">Vetted for You</h3>
               <p className="text-sm text-slate-500 mt-1">High-yield projects matching your portfolio profile.</p>
            </div>
            <button className="text-sm font-bold text-teal-600 hover:text-teal-800 flex items-center gap-1">
               View Marketplace <ArrowRightIcon className="w-4 h-4" />
            </button>
         </div>
         
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.filter(p => p.status === 'active' && !investments.some(i => i.projectId === p.id)).slice(0, 3).map(project => (
               <div key={project.id} className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm hover:shadow-md transition-all cursor-pointer group" onClick={() => onViewProject && onViewProject(project)}>
                  <div className="flex items-start justify-between mb-4">
                     <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden">
                        <img src={project.imageUrl} alt="" className="w-full h-full object-cover" />
                     </div>
                     <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide border ${project.riskLevel === 'Low' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                        {project.riskLevel} Risk
                     </span>
                  </div>
                  <h4 className="font-bold text-[#0A192F] mb-1 group-hover:text-teal-600 transition-colors">{project.title}</h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-4 h-8">{project.description}</p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                     <div>
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Target ROI</p>
                        <p className="text-sm font-bold text-[#0A192F]">{project.roi}%</p>
                     </div>
                     <div className="text-right">
                        <p className="text-[10px] text-slate-400 font-bold uppercase">Target</p>
                        <p className="text-sm font-bold text-[#0A192F]">₦{(project.targetAmount/1000000).toFixed(0)}M</p>
                     </div>
                  </div>
               </div>
            ))}
         </div>
      </section>

    </div>
  );
};

export default Dashboard;
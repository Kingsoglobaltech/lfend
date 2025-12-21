
import React, { useState } from 'react';
import { User, Investment, Project } from '../types';
import { WithdrawModal } from '../components/WalletModals';
import { 
  BanknotesIcon, 
  ArrowUpTrayIcon, 
  CalendarDaysIcon, 
  BriefcaseIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  DocumentCheckIcon
} from '@heroicons/react/24/outline';

interface Props {
  user: User;
  investments: Investment[];
  projects: Project[];
  onViewProject: (project: Project) => void;
  onBalanceUpdate: (newBalance: number) => void;
  onAddTransaction: (type: 'deposit' | 'withdrawal' | 'investment', amount: number, description: string) => void;
}

const Portfolio: React.FC<Props> = ({ 
  user, 
  investments, 
  projects, 
  onViewProject,
  onBalanceUpdate,
  onAddTransaction
}) => {
  const [activeTab, setActiveTab] = useState<'holdings' | 'payouts'>('holdings');
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);

  const totalInvested = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const currentValue = investments.reduce((sum, inv) => sum + inv.currentValue, 0);
  const totalProfit = currentValue - totalInvested;

  const handleWithdrawSuccess = (amount: number) => {
    onBalanceUpdate(user.walletBalance - amount);
    onAddTransaction('withdrawal', amount, 'Bank Withdrawal');
    setIsWithdrawOpen(false);
  };

  // Mock Payout Schedule (Simulated based on active investments)
  const upcomingPayouts = investments.map((inv, index) => {
    const project = projects.find(p => p.id === inv.projectId);
    const payoutDate = new Date();
    payoutDate.setDate(payoutDate.getDate() + (index + 1) * 14); // Spread payouts every 2 weeks
    
    return {
        id: inv.id,
        projectTitle: project?.title || 'Unknown Project',
        amount: inv.amount * ((project?.roi || 10) / 100 / 4), // Quarterly portion of ROI
        date: payoutDate.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
        status: index === 0 ? 'Processing' : 'Scheduled'
    };
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12 animate-fade-in">
      <WithdrawModal 
        isOpen={isWithdrawOpen} 
        onClose={() => setIsWithdrawOpen(false)} 
        onSuccess={handleWithdrawSuccess}
        currentBalance={user.walletBalance}
      />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-6 border-b border-slate-100 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#0A192F]">My Portfolio</h1>
          <p className="text-slate-500 mt-2">Track your assets, view performance, and manage returns.</p>
        </div>
        <div className="bg-white border border-slate-200 rounded-xl p-4 flex items-center gap-6 shadow-sm">
           <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Wallet Balance</p>
              <p className="text-xl font-bold text-[#0A192F] font-mono">₦{user.walletBalance.toLocaleString()}</p>
           </div>
           <div className="h-8 w-px bg-slate-200"></div>
           <button 
             onClick={() => setIsWithdrawOpen(true)}
             className="flex items-center gap-2 px-4 py-2 bg-[#0A192F] text-white text-sm font-bold rounded-lg hover:bg-slate-800 transition-colors"
           >
              <ArrowUpTrayIcon className="w-4 h-4" /> Withdraw
           </button>
        </div>
      </div>

      {/* Payment Info Banner */}
      <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100 rounded-2xl p-6 flex items-start gap-4">
         <div className="p-2 bg-white rounded-full shadow-sm text-[#00DC82]">
            <BanknotesIcon className="w-6 h-6" />
         </div>
         <div>
            <h3 className="font-bold text-[#0A192F] text-sm">How do I receive payments?</h3>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
               Returns (dividends) and capital repayments are automatically credited to your <strong>Wallet Balance</strong> on the scheduled payout dates. 
               You can reinvest these funds into new projects or withdraw them directly to your verified bank account at any time using the "Withdraw" button above.
            </p>
         </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-100 p-1 rounded-xl w-fit">
        <button 
           onClick={() => setActiveTab('holdings')}
           className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'holdings' ? 'bg-white text-[#0A192F] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
           Active Holdings
        </button>
        <button 
           onClick={() => setActiveTab('payouts')}
           className={`px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === 'payouts' ? 'bg-white text-[#0A192F] shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
           Payout Schedule
        </button>
      </div>

      {activeTab === 'holdings' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
           {investments.map((inv) => {
              const project = projects.find(p => p.id === inv.projectId);
              if (!project) return null;
              
              const percentReturn = ((inv.currentValue - inv.amount) / inv.amount) * 100;

              return (
                 <div key={inv.id} className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all group">
                    <div className="flex justify-between items-start mb-6">
                       <div className="flex gap-4">
                          <img src={project.imageUrl} className="w-12 h-12 rounded-xl object-cover bg-slate-200" alt={project.title} />
                          <div>
                             <h3 className="font-bold text-[#0A192F]">{project.title}</h3>
                             <p className="text-xs text-slate-500">{project.sector}</p>
                          </div>
                       </div>
                       <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase rounded-lg border border-emerald-100">Active</span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                       <div className="p-3 bg-slate-50 rounded-xl">
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Invested</p>
                          <p className="text-sm font-bold text-[#0A192F]">₦{inv.amount.toLocaleString()}</p>
                       </div>
                       <div className="p-3 bg-slate-50 rounded-xl">
                          <p className="text-[10px] text-slate-400 font-bold uppercase">Current Value</p>
                          <p className="text-sm font-bold text-[#00DC82]">₦{inv.currentValue.toLocaleString()}</p>
                       </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                       <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                          <ArrowTrendingUpIcon className="w-4 h-4 text-[#00DC82]" />
                          <span>{percentReturn.toFixed(1)}% Return</span>
                       </div>
                       <button 
                         onClick={() => onViewProject(project)}
                         className="text-xs font-bold text-[#0A192F] hover:text-teal-600 transition-colors"
                       >
                          View Details
                       </button>
                    </div>
                 </div>
              );
           })}
           {investments.length === 0 && (
              <div className="col-span-full py-20 text-center bg-white rounded-2xl border border-slate-100 border-dashed">
                 <BriefcaseIcon className="w-12 h-12 text-slate-300 mx-auto mb-4" />
                 <h3 className="text-lg font-bold text-[#0A192F]">No Active Investments</h3>
                 <p className="text-slate-500 text-sm">Visit the marketplace to start building your portfolio.</p>
              </div>
           )}
        </div>
      )}

      {activeTab === 'payouts' && (
         <div className="bg-white rounded-2xl border border-slate-100 overflow-hidden animate-fade-in">
            <div className="p-6 border-b border-slate-100 bg-slate-50/50">
               <h3 className="font-bold text-[#0A192F] flex items-center gap-2">
                  <CalendarDaysIcon className="w-5 h-5 text-slate-500" /> Upcoming Distributions
               </h3>
            </div>
            <div className="divide-y divide-slate-50">
               {upcomingPayouts.map((payout, i) => (
                  <div key={i} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                     <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-slate-100 rounded-xl flex flex-col items-center justify-center text-[#0A192F] font-bold border border-slate-200">
                           <span className="text-xs uppercase">{payout.date.split(' ')[1]}</span>
                           <span className="text-lg">{payout.date.split(' ')[0]}</span>
                        </div>
                        <div>
                           <h4 className="font-bold text-[#0A192F]">{payout.projectTitle}</h4>
                           <p className="text-xs text-slate-500">Quarterly Dividend Payment</p>
                        </div>
                     </div>
                     <div className="flex items-center justify-between md:justify-end gap-8 flex-grow">
                        <div className="text-right">
                           <p className="text-xs text-slate-400 font-bold uppercase">Amount</p>
                           <p className="font-bold text-[#00DC82] font-mono">₦{payout.amount.toLocaleString(undefined, {maximumFractionDigits: 0})}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                           payout.status === 'Processing' ? 'bg-amber-50 text-amber-700' : 'bg-slate-100 text-slate-500'
                        }`}>
                           {payout.status}
                        </span>
                     </div>
                  </div>
               ))}
               {upcomingPayouts.length === 0 && (
                  <div className="p-12 text-center text-slate-500 text-sm">
                     No upcoming payouts scheduled.
                  </div>
               )}
            </div>
         </div>
      )}
    </div>
  );
};

export default Portfolio;

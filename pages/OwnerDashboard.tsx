
import React, { useState } from 'react';
import { User, Project, Investment } from '../types';
import { CreateProjectModal } from '../components/OwnerModals';
import { 
  PlusIcon, 
  ArrowTrendingUpIcon, 
  UserGroupIcon, 
  EyeIcon, 
  ChartBarIcon, 
  BanknotesIcon,
  EllipsisHorizontalIcon,
  ClockIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface Props {
  user: User;
  myProjects: Project[];
  onAddProject: (project: Partial<Project>) => void;
}

// Mock Data for Owner Chart
const fundingData = [
  { name: 'Wk 1', value: 20000000 },
  { name: 'Wk 2', value: 45000000 },
  { name: 'Wk 3', value: 42000000 },
  { name: 'Wk 4', value: 80000000 },
  { name: 'Wk 5', value: 120000000 },
  { name: 'Wk 6', value: 150000000 },
];

const OwnerDashboard: React.FC<Props> = ({ user, myProjects, onAddProject }) => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const totalRaised = myProjects.reduce((sum, p) => sum + p.raisedAmount, 0);
  const totalTarget = myProjects.reduce((sum, p) => sum + p.targetAmount, 0);
  const totalInvestors = 452; // Mock

  return (
    <div className="animate-fade-in space-y-8 pb-12">
      <CreateProjectModal 
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={onAddProject}
        ownerName={user.companyName || user.name}
      />

      {/* Header */}
      <header className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
        <div>
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-teal-50 text-teal-700 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3">
              <CheckBadgeIcon className="w-3.5 h-3.5" /> Verified Business Account
           </div>
           <h1 className="text-3xl font-bold text-[#0A192F]">Hello, {user.companyName || user.name}</h1>
           <p className="text-slate-500 mt-2">Manage your campaigns, track funding velocity, and update your investors.</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="flex items-center gap-2 px-6 py-3.5 bg-[#0A192F] text-white font-bold rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10 active:scale-95"
        >
          <PlusIcon className="w-5 h-5" /> Start New Raise
        </button>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0A192F] p-8 rounded-3xl text-white relative overflow-hidden shadow-xl">
           <div className="absolute top-0 right-0 w-32 h-32 bg-[#00DC82]/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
           <div className="relative z-10">
              <div className="flex items-center gap-2 mb-6 opacity-80">
                 <BanknotesIcon className="w-5 h-5 text-[#00DC82]" />
                 <span className="text-xs font-bold uppercase tracking-wider">Total Capital Raised</span>
              </div>
              <h3 className="text-4xl font-bold font-mono tracking-tight text-white mb-2">
                 <span className="text-[#00DC82]">₦</span>{totalRaised.toLocaleString(undefined, {notation: 'compact'})}
              </h3>
              <div className="w-full bg-white/10 rounded-full h-1.5 mt-4">
                 <div className="bg-[#00DC82] h-1.5 rounded-full" style={{ width: `${(totalRaised/totalTarget)*100}%` }}></div>
              </div>
              <p className="text-xs text-slate-400 mt-2 flex justify-between">
                 <span>Target: ₦{totalTarget.toLocaleString(undefined, {notation: 'compact'})}</span>
                 <span>{((totalRaised/totalTarget)*100).toFixed(0)}% Funded</span>
              </p>
           </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
           <div className="flex justify-between items-start">
              <div>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Active Investors</p>
                 <h3 className="text-3xl font-bold text-[#0A192F]">{totalInvestors}</h3>
              </div>
              <div className="p-3 bg-indigo-50 rounded-xl">
                 <UserGroupIcon className="w-6 h-6 text-indigo-600" />
              </div>
           </div>
           <div className="mt-4">
              <p className="text-sm font-medium text-slate-500">
                 <span className="text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">+12 this week</span>
              </p>
           </div>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
           <div className="flex justify-between items-start">
              <div>
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Active Campaigns</p>
                 <h3 className="text-3xl font-bold text-[#0A192F]">{myProjects.length}</h3>
              </div>
              <div className="p-3 bg-teal-50 rounded-xl">
                 <ChartBarIcon className="w-6 h-6 text-teal-600" />
              </div>
           </div>
           <div className="mt-4 flex gap-2">
              <span className="px-2 py-1 bg-amber-50 text-amber-700 text-[10px] font-bold uppercase rounded-md border border-amber-100">1 Pending Review</span>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Main Content: Projects & Chart */}
         <div className="lg:col-span-2 space-y-8">
            
            {/* Chart */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-[#0A192F]">Funding Inflow</h3>
                  <select className="bg-slate-50 border-none text-xs font-bold text-slate-600 rounded-lg py-1.5 px-3">
                     <option>Last 30 Days</option>
                     <option>Last Quarter</option>
                  </select>
               </div>
               <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                     <AreaChart data={fundingData}>
                        <defs>
                           <linearGradient id="colorInflow" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#0A192F" stopOpacity={0.1}/>
                              <stop offset="95%" stopColor="#0A192F" stopOpacity={0}/>
                           </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} dy={10} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#94a3b8'}} tickFormatter={(val) => `₦${val/1000000}M`} />
                        <Tooltip 
                           contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'}}
                           itemStyle={{color: '#0A192F', fontWeight: 'bold'}}
                           formatter={(value: number) => [`₦${value.toLocaleString()}`, 'Raised']}
                        />
                        <Area type="monotone" dataKey="value" stroke="#0A192F" strokeWidth={3} fillOpacity={1} fill="url(#colorInflow)" />
                     </AreaChart>
                  </ResponsiveContainer>
               </div>
            </div>

            {/* Campaigns Table */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
               <div className="px-8 py-6 border-b border-slate-100 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-[#0A192F]">My Campaigns</h3>
                  <button className="text-xs font-bold text-teal-600 hover:text-teal-800">View All</button>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead className="bg-slate-50/50 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                        <tr>
                           <th className="px-8 py-4">Project</th>
                           <th className="px-8 py-4">Funding Status</th>
                           <th className="px-8 py-4">Raised / Target</th>
                           <th className="px-8 py-4 text-right">Actions</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-slate-50">
                        {myProjects.map((project) => (
                           <tr key={project.id} className="hover:bg-slate-50/50 transition-colors">
                              <td className="px-8 py-6">
                                 <div className="flex items-center gap-4">
                                    <img src={project.imageUrl} className="w-12 h-12 rounded-xl object-cover bg-slate-200" alt="" />
                                    <div>
                                       <p className="font-bold text-[#0A192F] text-sm">{project.title}</p>
                                       <span className={`inline-flex mt-1 items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border ${
                                          project.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                                          project.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-slate-100 text-slate-500'
                                       }`}>
                                          {project.status}
                                       </span>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-8 py-6">
                                 <div className="w-32">
                                    <div className="flex justify-between mb-1.5 text-xs font-bold text-slate-500">
                                       <span>Progress</span>
                                       <span className="text-[#0A192F]">{Math.round((project.raisedAmount/project.targetAmount)*100)}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                       <div className="h-full bg-[#00DC82]" style={{ width: `${(project.raisedAmount/project.targetAmount)*100}%` }}></div>
                                    </div>
                                 </div>
                              </td>
                              <td className="px-8 py-6">
                                 <div className="text-sm">
                                    <p className="font-bold text-[#0A192F]">₦{project.raisedAmount.toLocaleString(undefined, {notation: 'compact'})}</p>
                                    <p className="text-slate-400 text-xs">of ₦{project.targetAmount.toLocaleString(undefined, {notation: 'compact'})}</p>
                                 </div>
                              </td>
                              <td className="px-8 py-6 text-right">
                                 <button className="p-2 text-slate-400 hover:text-[#0A192F] hover:bg-slate-100 rounded-lg transition-colors">
                                    <EllipsisHorizontalIcon className="w-6 h-6" />
                                 </button>
                              </td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>

         {/* Sidebar */}
         <div className="space-y-8">
            {/* Recent Backers */}
            <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6">
               <h3 className="text-lg font-bold text-[#0A192F] mb-6">Recent Backers</h3>
               <div className="space-y-5">
                  {[1, 2, 3, 4, 5].map((i) => (
                     <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden">
                              <img src={`https://images.unsplash.com/photo-${1500000000000 + i * 200000}?auto=format&fit=crop&q=80&w=100`} alt="" className="w-full h-full object-cover" />
                           </div>
                           <div>
                              <p className="text-sm font-bold text-[#0A192F]">Investor #{2400 + i}</p>
                              <p className="text-xs text-slate-400">just invested in <span className="text-teal-600 font-medium">NeoLogistics</span></p>
                           </div>
                        </div>
                        <span className="text-xs font-bold text-[#00DC82]">+₦{(Math.random() * 500000).toLocaleString(undefined, {maximumFractionDigits: 0})}</span>
                     </div>
                  ))}
               </div>
               <button className="w-full mt-6 py-3 border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                  View Investor Ledger
               </button>
            </div>

            {/* Pending Actions */}
            <div className="bg-[#0A192F] rounded-3xl p-6 text-white relative overflow-hidden">
               <div className="absolute -right-6 -top-6 w-24 h-24 bg-amber-500 rounded-full opacity-20 blur-xl"></div>
               <h3 className="text-lg font-bold mb-4 relative z-10">Pending Tasks</h3>
               <div className="space-y-3 relative z-10">
                  <div className="flex gap-3 items-start p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/5 cursor-pointer hover:bg-white/20 transition-colors">
                     <ClockIcon className="w-5 h-5 text-amber-400 mt-0.5" />
                     <div>
                        <p className="text-sm font-bold">Submit Monthly Report</p>
                        <p className="text-xs text-slate-300 mt-0.5">GreenHorizon Farm • Due in 2 days</p>
                     </div>
                  </div>
                  <div className="flex gap-3 items-start p-3 bg-white/10 rounded-xl backdrop-blur-sm border border-white/5 cursor-pointer hover:bg-white/20 transition-colors">
                     <ArrowTrendingUpIcon className="w-5 h-5 text-[#00DC82] mt-0.5" />
                     <div>
                        <p className="text-sm font-bold">Confirm Milestone 2</p>
                        <p className="text-xs text-slate-300 mt-0.5">To unlock ₦50M from Escrow</p>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
    </div>
  );
};

export default OwnerDashboard;

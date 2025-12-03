import React from 'react';
import { User, Project } from '../types';
import { CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon, DocumentTextIcon, MagnifyingGlassIcon, ChartBarSquareIcon } from '@heroicons/react/24/outline';

interface Props {
  user: User;
  allProjects: Project[];
}

const AdminDashboard: React.FC<Props> = ({ user, allProjects }) => {
  return (
    <div className="animate-fade-in space-y-8">
      <header className="flex justify-between items-center">
        <div>
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-700 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
              Admin Access
           </div>
           <h1 className="text-3xl font-bold text-[#0A192F]">Platform Administration</h1>
        </div>
        <div className="flex gap-3">
          <div className="relative">
             <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
             <input type="text" placeholder="Search Users or Projects" className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0A192F]" />
          </div>
        </div>
      </header>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#0A192F] p-6 rounded-xl text-white shadow-lg relative overflow-hidden">
           <div className="absolute top-0 right-0 p-4 opacity-10">
              <ChartBarSquareIcon className="w-20 h-20" />
           </div>
           <p className="text-teal-400 text-xs font-bold uppercase tracking-wider mb-2">Total Volume</p>
           <h3 className="text-4xl font-bold">₦12.4 Billion</h3>
           <p className="text-slate-400 text-sm mt-2">+12% from last month</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
           <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Pending Verifications</p>
           <h3 className="text-4xl font-bold text-[#0A192F]">8</h3>
           <p className="text-amber-600 text-sm mt-2 font-medium flex items-center gap-1"><ExclamationTriangleIcon className="w-4 h-4"/> Action Required</p>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
           <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2">Total Users</p>
           <h3 className="text-4xl font-bold text-[#0A192F]">12,402</h3>
           <p className="text-[#00DC82] text-sm mt-2 font-medium">+120 this week</p>
        </div>
      </div>

      {/* Vetting Queue */}
      <div className="bg-white rounded-xl border border-slate-100 shadow-sm">
         <div className="px-6 py-5 border-b border-slate-100">
           <h3 className="text-lg font-bold text-[#0A192F] flex items-center gap-2">
             <DocumentTextIcon className="text-slate-400 w-5 h-5" /> Vetting Queue (Pending Approval)
           </h3>
         </div>
         <div className="p-6 space-y-4">
            {allProjects.slice(0, 2).map((project, i) => (
              <div key={project.id} className="flex flex-col md:flex-row gap-6 p-6 border border-slate-100 rounded-xl bg-slate-50">
                <div className="w-full md:w-48 h-32 bg-slate-200 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={project.imageUrl} className="w-full h-full object-cover" alt="thumb" />
                </div>
                <div className="flex-grow">
                   <div className="flex justify-between items-start mb-2">
                      <div>
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">{project.sector}</span>
                        <h4 className="text-xl font-bold text-[#0A192F]">{project.title}</h4>
                      </div>
                      <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-full">Review Pending</span>
                   </div>
                   <p className="text-slate-600 text-sm mb-4 line-clamp-2">{project.description}</p>
                   
                   <div className="flex gap-4">
                      <button className="flex items-center gap-2 px-4 py-2 bg-[#0A192F] text-white text-sm font-bold rounded-lg hover:bg-slate-800">
                         View Documents
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-teal-700 text-sm font-bold rounded-lg hover:bg-teal-50">
                         <CheckCircleIcon className="w-4 h-4" /> Approve
                      </button>
                      <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-red-600 text-sm font-bold rounded-lg hover:bg-red-50">
                         <XCircleIcon className="w-4 h-4" /> Reject
                      </button>
                   </div>
                </div>
              </div>
            ))}
         </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
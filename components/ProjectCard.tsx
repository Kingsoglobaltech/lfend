
import React, { useEffect, useState } from 'react';
import { Project } from '../types';
import { ArrowTrendingUpIcon, ClockIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

interface Props {
  project: Project;
  onViewDetails: (project: Project) => void;
}

const ProjectCard: React.FC<Props> = ({ project, onViewDetails }) => {
  const [animatedWidth, setAnimatedWidth] = useState(0);
  const percentRaised = Math.min(100, Math.round((project.raisedAmount / project.targetAmount) * 100));

  useEffect(() => {
    // Small delay to ensure the transition triggers after mount
    const timer = setTimeout(() => {
      setAnimatedWidth(percentRaised);
    }, 100);
    return () => clearTimeout(timer);
  }, [percentRaised]);
  
  return (
    <div 
      onClick={() => onViewDetails(project)}
      className="group bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full cursor-pointer"
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 to-transparent opacity-60"></div>
        
        <div className="absolute top-4 left-4">
           <span className="bg-white/90 backdrop-blur px-2.5 py-1 rounded-md text-[10px] font-bold text-[#0A192F] uppercase tracking-wide border border-white/20">
             {project.sector}
           </span>
        </div>
        
        <div className="absolute bottom-4 left-4 right-4 text-white">
           <h3 className="text-lg font-bold leading-snug drop-shadow-sm">{project.title}</h3>
           <p className="text-xs text-slate-200 mt-1 opacity-90">{project.owner}</p>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <p className="text-xs text-slate-500 leading-relaxed mb-6 line-clamp-2">
           {project.description}
        </p>
        
        <div className="mt-auto space-y-5">
          {/* Progress Bar */}
          <div className="group/progress relative">
             {/* Tooltip: Exact Amounts */}
             <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-max bg-[#0A192F] text-white text-[10px] py-2.5 px-3.5 rounded-lg opacity-0 group-hover/progress:opacity-100 transition-opacity duration-200 pointer-events-none z-20 shadow-xl border border-white/10 flex flex-col gap-1.5 min-w-[120px]">
                <div className="flex justify-between gap-4 border-b border-white/10 pb-1.5 mb-0.5">
                  <span className="text-slate-400 font-medium">Target</span>
                  <span className="font-bold font-mono tracking-tight">₦{project.targetAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-slate-400 font-medium">Raised</span>
                  <span className="font-bold text-[#00DC82] font-mono tracking-tight">₦{project.raisedAmount.toLocaleString()}</span>
                </div>
                {/* Tooltip Arrow */}
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#0A192F] rotate-45 border-r border-b border-white/10"></div>
             </div>
             
            <div className="flex justify-between items-end mb-1.5">
               <div className="flex flex-col">
                 <span className="text-[10px] text-slate-400 font-bold uppercase">Raised</span>
                 <span className="text-sm font-bold text-[#0A192F] animate-pulse">₦{(project.raisedAmount / 1000000).toFixed(1)}M</span>
               </div>
               <span className="text-xs font-bold text-[#00DC82] bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                 {percentRaised}%
               </span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden shadow-inner">
              <div 
                className="h-full rounded-full bg-gradient-to-r from-teal-500 to-violet-600 shadow-[0_0_8px_rgba(99,102,241,0.5)] transition-all duration-1000 ease-out relative overflow-hidden" 
                style={{ width: `${animatedWidth}%` }}
              >
                <div className="absolute inset-0 bg-white/20"></div>
                {/* Shimmer Effect */}
                <div className="absolute top-0 bottom-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:translate-x-[250%] transition-transform duration-[1.5s] ease-in-out"></div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-50">
            <div className="flex items-center gap-2">
               <div className="p-1.5 bg-emerald-50 rounded-lg">
                 <ArrowTrendingUpIcon className="w-3.5 h-3.5 text-[#00DC82]" />
               </div>
               <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Target ROI</p>
                  <p className="text-xs font-bold text-[#0A192F]">{project.roi}% <span className="text-slate-400 font-normal">/ yr</span></p>
               </div>
            </div>
            <div className="flex items-center gap-2">
               <div className="p-1.5 bg-blue-50 rounded-lg">
                 <ClockIcon className="w-3.5 h-3.5 text-blue-500" />
               </div>
               <div>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Duration</p>
                  <p className="text-xs font-bold text-[#0A192F]">{project.durationMonths} Mo</p>
               </div>
            </div>
          </div>

          <button 
            type="button"
            className="w-full py-2.5 bg-[#0A192F] text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group-hover:shadow-lg pointer-events-none"
          >
            View Details <ArrowRightIcon className="w-3 h-3 text-[#00DC82]" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

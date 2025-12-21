import React, { useState } from 'react';
import { Project, Sector } from '../types';
import ProjectCard from '../components/ProjectCard';
import { MagnifyingGlassIcon, FunnelIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';

interface Props {
  projects: Project[];
  onViewDetails: (project: Project) => void;
}

const Projects: React.FC<Props> = ({ projects, onViewDetails }) => {
  const [filterSector, setFilterSector] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProjects = projects.filter(p => {
    const matchesSector = filterSector === 'All' || p.sector === filterSector;
    const matchesSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          p.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSector && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto pb-12 font-inter">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-100">
        <div>
          <h1 className="text-3xl font-bold text-[#0A192F] tracking-tight">Marketplace</h1>
          <p className="text-slate-500 mt-2 text-sm max-w-xl">
            Discover verified opportunities across high-growth sectors. Backed by real assets and AI-driven risk assessment.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
            <MagnifyingGlassIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search opportunity..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0A192F] w-full md:w-64 transition-all shadow-sm"
            />
          </div>
          
          <div className="relative">
             <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <FunnelIcon className="h-4 w-4 text-slate-400" />
             </div>
             <select 
              value={filterSector}
              onChange={(e) => setFilterSector(e.target.value)}
              className="pl-4 pr-10 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0A192F] appearance-none cursor-pointer font-medium text-slate-700 shadow-sm"
            >
              <option value="All">All Sectors</option>
              {Object.values(Sector).map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
        {filteredProjects.map(project => (
          <div key={project.id} className="h-full">
            <ProjectCard project={project} onViewDetails={onViewDetails} />
          </div>
        ))}
        
        {filteredProjects.length === 0 && (
          <div className="col-span-full py-24 text-center">
            <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
               <AdjustmentsHorizontalIcon className="h-8 w-8 text-slate-300" />
            </div>
            <h3 className="text-[#0A192F] font-bold">No matches found</h3>
            <p className="text-slate-500 text-sm mt-1">Try adjusting your filters or search term.</p>
            <button 
              onClick={() => {setSearchTerm(''); setFilterSector('All');}}
              className="mt-6 text-[#00DC82] font-bold text-sm hover:underline"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
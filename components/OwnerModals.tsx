
import React, { useState } from 'react';
import { 
  XMarkIcon, 
  PhotoIcon, 
  CurrencyDollarIcon, 
  BriefcaseIcon, 
  ArrowRightIcon, 
  CheckCircleIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';
import { Project, Sector } from '../types';

interface CreateProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (project: Partial<Project>) => void;
  ownerName: string;
}

export const CreateProjectModal: React.FC<CreateProps> = ({ isOpen, onClose, onSubmit, ownerName }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    sector: Sector.Tech,
    targetAmount: '',
    minInvestment: '',
    roi: '',
    durationMonths: '',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800', // Default placeholder
    fullDetails: ''
  });

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const newProject: Partial<Project> = {
      title: formData.title,
      description: formData.description,
      fullDetails: formData.fullDetails || formData.description,
      sector: formData.sector,
      owner: ownerName,
      targetAmount: parseFloat(formData.targetAmount),
      raisedAmount: 0,
      minInvestment: parseFloat(formData.minInvestment),
      roi: parseFloat(formData.roi),
      durationMonths: parseInt(formData.durationMonths),
      imageUrl: formData.imageUrl,
      riskLevel: 'Medium', // Default for review
      status: 'pending'
    };
    onSubmit(newProject);
    onClose();
    setStep(1); // Reset
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[#0A192F]/80 backdrop-blur-md transition-opacity" onClick={onClose}></div>
      
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-fade-in-up flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-slate-50">
          <div>
            <h3 className="text-xl font-bold text-[#0A192F]">Create New Proposal</h3>
            <p className="text-xs text-slate-500 mt-1">Step {step} of 3</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <XMarkIcon className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 overflow-y-auto custom-scrollbar flex-1">
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              <h4 className="text-lg font-bold text-[#0A192F] mb-4 flex items-center gap-2">
                 <BriefcaseIcon className="w-5 h-5 text-[#00DC82]" /> Project Basics
              </h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Project Title</label>
                  <input name="title" value={formData.title} onChange={handleChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0A192F] outline-none text-sm font-medium" placeholder="e.g. Solar Plant Expansion" />
                </div>
                
                <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Sector</label>
                   <select name="sector" value={formData.sector} onChange={handleChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0A192F] outline-none text-sm font-medium">
                      {Object.values(Sector).map(s => <option key={s} value={s}>{s}</option>)}
                   </select>
                </div>

                <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Cover Image URL</label>
                   <div className="relative">
                      <PhotoIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"/>
                      <input name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="w-full pl-9 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0A192F] outline-none text-sm font-medium" placeholder="https://..." />
                   </div>
                </div>

                <div className="md:col-span-2">
                   <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Short Description</label>
                   <textarea name="description" value={formData.description} onChange={handleChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0A192F] outline-none text-sm font-medium h-24 resize-none" placeholder="Brief overview for the card..." />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
             <div className="space-y-6 animate-fade-in">
               <h4 className="text-lg font-bold text-[#0A192F] mb-4 flex items-center gap-2">
                  <CurrencyDollarIcon className="w-5 h-5 text-[#00DC82]" /> Financials & Goals
               </h4>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Funding Target (₦)</label>
                   <input type="number" name="targetAmount" value={formData.targetAmount} onChange={handleChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0A192F] outline-none text-sm font-bold font-mono" placeholder="50000000" />
                 </div>
                 
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Min. Investment (₦)</label>
                    <input type="number" name="minInvestment" value={formData.minInvestment} onChange={handleChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0A192F] outline-none text-sm font-bold font-mono" placeholder="50000" />
                 </div>
 
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Projected ROI (%)</label>
                    <input type="number" name="roi" value={formData.roi} onChange={handleChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0A192F] outline-none text-sm font-bold" placeholder="15" />
                 </div>

                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Duration (Months)</label>
                    <input type="number" name="durationMonths" value={formData.durationMonths} onChange={handleChange} className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0A192F] outline-none text-sm font-bold" placeholder="12" />
                 </div>
               </div>
             </div>
          )}

          {step === 3 && (
             <div className="space-y-6 animate-fade-in">
               <h4 className="text-lg font-bold text-[#0A192F] mb-4 flex items-center gap-2">
                  <DocumentTextIcon className="w-5 h-5 text-[#00DC82]" /> Detailed Proposal
               </h4>
               
               <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Investment Thesis</label>
                  <p className="text-xs text-slate-400 mb-2">This text will be analyzed by our AI Risk Engine.</p>
                  <textarea name="fullDetails" value={formData.fullDetails} onChange={handleChange} className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0A192F] outline-none text-sm font-medium h-64 resize-none leading-relaxed" placeholder="Describe your business model, risks, mitigation strategies, and use of funds in detail..." />
               </div>

               <div className="bg-amber-50 p-4 rounded-xl border border-amber-100 flex gap-3">
                  <div className="p-1 bg-amber-100 rounded text-amber-600 h-fit"><DocumentTextIcon className="w-4 h-4" /></div>
                  <div>
                     <p className="text-sm font-bold text-amber-800">Admin Review Required</p>
                     <p className="text-xs text-amber-700 mt-1">Your project will be marked as "Pending" until our team verifies your documents. Please upload supporting docs in the dashboard after creation.</p>
                  </div>
               </div>
             </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end gap-3">
           {step > 1 && (
             <button onClick={() => setStep(step - 1)} className="px-6 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-200 transition-colors">Back</button>
           )}
           {step < 3 ? (
              <button onClick={() => setStep(step + 1)} className="px-6 py-3 bg-[#0A192F] text-white font-bold rounded-xl text-sm hover:bg-slate-800 transition-colors flex items-center gap-2">Next <ArrowRightIcon className="w-4 h-4"/></button>
           ) : (
              <button onClick={handleSubmit} className="px-8 py-3 bg-[#00DC82] text-[#0A192F] font-bold rounded-xl text-sm hover:bg-[#00c474] transition-colors flex items-center gap-2 shadow-lg shadow-green-500/20">
                <CheckCircleIcon className="w-5 h-5" /> Submit Proposal
              </button>
           )}
        </div>
      </div>
    </div>
  );
};

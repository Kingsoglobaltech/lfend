import React, { useState } from 'react';
import { analyzeProjectRisk } from '../services/geminiService';
import { Project, AIAnalysisResult } from '../types';
import { LightBulbIcon, ExclamationTriangleIcon, CheckCircleIcon, ArrowPathIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface Props {
  project: Project;
}

const RiskAnalyzer: React.FC<Props> = ({ project }) => {
  const [analysis, setAnalysis] = useState<AIAnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);
    setError(false);
    try {
      const result = await analyzeProjectRisk(project.fullDetails);
      setAnalysis(result);
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score <= 3) return 'text-[#00DC82] border-[#00DC82]/20 bg-[#00DC82]/5';
    if (score <= 6) return 'text-amber-500 border-amber-500/20 bg-amber-500/5';
    return 'text-red-500 border-red-500/20 bg-red-500/5';
  };

  return (
    <div className="mt-8 p-8 bg-white rounded-2xl shadow-sm border border-slate-100 relative overflow-hidden group hover:shadow-md transition-all">
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-50 to-transparent rounded-full -mr-20 -mt-20 opacity-50"></div>
      
      <div className="flex items-center justify-between mb-8 relative z-10">
        <div>
           <h3 className="text-lg font-bold text-[#0A192F] flex items-center gap-2">
             <SparklesIcon className="w-5 h-5 text-[#00DC82]" />
             AI Risk Analysis
           </h3>
           <p className="text-sm text-slate-500 mt-1">Powered by Gemini 2.5 Flash</p>
        </div>
        {!analysis && !loading && (
          <button
            onClick={handleAnalyze}
            className="px-5 py-2.5 bg-[#0A192F] text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10 flex items-center gap-2"
          >
            Generate Report
          </button>
        )}
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-12">
          <ArrowPathIcon className="w-8 h-8 text-[#00DC82] animate-spin mb-4" />
          <p className="text-sm text-slate-500 font-medium animate-pulse">Analyzing financial documents...</p>
        </div>
      )}

      {analysis && (
        <div className="animate-fade-in relative z-10">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Score Card */}
            <div className={`flex-shrink-0 flex flex-col items-center justify-center p-6 rounded-2xl border ${getScoreColor(analysis.riskScore)} w-full md:w-32`}>
              <span className="text-4xl font-bold">{analysis.riskScore}</span>
              <span className="text-[10px] uppercase font-bold tracking-wider mt-1 opacity-80">Risk Score</span>
            </div>

            {/* Details */}
            <div className="flex-grow space-y-6 w-full">
              <p className="text-slate-600 text-sm leading-relaxed border-l-2 border-[#00DC82] pl-4 italic">
                "{analysis.summary}"
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <CheckCircleIcon className="w-4 h-4 text-[#00DC82]" /> Strengths
                  </h4>
                  <ul className="space-y-2">
                    {analysis.pros.map((pro, idx) => (
                      <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 bg-slate-300 rounded-full flex-shrink-0"></span>
                        {pro}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <ExclamationTriangleIcon className="w-4 h-4 text-amber-500" /> Risks
                  </h4>
                  <ul className="space-y-2">
                    {analysis.cons.map((con, idx) => (
                      <li key={idx} className="text-sm text-slate-700 flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 bg-slate-300 rounded-full flex-shrink-0"></span>
                        {con}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {error && (
        <p className="text-red-500 text-sm mt-4 text-center font-medium bg-red-50 py-3 rounded-lg border border-red-100">Analysis failed. Please try again later.</p>
      )}
    </div>
  );
};

export default RiskAnalyzer;
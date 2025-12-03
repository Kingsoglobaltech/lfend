import React, { useState } from 'react';
import { User } from '../types';
import { EnvelopeIcon, LockClosedIcon, UserIcon, ArrowRightIcon, ArrowPathIcon, BriefcaseIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

interface Props {
  onLogin: (user: User) => void;
}

const Auth: React.FC<Props> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<'Investor' | 'ProjectOwner'>('Investor');
  const [isLoading, setIsLoading] = useState(false);
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [companyName, setCompanyName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      const isAdmin = email.toLowerCase().includes('admin');
      const mockUser: User = {
        id: 'u_' + Math.random().toString(36).substr(2, 9),
        name: isLogin ? (isAdmin ? 'Admin User' : (role === 'ProjectOwner' ? 'Business Owner' : 'Kingsley David')) : name,
        role: isAdmin ? 'Admin' : role,
        walletBalance: 15400000, 
        companyName: role === 'ProjectOwner' ? (companyName || 'My Startup Inc.') : undefined
      };
      onLogin(mockUser);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex font-inter">
      {/* Visual Side */}
      <div className="hidden lg:flex w-1/2 bg-[#0A192F] relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-b from-teal-900/40 to-transparent rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10 text-center max-w-md">
           <div className="inline-flex items-center gap-2 mb-8">
              <span className="text-4xl font-bold text-white tracking-tight">loopital</span>
              <span className="w-3 h-3 bg-[#00DC82] rounded-full mt-2"></span>
           </div>
           <h2 className="text-3xl font-bold text-white mb-6">
             {role === 'ProjectOwner' ? 'Power your ambition.' : 'Smart investing starts here.'}
           </h2>
           <p className="text-slate-400 text-lg leading-relaxed">
             Join the fastest growing alternative investment platform in Africa. Secure, transparent, and AI-powered.
           </p>
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full lg:w-1/2 bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold text-[#0A192F]">{isLogin ? 'Welcome back' : 'Create an account'}</h2>
            <p className="text-slate-500 text-sm mt-2">Please enter your details to continue.</p>
          </div>

          {!isLogin && (
            <div className="flex p-1 bg-slate-100 rounded-lg">
              <button 
                type="button"
                onClick={() => setRole('Investor')}
                className={`flex-1 py-2 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-2 ${role === 'Investor' ? 'bg-white text-[#0A192F] shadow-sm' : 'text-slate-500'}`}
              >
                <UserIcon className="w-3.5 h-3.5" /> Investor
              </button>
              <button 
                type="button"
                onClick={() => setRole('ProjectOwner')}
                className={`flex-1 py-2 text-xs font-bold rounded-md transition-all flex items-center justify-center gap-2 ${role === 'ProjectOwner' ? 'bg-white text-[#0A192F] shadow-sm' : 'text-slate-500'}`}
              >
                <BriefcaseIcon className="w-3.5 h-3.5" /> Business
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <>
                <div>
                  <label className="block text-xs font-bold text-[#0A192F] mb-1.5">Full Name</label>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="block w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0A192F] focus:border-transparent transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                </div>
                {role === 'ProjectOwner' && (
                  <div>
                    <label className="block text-xs font-bold text-[#0A192F] mb-1.5">Company Name</label>
                    <div className="relative">
                      <BuildingOfficeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                      <input
                        type="text"
                        required
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                        className="block w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0A192F] focus:border-transparent transition-all"
                        placeholder="Tech Solutions Ltd."
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            <div>
              <label className="block text-xs font-bold text-[#0A192F] mb-1.5">Email</label>
              <div className="relative">
                <EnvelopeIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0A192F] focus:border-transparent transition-all"
                  placeholder="name@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0A192F] mb-1.5">Password</label>
              <div className="relative">
                <LockClosedIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0A192F] focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-slate-900/10 text-sm font-bold text-white bg-[#0A192F] hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0A192F] transition-all disabled:opacity-70"
            >
              {isLoading ? (
                <ArrowPathIcon className="animate-spin h-5 w-5" />
              ) : (
                <span className="flex items-center gap-2">
                  {isLogin ? 'Sign In' : 'Create Account'} <ArrowRightIcon className="h-4 w-4" />
                </span>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-slate-500">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button onClick={() => setIsLogin(!isLogin)} className="text-[#00DC82] font-bold hover:underline">
              {isLogin ? 'Sign up' : 'Log in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
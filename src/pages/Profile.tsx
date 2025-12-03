import React, { useState } from 'react';
import { User } from '../types';
import { ShieldCheckIcon, UserIcon, LockClosedIcon, CreditCardIcon, BellIcon, ChevronRightIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface Props {
  user: User;
}

const Profile: React.FC<Props> = ({ user }) => {
  const [activeTab, setActiveTab] = useState('account');

  return (
    <div className="animate-fade-in max-w-5xl mx-auto space-y-8 pb-20 font-inter">
      <header className="border-b border-slate-100 pb-6">
        <h1 className="text-2xl font-bold text-[#0A192F]">Settings</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your personal information and security preferences.</p>
      </header>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Sidebar Menu */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-1">
          {[
            { id: 'account', label: 'My Profile', icon: UserIcon },
            { id: 'kyc', label: 'Verification', icon: ShieldCheckIcon },
            { id: 'security', label: 'Security', icon: LockClosedIcon },
            { id: 'billing', label: 'Billing', icon: CreditCardIcon },
            { id: 'notifications', label: 'Notifications', icon: BellIcon },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-white text-[#0A192F] shadow-sm border border-slate-100 font-bold'
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <tab.icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-[#00DC82]' : 'text-slate-400'}`} />
                {tab.label}
              </div>
              {activeTab === tab.id && <ChevronRightIcon className="w-3 h-3 text-slate-300" />}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 animate-fade-in">
          {activeTab === 'account' && (
              <>
              <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-50">
                <div className="w-20 h-20 rounded-full bg-[#0A192F] text-white flex items-center justify-center text-3xl font-bold">
                  {user.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#0A192F]">{user.name}</h3>
                  <p className="text-slate-500 text-sm">{user.role}</p>
                  <button className="text-xs text-[#00DC82] font-bold mt-2 hover:underline">Change Picture</button>
                </div>
              </div>
              <div className="space-y-6 max-w-lg">
                <div className="grid grid-cols-2 gap-4">
                   <div>
                     <label className="block text-xs font-bold text-[#0A192F] mb-2">First Name</label>
                     <input type="text" defaultValue={user.name.split(' ')[0]} className="w-full p-2.5 bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0A192F] text-sm" />
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-[#0A192F] mb-2">Last Name</label>
                     <input type="text" defaultValue={user.name.split(' ')[1] || ''} className="w-full p-2.5 bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0A192F] text-sm" />
                   </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0A192F] mb-2">Email Address</label>
                  <input type="email" defaultValue="user@example.com" className="w-full p-2.5 bg-white rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0A192F] text-sm" />
                </div>
                <div className="pt-4">
                  <button className="px-6 py-2.5 bg-[#0A192F] text-white font-bold rounded-xl hover:bg-slate-800 transition-colors text-sm shadow-lg shadow-slate-900/10">
                    Save Changes
                  </button>
                </div>
              </div>
              </>
          )}

          {activeTab === 'kyc' && (
             <>
              <h3 className="text-lg font-bold text-[#0A192F] mb-6">Identity Verification</h3>
              
              <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-5 flex items-start gap-4 mb-8">
                <CheckCircleIcon className="w-6 h-6 text-emerald-500 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-emerald-900 text-sm">Account Verified</h4>
                  <p className="text-xs text-emerald-700 mt-1 leading-relaxed">Your identity has been verified. You can now invest up to ₦50,000,000 without limits.</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                      <ShieldCheckIcon className="w-5 h-5 text-slate-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0A192F] text-sm">BVN Verification</h4>
                      <p className="text-xs text-slate-500">Bank Verification Number</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-md text-[10px] font-bold uppercase tracking-wide">Verified</span>
                </div>

                <div className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center">
                      <CreditCardIcon className="w-5 h-5 text-slate-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-[#0A192F] text-sm">NIN Verification</h4>
                      <p className="text-xs text-slate-500">National Identity Number</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-md text-[10px] font-bold uppercase tracking-wide">Verified</span>
                </div>
              </div>
             </>
          )}
          
          {activeTab === 'security' && (
             <>
                <h3 className="text-lg font-bold text-[#0A192F] mb-6">Security Settings</h3>
                <div className="flex items-center justify-between p-5 border border-slate-100 rounded-xl mb-6">
                   <div>
                      <h4 className="font-bold text-[#0A192F] text-sm">Two-Factor Authentication</h4>
                      <p className="text-xs text-slate-500 mt-1">Secure your account with 2FA via SMS or Authenticator App.</p>
                   </div>
                   <div className="relative inline-block w-11 h-6 transition duration-200 ease-in-out">
                       <div className="w-11 h-6 bg-slate-200 rounded-full shadow-inner"></div>
                       <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform translate-x-0"></div>
                   </div>
                </div>
                <div className="p-5 border border-red-100 bg-red-50/50 rounded-xl">
                   <h4 className="font-bold text-red-700 flex items-center gap-2 text-sm"><ExclamationTriangleIcon className="w-4 h-4"/> Danger Zone</h4>
                   <p className="text-xs text-red-600 mt-1 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                   <button className="text-xs font-bold text-white bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 shadow-sm">Delete Account</button>
                </div>
             </>
          )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
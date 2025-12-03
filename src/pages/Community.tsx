
import React from 'react';
import { UserGroupIcon, ChatBubbleLeftRightIcon, PlusIcon, HandThumbUpIcon } from '@heroicons/react/24/outline';

const Community: React.FC = () => {
  const groups = [
    { 
      id: 1, 
      name: 'AgriTech Investors', 
      members: 1240, 
      topic: 'Sustainable Farming', 
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=400' 
    },
    { 
      id: 2, 
      name: 'Green Energy Pool', 
      members: 890, 
      topic: 'Solar & Wind', 
      image: 'https://images.unsplash.com/photo-1466611653911-95081537e5b7?auto=format&fit=crop&q=80&w=400' 
    },
    { 
      id: 3, 
      name: 'Urban Real Estate', 
      members: 2100, 
      topic: 'Commercial Property', 
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=400' 
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-[#0A192F]">Investor Communities</h1>
          <p className="text-slate-500 mt-1">Connect, collaborate, and co-invest with like-minded individuals.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-[#0A192F] text-white rounded-full hover:bg-slate-800 transition-colors shadow-lg font-bold text-sm">
          <PlusIcon className="w-5 h-5" />
          <span>Create Group</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {groups.map(group => (
          <div key={group.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 group">
            <div className="flex items-center gap-4 mb-5">
              <div className="relative">
                <img src={group.image} alt={group.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-white shadow-sm" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-[#00DC82] border-2 border-white rounded-full"></div>
              </div>
              <div>
                <h3 className="font-bold text-[#0A192F] text-lg group-hover:text-teal-700 transition-colors">{group.name}</h3>
                <p className="text-xs font-bold text-teal-600 bg-teal-50 inline-block px-2 py-0.5 rounded mt-1">{group.topic}</p>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-slate-500 mb-6">
              <span className="flex items-center gap-1.5 font-medium"><UserGroupIcon className="w-4 h-4 text-slate-400" /> {group.members} members</span>
              <span className="flex items-center gap-1.5 font-medium"><ChatBubbleLeftRightIcon className="w-4 h-4 text-[#00DC82]" /> Active now</span>
            </div>
            <button className="w-full py-2.5 border border-slate-200 text-slate-700 rounded-xl hover:border-teal-600 hover:text-teal-700 hover:bg-teal-50 font-bold text-sm transition-all">
              Join Group
            </button>
          </div>
        ))}
      </div>

      <div className="bg-[#0A192F] text-white rounded-2xl p-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
        
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">Pool Funds. Amplify Impact.</h2>
          <p className="text-slate-300 max-w-lg leading-relaxed">
            Loopital Communities allow you to create "Co-Sponsor" wallets. Combine resources with trusted peers to meet minimum capital requirements for premium projects.
          </p>
        </div>
        <div className="flex -space-x-4 relative z-10">
          {[1,2,3,4].map(i => (
            <div key={i} className="w-12 h-12 rounded-full border-4 border-[#0A192F] bg-slate-700 flex items-center justify-center overflow-hidden shadow-md">
               <img src={`https://images.unsplash.com/photo-${1500000000000 + i * 10000}?auto=format&fit=crop&q=80&w=100`} className="w-full h-full object-cover" alt="Member" />
            </div>
          ))}
          <div className="w-12 h-12 rounded-full border-4 border-[#0A192F] bg-[#00DC82] flex items-center justify-center text-xs font-bold text-[#0A192F] shadow-md">
            +99
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-100 p-8 shadow-sm">
        <h3 className="font-bold text-xl text-[#0A192F] mb-6">Trending Discussions</h3>
        <div className="space-y-6">
          <div className="flex gap-4 p-5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
            <div className="flex-shrink-0">
               <img src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&q=80&w=100" className="w-10 h-10 rounded-full border border-slate-200 shadow-sm" alt="User" />
            </div>
            <div className="flex-grow">
              <h4 className="font-bold text-[#0A192F] text-sm">Has anyone analyzed the risk for NeoLogistics?</h4>
              <p className="text-slate-600 text-sm mt-1 mb-3">
                I'm considering a large position but worried about the battery supply chain issues mentioned in the news...
              </p>
              <div className="flex gap-4">
                <button className="text-xs font-medium text-slate-500 flex items-center gap-1.5 hover:text-teal-600 transition-colors"><HandThumbUpIcon className="w-3.5 h-3.5"/> 14 Likes</button>
                <button className="text-xs font-medium text-slate-500 flex items-center gap-1.5 hover:text-teal-600 transition-colors"><ChatBubbleLeftRightIcon className="w-3.5 h-3.5"/> 5 Replies</button>
              </div>
            </div>
          </div>
          
           <div className="flex gap-4 p-5 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors">
            <div className="flex-shrink-0">
               <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=100" className="w-10 h-10 rounded-full border border-slate-200 shadow-sm" alt="User" />
            </div>
            <div className="flex-grow">
              <h4 className="font-bold text-[#0A192F] text-sm">AgriTech returns looking solid this quarter</h4>
              <p className="text-slate-600 text-sm mt-1 mb-3">
                Just received my payout from the Vertical Farm project. 18% annualized is impressive given current inflation...
              </p>
              <div className="flex gap-4">
                <button className="text-xs font-medium text-slate-500 flex items-center gap-1.5 hover:text-teal-600 transition-colors"><HandThumbUpIcon className="w-3.5 h-3.5"/> 22 Likes</button>
                <button className="text-xs font-medium text-slate-500 flex items-center gap-1.5 hover:text-teal-600 transition-colors"><ChatBubbleLeftRightIcon className="w-3.5 h-3.5"/> 8 Replies</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;

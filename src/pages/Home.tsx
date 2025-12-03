
import React from 'react';
import { 
  ArrowRightIcon, 
  ShieldCheckIcon, 
  LockClosedIcon, 
  BriefcaseIcon, 
  BoltIcon,
  ArrowTrendingUpIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

interface Props {
  onGetStarted: (role?: 'Investor' | 'ProjectOwner') => void;
}

const Home: React.FC<Props> = ({ onGetStarted }) => {
  return (
    <div className="bg-slate-50 font-inter">
      {/* Hero */}
      <div className="bg-[#0A192F] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-teal-900/30 to-transparent rounded-full blur-3xl -mr-40 -mt-40 pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-40 relative z-10">
           <div className="text-center max-w-3xl mx-auto">
             <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-teal-500/30 bg-teal-500/10 text-[#00DC82] text-xs font-bold uppercase tracking-wide mb-8">
                <span className="w-2 h-2 rounded-full bg-[#00DC82] animate-pulse"></span>
                Web3 Powered · Bank Grade Security
             </div>
             <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-tight">
                The Future of <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00DC82] to-teal-400">Alternative Investing</span>
             </h1>
             <p className="text-xl text-slate-300 mb-10 leading-relaxed font-light">
                Access vetted, high-yield opportunities in Real Estate, Agriculture, and Tech. 
                Start building your wealth with as little as ₦50,000.
             </p>
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => onGetStarted('Investor')}
                  className="px-8 py-4 bg-[#00DC82] text-[#0A192F] font-bold rounded-full text-base transition-all hover:bg-[#00c474] hover:scale-105 hover:shadow-[0_0_20px_rgba(0,220,130,0.4)] flex items-center justify-center gap-2"
                >
                  Start Investing <ArrowRightIcon className="w-5 h-5" />
                </button>
                <button 
                  onClick={() => onGetStarted('ProjectOwner')}
                  className="px-8 py-4 bg-white/5 backdrop-blur text-white font-bold rounded-full text-base border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <BriefcaseIcon className="w-5 h-5 text-slate-300" /> Raise Capital
                </button>
             </div>
           </div>
        </div>
        
        {/* Curve Separator */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-slate-50 rounded-t-[50%] scale-110"></div>
      </div>

      {/* Trust Strip */}
      <div className="bg-slate-50 py-12 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 text-center">
           <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">Trusted by visionaries at</p>
           <div className="flex flex-wrap justify-center gap-12 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
              {['Techstars', 'Flutterwave', 'Paystack', 'Seedstars', 'Ventures'].map((p) => (
                 <span key={p} className="text-xl font-bold text-[#0A192F]">{p}</span>
              ))}
           </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#0A192F] mb-4">Why invest with Loopital?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">We combine rigorous traditional vetting with AI-powered risk analysis to bring you the safest opportunities.</p>
         </div>

         <div className="grid md:grid-cols-3 gap-8">
            {[
               { icon: ShieldCheckIcon, title: "Rigorous Vetting", desc: "Only 3% of projects make it to our marketplace after our 5-step due diligence process." },
               { icon: BoltIcon, title: "AI Risk Analysis", desc: "Powered by Gemini 2.5, get instant, unbiased risk scores on every project proposal." },
               { icon: LockClosedIcon, title: "Secure Escrow", desc: "Funds are held by licensed custodians and released only when milestones are verified." }
            ].map((f, i) => (
               <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="w-14 h-14 bg-slate-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#0A192F] transition-colors">
                     <f.icon className="w-7 h-7 text-[#0A192F] group-hover:text-[#00DC82] transition-colors" />
                  </div>
                  <h3 className="text-xl font-bold text-[#0A192F] mb-3">{f.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-sm">{f.desc}</p>
               </div>
            ))}
         </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-[#f8fafc] py-24 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#0A192F] mb-4">What our community says</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Join thousands of verified investors and business owners building wealth together.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Loopital's AI risk scoring gave me the confidence to invest in my first AgriTech project. The returns have been consistent and transparent.",
                author: "Sarah Johnson",
                role: "Early Investor",
                img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
              },
              {
                quote: "As a project owner, raising capital for our logistics fleet was seamless. The vetting process was tough but fair, and the investor community is incredibly supportive.",
                author: "David Okonjo",
                role: "CEO, SwiftLogistics",
                img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150"
              },
              {
                quote: "The secondary market feature is a game-changer. I needed liquidity for a personal emergency and could trade my stake instantly. Highly recommended.",
                author: "Michael Tan",
                role: "Portfolio Manager",
                img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=150"
              }
            ].map((t, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 relative hover:shadow-xl transition-all duration-300 flex flex-col">
                <div className="absolute -top-5 left-8 bg-[#0A192F] text-[#00DC82] p-2.5 rounded-xl shadow-lg transform -rotate-3">
                   <ChatBubbleBottomCenterTextIcon className="w-6 h-6" />
                </div>
                <p className="text-slate-600 leading-relaxed italic mb-8 mt-4 flex-grow">"{t.quote}"</p>
                <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                  <img src={t.img} alt={t.author} className="w-12 h-12 rounded-full border-2 border-white shadow-sm object-cover" />
                  <div>
                    <p className="font-bold text-[#0A192F] text-sm">{t.author}</p>
                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">{t.role}</p>
                  </div>
                  <div className="ml-auto flex text-amber-400">
                    <StarIconSolid className="w-3.5 h-3.5" />
                    <StarIconSolid className="w-3.5 h-3.5" />
                    <StarIconSolid className="w-3.5 h-3.5" />
                    <StarIconSolid className="w-3.5 h-3.5" />
                    <StarIconSolid className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social Proof */}
      <div className="bg-white py-24 border-y border-slate-100">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16 items-center">
               <div>
                  <h2 className="text-3xl font-bold text-[#0A192F] mb-6">Built for transparency. <br/> Loved by investors.</h2>
                  <div className="space-y-6">
                     <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                        <div className="flex text-amber-400 mb-3"><StarIconSolid className="w-4 h-4"/><StarIconSolid className="w-4 h-4"/><StarIconSolid className="w-4 h-4"/><StarIconSolid className="w-4 h-4"/><StarIconSolid className="w-4 h-4"/></div>
                        <p className="text-slate-700 italic text-sm mb-4">"Loopital's AI analysis helped me spot a high-yield AgriTech deal I would have missed. The transparency is unmatched."</p>
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full flex items-center justify-center overflow-hidden border border-slate-200">
                              <img src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100" className="w-full h-full object-cover" alt="User"/>
                           </div>
                           <div>
                              <p className="text-sm font-bold text-[#0A192F]">Emmanuel O.</p>
                              <p className="text-xs text-slate-500">Angel Investor</p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="mt-8 flex gap-8">
                     <div>
                        <p className="text-3xl font-bold text-[#0A192F]">₦12B+</p>
                        <p className="text-xs text-slate-500 uppercase font-bold mt-1">Volume Traded</p>
                     </div>
                     <div>
                        <p className="text-3xl font-bold text-[#0A192F]">14k+</p>
                        <p className="text-xs text-slate-500 uppercase font-bold mt-1">Active Users</p>
                     </div>
                  </div>
               </div>
               <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00DC82] to-teal-500 rounded-2xl rotate-3 blur-sm opacity-30"></div>
                  <div className="relative bg-[#0A192F] rounded-2xl p-8 text-white shadow-2xl">
                     <div className="flex items-center justify-between mb-8">
                        <div>
                           <p className="text-slate-400 text-xs font-bold uppercase">Portfolio Growth</p>
                           <p className="text-3xl font-bold mt-1">+24.8%</p>
                        </div>
                        <div className="p-3 bg-white/10 rounded-lg">
                           <ArrowTrendingUpIcon className="w-6 h-6 text-[#00DC82]" />
                        </div>
                     </div>
                     <div className="space-y-3">
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                           <div className="h-full w-3/4 bg-[#00DC82]"></div>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden w-2/3">
                           <div className="h-full w-1/2 bg-teal-500"></div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* Footer */}
      <footer className="bg-slate-50 pt-20 pb-10">
         <div className="max-w-7xl mx-auto px-4 text-center">
            <p className="text-slate-400 text-sm mb-8">&copy; 2024 Loopital Inc. Regulated by SEC.</p>
         </div>
      </footer>
    </div>
  );
};

export default Home;

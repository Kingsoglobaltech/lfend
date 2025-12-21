
import React, { useState, useEffect } from 'react';
import { 
  XMarkIcon, 
  CreditCardIcon, 
  BuildingLibraryIcon, 
  DevicePhoneMobileIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  BanknotesIcon,
  ArrowTrendingUpIcon,
  ShieldCheckIcon,
  LockClosedIcon,
  FingerPrintIcon
} from '@heroicons/react/24/outline';
import { Project } from '../types';

interface TopUpProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (amount: number) => void;
}

interface WithdrawProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (amount: number) => void;
  currentBalance: number;
}

interface InvestProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (amount: number) => void;
  project: Project;
  userBalance: number;
}

// Reusable Amount Input Component
const AmountInput = ({ value, onChange, label }: { value: string, onChange: (val: string) => void, label: string }) => (
  <div className="mb-6">
    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">{label}</label>
    <div className="relative">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-300">₦</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full pl-10 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl text-3xl font-bold text-[#0A192F] focus:outline-none focus:border-[#00DC82] focus:bg-white transition-all placeholder:text-slate-200"
        placeholder="0.00"
        autoFocus
      />
    </div>
  </div>
);

export const TopUpModal: React.FC<TopUpProps> = ({ isOpen, onClose, onSuccess }) => {
  const [amount, setAmount] = useState('');
  const [method, setMethod] = useState<'card' | 'transfer' | 'ussd'>('card');
  const [step, setStep] = useState<'input' | 'processing' | 'success'>('input');

  // Reset state on open
  useEffect(() => {
    if (isOpen) {
      setAmount('');
      setStep('input');
      setMethod('card');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleProcess = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  const handleClose = () => {
    if (step === 'success') {
      onSuccess(parseFloat(amount));
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[#0A192F]/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h3 className="text-xl font-bold text-[#0A192F]">Fund Wallet</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <XMarkIcon className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="p-8">
          {step === 'input' && (
            <>
              <AmountInput value={amount} onChange={setAmount} label="Amount to Deposit" />
              
              <div className="mb-8">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Select Method</label>
                <div className="grid grid-cols-3 gap-3">
                  <button 
                    onClick={() => setMethod('card')}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${method === 'card' ? 'border-[#00DC82] bg-emerald-50/50' : 'border-slate-100 hover:border-slate-200'}`}
                  >
                    <CreditCardIcon className={`w-6 h-6 mb-2 ${method === 'card' ? 'text-[#00DC82]' : 'text-slate-400'}`} />
                    <span className={`text-xs font-bold ${method === 'card' ? 'text-[#0A192F]' : 'text-slate-500'}`}>Card</span>
                  </button>
                  <button 
                    onClick={() => setMethod('transfer')}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${method === 'transfer' ? 'border-[#00DC82] bg-emerald-50/50' : 'border-slate-100 hover:border-slate-200'}`}
                  >
                    <BuildingLibraryIcon className={`w-6 h-6 mb-2 ${method === 'transfer' ? 'text-[#00DC82]' : 'text-slate-400'}`} />
                    <span className={`text-xs font-bold ${method === 'transfer' ? 'text-[#0A192F]' : 'text-slate-500'}`}>Transfer</span>
                  </button>
                  <button 
                    onClick={() => setMethod('ussd')}
                    className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${method === 'ussd' ? 'border-[#00DC82] bg-emerald-50/50' : 'border-slate-100 hover:border-slate-200'}`}
                  >
                    <DevicePhoneMobileIcon className={`w-6 h-6 mb-2 ${method === 'ussd' ? 'text-[#00DC82]' : 'text-slate-400'}`} />
                    <span className={`text-xs font-bold ${method === 'ussd' ? 'text-[#0A192F]' : 'text-slate-500'}`}>USSD</span>
                  </button>
                </div>
              </div>

              <button 
                onClick={handleProcess}
                disabled={!amount}
                className="w-full py-4 bg-[#0A192F] hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-slate-900/20 transition-all active:scale-[0.98]"
              >
                Proceed to Pay ₦{amount ? parseFloat(amount).toLocaleString() : '0.00'}
              </button>
            </>
          )}

          {step === 'processing' && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="relative w-20 h-20 mb-6">
                 <div className="absolute inset-0 border-4 border-slate-100 rounded-full"></div>
                 <div className="absolute inset-0 border-4 border-[#00DC82] rounded-full border-t-transparent animate-spin"></div>
                 <BanknotesIcon className="absolute inset-0 m-auto w-8 h-8 text-[#0A192F]" />
              </div>
              <h4 className="text-xl font-bold text-[#0A192F] mb-2">Processing Payment</h4>
              <p className="text-slate-500 text-sm">Securely communicating with gateway...</p>
            </div>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircleIcon className="w-10 h-10 text-[#00DC82]" />
              </div>
              <h4 className="text-2xl font-bold text-[#0A192F] mb-2">Deposit Successful!</h4>
              <p className="text-slate-500 mb-8">
                <span className="font-bold text-[#0A192F]">₦{parseFloat(amount).toLocaleString()}</span> has been added to your wallet.
              </p>
              <button 
                onClick={handleClose}
                className="w-full py-4 bg-[#00DC82] hover:bg-[#00c474] text-[#0A192F] font-bold rounded-xl shadow-lg transition-all"
              >
                Done
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export const WithdrawModal: React.FC<WithdrawProps> = ({ isOpen, onClose, onSuccess, currentBalance }) => {
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState<'input' | 'verification' | 'processing' | 'success'>('input');
  const [accountNumber, setAccountNumber] = useState('');
  const [bank, setBank] = useState('GTBank');
  const [verificationCode, setVerificationCode] = useState('');

  useEffect(() => {
    if (isOpen) {
      setAmount('');
      setStep('input');
      setAccountNumber('');
      setVerificationCode('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleInitiate = () => {
    if (!amount || parseFloat(amount) <= 0 || parseFloat(amount) > currentBalance) return;
    setStep('verification');
  };

  const handleVerify = () => {
    // Mock verification check
    if (verificationCode.length < 4) return;
    
    setStep('processing');
    setTimeout(() => {
      setStep('success');
    }, 2000);
  };

  const handleClose = () => {
    if (step === 'success') {
      onSuccess(parseFloat(amount));
    }
    onClose();
  };

  const handleMax = () => {
    setAmount(currentBalance.toString());
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[#0A192F]/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-fade-in-up">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-slate-100">
          <h3 className="text-xl font-bold text-[#0A192F]">
            {step === 'verification' ? 'Security Check' : 'Withdraw Funds'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <XMarkIcon className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="p-8">
          {step === 'input' && (
            <>
              <div className="flex justify-between items-end mb-2">
                 <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Amount</label>
                 <button onClick={handleMax} className="text-xs font-bold text-[#00DC82] hover:underline">
                    Max: ₦{currentBalance.toLocaleString()}
                 </button>
              </div>
              
              <div className="relative mb-6">
                 <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-300">₦</span>
                 <input
                   type="number"
                   value={amount}
                   onChange={(e) => setAmount(e.target.value)}
                   className={`w-full pl-10 pr-4 py-4 bg-slate-50 border-2 rounded-xl text-3xl font-bold text-[#0A192F] focus:outline-none focus:bg-white transition-all placeholder:text-slate-200 ${parseFloat(amount) > currentBalance ? 'border-red-300 focus:border-red-500' : 'border-slate-100 focus:border-[#00DC82]'}`}
                   placeholder="0.00"
                 />
                 {parseFloat(amount) > currentBalance && (
                    <p className="text-red-500 text-xs mt-1 absolute -bottom-5 font-bold">Insufficient balance</p>
                 )}
              </div>

              <div className="space-y-4 mb-8">
                 <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">Destination Account</h4>
                 <div>
                    <select 
                      value={bank}
                      onChange={(e) => setBank(e.target.value)}
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm font-medium text-[#0A192F] focus:ring-2 focus:ring-[#00DC82] focus:outline-none mb-3"
                    >
                      <option>GTBank</option>
                      <option>Access Bank</option>
                      <option>Zenith Bank</option>
                      <option>UBA</option>
                      <option>Kuda Bank</option>
                    </select>
                    <input 
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder="Account Number"
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-[#00DC82] focus:outline-none"
                    />
                 </div>
              </div>

              <button 
                onClick={handleInitiate}
                disabled={!amount || parseFloat(amount) > currentBalance || !accountNumber}
                className="w-full py-4 bg-[#0A192F] hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-lg shadow-slate-900/20 transition-all active:scale-[0.98]"
              >
                Continue
              </button>
            </>
          )}

          {step === 'verification' && (
             <div className="animate-fade-in">
                <div className="flex flex-col items-center mb-6">
                   <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-slate-100">
                      <FingerPrintIcon className="w-8 h-8 text-[#0A192F]" />
                   </div>
                   <p className="text-center text-sm text-slate-600 max-w-[250px]">
                      Please enter your 4-digit Transaction PIN or 2FA Code to confirm withdrawal.
                   </p>
                </div>

                <div className="mb-6">
                   <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Transaction PIN / 2FA</label>
                   <div className="relative">
                      <LockClosedIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="password"
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-lg font-bold text-[#0A192F] focus:outline-none focus:border-[#00DC82] focus:bg-white transition-all tracking-widest"
                        placeholder="••••"
                        autoFocus
                        maxLength={6}
                      />
                   </div>
                   <button className="text-xs font-bold text-[#00DC82] mt-2 hover:underline">Resend Code</button>
                </div>
                
                <div className="flex gap-3">
                   <button 
                     onClick={() => setStep('input')}
                     className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-xl transition-all"
                   >
                     Back
                   </button>
                   <button 
                     onClick={handleVerify}
                     disabled={verificationCode.length < 4}
                     className="flex-1 py-3 bg-[#0A192F] hover:bg-slate-800 disabled:opacity-50 text-white font-bold rounded-xl shadow-lg transition-all"
                   >
                     Confirm
                   </button>
                </div>
             </div>
          )}

          {step === 'processing' && (
            <div className="flex flex-col items-center justify-center py-12">
               <ArrowPathIcon className="w-12 h-12 text-[#00DC82] animate-spin mb-4" />
               <h4 className="text-xl font-bold text-[#0A192F] mb-2">Processing Withdrawal</h4>
               <p className="text-slate-500 text-sm">Verifying account details...</p>
            </div>
          )}

          {step === 'success' && (
            <div className="flex flex-col items-center justify-center py-8 text-center animate-fade-in">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                <CheckCircleIcon className="w-10 h-10 text-[#0A192F]" />
              </div>
              <h4 className="text-2xl font-bold text-[#0A192F] mb-2">Withdrawal Initiated</h4>
              <p className="text-slate-500 mb-8 max-w-[200px] mx-auto">
                <span className="font-bold text-[#0A192F]">₦{parseFloat(amount).toLocaleString()}</span> is on its way to your bank account.
              </p>
              <button 
                onClick={handleClose}
                className="w-full py-4 bg-white border-2 border-slate-200 hover:border-[#00DC82] text-[#0A192F] font-bold rounded-xl transition-all"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export const InvestModal: React.FC<InvestProps> = ({ isOpen, onClose, onConfirm, project, userBalance }) => {
    const [amount, setAmount] = useState('');
    const [step, setStep] = useState<'input' | 'processing' | 'success'>('input');
    const minAmount = project.minInvestment;

    useEffect(() => {
        if (isOpen) {
            setAmount('');
            setStep('input');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const parsedAmount = parseFloat(amount) || 0;
    const isValid = parsedAmount >= minAmount && parsedAmount <= userBalance;
    const projectedReturn = parsedAmount * (1 + project.roi / 100);
    const profit = projectedReturn - parsedAmount;

    const handleInvest = () => {
        if (!isValid) return;
        setStep('processing');
        setTimeout(() => {
            setStep('success');
            setTimeout(() => {
               onConfirm(parsedAmount);
            }, 1500);
        }, 2000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
            <div className="absolute inset-0 bg-[#0A192F]/80 backdrop-blur-md transition-opacity" onClick={onClose}></div>

            <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl relative z-10 overflow-hidden animate-fade-in-up border border-slate-100">
                {step === 'input' && (
                  <>
                    <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                        <div>
                            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Invest In</p>
                            <h3 className="text-lg font-bold text-[#0A192F] line-clamp-1">{project.title}</h3>
                        </div>
                        <button onClick={onClose} className="p-2 bg-white hover:bg-slate-100 rounded-full transition-colors border border-slate-100 shadow-sm">
                            <XMarkIcon className="w-5 h-5 text-slate-400" />
                        </button>
                    </div>

                    <div className="p-8">
                        <div className="flex justify-between items-end mb-2">
                             <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Investment Amount</label>
                             <p className="text-xs font-bold text-[#00DC82]">Wallet: ₦{userBalance.toLocaleString()}</p>
                        </div>
                        
                        <div className="relative mb-2">
                             <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-slate-300">₦</span>
                             <input
                               type="number"
                               value={amount}
                               onChange={(e) => setAmount(e.target.value)}
                               className={`w-full pl-10 pr-4 py-4 bg-slate-50 border-2 rounded-xl text-3xl font-bold text-[#0A192F] focus:outline-none focus:bg-white transition-all placeholder:text-slate-200 ${!isValid && amount ? 'border-red-300 focus:border-red-500' : 'border-slate-100 focus:border-[#00DC82]'}`}
                               placeholder="0.00"
                               autoFocus
                             />
                        </div>
                        <div className="flex justify-between text-xs font-medium mb-6">
                             <span className={`${parsedAmount < minAmount && amount ? 'text-red-500 font-bold' : 'text-slate-400'}`}>Min: ₦{minAmount.toLocaleString()}</span>
                             <span className={`${parsedAmount > userBalance ? 'text-red-500 font-bold' : 'text-slate-400'}`}>Max: ₦{userBalance.toLocaleString()}</span>
                        </div>

                        {/* ROI Preview */}
                        <div className="bg-[#0A192F] rounded-2xl p-5 text-white mb-8 relative overflow-hidden">
                           <div className="absolute top-0 right-0 w-32 h-32 bg-[#00DC82]/10 rounded-full -mr-10 -mt-10"></div>
                           <div className="relative z-10 flex justify-between items-center">
                              <div>
                                 <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Est. Returns ({project.roi}%)</p>
                                 <p className="text-2xl font-bold font-mono text-[#00DC82]">₦{profit > 0 ? profit.toLocaleString(undefined, {maximumFractionDigits: 0}) : '0'}</p>
                              </div>
                              <div className="text-right">
                                 <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Payout</p>
                                 <p className="text-xl font-bold font-mono text-white">₦{projectedReturn > 0 ? projectedReturn.toLocaleString(undefined, {maximumFractionDigits: 0}) : '0'}</p>
                              </div>
                           </div>
                        </div>

                        <div className="space-y-3 mb-8">
                             <div className="flex items-center gap-3 text-xs text-slate-500">
                                <ShieldCheckIcon className="w-4 h-4 text-[#00DC82]" />
                                <span>Funds secured in escrow until funding goal is met.</span>
                             </div>
                             <div className="flex items-center gap-3 text-xs text-slate-500">
                                <LockClosedIcon className="w-4 h-4 text-[#00DC82]" />
                                <span>Transaction encrypted via 256-bit SSL.</span>
                             </div>
                        </div>

                        <button 
                            onClick={handleInvest}
                            disabled={!isValid}
                            className="w-full py-4 bg-[#0A192F] hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-xl shadow-xl shadow-slate-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            Confirm Investment
                        </button>
                    </div>
                  </>
                )}

                {step === 'processing' && (
                    <div className="flex flex-col items-center justify-center py-16 px-8">
                        <div className="relative w-24 h-24 mb-8">
                             <div className="absolute inset-0 border-[6px] border-slate-100 rounded-full"></div>
                             <div className="absolute inset-0 border-[6px] border-[#00DC82] rounded-full border-t-transparent animate-spin"></div>
                             <ArrowTrendingUpIcon className="absolute inset-0 m-auto w-8 h-8 text-[#0A192F]" />
                        </div>
                        <h4 className="text-2xl font-bold text-[#0A192F] mb-2">Processing Investment</h4>
                        <p className="text-slate-500 text-sm text-center">Allocating equity and generating contract...</p>
                    </div>
                )}

                {step === 'success' && (
                    <div className="flex flex-col items-center justify-center py-12 px-8 text-center animate-fade-in bg-white">
                         <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6 animate-bounce-slow">
                            <CheckCircleIcon className="w-12 h-12 text-[#00DC82]" />
                         </div>
                         <h4 className="text-3xl font-bold text-[#0A192F] mb-2">You're an Investor!</h4>
                         <p className="text-slate-500 mb-2">You have successfully invested</p>
                         <p className="text-2xl font-bold text-[#00DC82] font-mono mb-8">₦{parsedAmount.toLocaleString()}</p>
                         <p className="text-xs text-slate-400">Redirecting to dashboard...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

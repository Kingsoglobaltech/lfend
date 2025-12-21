
import React from 'react';
import { Notification } from '../types';
import { 
  BanknotesIcon, 
  MegaphoneIcon, 
  ShieldCheckIcon, 
  InformationCircleIcon, 
  XMarkIcon
} from '@heroicons/react/24/outline';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}

const NotificationsPanel: React.FC<Props> = ({ isOpen, onClose, notifications, onMarkAsRead, onClearAll }) => {
  if (!isOpen) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'payment': return <BanknotesIcon className="w-5 h-5 text-emerald-500" />;
      case 'project_update': return <MegaphoneIcon className="w-5 h-5 text-blue-500" />;
      case 'security': return <ShieldCheckIcon className="w-5 h-5 text-amber-500" />;
      default: return <InformationCircleIcon className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-40 bg-transparent" onClick={onClose}></div>
      <div className="absolute right-0 top-16 mt-2 w-80 md:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 overflow-hidden animate-fade-in-up origin-top-right mx-4 md:mx-0">
        <div className="p-4 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
          <h3 className="font-bold text-[#0A192F]">Notifications</h3>
          <div className="flex gap-4">
            {notifications.some(n => !n.isRead) && (
                <button onClick={onClearAll} className="text-xs font-bold text-slate-400 hover:text-[#0A192F] transition-colors">Mark all read</button>
            )}
            <button onClick={onClose} className="md:hidden">
                <XMarkIcon className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>
        <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
          {notifications.length === 0 ? (
            <div className="p-8 text-center text-slate-400">
               <InformationCircleIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
               <p className="text-sm">No new notifications</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-50">
              {notifications.map(notif => (
                <div 
                  key={notif.id} 
                  className={`p-4 hover:bg-slate-50 transition-colors cursor-pointer relative group ${!notif.isRead ? 'bg-blue-50/30' : ''}`}
                  onClick={() => onMarkAsRead(notif.id)}
                >
                   <div className="flex gap-3">
                      <div className={`mt-1 p-2 rounded-full h-fit flex-shrink-0 ${!notif.isRead ? 'bg-white shadow-sm' : 'bg-slate-100'}`}>
                         {getIcon(notif.type)}
                      </div>
                      <div>
                         <div className="flex justify-between items-start">
                            <h4 className={`text-sm ${!notif.isRead ? 'font-bold text-[#0A192F]' : 'font-medium text-slate-600'}`}>{notif.title}</h4>
                            <span className="text-[10px] text-slate-400 flex-shrink-0 ml-2">{notif.timestamp}</span>
                         </div>
                         <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">{notif.message}</p>
                      </div>
                   </div>
                   {!notif.isRead && (
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500"></div>
                   )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="p-3 border-t border-slate-50 text-center bg-slate-50/30">
           <button className="text-xs font-bold text-slate-500 hover:text-[#0A192F]">View All Activity</button>
        </div>
      </div>
    </>
  );
};

export default NotificationsPanel;

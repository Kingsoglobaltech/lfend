
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import Community from './pages/Community';
import ProjectDetails from './pages/ProjectDetails';
import Portfolio from './pages/Portfolio';
import Home from './pages/Home';
import Auth from './pages/Auth';
import OwnerDashboard from './pages/OwnerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Profile from './pages/Profile';
import { MOCK_PROJECTS, MOCK_INVESTMENTS, MOCK_NOTIFICATIONS } from './constants';
import { Project, User, Investment, Transaction, Notification } from './types';

// Mock initial transactions
const MOCK_TRANSACTIONS: Transaction[] = [
  { id: 'tx1', type: 'deposit', amount: 5000000, date: '2024-03-10', description: 'Wallet Deposit via Card', status: 'success' },
  { id: 'tx2', type: 'investment', amount: 1000000, date: '2024-01-20', description: 'Inv: GreenHorizon Farm', status: 'success' },
  { id: 'tx3', type: 'investment', amount: 5000000, date: '2023-11-15', description: 'Inv: NeoLogistics Fleet', status: 'success' },
];

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState('home'); 
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // State for dynamic data
  const [investments, setInvestments] = useState<Investment[]>(MOCK_INVESTMENTS);
  const [projects, setProjects] = useState<Project[]>(MOCK_PROJECTS);
  const [transactions, setTransactions] = useState<Transaction[]>(MOCK_TRANSACTIONS);
  const [notifications, setNotifications] = useState<Notification[]>(MOCK_NOTIFICATIONS);

  // Initialize Auth
  useEffect(() => {
    const storedUser = localStorage.getItem('loopital_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setCurrentView('dashboard');
    }
  }, []);

  const handleLogin = (newUser: User) => {
    localStorage.setItem('loopital_user', JSON.stringify(newUser));
    setUser(newUser);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('loopital_user');
    setUser(null);
    setCurrentView('home');
    setSelectedProject(null);
  };

  const handleUpdateBalance = (newBalance: number) => {
    if (user) {
      const updatedUser = { ...user, walletBalance: newBalance };
      setUser(updatedUser);
      localStorage.setItem('loopital_user', JSON.stringify(updatedUser));
    }
  };

  // Helper to add a transaction log
  const handleAddTransaction = (type: 'deposit' | 'withdrawal' | 'investment', amount: number, description: string) => {
     const newTx: Transaction = {
       id: `tx_${Date.now()}`,
       type,
       amount,
       date: new Date().toISOString().split('T')[0],
       description,
       status: 'success'
     };
     setTransactions(prev => [newTx, ...prev]);
  };

  const handleInvest = (amount: number) => {
     if (!user || !selectedProject) return;
     
     // 1. Deduct Balance
     const newBalance = user.walletBalance - amount;
     handleUpdateBalance(newBalance);

     // 2. Create Investment Record
     const newInvestment: Investment = {
        id: `inv_${Date.now()}`,
        projectId: selectedProject.id,
        amount: amount,
        currentValue: amount, // Start at initial value
        date: new Date().toISOString().split('T')[0]
     };

     setInvestments(prev => [newInvestment, ...prev]);
     
     // 3. Log Transaction
     handleAddTransaction('investment', amount, `Inv: ${selectedProject.title}`);

     // 4. Update Project "Raised Amount" (in a real app this is backend logic)
     setProjects(prevProjects => prevProjects.map(p => 
        p.id === selectedProject.id 
            ? { ...p, raisedAmount: p.raisedAmount + amount } 
            : p
     ));
     
     // 5. Add Notification
     const newNotification: Notification = {
        id: `n_${Date.now()}`,
        type: 'project_update',
        title: 'Investment Confirmed',
        message: `You have successfully invested ₦${amount.toLocaleString()} in ${selectedProject.title}.`,
        timestamp: 'Just now',
        isRead: false
     };
     setNotifications(prev => [newNotification, ...prev]);
     
     // 6. Return to Dashboard
     setSelectedProject(null);
     setCurrentView('dashboard');
  };

  const handleAddProject = (newProjectData: Partial<Project>) => {
    const newProject: Project = {
       ...newProjectData,
       id: `p_${Date.now()}`,
       raisedAmount: 0,
       status: 'pending' // Force pending for admins
    } as Project;
    setProjects([newProject, ...projects]);
  };

  const handleViewChange = (view: string) => {
    if (!user && (view !== 'home' && view !== 'auth')) {
      setCurrentView('auth');
      return;
    }
    setCurrentView(view);
    setSelectedProject(null);
    window.scrollTo(0, 0);
  };

  const handleGetStarted = (role?: 'Investor' | 'ProjectOwner') => {
    setCurrentView('auth');
  };

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
    window.scrollTo(0, 0);
  };

  const handleMarkNotificationRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  // Main Content Renderer
  const renderContent = () => {
    // PUBLIC ROUTES
    if (!user) {
      if (currentView === 'auth') return <Auth onLogin={handleLogin} />;
      return <Home onGetStarted={handleGetStarted} />;
    }

    // AUTHENTICATED ROUTES
    
    // Project Detail (Global)
    if (selectedProject) {
      return (
        <ProjectDetails 
          project={selectedProject} 
          onBack={() => setSelectedProject(null)}
          userBalance={user.walletBalance}
          onConfirmInvest={handleInvest}
        />
      );
    }

    const containerClasses = "px-4 sm:px-6 lg:px-8 py-8 font-inter";

    // Profile (Common)
    if (currentView === 'profile') {
      return (
        <div className={containerClasses}>
          <Profile user={user} />
        </div>
      );
    }

    // Role Specifics
    if (user.role === 'Admin') {
      return (
        <div className={containerClasses}>
          <AdminDashboard user={user} allProjects={projects} />
        </div>
      );
    }

    if (user.role === 'ProjectOwner') {
      if (currentView === 'my-projects') {
          return (
             <div className={containerClasses}>
               <OwnerDashboard user={user} myProjects={projects.filter(p => p.owner === (user.companyName || user.name))} onAddProject={handleAddProject} />
             </div>
          );
      }
      if (currentView === 'create') {
         // Direct link to create (could also just open modal on dashboard)
         return (
             <div className={containerClasses}>
                <OwnerDashboard user={user} myProjects={projects.filter(p => p.owner === (user.companyName || user.name))} onAddProject={handleAddProject} />
             </div>
         );
      }
      if (currentView === 'projects') {
        return (
          <div className={containerClasses}>
            <Projects projects={projects} onViewDetails={handleViewProject} />
          </div>
        );
      }
      return (
        <div className={containerClasses}>
          <OwnerDashboard user={user} myProjects={projects.filter(p => p.owner === (user.companyName || user.name))} onAddProject={handleAddProject} />
        </div>
      );
    }

    // Investor (Default)
    const dashboardProps = {
      user,
      investments,
      projects: projects,
      transactions, 
      onBalanceUpdate: handleUpdateBalance,
      onViewProject: handleViewProject,
      onAddTransaction: handleAddTransaction,
    };

    switch (currentView) {
      case 'dashboard':
        return (
          <div className={containerClasses}>
            <Dashboard {...dashboardProps} />
          </div>
        );
      case 'projects':
        return (
          <div className={containerClasses}>
            <Projects projects={projects} onViewDetails={handleViewProject} />
          </div>
        );
      case 'community':
        return (
          <div className={containerClasses}>
            <Community />
          </div>
        );
      case 'portfolio':
         return (
          <div className={containerClasses}>
             <Portfolio 
                user={user}
                investments={investments}
                projects={projects}
                onViewProject={handleViewProject}
                onBalanceUpdate={handleUpdateBalance}
                onAddTransaction={handleAddTransaction}
             />
          </div>
         );
      default:
        return (
          <div className={containerClasses}>
            <Dashboard {...dashboardProps} />
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 font-sans text-slate-900 selection:bg-teal-100 selection:text-teal-900">
      <Navbar 
        user={user} 
        currentView={currentView} 
        onChangeView={handleViewChange} 
        onLogout={handleLogout}
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        notifications={notifications}
        onMarkNotificationRead={handleMarkNotificationRead}
        onMarkAllNotificationsRead={handleMarkAllNotificationsRead}
      />
      
      <main className={`transition-all duration-300 ${user ? (isSidebarCollapsed ? 'md:pl-20' : 'md:pl-64') : ''}`}>
        {renderContent()}
      </main>
    </div>
  );
};

export default App;

import { useState } from 'react';
import { Login } from './auth/Login';
import { Register } from './components/Register';
import { Verification } from './components/Verification';
import { ForgotPassword } from './components/ForgotPassword';
import { ResetPassword } from './components/ResetPassword';
import { Dashboard } from './components/Dashboard';
import { UserManagement } from './components/UserManagement';
import { Services } from './components/ServicesPayments';
import { Notifications } from './components/Notifications';
import { Reports } from './components/Reports';
import { MultiCompany } from './components/MultiCompany';
import { LiveSupport } from './components/LiveSupport';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { InactivityDialog } from './components/InactivityDialog';

export type ModuleType = 'dashboard' | 'users' | 'services' | 'notifications' | 'reports' | 'multicompany' | 'support';
export type AuthView = 'login' | 'register' | 'verification' | 'forgot-password' | 'reset-password';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authView, setAuthView] = useState<AuthView>('login');
  const [activeModule, setActiveModule] = useState<ModuleType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleRegister = () => {
    // Después del registro, mostrar pantalla de verificación
    setAuthView('verification');
  };

  const handleVerify = () => {
    // Después de verificar, autenticar al usuario
    setIsAuthenticated(true);
  };

  const handleSendInstructions = () => {
    // Después de enviar instrucciones, ir a reset password
    setAuthView('reset-password');
  };

  const handleResetComplete = () => {
    // Después de restablecer contraseña, autenticar al usuario
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAuthView('login');
  };

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <Dashboard />;
      case 'users':
        return <UserManagement />;
      case 'services':
        return <Services />;
      case 'notifications':
        return <Notifications />;
      case 'reports':
        return <Reports />;
      case 'multicompany':
        return <MultiCompany />;
      case 'support':
        return <LiveSupport />;
      default:
        return <Dashboard />;
    }
  };

  // Si no está autenticado, mostrar pantalla de login, registro, verificación, forgot password o reset password
  if (!isAuthenticated) {
    if (authView === 'reset-password') {
      return (
        <ResetPassword 
          onResetComplete={handleResetComplete}
          onBack={() => setAuthView('login')}
        />
      );
    }
    if (authView === 'forgot-password') {
      return (
        <ForgotPassword 
          onSendInstructions={handleSendInstructions}
          onBack={() => setAuthView('login')}
        />
      );
    }
    if (authView === 'verification') {
      return (
        <Verification 
          onVerify={handleVerify}
          onBack={() => setAuthView('register')}
        />
      );
    }
    if (authView === 'register') {
      return (
        <Register 
          onRegister={handleRegister}
          onSwitchToLogin={() => setAuthView('login')}
        />
      );
    }
    return (
      <Login 
        onLogin={handleLogin}
        onSwitchToRegister={() => setAuthView('register')}
        onForgotPassword={() => setAuthView('forgot-password')}
      />
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Dialog de inactividad - solo se muestra cuando el usuario está autenticado */}
      <InactivityDialog 
        onLogout={handleLogout}
        timeoutMinutes={15}
        warningSeconds={10}
      />
      
      <Sidebar 
        activeModule={activeModule} 
        setActiveModule={setActiveModule}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} onLogout={handleLogout} />
        <main className="flex-1 overflow-y-auto p-6">
          {renderModule()}
        </main>
      </div>
    </div>
  );
}
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Eye, EyeOff, Lock, ShieldCheck, FileCheck, BarChart3, Settings, CheckCircle2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ResetPasswordProps {
  onResetComplete: () => void;
  onBack: () => void;
}

export function ResetPassword({ onResetComplete, onBack }: ResetPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword && password.length >= 8) {
      onResetComplete();
    }
  };

  const passwordsMatch = password === confirmPassword && password.length > 0;
  const isValid = password.length >= 8 && passwordsMatch;

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Reset Password Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-sm text-gray-600 mb-6">
              Recuerdó mi contraseña,{' '}
              <button 
                onClick={onBack}
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                vuelve atrás
              </button>
            </p>
            
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-12">
              <div className="relative">
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                  <circle cx="25" cy="25" r="24" fill="#1E40AF" opacity="0.1"/>
                  <path d="M25 10C16.716 10 10 16.716 10 25C10 33.284 16.716 40 25 40C33.284 40 40 33.284 40 25C40 16.716 33.284 10 25 10ZM25 12C32.203 12 38 17.797 38 25C38 32.203 32.203 38 25 38C17.797 38 12 32.203 12 25C12 17.797 17.797 12 25 12Z" fill="#1E40AF"/>
                  <path d="M18 25L23 30L32 20" stroke="#1E40AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1 className="text-red-600 text-3xl">Automatic Alert</h1>
            </div>
          </div>

          {/* Title */}
          <div className="mb-8">
            <h2 className="text-gray-900 text-2xl mb-2">
              Restablecer contraseña
            </h2>
            <p className="text-gray-600 text-sm">
              Cree una nueva contraseña para su cuenta de Kasana completando el formulario a continuación
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Password Field */}
            <div>
              <Label htmlFor="password" className="text-gray-900 mb-2 block">
                Contraseña
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-12 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div>
              <Label htmlFor="confirmPassword" className="text-gray-900 mb-2 block">
                Confirmación de contraseña
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="••••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-12 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {/* Password Match Indicator */}
              {confirmPassword && (
                <p className={`text-xs mt-1 ${passwordsMatch ? 'text-green-600' : 'text-red-600'}`}>
                  {passwordsMatch ? '✓ Las contraseñas coinciden' : '✗ Las contraseñas no coinciden'}
                </p>
              )}
            </div>

            {/* Password Requirements */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-xs text-gray-700 mb-2">La contraseña debe contener:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li className={password.length >= 8 ? 'text-green-600' : ''}>
                  {password.length >= 8 ? '✓' : '•'} Al menos 8 caracteres
                </li>
                <li className={/[A-Z]/.test(password) ? 'text-green-600' : ''}>
                  {/[A-Z]/.test(password) ? '✓' : '•'} Una letra mayúscula
                </li>
                <li className={/[0-9]/.test(password) ? 'text-green-600' : ''}>
                  {/[0-9]/.test(password) ? '✓' : '•'} Un número
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!isValid}
            >
              Confirmar
            </Button>

            {/* Help Text */}
            <p className="text-xs text-gray-500 text-center leading-relaxed">
              Si no ve su correo electrónico de restablecimiento, asegúrese de verificar su filtro de correo no deseado en busca de un correo electrónico.
            </p>
          </form>

          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-center sm:justify-between text-xs text-gray-500 flex-wrap gap-2">
              <p>© 2025 Automatic Alert. Todos los derechos reservados.</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-gray-700">
                  Privacidad
                </a>
                <span className="hidden sm:inline">•</span>
                <a href="#" className="hover:text-gray-700">
                  Términos y condiciones
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Security Icons Animation */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-black">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1632910061325-10116ac047e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHNlY3VyaXR5JTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjIxNDQ5MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Seguridad tecnológica"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-black/80"></div>
        
        {/* Contenido - Security Icons */}
        <div className="relative h-full flex items-center justify-center p-12">
          <div className="w-full max-w-2xl">
            {/* Central Circle con Check */}
            <div className="relative">
              {/* Main Circle */}
              <div className="relative mx-auto w-64 h-64 flex items-center justify-center">
                {/* Outer rings */}
                <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 animate-ping" style={{ animationDuration: '3s' }}></div>
                <div className="absolute inset-4 rounded-full border-2 border-blue-400/40"></div>
                <div className="absolute inset-8 rounded-full border-2 border-blue-300/50"></div>
                
                {/* Inner circle with gradient */}
                <div className="relative w-40 h-40 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center shadow-2xl shadow-blue-500/50">
                  <CheckCircle2 className="w-20 h-20 text-white" strokeWidth={2} />
                  
                  {/* Pulse effect */}
                  <div className="absolute inset-0 rounded-full bg-blue-400/30 animate-pulse"></div>
                </div>

                {/* Decorative arcs */}
                <svg className="absolute inset-0 w-full h-full" style={{ transform: 'rotate(-90deg)' }}>
                  <circle
                    cx="128"
                    cy="128"
                    r="110"
                    fill="none"
                    stroke="url(#gradient1)"
                    strokeWidth="3"
                    strokeDasharray="100 30"
                    className="animate-spin"
                    style={{ animationDuration: '8s' }}
                  />
                  <defs>
                    <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: '#3B82F6', stopOpacity: 0.8 }} />
                      <stop offset="100%" style={{ stopColor: '#1D4ED8', stopOpacity: 0.3 }} />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Floating Security Icons around the circle */}
              {[
                { Icon: Lock, position: 'top-0 right-20', delay: '0s', color: 'from-green-500 to-green-600' },
                { Icon: BarChart3, position: 'top-20 right-0', delay: '0.5s', color: 'from-blue-500 to-blue-600' },
                { Icon: FileCheck, position: 'bottom-20 right-0', delay: '1s', color: 'from-purple-500 to-purple-600' },
                { Icon: ShieldCheck, position: 'bottom-0 right-20', delay: '1.5s', color: 'from-indigo-500 to-indigo-600' },
                { Icon: Settings, position: 'top-0 left-20', delay: '2s', color: 'from-cyan-500 to-cyan-600' },
                { Icon: Settings, position: 'bottom-0 left-20', delay: '2.5s', color: 'from-orange-500 to-orange-600' }
              ].map(({ Icon, position, delay, color }, index) => (
                <div 
                  key={index}
                  className={`absolute ${position}`}
                  style={{
                    animation: `floatIcon 3s ease-in-out ${delay} infinite`
                  }}
                >
                  {/* Connection line */}
                  <div className="absolute top-1/2 left-1/2 w-20 h-0.5 bg-gradient-to-r from-blue-500/50 to-transparent origin-left"></div>
                  
                  {/* Icon container */}
                  <div className={`relative w-16 h-16 bg-gradient-to-br ${color} rounded-full flex items-center justify-center shadow-lg border-2 border-white/20`}>
                    <Icon className="w-8 h-8 text-white" strokeWidth={2} />
                    
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-full bg-white/20 blur-sm"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Security features list */}
            <div className="mt-20 space-y-4">
              <h3 className="text-white text-xl text-center mb-6">
                Seguridad de tu cuenta
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Lock, text: 'Encriptación 256-bit' },
                  { icon: ShieldCheck, text: 'Protección avanzada' },
                  { icon: CheckCircle2, text: 'Verificación 2FA' },
                  { icon: FileCheck, text: 'Auditoría completa' }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-white/10 transition-all"
                    style={{
                      animation: `slideIn 0.5s ease-out ${index * 0.1 + 1}s both`
                    }}
                  >
                    <item.icon className="w-5 h-5 text-blue-400 flex-shrink-0" />
                    <span className="text-white/90 text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes floatIcon {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}
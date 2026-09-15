import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Eye, EyeOff } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface RegisterProps {
  onRegister: () => void;
  onSwitchToLogin: () => void;
}

export function Register({ onRegister, onSwitchToLogin }: RegisterProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    if (!acceptTerms) {
      alert('Debes aceptar los términos y servicios');
      return;
    }
    // Aquí iría la lógica de registro
    onRegister();
  };

  const handleGoogleRegister = () => {
    // Aquí iría la lógica de registro con Google
    onRegister();
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Register Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-sm text-gray-600 mb-6">
              ¿Tienes una cuenta?{' '}
              <button 
                onClick={onSwitchToLogin}
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                Iniciar sesión
              </button>
            </p>
            
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-8">
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

          {/* Welcome Text */}
          <div className="mb-8">
            <h2 className="text-gray-900 text-2xl mb-2">Registra tu cuenta</h2>
            <p className="text-gray-600">
              Únete a nosotros hoy y accede a tu panel de control en segundos.
            </p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <Label htmlFor="email" className="text-gray-900 mb-2 block">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="ejemplo@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                required
              />
            </div>

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
                Confirmar Contraseña
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
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center gap-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
              />
              <Label
                htmlFor="terms"
                className="text-sm text-gray-700 cursor-pointer"
              >
                Acepto{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline">
                  Términos
                </a>{' '}
                y{' '}
                <a href="#" className="text-blue-600 hover:text-blue-700 hover:underline">
                  Servicios
                </a>
              </Label>
            </div>

            {/* Register Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Registrarse
            </Button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">O inicia sesión con</span>
              </div>
            </div>

            {/* Google Register */}
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 border-gray-300 hover:bg-gray-50"
              onClick={handleGoogleRegister}
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
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

      {/* Right Panel - Image Background */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-gray-900">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1761305135267-892b33c19c61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdGVjaG5vbG9neSUyMGludGVyZmFjZXxlbnwxfHx8fDE3NjIwMzQ2NDB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Tecnología Digital"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-gray-800/80"></div>
        
        {/* Contenido sobre la imagen - Círculos con iconos */}
        <div className="relative h-full flex items-center justify-center p-12">
          <div className="relative w-full max-w-lg">
            {/* Círculo central */}
            <div className="relative flex items-center justify-center">
              <div className="absolute w-64 h-64 rounded-full border-4 border-blue-500/30 animate-pulse"></div>
              <div className="absolute w-48 h-48 rounded-full border-2 border-blue-400/40"></div>
              
              {/* Centro - Check */}
              <div className="relative z-10 w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-2xl">
                <svg width="60" height="60" viewBox="0 0 50 50" fill="none">
                  <path d="M10 25L20 35L40 15" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Iconos orbitales */}
            {/* Top */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-gray-800 rounded-full border-2 border-blue-500/50 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 6v6l4 2"/>
              </svg>
            </div>

            {/* Top Right */}
            <div className="absolute top-12 right-4 w-16 h-16 bg-gray-800 rounded-full border-2 border-blue-500/50 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2">
                <circle cx="12" cy="12" r="3"/>
                <path d="M12 1v6m0 6v6M1 12h6m6 0h6"/>
              </svg>
            </div>

            {/* Right */}
            <div className="absolute top-1/2 -right-8 -translate-y-1/2 w-16 h-16 bg-gray-800 rounded-full border-2 border-blue-500/50 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2"/>
                <path d="M9 9h6v6H9z"/>
              </svg>
            </div>

            {/* Bottom Right */}
            <div className="absolute bottom-12 right-4 w-16 h-16 bg-gray-800 rounded-full border-2 border-blue-500/50 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2">
                <path d="M12 2v20M2 12h20"/>
                <circle cx="12" cy="12" r="4"/>
              </svg>
            </div>

            {/* Bottom */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-gray-800 rounded-full border-2 border-blue-500/50 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
              </svg>
            </div>

            {/* Bottom Left */}
            <div className="absolute bottom-12 left-4 w-16 h-16 bg-gray-800 rounded-full border-2 border-blue-500/50 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
              </svg>
            </div>

            {/* Left */}
            <div className="absolute top-1/2 -left-8 -translate-y-1/2 w-16 h-16 bg-gray-800 rounded-full border-2 border-blue-500/50 flex items-center justify-center">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </div>

            {/* Lines connecting */}
            <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
              <line x1="50%" y1="50%" x2="50%" y2="10%" stroke="#3B82F6" strokeWidth="1" opacity="0.3"/>
              <line x1="50%" y1="50%" x2="85%" y2="25%" stroke="#3B82F6" strokeWidth="1" opacity="0.3"/>
              <line x1="50%" y1="50%" x2="95%" y2="50%" stroke="#3B82F6" strokeWidth="1" opacity="0.3"/>
              <line x1="50%" y1="50%" x2="85%" y2="75%" stroke="#3B82F6" strokeWidth="1" opacity="0.3"/>
              <line x1="50%" y1="50%" x2="50%" y2="90%" stroke="#3B82F6" strokeWidth="1" opacity="0.3"/>
              <line x1="50%" y1="50%" x2="15%" y2="75%" stroke="#3B82F6" strokeWidth="1" opacity="0.3"/>
              <line x1="50%" y1="50%" x2="5%" y2="50%" stroke="#3B82F6" strokeWidth="1" opacity="0.3"/>
              <line x1="50%" y1="50%" x2="15%" y2="25%" stroke="#3B82F6" strokeWidth="1" opacity="0.3"/>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
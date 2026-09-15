import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface ForgotPasswordProps {
  onSendInstructions: () => void;
  onBack: () => void;
}

export function ForgotPassword({ onSendInstructions, onBack }: ForgotPasswordProps) {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Simular envío de correo
    setTimeout(() => {
      onSendInstructions();
    }, 2000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Forgot Password Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            <p className="text-sm text-gray-600 mb-6">
              No importa,{' '}
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
              ¿Olvidaste tu contraseña?
            </h2>
            <p className="text-gray-600 text-sm">
              Ingrese su dirección de correo electrónico a continuación y le enviaremos instrucciones para restablecer su contraseña.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <Label htmlFor="email" className="text-gray-900 mb-2 block">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="emanualberzeber@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
                required
                disabled={isSubmitted}
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={isSubmitted}
            >
              {isSubmitted ? 'Enviando...' : 'Enviar instrucciones de reinicio'}
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

      {/* Right Panel - Animated Checkboxes */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-900 via-blue-900 to-blue-800">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1612305868373-1aba0b3cf57b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBlcnNvbiUyMG1vYmlsZSUyMHBob25lfGVufDF8fHx8MTc2MjE0NDY1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Recuperación de contraseña"
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/70 via-blue-900/80 to-blue-800/70"></div>
        
        {/* Contenido - Animated Checkboxes */}
        <div className="relative h-full flex items-center justify-center p-12">
          <div className="w-full max-w-lg">
            {/* Card con checkboxes animados */}
            <div className="relative">
              {/* Título descriptivo */}
              <div className="text-center mb-12">
                <h3 className="text-white text-2xl mb-3">
                  Pasos para recuperar tu cuenta
                </h3>
                <p className="text-blue-200 text-sm">
                  Proceso simple y seguro
                </p>
              </div>

              {/* Grid de checkboxes */}
              <div className="grid grid-cols-4 gap-6">
                {[
                  { delay: 0, label: '1' },
                  { delay: 0.3, label: '2' },
                  { delay: 0.6, label: '3' },
                  { delay: 0.9, label: '4' }
                ].map((item, index) => (
                  <div 
                    key={index}
                    className="flex flex-col items-center gap-3"
                    style={{
                      animation: `checkboxAppear 0.6s ease-out ${item.delay}s both`
                    }}
                  >
                    {/* Checkbox */}
                    <div className="relative w-20 h-20 bg-white/10 backdrop-blur-sm rounded-xl border-2 border-white/30 hover:border-green-400/50 transition-all duration-500 overflow-hidden group">
                      {/* Background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 to-green-500/0 group-hover:from-green-400/20 group-hover:to-green-500/20 transition-all duration-500"></div>
                      
                      {/* Check icon with animation */}
                      <div 
                        className="absolute inset-0 flex items-center justify-center"
                        style={{
                          animation: `checkAppear 0.5s ease-out ${item.delay + 0.4}s both`
                        }}
                      >
                        <Check 
                          className="w-10 h-10 text-green-400 drop-shadow-lg" 
                          strokeWidth={3}
                        />
                      </div>

                      {/* Ripple effect */}
                      <div 
                        className="absolute inset-0 rounded-xl bg-green-400/30"
                        style={{
                          animation: `ripple 2s ease-out ${item.delay}s infinite`
                        }}
                      ></div>
                    </div>

                    {/* Step label */}
                    <div className="text-center">
                      <p className="text-white/90 text-sm">
                        Paso {item.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Descriptive text for each step */}
              <div className="mt-12 space-y-3">
                {[
                  'Ingresa tu correo electrónico',
                  'Revisa tu bandeja de entrada',
                  'Haz clic en el enlace de recuperación',
                  'Crea una nueva contraseña segura'
                ].map((text, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 text-blue-100 text-sm"
                    style={{
                      animation: `slideIn 0.5s ease-out ${index * 0.2 + 1}s both`
                    }}
                  >
                    <div className="w-6 h-6 bg-blue-500/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-xs text-white">{index + 1}</span>
                    </div>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-24 h-24 bg-green-400/10 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-20 left-10 w-32 h-32 bg-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes checkboxAppear {
          from {
            opacity: 0;
            transform: scale(0.5) translateY(20px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes checkAppear {
          from {
            opacity: 0;
            transform: scale(0);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes ripple {
          0% {
            transform: scale(1);
            opacity: 0.5;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.3;
          }
          100% {
            transform: scale(1);
            opacity: 0.5;
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
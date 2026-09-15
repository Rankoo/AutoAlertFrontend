import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface VerificationProps {
  onVerify: () => void;
  onBack: () => void;
}

export function Verification({ onVerify, onBack }: VerificationProps) {
  const [code, setCode] = useState(['', '', '', '', '']);
  const [timeLeft, setTimeLeft] = useState(59);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Contador regresivo
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const handleChange = (index: number, value: string) => {
    // Solo permitir números
    if (value && !/^\d$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus al siguiente input
    if (value && index < 4) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Retroceder con backspace
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 5);
    const digits = pastedData.split('').filter(char => /^\d$/.test(char));
    
    const newCode = [...code];
    digits.forEach((digit, index) => {
      if (index < 5) {
        newCode[index] = digit;
      }
    });
    setCode(newCode);

    // Focus en el último campo lleno o el primero vacío
    const nextEmptyIndex = newCode.findIndex(val => !val);
    const focusIndex = nextEmptyIndex === -1 ? 4 : nextEmptyIndex;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.every(digit => digit !== '')) {
      onVerify();
    }
  };

  const handleResend = () => {
    setTimeLeft(59);
    setCode(['', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Verification Form */}
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
          <div className="mb-8 text-center">
            <h2 className="text-gray-900 text-2xl mb-2">
              Ingrese el código de verificación
            </h2>
            <p className="text-gray-600 text-sm">
              Por favor ingrese el código de 5 dígitos que le enviamos a su correo electrónico
            </p>
          </div>

          {/* Verification Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Code Input Fields */}
            <div className="flex justify-center gap-3">
              {code.map((digit, index) => (
                <Input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className="w-14 h-14 text-center text-xl font-semibold"
                  autoFocus={index === 0}
                />
              ))}
            </div>

            {/* Confirm Button */}
            <Button
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!code.every(digit => digit !== '')}
            >
              Confirmar
            </Button>

            {/* Resend Code */}
            <div className="text-center">
              {timeLeft > 0 ? (
                <p className="text-sm text-gray-600">
                  Reenviar código en{' '}
                  <span className="text-blue-600">{formatTime(timeLeft)}</span>
                </p>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
                >
                  Reenviar código
                </button>
              )}
            </div>
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

      {/* Right Panel - Image Background */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1692158961562-cb06d93fb63c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHBlcnNvbiUyMHRhYmxldCUyMGNoZWNrbGlzdHxlbnwxfHx8fDE3NjIxNDQzOTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Verificación de cuenta"
          className="absolute inset-0 w-full h-full object-cover opacity-30"
        />
        
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-gray-800/70"></div>
        
        {/* Contenido sobre la imagen - Checklist */}
        <div className="relative h-full flex items-center justify-center p-12">
          <div className="w-full max-w-lg">
            {/* Card flotante con checklist */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl border-2 border-white/20 p-8 shadow-2xl">
              <div className="space-y-6">
                {/* Check items */}
                {[
                  'Cuenta creada exitosamente',
                  'Información personal verificada',
                  'Configuración de seguridad',
                  'Listo para comenzar'
                ].map((item, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                    style={{
                      animation: `slideIn 0.5s ease-out ${index * 0.1}s both`
                    }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0">
                      <Check className="w-7 h-7 text-white" strokeWidth={3} />
                    </div>
                    <p className="text-white flex-1">{item}</p>
                  </div>
                ))}
              </div>

              {/* Progress bar */}
              <div className="mt-8">
                <div className="flex justify-between text-xs text-white/70 mb-2">
                  <span>Progreso de verificación</span>
                  <span>80%</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-1000"
                    style={{ width: '80%' }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-20 right-20 w-20 h-20 bg-blue-500/20 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-32 left-16 w-32 h-32 bg-green-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>

      <style>{`
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
import { useEffect, useState } from 'react';
import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from './ui/alert-dialog';
import { AlertCircle } from 'lucide-react';

interface InactivityDialogProps {
  onLogout: () => void;
  timeoutMinutes?: number; // Tiempo de inactividad en minutos (default: 15)
  warningSeconds?: number; // Tiempo que se muestra el mensaje antes de cerrar sesión (default: 10)
}

export function InactivityDialog({ 
  onLogout, 
  timeoutMinutes = 15,
  warningSeconds = 10 
}: InactivityDialogProps) {
  const [showDialog, setShowDialog] = useState(false);
  const [countdown, setCountdown] = useState(warningSeconds);
  const [lastActivity, setLastActivity] = useState(Date.now());

  // Eventos que resetean el temporizador de inactividad
  const resetTimer = () => {
    setLastActivity(Date.now());
    setShowDialog(false);
    setCountdown(warningSeconds);
  };

  useEffect(() => {
    // Lista de eventos que consideramos como "actividad del usuario"
    const events = [
      'mousedown',
      'mousemove',
      'keypress',
      'scroll',
      'touchstart',
      'click'
    ];

    // Agregar event listeners
    events.forEach(event => {
      document.addEventListener(event, resetTimer, true);
    });

    // Verificar inactividad cada segundo
    const checkInactivity = setInterval(() => {
      const now = Date.now();
      const timeSinceLastActivity = now - lastActivity;
      const inactivityThreshold = timeoutMinutes * 60 * 1000; // Convertir a milisegundos

      if (timeSinceLastActivity >= inactivityThreshold && !showDialog) {
        setShowDialog(true);
      }
    }, 1000);

    // Cleanup
    return () => {
      events.forEach(event => {
        document.removeEventListener(event, resetTimer, true);
      });
      clearInterval(checkInactivity);
    };
  }, [lastActivity, showDialog, timeoutMinutes, warningSeconds]);

  // Countdown cuando se muestra el diálogo
  useEffect(() => {
    if (showDialog) {
      if (countdown > 0) {
        const timer = setTimeout(() => {
          setCountdown(countdown - 1);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        // Tiempo agotado, cerrar sesión
        onLogout();
      }
    }
  }, [showDialog, countdown, onLogout]);

  return (
    <AlertDialog open={showDialog}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center">
              <AlertCircle className="w-9 h-9 text-orange-600" />
            </div>
          </div>
          <AlertDialogTitle className="text-center text-xl">
            Sesión inactiva
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center space-y-4">
            <p>
              Por motivos de seguridad, tu sesión se cerrará automáticamente debido a inactividad.
            </p>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <p className="text-orange-900">
                Cerrando sesión en{' '}
                <span className="text-2xl font-bold">{countdown}</span>{' '}
                {countdown === 1 ? 'segundo' : 'segundos'}
              </p>
            </div>
            <p className="text-xs text-gray-500">
              Mueve el mouse, presiona una tecla o haz clic para continuar con tu sesión
            </p>
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        {/* Progress bar */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-1000 ease-linear"
            style={{ 
              width: `${(countdown / warningSeconds) * 100}%` 
            }}
          />
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}

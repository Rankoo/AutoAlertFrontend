import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Eye, EyeOff } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useLogin } from './hooks/useLogin';


export function Login() {

  const {
    toggleShowPassword,
    showPassword,
    rememberMe,
    toggleRememberMe,
    register,
    onSubmit,
    logInMutation,
    errors
  } = useLogin()

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-8">
            
            {/* Logo */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="relative">
                <svg width="50" height="50" viewBox="0 0 50 50" fill="none">
                  <circle cx="25" cy="25" r="24" fill="#1E40AF" opacity="0.1"/>
                  <path d="M25 10C16.716 10 10 16.716 10 25C10 33.284 16.716 40 25 40C33.284 40 40 33.284 40 25C40 16.716 33.284 10 25 10ZM25 12C32.203 12 38 17.797 38 25C38 32.203 32.203 38 25 38C17.797 38 12 32.203 12 25C12 17.797 17.797 12 25 12Z" fill="#1E40AF"/>
                  <path d="M18 25L23 30L32 20" stroke="#1E40AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h1 className="text-red-600 text-3xl">Auto Alert</h1>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h2 className="text-gray-900 text-2xl mb-2">Bienvenido a Auto Alert</h2>
            <p className="text-gray-600">
              ¡Bienvenido de nuevo! Introduce tus datos para continuar.
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={onSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <Label htmlFor="email" className="text-gray-900 mb-2 block">
                Email
              </Label>
              <Input
                disabled={logInMutation.isPending}
                {...register("user")}
                id="email"
                type="email"
                aria-invalid={!!errors.user}
                placeholder="ejemplo@email.com"
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
                  disabled={logInMutation.isPending}
                  id="password"
                  aria-invalid={!!errors.password}
                  {...register("password")}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••••"
                  className="h-12 pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password?.message && (
                <p className="text-red-600 dark:text-red-400 text-sm mt-1" role="alert" aria-live="polite">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked: boolean) => toggleRememberMe(checked)}
                />
                <Label
                  htmlFor="remember"
                  className="text-sm text-gray-700 cursor-pointer"
                >
                  Acuérdate de mí
                </Label>
              </div>
              {/* TODO: Agregar funcionalidad de recuperación de contraseña */}
              {/* <button
                type="button"
                // onClick={onForgotPassword}
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline"
              >
                ¿Olvidé mi contraseña?
              </button> */}
            </div>

            {/* Login Button */}
            <Button
              disabled={logInMutation.isPending}
              type="submit"
              className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Iniciar sesión
            </Button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <p>© 2025 Automatic Alert. Todos los derechos reservados.</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-gray-700">
                  Privacidad
                </a>
                <span>•</span>
                <a href="#" className="hover:text-gray-700">
                  Términos y condiciones
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Image Background */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1758525747633-7f484dded382?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHByb2Zlc3Npb25hbCUyMHRlY2hub2xvZ3l8ZW58MXx8fHwxNzYyMTQzNTkxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Gestión Inteligente"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-blue-600/60"></div>
        
        {/* Contenido sobre la imagen */}
        <div className="relative h-full flex items-center justify-center p-12">
          <div className="text-center text-white max-w-lg">
            <div className="mb-8">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg width="40" height="40" viewBox="0 0 50 50" fill="none">
                  <circle cx="25" cy="25" r="20" fill="white" opacity="0.3"/>
                  <path d="M25 10C16.716 10 10 16.716 10 25C10 33.284 16.716 40 25 40C33.284 40 40 33.284 40 25C40 16.716 33.284 10 25 10ZM25 12C32.203 12 38 17.797 38 25C38 32.203 32.203 38 25 38C17.797 38 12 32.203 12 25C12 17.797 17.797 12 25 12Z" fill="white"/>
                  <path d="M18 25L23 30L32 20" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
            <h2 className="text-4xl mb-4">Gestión Inteligente de Pagos</h2>
            <p className="text-xl text-blue-50 leading-relaxed">
              Administra tus servicios y pagos de forma automática, segura y eficiente desde una sola plataforma
            </p>
            <div className="mt-12 grid grid-cols-3 gap-8">
              <div>
                <div className="text-3xl mb-2">24/7</div>
                <div className="text-sm text-blue-100">Disponibilidad</div>
              </div>
              <div>
                <div className="text-3xl mb-2">100%</div>
                <div className="text-sm text-blue-100">Seguro</div>
              </div>
              <div>
                <div className="text-3xl mb-2">∞</div>
                <div className="text-sm text-blue-100">Servicios</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
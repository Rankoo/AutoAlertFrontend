import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { logInAction } from "../../services/actions/authActions";
import { toast } from "react-toastify";
import { useNavigate} from "react-router";
import { useAuthStore } from "../../store/authStore";

type FormValues = {
  user: string
  password: string
}

export const useLogin = () => {
  // react hooks
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(()=>!!localStorage.getItem("userRemembered"))
  
  // libraries hooks
  const { setAuthenticated } = useAuthStore()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors }
  } = useForm<FormValues>({ 
    defaultValues:{
        user: localStorage.getItem("userRemembered") || '', password: ''
    }
  })
  
  const logInMutation = useMutation({
    mutationFn: logInAction,
    onSuccess: () => {
      setAuthenticated(true)
      handleRememberUser(rememberMe)
      toast.success("Inicio de sesión exitoso",{
        autoClose: 750,
        hideProgressBar: true,
        closeOnClick: true,
        position: "bottom-right",
      })
      navigate("/")
    },
    onError: (error) => {
      const errorMessage = (error as any)?.status === 401 
        ? "Error al iniciar sesión. Verifica tus credenciales." 
        : (error as any)?.message || " Error inesperado. Por favor, intenta nuevamente."

      toast.error(errorMessage)
      setError("user", { type: "server", message: errorMessage });
      setError("password", { type: "server", message: errorMessage });

    }
  })

  // Watch the user input to manage "Remember Me" functionality
  const userValue = watch("user")

  // functions
  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev)
  }

  const toggleRememberMe = (checked: boolean) => {
    setRememberMe(checked)
    if (!checked) {
      localStorage.removeItem("userRemembered")
    }
  }
  
  const handleRememberUser = (approved: boolean) => {
    if (approved) {
      localStorage.setItem("userRemembered", userValue)
    } else {
      localStorage.removeItem("userRemembered")
    }
  }

  const onSubmit = handleSubmit((data) => {
    logInMutation.mutate({ email: data.user, password: data.password })
  });

  // effects
  useEffect(() => {
    if (!userValue) {
      setRememberMe(false)
    }
  },[userValue])

  return {
    toggleShowPassword,
    showPassword,
    rememberMe,
    toggleRememberMe,
    register,
    onSubmit,
    logInMutation,
    errors
    
  }
}

import { logOutAction } from "@/services/actions/authActions"
import { useAuthStore } from "@/store/authStore"
import { useCurrentUserInfoStore } from "@/store/currentUserInfoStore"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate } from "react-router"

const useLogout = () => {
  
  const { setAuthenticated } = useAuthStore()
  const { setUserInfo } = useCurrentUserInfoStore()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const logOutMutation = useMutation({
    mutationFn: logOutAction,
    onSettled: () => {
      setAuthenticated(false)
      setUserInfo(undefined)
      navigate('/login')
      queryClient.cancelQueries()
    }
  })
  return {
    logOutMutation
  }
}

export default useLogout
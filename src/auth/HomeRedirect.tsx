import { Navigate, Outlet  } from "react-router"
import { useAuthStore } from "../store/authStore"
import { useCurrentUserInfo } from "./hooks/useCurrentUserInfo"
import Loader from "../components/Loader"
import { Layout } from "../layout/Layout"

export const HomeRedirect = () => {

  const { currentUserInfoQuery } = useCurrentUserInfo()
  const { isAuthenticated } = useAuthStore()
  
  if (currentUserInfoQuery.isLoading) {
    return <div className="w-full flex justify-center items-center h-screen">
      <Loader size="md" />
    </div>
  }
  
    
  if (!currentUserInfoQuery.data || !isAuthenticated) {
    return <Navigate to='/login' />
  }
  
  return (
    <>
      <Layout >
        <Outlet />
      </Layout>
    </>
  )
}

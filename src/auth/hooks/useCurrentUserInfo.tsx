import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
import { getCurrentUserInfoAction } from "../../services/actions/authActions"
import { useCurrentUserInfoStore } from "../../store/currentUserInfoStore"

export const useCurrentUserInfo = () => {
  const setUserInfo = useCurrentUserInfoStore((state) => state.setUserInfo)

  const currentUserInfoQuery = useQuery({
    queryKey: ["user","me"],
    queryFn: getCurrentUserInfoAction,
  })

  useEffect(() => {
    if (currentUserInfoQuery.data) {
      setUserInfo(currentUserInfoQuery.data)
    }
  }, [currentUserInfoQuery.data, setUserInfo])

  return {
    currentUserInfoQuery
  }
}

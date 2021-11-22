import React, { useMemo, useState } from 'react'
import { User } from 'react-native-google-signin'

export type AuthorizationContextType = {
  user: string
  setUser: (user: any) => void
}

const contextDefaultValue = {
  user: '',
  setUser: (user: User) => {}
}

export const AuthorizationContext = React.createContext<AuthorizationContextType>(contextDefaultValue)

const AuthorizationProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<any>({})
  // const encodedData = useMemo(() => {
  //   if (accessToken) {
  //     try {
  //       return jwtDecode<any>(accessToken)
  //     } catch (_) {
  //       return {}
  //     }
  //   }
  //   return {}
  // }, [accessToken])

  const contextValue = {
    user,
    setUser
  }

  return <AuthorizationContext.Provider value={contextValue}>{children}</AuthorizationContext.Provider>
}

export default AuthorizationProvider
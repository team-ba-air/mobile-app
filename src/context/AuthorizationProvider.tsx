import React, { useMemo, useState } from 'react'
import { User } from 'react-native-google-signin'

export type AuthorizationContextType = {
  user: string
  setUser: (user: any) => void
  username: string
  setUsername: (value: string) => void
}

const contextDefaultValue = {
  user: '',
  setUser: (user: User) => {},
  username: '',
  setUsername: (user: string) => {},
}

export const AuthorizationContext = React.createContext<AuthorizationContextType>(contextDefaultValue)

const AuthorizationProvider: React.FC<any> = ({ children }) => {
  const [user, setUser] = useState<any>({})
  const [username, setUsername] = useState<string>('')
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
    setUser,
    username,
    setUsername,
  }

  return <AuthorizationContext.Provider value={contextValue}>{children}</AuthorizationContext.Provider>
}

export default AuthorizationProvider
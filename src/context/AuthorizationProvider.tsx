import React, { useMemo, useState } from 'react'

export type AuthorizationContextType = {
  name: string
  setName: (name: string) => void
}

const contextDefaultValue = {
  name: '',
  setName: (name: string) => {}
}

export const AuthorizationContext = React.createContext<AuthorizationContextType>(contextDefaultValue)

const AuthorizationProvider: React.FC<any> = ({ children }) => {
  const [name, setName] = useState<string>('')
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
    name,
    setName
  }

  return <AuthorizationContext.Provider value={contextValue}>{children}</AuthorizationContext.Provider>
}

export default AuthorizationProvider
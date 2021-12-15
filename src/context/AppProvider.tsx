import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import AuthorizationProvider from './AuthorizationProvider'

const queryClient = new QueryClient()

const AppProvider: React.FC<any> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthorizationProvider>{children}</AuthorizationProvider>
    </QueryClientProvider>
  )
}

export default AppProvider
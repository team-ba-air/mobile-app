type LoginRequest = Partial<{
  username: string
  password: string
}>

type RegisterRequest = Partial<{
  username: string
  password: string
  email: string
}>

export { LoginRequest, RegisterRequest }
interface LoginResponse {
  id: string
  photo: string
  username: string
  full_name: string
  email: string
  phone_code: string
  phone_number: string
  address: string
  created_at: string
}

interface RegisterResponse {
  id: string
  username: string
}

export type { LoginResponse, RegisterResponse }
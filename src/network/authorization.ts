import { LoginRequest, RegisterRequest } from "./types/request/authorization";
import { LoginResponse, RegisterResponse } from "./types/response/authorization";
import { usePost } from "./_common";

const useLogin = () => usePost<LoginResponse, LoginRequest>('/auth/login', 'POST')

const useRegister = () => usePost<RegisterResponse, RegisterRequest>('/auth/register', 'POST')

export { useLogin, useRegister }
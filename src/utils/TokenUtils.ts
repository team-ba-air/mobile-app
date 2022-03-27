import EncryptedStorage from "react-native-encrypted-storage"

const ACCESS_TOKEN_KEY = "access_token"
const REFRESH_TOKEN_KEY = "refresh_token"

const saveAccessToken = (accessToken: string) => {
  try {
    EncryptedStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  } catch (error) {
    console.log(error)
  }
}

const getAccessToken = async (): Promise<string> => {
  const accessToken= await EncryptedStorage.getItem(ACCESS_TOKEN_KEY)

  return accessToken ?? ''
}

const removeAccessToken = async () => {
  await EncryptedStorage.removeItem(ACCESS_TOKEN_KEY)
}

const saveRefreshToken = (RefreshToken: string) => {
  try {
    EncryptedStorage.setItem(REFRESH_TOKEN_KEY, RefreshToken)
  } catch (error) {
    console.log(error)
  }
}

const getRefreshToken = async (): Promise<string> => {
  const refreshToken= await EncryptedStorage.getItem(REFRESH_TOKEN_KEY)

  return refreshToken ?? ''
}

export { saveAccessToken, getAccessToken, removeAccessToken, saveRefreshToken, getRefreshToken }
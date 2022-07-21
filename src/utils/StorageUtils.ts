import EncryptedStorage from "react-native-encrypted-storage"

const ACCESS_TOKEN_KEY = "access_token"
const REFRESH_TOKEN_KEY = "refresh_token"
const NAME_KEY = "name"
const EMAIL_KEY = "email"
const PHONE_NUMBER_KEY = "phone_number"
const PHOTO_KEY = "photo_key"

const saveAccessToken = (accessToken: string) => {
  try {
    EncryptedStorage.setItem(ACCESS_TOKEN_KEY, accessToken)
  } catch (error) {
    console.log(error)
  }
}

const saveName = (name: string) => {
  try {
    EncryptedStorage.setItem(NAME_KEY, name)
  } catch (error) {
    console.log(error)
  }
}

const saveEmail = (email: string) => {
  try {
    EncryptedStorage.setItem(EMAIL_KEY, email)
  } catch (error) {
    console.log(error)
  }
}

const savePhoneNumber = (phoneNumber: string) => {
  try {
    EncryptedStorage.setItem(PHONE_NUMBER_KEY, phoneNumber)
  } catch (error) {
    console.log(error)
  }
}

const savePhoto = (photo: string) => {
  try {
    EncryptedStorage.setItem(PHOTO_KEY, photo)
  } catch (error) {
    console.log(error)
  }
}

const getAccessToken = async (): Promise<string> => {
  const accessToken = await EncryptedStorage.getItem(ACCESS_TOKEN_KEY)

  return accessToken ?? ''
}

const getName = async (): Promise<string> => {
  const name = await EncryptedStorage.getItem(NAME_KEY)

  return name ?? ''
}

const getEmail = async (): Promise<string> => {
  const email = await EncryptedStorage.getItem(EMAIL_KEY)

  return email ?? ''
}

const getPhoneNumber = async (): Promise<string> => {
  const phoneNumber = await EncryptedStorage.getItem(PHONE_NUMBER_KEY)

  return phoneNumber ?? ''
}

const getPhoto = async (): Promise<string> => {
  const photo = await EncryptedStorage.getItem(PHOTO_KEY)

  return photo ?? ''
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

export { 
  saveAccessToken, 
  saveName,
  saveEmail,
  savePhoneNumber,
  savePhoto,
  getAccessToken, 
  getName,
  getEmail,
  getPhoneNumber,
  getPhoto,
  removeAccessToken, 
  saveRefreshToken, 
  getRefreshToken 
}
import { object, setLocale, string } from 'yup'

setLocale({
  mixed: {
    required: 'Data tidak boleh kosong',
    notType: 'Format Input Tidak Sesuai',
  },
})

export const registerSchema = object().shape({
  username: string().required(),
  email: string().required(),
  password: string().required(),
})

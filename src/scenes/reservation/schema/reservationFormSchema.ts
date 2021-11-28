import { array, object, setLocale, string } from 'yup'

setLocale({
  mixed: {
    required: 'Data tidak boleh kosong',
    notType: 'Format Input Tidak Sesuai',
  },
})

export const reservationFormSchema = object().shape({
  car: string().required(),
  hour: string().required(),
  service: string().required(),
})

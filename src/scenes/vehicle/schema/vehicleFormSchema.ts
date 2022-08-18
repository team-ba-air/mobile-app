import { array, date, object, setLocale, string } from 'yup'

setLocale({
  mixed: {
    required: 'Data tidak boleh kosong',
    notType: 'Format Input Tidak Sesuai',
  },
})

export const vehicleFormSchema = object().shape({
  brand: string().required(),
  type: string().required(),
  year: string().required(),
  plat: string().required(),
  expireDate: date().required(),
})
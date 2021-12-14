import { object, string, number, setLocale } from "yup";

setLocale({
  mixed: {
    required: 'Data tidak boleh kosong',
    notType: 'Format Input Tidak Sesuai',
  },
})

export const carSchema = object().shape({
  brand: string().required(),
  type: string().required(),
  year: string().required(),
  plat: string().required(),
})
import { number, object, setLocale, string } from 'yup'

setLocale({
  mixed: {
    required: 'Data tidak boleh kosong',
    notType: 'Format Input Tidak Sesuai',
  },
})

export const reviewHistorySchema = object().shape({
  rating: number().required().moreThan(0, "Rating perlu diisi"),
  review: string().required("Ulasan perlu diisi"),
})

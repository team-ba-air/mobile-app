import Intl from 'intl'
import 'intl/locale-data/jsonp/de-DE'
import 'intl/locale-data/jsonp/pt-PT'

const formatRupiah = (value: number) : string => {
  return 'Rp' + new Intl.NumberFormat('de-DE').format(value)
  // return 'Rp' + value.toString()
}

const formatDistance = (value: number) : string => {
  return value <= 20 ? new Intl.NumberFormat('pt-PT',  {
    style: 'unit',
    unit: 'kilometer'
  }).format(50.21233) : '> 20 km'
}

export { formatRupiah, formatDistance }

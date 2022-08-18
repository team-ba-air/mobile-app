import Intl from 'intl'
import 'intl/locale-data/jsonp/de-DE'
import 'intl/locale-data/jsonp/pt-PT'

const formatRupiah = (value: number) : string => {
  return 'Rp' + new Intl.NumberFormat('de-DE').format(value)
  // return 'Rp' + value.toString()
}

const formatDistance = (value: number) : string => {
  const valueRounded = Math.round(value)
  if (valueRounded < 1000) {
    return `${valueRounded} m`
  }

  const valueKilometer = valueRounded / 1000

  if (valueKilometer > 20) {
    return `>20 km`
  }

  return valueKilometer.toFixed(1)
}

const isOnlySpace = (value: string): boolean => {
  return value.trim().length === 0
}

export { formatRupiah, formatDistance, isOnlySpace }

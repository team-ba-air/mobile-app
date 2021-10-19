const getFullFormatDate = (date: Date) => {
  let fullFormat = getFormatDate(date) + ' ' + getFormatHour(date)
  return fullFormat
}

const getFormatDate = (date: Date) => {
  let formatDate = date.getDate() +
  ' ' +
  date.toLocaleString('default', { month: 'long' }) +
  ' ' +
  date.getFullYear()

  return formatDate
}

const getFormatHour = (date: Date) => {
  let formatHour = date.getHours() +
  ':' +
  date.getMinutes()

  return formatHour
}

export { getFullFormatDate, getFormatDate, getFormatHour }
const getFullFormatDate = (date: Date) => {
  let fullFormat = getFormatDate(date) + ' ' + getFormatHour(date)
  return fullFormat
}

const getFormatDate = (date: Date) => {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  let formatDate = date.getDate() +
  ' ' +
  monthNames[date.getMonth()] +
  ' ' +
  date.getFullYear()

  return formatDate
}

const getFormatDateNumeric = (date: Date, separator: string = '/') => {
  const day = date.getDate()
  const month = date.getMonth()
  let formatDate = (day < 10 ? `0${day}`: day )+
  separator +
  (month < 9 ? `0${month+1}`: `${month+1}` ) +
  separator +
  date.getFullYear()

  return formatDate
}

const getFormatHour = (date: Date) => {
  const hour = date.getHours()
  const minute = date.getMinutes()
  let formatHour = (hour < 10 ? `0${hour}` : hour) +
  ':' +
  (minute < 10 ? `0${minute}` : minute)

  return formatHour
}

export { getFullFormatDate, getFormatDate, getFormatDateNumeric, getFormatHour }
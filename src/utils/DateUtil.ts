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

const getFormatHour = (date: Date) => {
  let formatHour = date.getHours() +
  ':' +
  date.getMinutes()

  return formatHour
}

export { getFullFormatDate, getFormatDate, getFormatHour }
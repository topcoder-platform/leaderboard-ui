const leadingZero = (number) => {
  if (number < 10) {
    return `0${number}`
  }

  if (number > 99) {
    return '99'
  }

  return number
}

const hexToName = (hexColor) => {
  switch (hexColor) {
    case '#FD7D00': return 'orange'
    case '#2598D5': return 'blue'
    case '#5CC900': return 'green'
  }
  return 'blue'
}

export { leadingZero, hexToName }

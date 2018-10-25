const leadingZero = (number) => {
  if (number < 10) {
    return `0${number}`
  }

  if (number > 99) {
    return '99'
  }

  return number
}

export { leadingZero }

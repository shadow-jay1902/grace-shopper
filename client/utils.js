export const decimalCleaner = num => {
  console.log(num)
  const splitVal = String(num / 100).split('.')
  while (splitVal[1] && splitVal[1].length < 2) splitVal[1] += '0'
  if (!splitVal[1]) {
    splitVal.push('00')
  }
  return splitVal[0] + '.' + splitVal[1].slice(0, 2)
  return num
}

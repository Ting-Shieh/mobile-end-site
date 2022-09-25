export const genRandomVal = (val) => {
  return Math.floor(Math.random() * val)
}

export const toThousandsFormat = (num) => {
  let result = ''
  let counter = 0
  num = (num || 0).toString()
  for (var i = num.length - 1; i >= 0; i--) {
    counter++
    result = num.charAt(i) + result
    if (!(counter % 3) && i !== 0) {
      result = ',' + result
    }
  }
  return result
}

function addZenoStr (num) {
  return num < 10 ? '0' + num : num
}

/**
 *
 * @returns [00, 01:00, ..., 24:00]
 */
export const gen24HourStrFormat = () => {
  const arr = []
  for (let i = 0; i < 24 + 1; i++) {
    arr.push(`${addZenoStr(i)}:00`)
  }
  return arr
}

/**
 *
 * @param {*} targetArr [0,8,16,24]
 * @returns
 */
export const pick24HourTarget = (hours24Arr, targetArr) => {
  const res = targetArr.map(t => {
    return hours24Arr[t]
  })
  // for()
  // targetArr.forEach(t => {
  //   res.push(hours24Arr[t])
  // })
  return res
}

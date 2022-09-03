import mockData from './data/mock-data.json'
import { genRandomVal, toThousandsFormat, gen24HourStrFormat, pick24HourTarget } from '@/utils/gen-data.js'
import { ref, onMounted } from 'vue'

function addSalesSeriesData (arrLength, valRange = 10000) {
  const arr = []
  for (let i = 0; i < arrLength; i++) {
    arr.push(genRandomVal(valRange))
  }
  return arr
}
//
const hours24Arr = gen24HourStrFormat()
const pickhr = [0, 8, 16, 24]
// 旭日圖
const colors = ['rgb(0,211,255)', 'rgb(0,123,255)', 'rgb(0,218,234)', 'rgb(35,69,145)', '#9A2555']
const itemStyle = {
  star5: {
    color: colors[0]
  },
  star4: {
    color: colors[1]
  },
  star3: {
    color: colors[2]
  },
  star2: {
    color: colors[3]
  }
}
const addOther2SunData = (data) => {
  for (let j = 0; j < data.length; ++j) {
    const level1 = data[j].children
    for (let i = 0; i < level1.length; ++i) {
      const block = level1[i].children
      const bookScore = []
      let bookScoreId
      for (let star = 0; star < block.length; ++star) {
        let style = (function (name) {
          switch (name) {
            case '5☆':
              bookScoreId = 0
              return itemStyle.star5
            case '4☆':
              bookScoreId = 1
              return itemStyle.star4
            case '3☆':
              bookScoreId = 2
              return itemStyle.star3
            case '2☆':
              bookScoreId = 3
              return itemStyle.star2
          }
        })(block[star].name)

        block[star].label = {
          color: style.color,
          downplay: {
            opacity: 0.5
          }
        }

        if (block[star].children) {
          style = {
            opacity: 1,
            color: style.color
          }
          block[star].children.forEach(function (book) {
            book.value = 1
            book.itemStyle = style

            book.label = {
              color: style.color
            }

            let value = 1
            if (bookScoreId === 0 || bookScoreId === 3) {
              value = 5
            }

            if (bookScore[bookScoreId]) {
              bookScore[bookScoreId].value += value
            } else {
              bookScore[bookScoreId] = {
                color: colors[bookScoreId],
                value: value
              }
            }
          })
        }
      }

      level1[i].itemStyle = {
        color: data[j].itemStyle.color
      }
    }
  }
}

export default function () {
  const salesBarData = ref(mockData.salesBarMockData)
  const salesLineData = ref(mockData.salesLineMockData)
  const salesPieData = ref(mockData.salesPieMockData)
  const salesSunData = ref(mockData.salesSunMockData)
  const salesRadarData = ref(mockData.salesRadarMockData)
  onMounted(() => {
    // 淺拷貝
    const ranDollars = genRandomVal(10000000)
    const _salesBarData = { ...salesBarData.value }
    _salesBarData.title = `${_salesBarData.title}: ${toThousandsFormat(ranDollars)} 元`
    _salesBarData.data1Obj.data1 = addSalesSeriesData(_salesBarData.axis.length)
    _salesBarData.data2Obj.data2 = addSalesSeriesData(_salesBarData.axis.length)
    salesBarData.value = _salesBarData

    // 淺拷貝
    const _salesLineData = { ...salesLineData.value }
    _salesLineData.axis = pick24HourTarget(hours24Arr, pickhr)
    _salesLineData.data1Obj.data1 = addSalesSeriesData(_salesLineData.axis.length, 1000)
    _salesLineData.data2Obj.data2 = addSalesSeriesData(_salesLineData.axis.length, 1000)
    _salesLineData.data3Obj.data3 = addSalesSeriesData(_salesLineData.axis.length, 1000)
    salesLineData.value = _salesLineData

    // 淺拷貝
    const _salesPieData = { ...salesPieData.value }
    const v1 = genRandomVal(100)
    _salesPieData.data1Obj.value = `${v1}%`
    _salesPieData.data1Obj.range.push(v1 * (_salesPieData.data1Obj.range[0] / 100)) // 因為整體市1000，所以1000/100
    const v2 = genRandomVal(100)
    _salesPieData.data2Obj.value = `${v2}%`
    _salesPieData.data2Obj.range.push(v2 * (_salesPieData.data1Obj.range[0] / 100))
    const v3 = genRandomVal(100)
    _salesPieData.data3Obj.value = `${v3}%`
    _salesPieData.data3Obj.range.push(v3 * (_salesPieData.data1Obj.range[0] / 100))
    salesPieData.value = _salesPieData

    // 淺拷貝
    const _salesSunData = [...salesSunData.value]
    _salesSunData.forEach((item, index) => {
      item.itemStyle.color = colors[index + 1]
    })
    addOther2SunData(_salesSunData)
    salesSunData.value = _salesSunData

    // 淺拷貝
    const _salesRadarData = { ...salesRadarData.value }
    _salesRadarData.predictData.value = addSalesSeriesData(_salesRadarData.indicator.length, 10000)
    _salesRadarData.realData.value = addSalesSeriesData(_salesRadarData.indicator.length, 10000)
    salesRadarData.value = _salesRadarData
  })
  return {
    salesBarData,
    salesLineData,
    salesPieData,
    salesSunData,
    sunColors: colors,
    salesRadarData
  }
}

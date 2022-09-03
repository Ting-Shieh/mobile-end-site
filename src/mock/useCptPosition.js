import cptPositionData from './data/cpt-position.json'
import { onMounted } from 'vue'

export default function () {
  const salesBarPosition = cptPositionData.salesBarCptPosition
  const salesLinePosition = cptPositionData.salesLineCptPosition

  onMounted(() => {
  })
  return {
    salesBarPosition,
    salesLinePosition
  }
}

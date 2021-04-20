import { reactive, onMounted, onUnmounted } from 'vue'


const useMousePosition = () => {
  const mousePosition = reactive({ x: 0, y: 0 })

  const handler = (e: MouseEvent) => {
    mousePosition.x = e.x
    mousePosition.y = e.y
  }


  onMounted(() => {
    document.addEventListener('dblclick', handler)
  })
  onUnmounted(() => {
    document.removeEventListener('dblclick', handler)
  })


  return mousePosition
}



export default useMousePosition
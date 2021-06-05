import { defineComponent } from 'vue'
export default defineComponent({
  name: 'tsx',
  setup() {
  const fontFamilyArr = [
  { text: '宋体', value: '"SimSun","STSong"' },
  { text: '黑体', value: '"SimHei","STHeiti"' },
  { text: '楷体', value: '"KaiTi","STKaiti"' },
  { text: '仿宋', value: '"FangSong","STFangsong"' },
  ]
    
  
    return () => <div>

      {/* {fontFamilyArr.map(ele => {
        
        return <div style={{fontFamily:ele.value}}>{ele.text}</div>
      }
        
      )} */}
      
     

    </div>
  }
})

<template>
  <!-- 右边的图片上传图标 -->
  <MutilImageUpload class="editor-upload-btn" @successCBK="imageSuccessCBK" />
</template>
<script>

import MutilImageUpload from './components/MutilImageUpload'
import { savePhotosList } from '@/api/newsphotos'  // 保存图片到指定新闻类别下

export default {
  name: 'NewsImageUpload',
  components: { MutilImageUpload },
  props: {
    nid: {
      type: String,
      default: ''
    }
  },
  data() { return {} },
  computed: { },
  methods: {
    imageSuccessCBK(dataList) {
      const photoList = []
      // Js的遍历Map对象
      const objKeyArr = Object.keys(dataList)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        const tempData = {}
        tempData.fileName = dataList[objKeyArr[i]].fileName
        tempData.fileSize = dataList[objKeyArr[i]].fileSize
        tempData.serverPath = dataList[objKeyArr[i]].serverPath
        tempData.extName = dataList[objKeyArr[i]].extName
        photoList.push(tempData)
      }

      savePhotosList({ nid: this.nid, photoList: photoList }).then(res => {
        // 上传成功调用图片列表也方法刷新列表页面
        this.$emit('successUploadCBK')
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
  .editor-upload-btn {
    display: inline-block;
  }
</style>

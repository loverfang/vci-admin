<template>
  <!-- 右边的图片上传图标 -->
  <MutilFilesUpload class="editor-upload-btn" @successCBK="filesSuccessCBK" />
</template>
<script>

import MutilFilesUpload from './components/MutilFilesUpload'
import { saveFileList } from '@/api/vcifiles' // 保存图片到指定新闻类别下

export default {
  name: 'FilesUpload',
  components: { MutilFilesUpload },
  props: {
    parentId: {
      type: String,
      default: ''
    }
  },
  data() { return {} },
  computed: { },
  methods: {
    filesSuccessCBK(dataList) {
      const fileList = []
      // Js的遍历Map对象
      const objKeyArr = Object.keys(dataList)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        const tempData = {}
        tempData.fileName = dataList[objKeyArr[i]].fileName
        tempData.fileSize = dataList[objKeyArr[i]].fileSize
        tempData.serverPath = dataList[objKeyArr[i]].serverPath
        tempData.extName = dataList[objKeyArr[i]].extName
        fileList.push(tempData)
      }

      saveFileList({ fileList }).then(res => {
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

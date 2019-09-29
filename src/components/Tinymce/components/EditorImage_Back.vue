// 网上找的第三方参考信息

<template>
  <el-button :style="{background:color,borderColor:color}" icon="el-icon-upload" size="mini" type="primary"
             @click=" dialogVisible=true">上传图片
  </el-button>
  <el-dialog :visible.sync="dialogVisible" append-to-body>
    <el-upload
      :multiple="true"
      :file-list="fileList"
      :show-file-list="true"
      :on-remove="handleRemove"
      :on-success="handleSuccess"
      :before-upload="beforeUpload"
      :on-exceed="handleExceed"
      class="editor-slide-upload"
      action="https://httpbin.org/post"
      list-type="picture-card">
      <el-button size="mini" type="primary">点击上传</el-button>
    </el-upload>
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleSubmit">确 定</el-button>
  </el-dialog>
</template>

<script>
export default {
  name: 'EditorSlideUpload',
  props: {
    color: {
      type: String,
      default: '#1890ff'
    }
  },
  data () {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: []
    }
  },
methods: {
checkAllSuccess () {
return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
},
handleSubmit () {
const arr = Object.keys(this.listObj).map(v => this.listObj[v])
if (!this.checkAllSuccess()) {
this.$message('请耐心等待所有图片上传成功!')
return
}
this.$emit('successCBK', arr)
this.listObj = {}
this.fileList = []
this.dialogVisible = false
},
handleSuccess (response, file) {
const uid = file.uid
const objKeyArr = Object.keys(this.listObj)
for (let i = 0, len = objKeyArr.length; i < len; i++) {
if (this.listObj[objKeyArr[i]].uid === uid) {
this.listObj[objKeyArr[i]].url = response.files.file
this.listObj[objKeyArr[i]].hasSuccess = true
return
}
}
},
handleRemove (file) {
const uid = file.uid
const objKeyArr = Object.keys(this.listObj)
for (let i = 0, len = objKeyArr.length; i < len; i++) {
if (this.listObj[objKeyArr[i]].uid === uid) {
delete this.listObj[objKeyArr[i]]
return
}
}
},
/**上传文件之前的钩子（参数为上传的文件）**/
beforeUpload (file) {
const _URL = window.URL || window.webkitURL
const fileName = file.uid
this.listObj[fileName] = {}
//图片类型和大小判断
let reg = new RegExp('[.jpg|.png]$')
if (Math.floor(file.size / 1024 / 1024) < 2) {
if (file && reg.test(file.name)) {
} else {
this.$message.error('图片格式不正确，请上传JPG或PNG格式的图片！')
return false
}
} else {
this.$message.error('只能上传小于2MB的图片！')
return false
}
return new Promise((resolve, reject) => {
const img = new Image()
img.src = _URL.createObjectURL(file)
if (img) {
img.onload = () => {
this.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: this.width, height: this.height }
}
}
resolve(true)
})
},
handleExceed (files, fileList) {} //文件超出个数限制时的钩子
}
</script>

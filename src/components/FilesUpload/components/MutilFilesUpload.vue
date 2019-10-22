<template>
  <div class="upload-container">
    <el-button icon="el-icon-upload" size="normal" type="primary" @click="dialogVisible=true">
      上传文件
    </el-button>
    <el-dialog :visible.sync="dialogVisible">
      <el-upload
        :multiple="true"
        :file-list="fileList"
        :show-file-list="true"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
        class="editor-slide-upload"
        action="/api/manage/uploadFile"
      >
        <el-button size="small" type="primary">
          点击选择
        </el-button>
      </el-upload>
      <div align="right">
        <el-button align="right" @click="dialogVisible = false">
          取消
        </el-button>
        <el-button type="primary" align="right" @click="handleSubmit">
          确认
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'MutilFilesUpload',
  data() {
    return {
      dialogVisible: false,
      listObj: {},
      fileList: [] // 用户上传按钮页面显示的数据
    }
  },
  methods: {
    checkAllSuccess() {
      return Object.keys(this.listObj).every(item => this.listObj[item].hasSuccess)
    },
    handleSubmit() {
      // const arr = Object.keys(this.listObj).map(v => this.listObj[v])
      if (!this.checkAllSuccess()) {
        this.$message('请等待所有图片上传完成.如果是网络问题,请刷新本页重新上传!')
        return
      }
      this.$emit('successCBK', this.listObj)
      this.dialogVisible = false
      this.listObj = {}
      this.fileList = []
    },

    handleSuccess(response, file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          if (response && response.flag === 1) {
            // 用于页面显示控制的文件列表
            this.listObj[objKeyArr[i]].hasSuccess = true
            // 文件名
            this.listObj[objKeyArr[i]].fileName = response.data.fileName
            // 扩展名
            this.listObj[objKeyArr[i]].extName = response.data.extName
            // 文件大小，字节
            this.listObj[objKeyArr[i]].fileSize = response.data.fileSize
            // 文件存储在服务器的相对地址
            this.listObj[objKeyArr[i]].serverPath = response.data.serverPath
            // 修改默认的图片显示内容
            file.url = response.data.serverPath
            file.name = response.data.fileName
          } else {
            // 用于页面显示控制的文件列表
            this.listObj[objKeyArr[i]].hasSuccess = false
          }
          return
        }
      }
    },

    handleRemove(file) {
      const uid = file.uid
      const objKeyArr = Object.keys(this.listObj)
      for (let i = 0, len = objKeyArr.length; i < len; i++) {
        if (this.listObj[objKeyArr[i]].uid === uid) {
          delete this.listObj[objKeyArr[i]]
          return
        }
      }
    },

    /** 上传文件之前的钩子（参数为上传的文件）**/
    beforeUpload(file) {
      /** window.URL || window.webkitURL || window.mozURL 的作用
        如果我们做文件上传的时候，想在没有上传服务器端的情况下看到上传图片的效果图的时候就可是以通过
        var url=window.URL.createObjectURL(obj.files[0]); 获得一个http格式的url路径，这个时候就可以设置到<img>中显示了。
        注意：windows的URL对象是硬盘（SD卡等）指向文件的一个路径

        window.webkitURL和window.URL是一样的，
        window.URL标准定义，
        window.webkitURL是webkit内核的实现（一般手机上就是使用这个），还有火狐等浏览器的实现。
      **/
      // const _URL = window.URL || window.webkitURL || window.mozURL
      const fileName = file.uid
      this.listObj[fileName] = {}

      // 图片类型和大小判断
      const reg = new RegExp('[.pdf|.doc|.docx|.xlsx|.xls]$')
      if (Math.floor(file.size / 1024 / 1024) < 20) {
        if (file && reg.test(file.type)) {
          console.log('文件格式验证通过!')
          this.listObj[fileName] = { hasSuccess: false, uid: file.uid }
        } else {
          this.$message.error('文件格式不正确，请上传.pdf|.doc|.docx|.xlsx|.xls类型的文件！')
          return false
        }
      } else {
        this.$message.error('只能上传小于20MB的文件！')
        return false
      }

      // 图片加载完成后得到图片的宽度和高度
      // return new Promise((resolve, reject) => {
      //   const img = new Image()
      //   img.src = _URL.createObjectURL(file)
      //   if (img) {
      //     img.onload = () => {
      //       this.listObj[fileName] = { hasSuccess: false, uid: file.uid, width: img.width, height: img.height }
      //     }
      //   }
      //   resolve(true)
      // })
    }
  }
}
</script>

<style lang="scss" scoped>
.editor-slide-upload {
  margin-bottom: 20px;
  /deep/ .el-upload--picture-card {
    width: 100%;
  }
}
</style>

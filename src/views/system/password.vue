<template>
  <div class="app-container">
    <el-form ref="postForm" :model="postForm" :rules="rules" label-width="120px">
      <el-form-item label="原密码" prop="password">
        <el-col :span="11">
          <el-input v-model="postForm.password" placeholder="原始密码" />
        </el-col>
      </el-form-item>
      <el-form-item label="新密码" prop="newpassword">
        <el-col :span="11">
          <el-input v-model="postForm.newpassword" placeholder="新密码" />
        </el-col>
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmpwd">
        <el-col :span="11">
          <el-input v-model="postForm.confirmpwd" placeholder="确认新密码" />
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
        <el-button @click="onCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { resetPwd } from '@/api/user'

export default {
  name: 'RestPassword',
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        // this.$message({
        //   message: rule.field + '为必传项',
        //   type: 'error'
        // })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    return {
      postForm: {
        password: '',
        newpassword: '',
        confirmpwd: ''
      },
      rules: {
        password: [{ validator: validateRequire }],
        newpassword: [{ validator: validateRequire }],
        confirmpwd: [{ validator: validateRequire }]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.postForm.validate(valid => {
        debugger
        if (valid) {
          this.loading = true
          resetPwd(this.postForm).then(() => {
            this.$message({
              message: '密码修改完成,请重新登录!',
              type: 'success'
            })
            window.setTimeout(this.logout, 2000)
          })
          this.loading = false
        } else {
          this.loading = false
        }
      })
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    onCancel() {
      this.postForm = {}
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    }
  }
}
</script>

<style scoped>
</style>

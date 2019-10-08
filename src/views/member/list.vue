<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input v-model="listQuery.name" placeholder="会员姓名" style="width: 280px;" class="filter-item" @keyup.enter.native="handleFilter" />
      <el-button class="filter-item" type="primary" icon="el-icon-search" @click="handleFilter">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
    </div>

    <el-table v-loading="listLoading" :data="list" border fit highlight-current-row style="width: 100%">
      <el-table-column align="center" label="编号" min-width="5%">
        <template slot-scope="scope">
          <span>{{ scope.row.memid }}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" label="用户名" min-width="20%" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>
      <el-table-column align="left" label="姓名" min-width="15%" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="状态" min-width="8%" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.status === 'NORMAL'">
            <el-tag :type="scope.row.status | statusFilter">
              正常
            </el-tag>
          </div>
          <div v-else-if="scope.row.status === 'WAITCHECK'">
            <el-tag :type="scope.row.status | statusFilter">
              待审核
            </el-tag>
          </div>
          <div v-else>
            <el-tag :type="scope.row.status | statusFilter">
              已删除
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="电话" min-width="12%">
        <template slot-scope="scope">
          <span>{{ scope.row.phone }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="邮箱" min-width="20%" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.email }}</span>
        </template>
      </el-table-column>
      <el-table-column label="任职公司" min-width="25%">
        <template slot-scope="scope">
          <span>{{ scope.row.company }}</span>
        </template>
      </el-table-column>
      <el-table-column label="工作职位" min-width="20%" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.jobtitle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="视频场次(剩余)" min-width="8%" align="center">
        <template slot-scope="scope">
          {{ scope.row.avldays }}次
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="30%">
        <template slot-scope="{row}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button v-if="row.status!=='NORMAL' && row.status!=='WAITCHECK'" size="mini" type="success" @click="handleModifyStatus(row,'NORMAL')">
            恢复
          </el-button>
          <el-button v-if="row.status!=='LOCKED' && row.status!=='WAITCHECK'" size="mini" type="danger" @click="handleModifyStatus(row,'LOCKED')">
            删除
          </el-button>
          <el-button v-if="row.status==='WAITCHECK'" size="mini" type="danger" @click="handleModifyStatus(row,'NORMAL')">
            审核通过
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div align="right">
      <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
    </div>
    <!-- 添加编辑弹出框 -->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" top="3vh">
      <el-form ref="dataForm" :rules="rules" :model="postForm" label-position="left" label-width="120px" min-width="98%">
        <el-row :gutter="10" height="30px;">
          <el-col :span="12">
            <el-form-item label="登录账号" prop="username">
              <el-input v-model="postForm.username" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="登录密码" prop="password">
              <template v-if="dialogStatus==='create'">
                <el-input v-model="postForm.password" type="password" />
              </template>
              <template v-if="dialogStatus!=='create'">
                <el-input v-model="postForm.password" type="password" disabled />
              </template>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="会员类型">
              <el-input v-model="postForm.usertype" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="会员卡号">
              <el-input v-model="postForm.cardnum" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="姓名" prop="name">
              <el-input v-model="postForm.name" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="电话">
              <el-input v-model="postForm.phone" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="邮箱">
              <el-input v-model="postForm.email" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="公司">
              <el-input v-model="postForm.company" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item label="工作职位">
              <el-input v-model="postForm.jobtitle" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="VCI服务顾问">
              <el-input v-model="postForm.vciguwen" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item v-only-number="{max:10000,min:0,precision:0}" label="可观看视频场次" prop="viewcount">
              <el-input v-model="postForm.viewcount" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-only-number="{max:10000,min:0,precision:0}" label="总共可培训天数" prop="totaldays">
              <el-input v-model="postForm.totaldays" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="12">
            <el-form-item v-only-number="{max:10000,min:0,precision:0}" label="剩余可培训天数" prop="avldays">
              <el-input v-model="postForm.avldays" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="已享用权益1">
              <el-input v-model="postForm.txt1" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="已享用权益2">
              <el-input v-model="postForm.txt2" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="已享用权益3">
              <el-input v-model="postForm.txt3" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="已享用权益4">
              <el-input v-model="postForm.txt4" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="已享用权益5">
              <el-input v-model="postForm.txt5" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="已享用权益6">
              <el-input v-model="postForm.txt6" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="已享用权益7">
              <el-input v-model="postForm.txt7" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="已享用权益8">
              <el-input v-model="postForm.txt8" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="已享用权益9">
              <el-input v-model="postForm.txt9" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="已享用权益10">
              <el-input v-model="postForm.txt10" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="已享用权益11">
              <el-input v-model="postForm.txt11" />
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="已享用权益12">
              <el-input v-model="postForm.txt12" />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认保存
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { fetchList, addMember, updateMember, updateMemberStatus } from '@/api/member' // 引入需要请求的路径

const defaultForm = {
  memid: undefined,
  username: '',
  password: '',
  usertype: '',
  cardnum: '',
  name: '',
  phone: '',
  email: '',
  company: '',
  jobtitle: '',
  vciguwen: '',
  viewcount: 0,
  totaldays: 0,
  avldays: 0,
  txt1: '',
  txt2: '',
  txt3: '',
  txt4: '',
  txt5: '',
  txt6: '',
  txt7: '',
  txt8: '',
  txt9: '',
  txt10: '',
  txt11: '',
  txt12: ''
}

export default {
  name: 'MemberList',
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        NORMAL: 'success',
        WAITCHECK: 'warning'
      }
      return statusMap[status]
    }
  },
  data() {
    const validateRequire = (rule, value, callback) => {
      if (value === '') {
        this.$message({
          message: rule.field + '为必传项',
          type: 'error'
        })
        callback(new Error(rule.field + '为必传项'))
      } else {
        callback()
      }
    }
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        name: null,
        page: 1,
        limit: 10
      },
      postForm: Object.assign({}, defaultForm),
      textMap: {
        update: '更新会员信息',
        create: '添加新会员'
      },
      dialogFormVisible: false,
      dialogStatus: '',
      rules: {
        username: [{ validator: validateRequire }],
        password: [{ validator: validateRequire }],
        name: [{ validator: validateRequire }],
        viewcount: [{ validator: validateRequire }]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          addMember(this.postForm).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$message({
              message: '添加成功!',
              type: 'success'
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.postForm = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.postForm)
          updateMember(tempData).then(() => {
            // for (const v of this.list) {
            //   if (v.memid === this.postForm.memid) {
            //     const index = this.list.indexOf(v)
            //     this.list.splice(index, 1, this.postForm)
            //     break
            //   }
            // }
            this.getList()
            this.dialogFormVisible = false
            this.$message({
              message: '修改成功!',
              type: 'success'
            })
          })
        }
      })
    },
    handleModifyStatus(row, status) {
      const params = { memid: row.memid, status: status }
      updateMemberStatus(params).then(() => {
        this.$message({
          message: '操作成功!',
          type: 'success'
        })
        row.status = status
      })
    },
    resetTemp() {
      this.defaultForm = {
        memid: undefined,
        username: '',
        password: '',
        usertype: '',
        cardnum: '',
        name: '',
        phone: '',
        email: '',
        company: '',
        jobtitle: '',
        vciguwen: '',
        viewcount: 0,
        totaldays: 0,
        avldays: 0,
        txt1: '',
        txt2: '',
        txt3: '',
        txt4: '',
        txt5: '',
        txt6: '',
        txt7: '',
        txt8: '',
        txt9: '',
        txt10: '',
        txt11: '',
        txt12: ''
      }
    }
  }
}
</script>

<style scoped>
  .el-form >>> .el-form-item label:after {
    content: " ";
    display: inline-block;
    width: 100%;
  }

  .el-form >>> .el-form-item__label {
    text-align: justify;
    text-align:right;
    height: 40px;
  }

  .el-form >>> .el-form-item__content {
    text-align: justify;
    text-align:right;
    height: 40px;
  }
</style>

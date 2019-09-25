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
      <el-table-column align="left" label="用户名" min-width="20%"  :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.username }}</span>
        </template>
      </el-table-column>

      <el-table-column align="left" label="姓名" min-width="15%" :show-overflow-tooltip="true">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>

      <el-table-column class-name="status-col" label="状态"  min-width="8%" align="center" >

        <template slot-scope="scope" >
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
      <el-table-column align="center" label="操作"  min-width="30%">
        <template slot-scope="scope">
          <router-link :to="'/example/edit/'+scope.row.id">
            <el-button type="primary" size="small" icon="el-icon-edit">
              编辑
            </el-button>
            <el-button type=" " size="small" icon="el-icon-delete">
              删除
            </el-button>
          </router-link>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" align="right"/>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination' // Secondary package based on el-pagination
import { fetchList } from '@/api/member' // 引入需要请求的路径

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
    return {
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        name: null,
        page: 1,
        limit: 10
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
      alert(2)
    }
  }
}
</script>

<style scoped>
.edit-input {
  padding-right: 100px;
}
.cancel-btn {
  position: absolute;
  right: 15px;
  top: 10px;
}
</style>

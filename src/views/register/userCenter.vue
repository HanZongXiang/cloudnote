<template>
  <div class="w1170 wrapper">
    <el-card>
      <div slot="header">用户列表</div>
      <el-table :data="tableData" border>
        <el-table-column label="用户" prop="username"></el-table-column>
        <el-table-column label="头像" prop="avatar">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" class="table-item-img">
          </template>
        </el-table-column>
        <el-table-column label="邮箱" prop="email"></el-table-column>
        <el-table-column label="描述" prop="desc"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="edit(scope.row._id)" type="warning" size="mini">编辑</el-button>
            <el-button @click="remove(scope.row._id)" type="danger" size="mini">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="page-wrap">
        <el-pagination
          background
          :page-size="4"
          layout="prev, pager, next, jumper"
          :total="total"
          @current-change="pageChange"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name:'',
  data() {
    return {
      tableData: [],
      page: 1,
      total: 0
    }
  },
  components: {

  },
  methods: {
    getTableData() {
      this.$axios.get('/user',{page: this.page,page_size: 4}).then(res => {
        this.tableData = res.data
        this.total = res.total
      })
    },
    edit(id) {
      this.$router.push(`/layout/userEdit/${id}`)
    },
    remove(id) {
      this.$confirm('此操作将永久删除该用户信息，是否继续?','警告',{
        confirmButtonText:'确定',
        cancelButtonText:'取消',
        type:'warning'
      }).then(res => {
        if (id == this.$store.state.userInfo.id) {
          this.$message.error('不能自己删除自己')
        } else {
          this.$axios.delete(`/user/${id}`).then(res => {
            if (res.code == 200) {
              this.$message.success(res.msg)
              this.getTableData()
            }
          })
        }
      }).catch(err => {
          this.$message.info('请求有误')
        })
    },
    pageChange(page) {
      this.page = page
      this.getTableData()
    }
  },
  created() {
    this.getTableData()
  }
}
</script>

<style scoped lang="scss">
.wrapper {
  margin-top: 50px;
}
</style>


<template>
<div>
  <div class="top-box">
    <div class="left-box">
      <Banner class="fl"></Banner>
      <UserBox class="fr"></UserBox>
    </div>
    
  </div>
  <div class="bottom-box" v-if="userInfo.username">
    <el-card>
      <div slot="header">
        <span>笔记列表</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="addCategory">
          <i class="el-icon-circle-plus"></i>添加笔记分类
        </el-button>
      </div>
      <el-table border :data="articleData"
        v-loading.fullscreen="loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <el-table-column label="标题" prop="title">

        </el-table-column>
        <el-table-column label="作者">
          <template slot-scope="scope">
            <img :src="scope.row.author.avatar" class="table-item-img">
          </template>
        </el-table-column>
        <el-table-column label="分类" prop="category.name">

        </el-table-column>
        <el-table-column label="阅读量" prop="readnums">

        </el-table-column>
        <el-table-column label="发布时间" prop="date">

        </el-table-column>
        <el-table-column label="操作" width="300px">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="jumpContent(scope.row._id)">
              查看内容
            </el-button>
            <el-button type="warning" size="mini" @click="editNote(scope.row._id)">
              编辑笔记
            </el-button>
            <el-button type="danger" size="mini" @click="deleteNote(scope.row._id)">
              删除笔记
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="page-wrap">
        <el-pagination
          background
          :page-size="5"
          layout="prev, pager, next, jumper"
          :total="total"
          @current-change="pageChange"
        >
        </el-pagination>
      </div>
    </el-card>
  </div>
</div>
  
</template>

<script>
import Banner from '@/components/Banner'
import UserBox from '@/components/UserBox'
import {mapState} from 'vuex'

export default {
  name:'index',
  data() {
    return {
      articleData: [],
      page: 1,
      total: 0,
      loading: false
    }
  },
  components: {
    Banner,
    UserBox
  },
  methods: {
    getArticleData() {
      this.loading = true
      this.$axios.get('/article',{page: this.page}).then(res => {
        this.loading = false
        this.total = res.total
        this.articleData = res.data.map(item => {
          let time = new Date(item.createdTime);
          let year = time.getFullYear()
          let month = time.getMonth() + 1
          let day = time.getDate()
          let hour = time.getHours()
          item.date = `${year}年${month}月${day}日${hour}时`
          return item
        })
      }).catch(err => {
        this.loading = false
      })
    },
    jumpContent(id) {
      this.$router.push(`/layout/detail/${id}`)
    },
    editNote(id) {
      this.$router.push(`/layout/editNote/${id}`)
    },
    addCategory() {
      this.$prompt('请输入分类标题', '添加分类', {
        confirmButtonText: '添加',
        cancelButtonText: '取消'
      }).then(( data ) => {
        console.log(data.value)
        this.$axios.post('/category',{name: data.value}).then(res => {
          if (res.code == 200) {
            this.$message.success(res.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消添加'
        });       
      });
    },
    deleteNote(id) {
      this.$confirm('此操作将永久删除该笔记, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delete(`/article/${id}`).then(res => {
          this.$message.success(res.msg)
          this.getArticleData()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    pageChange(page) {
      this.page = page
      this.getArticleData()
    }
  },
  created() {
    this.getArticleData()
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style scoped>
  .left-box {
    width: 1170px;
    margin:0 auto;
  }
  .top-box {
    margin-top: 50px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .bottom-box {
    width:1170px;
    margin-top: 50px;
    margin-left:177px;
  }
</style>

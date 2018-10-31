<template>
  <div class="search w1170">
    <el-card>
      <div slot="header">
        笔记查找
      </div>
      <div class="input-wrap">
        查找笔记  <el-input class="input" placeholder="输入搜索标题" v-model="keyword"></el-input>
      </div>
      <div class="wrap">
        <articleList :articles="filteredList"></articleList>
      </div>

      <div class="page-wrap" style="margin-left: 200px">
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
</template>

<script>
import articleList from '@/components/ArticleList'

export default {
  name:'searchNote',
  data() {
    return {
      originData:[],
      searchContent:'',
      keyword: '',
      page: 1,
      total: 0
    }
  },
  components: {
    articleList
  },
  methods: {
    getOriginData () {
      this.$axios.get('/article',{page: this.page}).then(res => {
        if (res.code == 200) {
          this.originData = res.data
          this.total = res.total
        }
      })
    },
    pageChange(page) {
      this.page = page
      this.getOriginData()
    }
  },
  created() {
    this.getOriginData()
  },
  computed: {
    filteredList() {
      return this.originData.filter(item => {
        return item.title.toLowerCase().includes(this.keyword.toLowerCase())
      })
    }
  }
}
</script>

<style scoped>
.search{
  margin-top: 30px;
}
.input-wrap {
  width:670px;
  margin:30px auto 50px;
}
.input {
  width: 580px;
  padding:0;
}  
.wrap{
  width: 750px;
  height: auto;
  margin:50px auto;
}
</style>



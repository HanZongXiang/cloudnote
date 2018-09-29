<template>
  <header class="header">
    <div class="header-wrap">
      <h1 class="title fl" @click="$router.push('/')" style="cursor:pointer">云笔记</h1>
      
      <div class="btn-wrap fr">
        <el-button class="btn" @click="handleWrite">写笔记</el-button>
        <el-button class="btn" @click="handleSearch">查找笔记</el-button>
      </div>
      
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name:'Header',
  data() {
    return {

    }
  },
  methods:{
    handleWrite() {
      if (this.$store.state.userInfo.username) {
        this.$router.push('/writeNote')
      } else {
        this.$message.info('登录后才能发布笔记')
      }
    },
    handleSearch() {
      if (this.$store.state.userInfo.username) {
        this.$router.push('/searchNote')
      } else {
        this.$message.info('登录后才能查找笔记')
      }
    },
  },
  
}
</script>

<style scoped lang="scss">
  .header{
    height: 50px;
    background: #409eff;

    .header-wrap{
      width: 1170px;
      margin:0 auto;

      .title{
        margin-top: 5px;
        color:#fff;
        font-weight: normal;
        font-size: 30px;
      }

      .btn{
        margin-top:5px;
      }
    }
  }
</style>

<template>
  <header class="header">
    <div class="header-wrap">
      <h1 class="title">云笔记</h1>
      <el-button class="btn" @click="">写笔记</el-button>
    </div>
  </header>
</template>

<script>
export default {
  name:'Header',
  data() {
    return {

    }
  },
}
</script>

<style scoped lang="scss">
  .header{
    height: 50px;
    background: #409eff;

    .header-wrap{
      display: flex;
      justify-content: space-between;
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

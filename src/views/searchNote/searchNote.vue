<template>
  <div class="search">
    <div class="input-wrap">
      <el-input class="input" placeholder="输入搜索标题"></el-input>
      <el-button type="primary">搜索</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name:'searchNote',
  data() {
    return {

    }
  },
  components: {

  },
  methods: {

  }
}
</script>

<style scoped>
.input-wrap {
  width:750px;
  margin:30px auto 0;
}
.input {
  width: 580px;
  padding:0;
}  
</style>

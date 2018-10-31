<template>
  <div id="app">
    <!-- <Layout></Layout> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Layout from './views/layout'

export default {
  name: 'App',
  components: {
    Layout
  }
}
</script>

<style>
* {
  margin:0;
  padding:0;
}
body{
  background-color: #f1f1f1;
}
.w1170 {
  width: 1170px;
  margin:0 auto;
}
ul,ol {
  list-style: none;
}
.li {
  list-style: none;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.clearfix::after {
  content:'';
  display:block;
  clear: both;
}
/* 表格全局样式 */
.table-item-img {
  width: 80px;
  height: 80px;
}
.el-table {
  text-align: center;
}
.el-table th > .cell {
  text-align: center;
}
.el-table td > .cell {
  text-align: center;
}

.page-wrap {
  margin-top: 15px;
  margin-left: 50px;
}

.search .el-card {
  min-height: calc(100vh - 160px);
}
</style>

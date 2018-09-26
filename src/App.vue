<template>
  <div id="app">
    <Layout></Layout>
  </div>
</template>

<script>
import Layout from '@/components/index'

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
.w1170 {
  width: 1170px;
  margin:0 auto;
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
</style>

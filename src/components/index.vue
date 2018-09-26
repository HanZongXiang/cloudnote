<template>
  <div class="layout">
    <Header></Header>
    <div class="w1170">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header'

export default {
  name:'index',
  data() {
    return {

    }
  },
  components: {
    Header
  },
  methods: {

  }
}
</script>

<style scoped>
.content{
  width: 1170px;
}
</style>

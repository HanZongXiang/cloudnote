<template>
  <div class="layout">
    <Header></Header>
    <router-view></router-view>
  </div>
  
</template>

<script>
import Header from '@/components/Header'

export default {
  name:'',
  data() {
    return {
      articleData:[]
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

</style>

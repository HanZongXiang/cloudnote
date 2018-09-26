<template>
  <div class="top-box">
    <div class="left-box">
      <Banner></Banner>
      <!-- <ArticleList></ArticleList> -->
    </div>
    <UserBox></UserBox>
  </div>
</template>

<script>
import Banner from '@/components/Banner'
import UserBox from '@/components/UserBox'
import ArticleList from '@/components/ArticleList'

export default {
  name:'',
  data() {
    return {
      articleData:[]
    }
  },
  components: {
    Banner,
    UserBox,
    ArticleList
  },
  methods: {

  }
}
</script>

<style scoped>
.left-box {
  width: 750px;
}
.top-box {
  margin-top: 50px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}
</style>

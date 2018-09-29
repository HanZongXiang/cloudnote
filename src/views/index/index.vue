<template>
<div>
  <div class="top-box">
    <div class="left-box">
      <Banner class="fl"></Banner>
      <UserBox class="fr"></UserBox>
    </div>
    
  </div>
  <div class="bottom-box">
    <ArticleList :articles="articleData"></ArticleList>
  </div>
</div>
  
</template>

<script>
import Banner from '@/components/Banner'
import UserBox from '@/components/UserBox'
import ArticleList from '@/components/ArticleList'

export default {
  name:'index',
  data() {
    return {
      articleData: []
    }
  },
  components: {
    Banner,
    UserBox,
    ArticleList
  },
  methods: {
    getArticleData() {
      this.$axios.get('/article').then(res => {
        this.articleData = res.data
      })
    }
  },
  created() {
    this.getArticleData()
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
    width:750px;
    margin-left:182px;
  }
</style>

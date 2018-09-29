<template>
  <div class="article-list" v-show="this.$store.state.userInfo.username">
    <router-link :to="{name:'detail',params:{id:item._id}}" class="item" v-for="(item,index) in currentArticles" :key="index">

        <div class="top">

          <div class="img-wrap">
            <img :src="item.author.avatar">
          </div>

          <div class="item-msg">

            <div class="first">
              <span class="author-name">
                {{item.author.username}}
              </span>
              <h2>
                {{item.title}}
              </h2>
            </div>

            <div class="second">
              <span class="second-item">浏览：
                {{item.readnums}}
              </span>
              <span class="second-item">回复：
                {{item.replynums}}
              </span>
              <span class="second-item">分类：
                {{item.category.name}}
              </span>
            </div>
          </div>
        </div>

        <div class="item-content" v-text="item.contentText">笔记内容</div>

    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    articles:Array
  },
  data() {
    return {
      currentArticles: []
    }
  },
  watch: {
    articles (val) {
      this.currentArticles = val.map(item => {
        return item
      })
    }
  },
  components: {

  },
  methods: {

  }
}
</script>

<style scoped lang="scss">
  .article-list{
    box-sizing: border-box;
    margin-top: 30px;
    border-radius: 4px;
    padding:2px 20px;
    background:#fff;
    transform: translateX(-10px)
  }

  .item{
    text-decoration: none;
    color:#333;
    display:block;
    padding-bottom:20px;
  }
  
  .top{
    display:flex;
    padding-top:10px;

    .img-wrap{
      margin-right: 15px;
      width: 80px;
      height: 80px;
      img {
        display: block;
        width: 100%;
      }
    }
  }

  .first {
    display: flex;

    .author-name {
      color:#409eff;
      font-weight: bold;
      padding-right: 15px;
      border-right: 1px solid #000;
    }

    h2 {
      font-size: 16px;
      font-weight: 600;
      margin-left:15px;
    }
  }

  .item-msg {
    width: 100%;
  }

  .second {
    box-sizing: border-box;
    padding:4px 8px;
    margin-top: 15px;
    border-radius: 4px;
    width: 100%;
    background: #bbb;

    .second-item {
      font-size: 14px;
      color:#333;
      margin-right: 30px;
    }
  }
  .item-content {
    margin-left:85px;
  }
</style>

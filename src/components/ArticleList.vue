<template>
  <div class="article-list">
    <router-link :to="{name:'content',params: {id:item._id}}" class="item">

        <div class="top">
          <div class="img-wrap">
            <img src="">
          </div>

          <div class="item-msg">

            <div class="first">
              <span class="author-name">
                {{item.author}}
              </span>
              <h2>{{item.title}}</h2>
            </div>

            <div class="second">
              <span class="second-item">浏览：{{item.looknums}}</span>
              <span class="second-item">回复：{{item.commontnums}}</span>
              <span class="second-item">分类：{{item.tags.map(tag => tag.name.join(' '))}}</span>
            </div>
          </div>
        </div>

        <div class="item-content" v-text="item.contentText"></div>

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
  watch: {},
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
  }

  .item{
    text-decoration: none;
    color:#333;
    display:block;
    padding-bottom:20px;
  }
  
  .itop{
    display:flex;

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
      padding-right: 8px;
      border-right: 1px solid #000;
    }

    h2 {
      font-size: 18px;
      font-weight: bold;
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
      font-weight: bold;
      margin-right: 30px;
    }
  }
</style>

<template>
  <div class="detail">
    <div class="article-msg clearfix">
      <div class="img-wrap fl">
        <img :src="content.author.avatar" class="img">
      </div>

      <div class="author-msg fl">
        <div class="author-name">
          {{content.author.username}}
        </div>
        <div class="date">
          <span class="format-date">
            {{formatTime}}
          </span>

          <span>
            阅读 {{content.readnums}}
          </span>
        </div>
      </div>
    </div>

    <h2 class="title">{{content.title}}</h2>

    <div class="content" v-html="content.content"></div>
  </div>  
</template>

<script>
export default {
  name:'detail',
  data() {
    return {
      content:{},
      formatTime:''
    }
  },
  components: {

  },
  methods: {
    getDetail() {
      const id = this.$route.params.id
      this.$axios.get(`/article/${id}`).then(res => {
        this.content = res.data
        let time = new Date(res.data.createdTime)
        let year = time.getFullYear()
        let month = time.getMonth() + 1
        let date = time.getDate()

        this.formatTime = `${year}-0${month}-${date}`

      })
    }
  },
  created() {
    this.getDetail()
  }
}
</script>

<style scoped lang="scss">
  .detail {
    width: 980px;
    margin:35px auto 0;
    background: #fff;
    border-radius: 6px;
    padding:30px 40px;
    box-sizing: border-box;

    .img-wrap {
      width: 50px;
      height: 50px;

      .img {
        width: 50px;
        height: 50px;
      }
    }

    .author-msg {
      margin-left:10px;
    }

    .author-name {
      font-size: 16px;
      font-weight: 700;
      color:#333;
    }

    .date {
      margin-top:8px;
      font-size: 12px;
      color:#555;

      .format-date {
        margin-right: 10px;
      }
    }
    
    .title {
      margin:10px 10px 15px;
      font-size: 22px;
      font-weight: normal;
    }

    .content {
      margin-top: 5px;
      margin-left:10px;
    }
  }
</style>
 
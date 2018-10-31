<template>
  <div class="detail" 
    v-loading.fullscreen="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
     <vue-particles
      color="#6495ED"
      :particleOpacity="0.8"
      :particlesNumber="60"
      shapeType="circle"
      :particleSize="4"
      linesColor="#6495ED"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.6"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <div class="article-msg clearfix">
      <div class="img-wrap fl">
        <img :src="avatar" class="img">
      </div>

      <div class="author-msg fl">
        <div class="author-name">
          {{username}}
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

    <div class="side-menu">
      <el-button type="danger" 
        :icon="isCollect ? 'el-icon-star-on' : 'el-icon-star-off'" 
        circle
        @click="collectNote"
        style="margin-bottom: 20px"
      >
      </el-button>
      <el-badge :value="total" :max="99" class="item">
        <el-button icon="el-icon-message" circle type="primary"></el-button>
      </el-badge>
    </div>

    <div class="card-wrap w1170">
      <div class="comment-wrap">
        <img :src="this.$store.state.userInfo.avatar" class="li-img">
        <el-input v-model="formData.content" style="width: 775px;margin-left: 15px" placeholder="输入评论"
        @keyup.enter.native="addComment" ></el-input>
        <el-button type="primary" @click="addComment" style="position: relative;z-index: 5">评论</el-button>
      </div>

      <el-card style="width: 900px;margin-top: 25px;margin-left: 90px" v-if="commentData.length > 0">
        <div slot="header">评论列表</div>
        <ul class="list-wrap" 
          
        >
          <li v-for="(item,index) in commentData" :key="index">
            <img :src="item.author.avatar" class="li-img">
            <span>{{item.author.username}}</span>
            <p>{{item.content}}</p>
            <div class="timebtn fr">
              <i class="commentTime">{{item.date}}</i>
              <el-button size="mini" type="danger" icon="el-icon-delete" circle style="position: relative;z-index: 5" @click="removeComment(item._id)"></el-button>
            </div>
          </li>
        </ul>

        <div class="page-wrap">
          <el-pagination
            background
            :page-size="10"
            layout="prev, pager, next, jumper"
            :total="total"
            @current-change="pageChange"
          >
          </el-pagination>
        </div>
      </el-card>
    </div>
  </div>  
</template>

<script>
import Vue from 'vue'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)

export default {
  name:'detail',
  data() {
    return {
      username:'',
      avatar:'',
      content:{},
      formatTime:'',
      formData: {
        content: ''
      },
      commentData: [],
      page: 1,
      total: 0,
      isCollect: false
    }
  },
  components: {

  },
  methods: {
    getDetail() {
      this.loading = true
      const id = this.$route.params.id
      this.$axios.get(`/article/${id}`).then(res => {
        this.loading = false
        this.content = res.data
        this.username = res.data.author.username
        this.avatar = res.data.author.avatar
        let time = new Date(res.data.createdTime)
        let year = time.getFullYear()
        let month = time.getMonth() + 1
        month >= 10 ? '' + month : '0' + month
        let date = time.getDate()
        date >= 10 ? '' + date : '0' + date

        this.formatTime = `${year}-${month}-${date}`
      }).catch(err => {
        this.loading = false
      })
    },
    addComment() {
      const _id = this.$route.params.id
      this.$axios.post('/comment',{content: this.formData.content,articleId:_id}).then(res => {
        if (res.code == 200) {
          this.formData.content = ''
          this.$message.success(res.msg)
          this.getComments()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getComments() {
      const _id = this.$route.params.id
      this.$axios.get(`/comment/${_id}`,{page: this.page}).then(res => {
        if (res.code == 200) {
          this.total = res.total
          this.commentData = res.data.map(item => {
            let time = new Date(item.createdTime);
            let year = time.getFullYear()
            let month = time.getMonth() + 1
            month = month >= 10 ? '' + month : '0' + month
            let day = time.getDate()
            day = day >= 10 ? '' + day : '0' + day
            let hour = time.getHours()
            hour = hour >= 10 ? '' + hour : '0' + hour
            let minute = time.getMinutes()
            minute = minute >= 10 ? '' + minute : '0' + minute
            let second = time.getSeconds()
            second = second >= 10 ? '' + second : '0' + second
            item.date = `${year}-${month}-${day} ${hour}:${minute}:${second}`
            return item
          })
        }
      }).catch(err => {
        this.$message.error('请求错误')
      })
    },
    pageChange(page) {
      this.page = page
      this.getComments()
    },
    collectNote() {
      if (!this.isCollect) {
        this.isCollect = true
      } else {
        this.isCollect = false
      }
    },
    removeComment(id) {
      let article = this.$route.params.id
      this.$axios.delete(`/comment/${article}/${id}`).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.getComments()
        } else {
          this.$message.error('请求有误')
        }
      })
    }
  },
  created() {
    this.getDetail()
    this.getComments()
  }
}
</script>

<style scoped lang="scss">
#particles-js {
  position: absolute;
  top: 50px;
  left: 0;
  width: 98.5vw;
  height: 100vh;
}
  .detail {
    width: 1170px;
    margin:35px auto 0;
    background: #fff;
    border-radius: 6px;
    padding:30px 40px;
    box-sizing: border-box;
    .li-img {
      width: 45px;
      vertical-align: bottom;
      border-radius: 50%;
    }
    .img-wrap {
      width: 50px;
      height: 50px;

      .img {
        width: 50px;
        height: 50px;
        border-radius: 50%;
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

    .card-wrap {
      margin-top: 20px;

      .comment-wrap {
        margin-left: 83px;
      }

      .list-wrap {
        li {
          padding-top: 10px;
          padding-bottom: 20px;
          border-bottom: 1px solid #e1e1e1;

          .timebtn {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: -5px;

            i {
              font-style: normal;
              font-size: 12px;
              color: #555;
              margin-right: 15px;
            }
          }

          span {
            font-size: 18px;
            color: #333;
            position: relative;
            top: -10px;
          }

          p{
            color: #666;
            font-size: 14px;
            text-indent: 1em;
            margin-top: 10px;
            margin-bottom: 10px;
            margin-left: 10px;
          }
        }
      }
    }

    .side-menu{
      width: 50px;
      height: 150px;
      position: fixed;
      bottom: 100px;
      right: 100px;
    }
  }
</style>
<style lang="scss">
.content {
  ul,ol {
    list-style: none;
  }
  h1,h2,h3,h4,h5 {
    font-weight: 500;
    margin: 20px 0;
  }
  p,blockquote,li {
    line-height: 2;
    font-size: 14px;
    color: #666;
    text-indent: 2em;
  }
  pre {
    margin: 10px 0;
  }
  img {
    max-width: 1000px;
  }
}
</style>

 
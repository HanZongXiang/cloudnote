<template>
  <div class="wrap clearfix">

    <div class="login-box" v-if="!usermsg.username">
      <div class="item">
        <input type="text" placeholder="邮箱" v-model="email">
      </div>
      <div class="item">
        <input type="password" placeholder="密码" v-model="password">
      </div>
      <div class="item">
        <el-button class="btn" type="primary" @click="handleLogin">登录</el-button>
      </div>
      <div class="item">
        <el-button class="btn" @click="$router.push('/register')">注册</el-button>
      </div>
    </div>

    <div class="user-box" v-else>
      <div class="user-box-item user-icon">
        <img src="">
      </div>
      <div class="name-wrap">
        萌新：{{usermsg.username}}
      </div>
      <div class="email-wrap">
        email：{{usermsg.email}}
      </div>
      <div>
        <el-button type="warning" class="btn-logout" @click="handleLogout">退出登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import cookies from 'js-cookie'

export default {
  name:'UserBox',
  data() {
    return {
      email:'',
      password:'',
      usermsg: {
        username:'',
        email:'',
        avatar:''
      }
    }
  },
  components: {

  },
  methods: {
    handleLogin () {
      let params = {
        email:this.email,
        password:this.password
      }
      console.log(process.env.NODE_ENV);
      let basePath = process.env.NODE_ENV == 'development' ? '/api' : ''

      this.$axios.post('/login',params).then(res => {
        if (res.code == 200) {
          this.usermsg = res.data.data
          this.usermsg.avatar = process.env.NODE_ENV == 'develoment' ? '/api' + res.data.data.avatar : res.data.data.avatar
          cookies.set('username',this.usermsg.username,{expires:14})
          cookies.set('avatar',this.usermsg.avatar,{expires:14})
          this.$message.success('登录成功，欢迎回来' + res.data.data.username)
        } else {
          this.$message.error(res.data.msg)
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .wrap {
    box-sizing: border-box;
    width: 360px; 
    background: #f7f5f5;
    border-radius: 4px;
    padding:25px 30px;
  }

  // .login-box {
  //   float: right;
  //   width: 360px;
  // }

  .item {
    margin-top: 30px;

    .btn {
      width: 100%;
    }
    //父选择器 
    & > input {
      box-sizing: border-box;
      width:100%;
      border:1px solid #f1f1f1;
      border-radius: 4px;
      padding:14px;
      outline: none;
    }
  }
  .user-box {
    padding-top: 30px;

    .user-icon {
      text-align: center;

      img {
        width: 100px;
        height: 100px;
      }
    }

    .name-wrap,.email-wrap {
      text-align: center;
      margin-top: 20px;
      font-size: 16px;
      color:#333;
      font-weight: normal;
      line-height: 36px;
    }
    .btn-logout {
      width: 100%;
      margin-top: 10px;
    }
  }
</style>

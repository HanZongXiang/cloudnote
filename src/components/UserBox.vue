<template>
  <div class="wrap clearfix">

    <div class="login-box" v-if="!userInfo.username">
      <div class="item">
        <input type="text" placeholder="邮箱" v-model="formData.email">
      </div>
      <div class="item">
        <input type="password" placeholder="密码" v-model="formData.password" @keyup.enter="handleLogin">
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
        <img :src="userInfo.avatar">
      </div>
      <div class="name-wrap">
        用户：{{userInfo.username}}
      </div>
      <div class="email-wrap">
        email：{{userInfo.email}}
      </div>
      <div>
        <el-button type="warning" class="btn-logout" @click="handleLogout">退出登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name:'UserBox',
  data() {
    return {
      formData: {
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
      // let params = {
      //   email:this.formData.email,
      //   password:this.formData.password
      // }

      this.$axios.post('/login',this.formData).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.$store.commit('CHANGE_userInfo',res.userData)
        }
        else {
           this.$message.error(res.msg)
        }
      })
    },
    handleLogout () {

      this.$axios.delete('/logout').then(res => {
        let userInfo = {
            avatar:'',
            eamil:'',
            username:''
          }

        if (res.code == 200){
          this.$message.success(res.msg)
          this.$store.commit('CHANGE_userInfo',userInfo)  //清空vuex中存储的用户信息
          this.$router.push('/index')
        } else {
          this.$store.commit('CHANGE_userInfo',userInfo)
          this.$message.info(res.msg)
          this.$router.push('/index')
        }
      })
    }
  },
  computed: {
    ...mapState(['userInfo'])
  }
}
</script>

<style scoped lang="scss">
  .wrap {
    box-sizing: border-box;
    width: 360px; 
    background: #fff;
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
      color:#222;
      font-weight: normal;
      line-height: 36px;
      font-family: serif;
    }
    .email-wrap{
      margin-top: 5px;
    }
    .btn-logout {
      width: 100%;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
</style>

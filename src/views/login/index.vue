<template>
  <div class="outer-wrapper">
    <vue-particles
      color="#dedede"
      :particleOpacity="0.7"
      :particlesNumber="80"
      shapeType="circle"
      :particleSize="4"
      linesColor="#dedede"
      :linesWidth="1"
      :lineLinked="true"
      :lineOpacity="0.4"
      :linesDistance="150"
      :moveSpeed="3"
      :hoverEffect="true"
      hoverMode="grab"
      :clickEffect="true"
      clickMode="push"
    >
    </vue-particles>
    <div class="login-wrapper">
      
      <div class="login-box">
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
          <el-button class="btn" @click="$router.push('/layout/register')">注册</el-button>
        </div>
      </div>
    </div>
  </div>
  
</template>

<script>
import Vue from 'vue'
import VueParticles from 'vue-particles'
Vue.use(VueParticles)

export default {
  name:'',
  data() {
    return {
      formData: {
        email: '1160740981@qq.com',
        password: '654321'
      }
    }
  },
  components: {

  },
  methods: {
    handleLogin () {
      this.$axios.post('/login',this.formData).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.$router.push('/layout/index')
          this.$store.commit('CHANGE_userInfo',{
            id: res.userData.id,
            username: res.userData.username,
            avatar: res.userData.avatar,
            email: res.userData.email
          })
        }
        else {
           this.$message.error(res.msg)
        }
      })
    },
  },
  beforeDestroy() {
    document.documentElement.style.overflow = 'auto'
  },
  created() {
    document.documentElement.style.overflow = 'hidden'
  }
}
</script>

<style scoped lang="scss">
#particles-js {
  background-image: url(/static/imgs/bg1.jpg);
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.login-wrapper {
  box-sizing: border-box;
  width: 360px; 
  border-radius: 4px;
  padding:25px 30px;
  position: fixed;
  z-index: 998;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);

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
}
</style>

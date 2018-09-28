<template>
  <div class="register">
    <h2>新用户注册</h2>

    <div class="item">
      <input type="text" placeholder="用户名" v-model="formData.username">
    </div>
    <div class="item">
      <input type="text" placeholder="邮箱" v-model="formData.email">
    </div>
    <div class="item">
      <input type="password" placeholder="密码" v-model="formData.password" @keyup.enter.native="handleRegister">
    </div>
    <div class="item">
      <el-button type="primary" class="btn" @click="handleRegister">注册</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name:'',
  data() {
    return {
      formData: {
        username:'',
        email:'',
        password:''
      }
    }
  },
  components: {

  },
  methods: {
    handleRegister() {
      // let params = {
      //   username:this.formData.username,
      //   email:this.formData.email,
      //   password:this.formData.password
      // }

      this.$axios.post('/register',this.formData).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          setTimeout(() => {
            this.$router.push('/index')
          }, 500);
        } else {
          if (res.err) {
            this.$message.error(res.err)
          } else {
            this.$message.error(res.msg)
          }
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .register {
    color: #333;
    padding-top:30px;
    padding-bottom: 50px;
    width: 720px;
    margin:100px auto;
    border-radius:6px;
    background: #fff;

    h2 {
      text-align: center;
      font-weight: normal;
    }
  }

  .item {
    box-sizing: border-box;
    width: 400px;
    margin:30px auto 0;

    .btn {
      width: 100%;
    }

    & > input {
      box-sizing: border-box;
      width: 100%;
      border:1px solid #f1f1f1;
      border-radius: 4px;
      padding:14px;
      outline: none;
    }
  }
</style>

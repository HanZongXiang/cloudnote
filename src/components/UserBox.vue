<template>
  <div class="wrap clearfix">
    <div class="user-box">
      <div class="user-box-item user-icon">
        <el-dropdown trigger="hover" @command="handleCommand">
          <span class="el-dropdown-link">
            <img :src="userInfo.avatar" class="avatar">
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="1">修改信息</el-dropdown-item>
            <el-dropdown-item command="2">用户中心</el-dropdown-item>
            <el-dropdown-item command="3">查找笔记</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
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
      
    }
  },
  components: {

  },
  methods: {
    handleLogout () {
      this.$axios.delete('/logout').then(res => {
        let userInfo = {
            avatar:'',
            email:'',
            username:'',
            id: ''
          }

        if (res.code == 200){
          this.$message.success(res.msg)
          this.$store.commit('CHANGE_userInfo',userInfo)  //清空vuex中存储的用户信息
          this.$router.push('/login')
        } else {
          this.$store.commit('CHANGE_userInfo',userInfo)
          this.$message.info(res.msg)
          this.$router.push('/login')
        }
      })
    },
    handleCommand(command) {
      if (command == 1) {
        const id = this.$store.state.userInfo.id
        this.$router.push(`/layout/userEdit/${id}`)
      } else if (command == 2) {
        this.$router.push('/layout/userCenter')
      } else if (command == 3) {
        this.$router.push('/layout/searchNote')
      }
    },
    refreshUserData() {
      const id = this.$store.state.userInfo.id 
      this.$axios.get(`/user/${id}`).then(res => {
        let userInfo = {
          avatar:res.data.avatar,
          email:res.data.email,
          username:res.data.username,
          id: res.data._id
        }
        this.$store.commit('CHANGE_userInfo',userInfo)
      })
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created() {
    if (this.$store.state.userInfo.username) {
      this.refreshUserData()
    }
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

<template>
  <div class="user-edit">
    <el-card>
      <div slot="header">
        修改个人信息
      </div>
      <div class="form-wrap">
        <el-form :data="formData" label-width="80px" label-position="left">
          <el-form-item label="头像">
            <upload v-model="formData.avatar"></upload>
          </el-form-item>
          <el-form-item label="用户名">
            <el-input v-model="formData.username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="formData.password" type="password"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="formData.desc"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="formData.email" disabled></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="warning" @click="handleSave">保存</el-button>
          </el-form-item>
        </el-form>
      </div>
      
    </el-card>
  </div>
</template>

<script>
import upload from '@/components/Upload'

export default {
  name:'',
  data() {
    return {
      formData: {
        username: '',
        avatar: '',
        desc: '',
        password: '',
        email: ''
      }
    }
  },
  components: {
    upload
  },
  methods: {
    getEditData() {
      const {id} = this.$route.params 
      this.$axios.get(`/user/${id}`).then(res => {
        this.formData = res.data
      })
    },
    handleSave() {
      const {id} = this.$route.params
      this.$axios.patch(`/user/${id}`,this.formData).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.$router.push('/index')
        } else {
          this.$message.error('请求有误')
        }
      })
    }
  },
  created() {
    this.getEditData()
  }
}
</script>

<style scoped lang="scss">
.user-edit {
  width: 1170px;
  margin: 50px auto;

  .form-wrap {
    width: 800px;
  }
}
</style>

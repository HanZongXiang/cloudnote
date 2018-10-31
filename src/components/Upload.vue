<template>
  <el-upload
    class="avatar-uploader"
    action="https://upload-z1.qiniup.com"
    :show-file-list="false"
    :on-success="handleSuccess"
    :data="formData"
  >
    <img v-if="imgUrl" :src="imgUrl" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
import axios from 'axios'
export default {
  name:'',
  props: {
    value: {
      type: String
    }
  },
  data() {
    return {
      formData: {
        token: ''
      },
      imgUrl: this.value
    }
  },
  components: {
    
  },
  methods: {
    getToken() {
      axios.get('http://upload.yaojunrong.com/getToken').then(res => {
        if(res.data.code == 200) {
          this.formData.token = res.data.data
        }
      })
    },
    handleSuccess(res) {
      this.imgUrl = res.url
      this.$emit('input',this.imgUrl)
    }
  },
  watch: {
    value(val) {
      this.imgUrl = val
    }
  },
  created() {
    this.getToken()
  }
}
</script>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 48px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px!important;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
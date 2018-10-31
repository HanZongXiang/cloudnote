<template>
  <div class="write-note">
    <div class="main-content w1170">
      <div class="title">标题</div>

      <div class="input-wrap">
        <el-input class="item" v-model="formData.title"></el-input>
      </div>

      <div class="title">内容</div>

      <quill-editor 
        v-model="formData.content"
        :options="editorOption"
        @change="handleChange"
      >
      </quill-editor>

      <div class="category clearfix">
        <span class="tag fl">分类:
        </span>
        <div class="fl">
          <radiosCom :options="categoryOptions" v-model="formData.category"></radiosCom>
          <!-- <el-radio-group v-model="formData.category" size="small">
            <el-radio-button :label="item.name" v-for="(item,index) in categoryOptions" :key="index" :value="item._id">
            </el-radio-button>
          </el-radio-group> -->
        </div>
      </div>

      <div class="btn-wrap">
        <el-button type="primary" size="mini" @click="handleSubmit" v-if="!this.isEdit">
          发布
        </el-button>
        <el-button type="warning" size="mini" @click="handleSave" v-else>
          保存
        </el-button>
      </div>
    </div>
    
  </div>
</template>

<script>
import 'quill/dist/quill.snow.css'
import {quillEditor,Quill} from 'vue-quill-editor'
import {container, ImageExtend, QuillWatch} from 'quill-image-extend-module'
import radiosCom from '@/components/Radios'

Quill.register('modules/ImageExtend', ImageExtend)

export default {
  name:'writeNote',
  data() {
    return {
      isEdit: false,
      formData: {
        title:'',
        content:'',
        contentText:'',
        category:''
      },
      categoryOptions:[],
      editorOption: {
        modules: {
          ImageExtend: {
            loading:true,
            name:'img',
            action:'',
            response: (res) => {
              return res.info
            }
          },
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        //加粗，斜体，下划线，删除线
            ['blockquote', 'code-block'],         //引用，代码块
            [{ 'header': 1 }, { 'header': 2 }],               // 标题，键值对的形式；1、2表示字体大小
            [{ 'list': 'ordered'}, { 'list': 'bullet' }],          //列表
            [{ 'script': 'sub'}, { 'script': 'super' }],      // 上下标
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // 缩进
            [{ 'size': ['small', false, 'large', 'huge'] }],  // 字体大小
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],         //几级标题
            [{ 'color': [] }, { 'background': [] }],          // 字体颜色，字体背景颜色
            [{ 'font': [] }],         //字体
            [{ 'align': [] }],        //对齐方式
            ['clean'],        //清除字体样式
            ['image']        //上传图片
          ]
        }
      }
    }
  },
  components: {
    quillEditor,
    radiosCom
  },
  methods: {
    handleChange({ quill,html,text }) {
      this.formData.contentText = text.substring(0,200) + '...'
    },
    getCategory() {
      this.$axios.get('/category').then(res => {
        if (res.code == 200) {
          this.categoryOptions = res.data
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleSubmit() {
      this.$axios.post('/article',this.formData).then(res => {
        if (res.code == 200) {
          this.$message.success(res.msg)
          this.$router.push('/index')
        } else {
          this.$message.info(res.msg)
        }
      })
    },
    getEditData() {
      const {id} = this.$route.params
      this.$axios.get(`/article/${id}`).then(res => {
        this.formData = res.data
      })
    },
    handleSave() {
      const {id} = this.$route.params
      this.$axios.patch(`/article/${id}`,this.formData).then(res => {
        this.$message.success(res.msg)
        this.$router.push('/index')
      }).catch(err => {
        this.$message.error('请求有误')
      })
    }
  },
  created() {
    if (this.$route.name == 'editNote') {
      this.isEdit = true
      } else {
      this.isEdit = false
    }
    this.getCategory()
    if (this.isEdit) {
      this.getEditData()
    }
  },
  watch: {
    $route(to,from) {
      if (to.name == 'editNote') {
        this.isEdit = true
      } else {
        this.isEdit = false
        this.formData = {
          title:'',
          content:'',
          contentText:'',
          category:''
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .main-content {
    margin-top:30px;
    background-color: #fff;
    border-radius: 6px;
    padding:30px;
    box-sizing: border-box; 

    .input-wrap {
      margin-bottom: 15px;
    }

    /deep/ {
      .ql-container {
        min-height: 300px;
      }
    }

    .title {
      font-weight: bold;
      margin-bottom: 15px;
      line-height: 2;
      font-weight: 600;
      color:#444;
    }

    .category {
      color:#409eff;
      font-weight: 600;
      margin:18px 0 8px;
    }

    .category .tag {
      margin-right: 10px;
      transform: translateY(8px)
    }

    .btn-wrap {
      margin-top:15px;
    }
  }
</style>


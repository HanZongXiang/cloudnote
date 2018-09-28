<template>
  <div class="write-note">
    <div class="main-content w1170">
      <div class="title">标题</div>

      <div class="input-wrap">
        <el-input class="item"></el-input>
      </div>

      <div class="title">内容</div>

      <quill-editor 
        v-model="formData.content"
        :options="editorOption"
        @change="handleChange"
      >
      </quill-editor>

      <div class="category clearfix">
        <span class="tag">分类:
          
        </span>

        <div class="fl">
          <radiosCom :options="categoryOptions" v-model="selectedCategory"></radiosCom>
        </div>
      </div>

      <div class="btn-wrap">
        <el-button type="primary">保存提交</el-button>
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
      formData: {
        content:'',
        contentText:'',
        selectedCategory:''
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
          toolbar: {
            container: container,
            handlers: {
              'image': function () {
                QuillWatch.emit(this.quill.id)
              }
            }
          }
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
      // console.log(text);
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
    }
  },
  created() {
    this.getCategory()
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
      margin:8px 0;
    }

    .category .tag {
      margin-right: 5px;
      float: left;
    }

    .btn-wrap {
      margin-top:15px;
    }
  }
</style>
<style>
  .ql-container {
    height: 300px;
  }
</style>


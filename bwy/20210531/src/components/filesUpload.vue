<template>
   <div>
        <el-upload
  class="upload-demo"
  drag
  action="string"
  multiple
  :http-request="UpLoad">
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处 或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
<img :src="img" alt="">
   </div>
</template>
<script>
export default {
    data: function () {
        return {
            img: ''
        }
    },
    methods: {
        UpLoad (params) {
            console.log(params)
            if (params.file.size > 10000) {
                this.$layer.msg('文件太大')
                return false
            }
            var formDate = new FormData()
            formDate.append('attrName', params.file)
            this.$http.post('/upload', formDate).then(res => {
                this.img = this.imgURL + res.path
                console.log(res)
            })
        }
    }
}
</script>
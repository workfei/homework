<template>
    <div>
        <el-upload
            class="upload-demo"
            drag
            action=""
            multiple
            :http-request="UpLoad">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <img :src="imgurl" alt="">
    </div>
</template>

<script>
export default {
    data () {
        return {
            imgurl: ''
        }
    },
    methods: {
        UpLoad (params) {
            if (params.file.size > 500) {
                this.$layer.msg('图片有点大')
                return false
            }
            var formData = new FormData()
            formData.append('attrName', params.file)
            this.$http.post('/upload', formData).then(res => {
                this.imgurl = this.imgURL + res.path
            })
        }
    }
}
</script>
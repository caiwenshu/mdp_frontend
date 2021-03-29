<template>
    <div class='fillcontain'>
        <el-row style='margin-top: 100px;'  :gutter="20">
            <el-col :span="8" :offset="6">
                <el-upload
                    class="upload-demo"
                    drag
                    :headers="token"
                    action="/alps/upload"
                    :data="uploadData"
                    :on-success="successFn"
                    :on-error="errorFn"
                    :on-progress="progressFn"
                    multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import {getStore} from '../config/mUtils'

    export default {
        name: 'upload',
        data() {
            return {
                token: {},
                uploadData:{
                    "isDistribution":"1"
                }
            }
        },
        computed: {

        },
        created() {
			let _adminInfo = getStore('adminInfo');
			let _token = _adminInfo && _adminInfo.token;

			console.log(_token)

            this.token = {'Authorization': _token? ('Token '+ _token) : null,}
		},
        components:{},
        methods: {
            successFn(response, file, fileList) {
                console.log('成功',response, file, fileList);
                this.$message({
                    type: 'success',
                    message: '上传成功'
                });
            },
            errorFn(err, file, fileList) {
                console.log('失败',err, file, fileList);
                this.$message({
                    type: 'error',
                    message: '上传失败'
                });
            },
            progressFn(event, file, fileList) {
                console.log('上传中',event, file, fileList);
            }

        }
    }
</script>

<style lang='less' scoped>
    @import '../style/mixin';
    .form {
        min-width: 400px;
		margin-bottom: 30px;
		&:hover{
			box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
			border-radius: 6px;
			transition: all 400ms;
		}
    }
    .form_header {
        text-align: left;
        margin: 0 0 20px 25px;
    }
</style>

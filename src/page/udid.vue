<template>
    <div class='fillcontain'>

        <el-row style='margin-top: 50px;'  :gutter="20">
            <el-col :span="8" :offset="1">
                1. 打开(IPhone)手机相机，扫描下方二维码，提示下载并安装描述文件 <br>
                2. ios手机打开“设置”; <br>
                3. 找到“通用”并点击; <br>
                4. 找到“描述文件与设备管理”或“设备管理”并点击; <br>
                5. 找到“查询设备UDID”并点击; <br>
                6. 点击右上角的“安装”按钮。<br>
                7. 安装成功会会跳转到UDID页面,点击"发送邮件给开发者"<br>
            </el-col>
        </el-row>
        <el-row :gutter="20" style='margin-top: 10px;'>
        <el-col :span="8" :offset="1">
            <qriously value="https://mdp.yeego.com/alps/down_config" :size="220" />
        </el-col>
        </el-row>

        <el-row :gutter="20" style='margin-top: 10px;'>
            <el-col :span="8" :offset="1">
                或者电脑浏览器直接访问地址:
                <a target="_blank" href="https://mdp.yeego.com/alps/udid">https://mdp.yeego.com/alps/udid</a>
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

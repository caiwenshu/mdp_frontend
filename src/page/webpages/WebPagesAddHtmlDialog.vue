<template>

    <el-dialog width="50%" title="新增Html" :visible.sync="dialogFormVisible" v-loading="dialogLoading">
        <el-form :model="form">

            <WebPagesFormItemGroupBreadCrumb :group='group'></WebPagesFormItemGroupBreadCrumb>

            <el-form-item label="描述" label-width="120px">
                <el-input v-model="form.desc" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="是否设置为发布" prop="is_key_value" label-width="120px" d>
                <el-switch v-model="form.isDistribution"></el-switch>
            </el-form-item>

            <el-form-item label="访问文件" prop="is_key_value" label-width="120px">
                <el-input v-model="form.rootHtml" autocomplete="off" placeholder="当上传.zip结尾的文件时，需要指定访问名称"></el-input>
            </el-form-item>

            <el-form-item label="产品子类型标识" label-width="120px">
                <el-upload
                    ref="uploadfile"
                    class="upload-demo"
                    drag
                    action="fileupload"
                    :before-upload="newFiles"
                    :limit="1"
                    :auto-upload="false">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    <i style="color: #cf9236;margin-bottom: 1px">上传文件为.html或者.zip</i>
                </el-upload>

            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="hiddenDialog">取 消</el-button>
            <el-button type="primary" @click="_handleFromCommit">确 定</el-button>
        </div>
    </el-dialog>

</template>

<script>
import {addWebPagesContentHtml} from '@/api/getWebPagesData'
import WebPagesFormItemGroupBreadCrumb from './WebPagesFormItemGroupBreadCrumb'

export default {
    name: 'WebPagesAddHtmlDialog',
    data() {
        return {
            dialogLoading: false,
            dialogFormVisible: false,
            form: {
                desc: '',
                isDistribution: false,
                rootHtml: '',
                file: null
            },
        }
    },

    props: [
        "group",
    ],

    computed: {},
    created() {
    },
    mounted() {

    },
    methods: {
        newFiles(file) {
            this.form.file = file
            return false
        },
        showDialog() {
            this.dialogFormVisible = true;
            this.form = {
                desc: '',
                isDistribution: false,
                rootHtml: '',
                file: null,
            }

        },

        hiddenDialog() {
            this.dialogFormVisible = false;
        },

        _handleFromCommit() {
            this.$refs.uploadfile.submit()

            this.dialogLoading = true;
            this._addWebPagesContentHtml(this.group.tag)
        },

        async _addWebPagesContentHtml(tag) {

            let _param = {
                desc: this.form.desc,
                isDistribution: this.form.isDistribution ? 1 : 0,
                rootHtml: this.form.rootHtml,
                file: this.form.file,
                tag: tag,
            };

            const res = await addWebPagesContentHtml(_param);
            this.dialogLoading = false;

            console.log('res--', res);
            if (res.code == '200') {

                this.hiddenDialog();
                //提交成功反馈给父组件
                this.$emit('handleAddProductHtmlSuccessFn');

            } else {
                this.$message(res.message);
            }
        },
    },
    components: {
        WebPagesFormItemGroupBreadCrumb
    }
}
</script>

<style lang='less' type="text/less" scoped>

</style>

<template>

        <el-dialog width="50%" title="新增下载页" :visible.sync="dialogFormVisible" v-loading="dialogLoading">
            <el-form :model="form">


                <el-form-item label="描述" label-width="120px">
                    <el-input v-model="form.desc" autocomplete="off"></el-input>
                </el-form-item>

                    <el-form-item label="是否设置为发布" prop="is_key_value"label-width="120px">
                        <el-switch v-model="form.isDistribution"></el-switch>
                    </el-form-item>

                <el-form-item label="根路径" label-width="120px">
                    <el-input v-model="form.root_html" autocomplete="off"></el-input>
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
                            <i style="color: #cf9236;margin-bottom: 1px">上传文件为.zip</i>
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
    import {addDownloadPage} from '@/api/getData'
    export default {
        name: 'ProductAddDownloadDialog',
        data() {
            return {
                dialogLoading:false,
                dialogFormVisible: false,
                form: {
                    desc: '',
                    isDistribution:false,
                    root_html:'index.html',
                    file:null,
                },
            }
        },

        props:[
            "group_type",
        ],

        computed: {
            isShowFileUpload() {
                return this.form.is_out_path;
            },
        },
        created() {
        },
        mounted(){

        },
        methods: {

            newFiles (file) {
                this.form.file = file
                return false
            },
            showDialog() {
                this.dialogFormVisible  = true;
                this.form = {
                    desc: '',
                    isDistribution:false,
                    root_html:'index.html',
                    file:null,
                }

            },

            hiddenDialog() {
                this.dialogFormVisible = false;
            },

            _handleFromCommit() {
                this.$refs.uploadfile.submit()

                this.dialogLoading = true;
                this._addProductDownloadData(this.group_type)
            },

            async _addProductDownloadData(groupType) {

                let _param = {
                    desc: this.form.desc,
                    isDistribution:this.form.isDistribution ? 1 : 0,
                    file:this.form.file,
                    root_html:this.form.root_html,
                    group_type: groupType,
                };

                const  res = await addDownloadPage(_param);
                this.dialogLoading = false;

                console.log('res--',res);
                if (res.code == '200') {

                    this.hiddenDialog();
                    //提交成功反馈给父组件
                    this.$emit('handleAddProductDownloadSuccessFn');

                } else {
                    this.$message(res.message);
                }
            },
        },
        components:{
        }
    }
</script>

<style lang='less' type="text/less" scoped>

</style>

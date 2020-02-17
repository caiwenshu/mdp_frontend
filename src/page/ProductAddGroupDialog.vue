<template>

    <el-dialog title="新增Group" :visible.sync="dialogFormVisible" v-loading="dialogLoading">
        <el-form :model="form">
            <el-form-item label="产品组名" label-width="120px">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="产品组标识" label-width="120px">
                <el-input v-model="form.type" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="IOS" label-width="120px">
                <el-card class="box-card">
                    <el-form-item label="Bundle Identifier" label-width="140px">
                        <el-input v-model="form.ios_bundle_identifier" autocomplete="off"></el-input>
                    </el-form-item>
                </el-card>
            </el-form-item>

            <el-form-item label="Android" label-width="120px">
                <el-card class="box-card">
                    <el-form-item label="Bundle Identifier" label-width="140px">
                        <el-input v-model="form.android_bundle_identifier" autocomplete="off"></el-input>
                    </el-form-item>
                </el-card>
            </el-form-item>


        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="hiddenDialog">取 消</el-button>
            <el-button type="primary" @click="_handleFromCommit">确 定</el-button>
        </div>
    </el-dialog>

</template>

<script>
    import {addGroup} from '@/api/getData'
    import ElRow from "element-ui/packages/row/src/row";

    export default {
        name: 'ProductAddGroupDialog',
        data() {
            return {
                dialogLoading:false,
                dialogFormVisible: false,
                form: {
                    name: '',
                    type: '',
                    ios_bundle_identifier:'',
                    android_bundle_identifier:'',
                },
            }
        },

        props:[
        ],

        computed: {

        },
        created() {
        },
        mounted(){

        },
        methods: {

            showDialog() {
                this.dialogFormVisible  = true;


            },

            hiddenDialog() {
                this.dialogFormVisible = false;
                this.form = {
                    name: '',
                    type: '',
                    ios_bundle_identifier:'',
                    android_bundle_identifier:'',
                }
            },

            _handleFromCommit() {
                this.dialogLoading = true;
                this._addGroup();
            },

            async _addGroup() {

                let _param = {
                    name:this.form.name,
                    type:this.form.type,
                    ios_bundle_identifier:this.form.ios_bundle_identifier,
                    android_bundle_identifier:this.form.android_bundle_identifier,
                };

                const  res = await addGroup(_param);
                this.loading = false;
                this.dialogLoading = false;

                console.log('res--',res);
                if (res.code == '200') {

                    this.hiddenDialog();
                    //提交成功反馈给父组件
                    this.$emit('handleAddGroupSuccessFn');

                } else {
                    this.$message(res.message);
                }
            },
        },
        components:{
            ElRow

        }
    }
</script>

<style lang='less' type="text/less" scoped>

</style>

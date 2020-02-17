<template>

    <el-dialog title="新增Email" :visible.sync="dialogFormVisible" v-loading="dialogLoading">
        <el-form :model="form">
            <el-form-item label="用户名" label-width="120px">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮件地址" label-width="120px">
                <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <!--<el-form-item label="所在组" label-width="120px">-->

                <!--<el-select v-model="form.group" placeholder="请选择">-->
                    <!--<el-option-->
                        <!--v-for="item in options"-->
                        <!--:key="item.group_type"-->
                        <!--:label="item.group_name"-->
                        <!--:value="item.group_type">-->
                    <!--</el-option>-->
                <!--</el-select>-->

            <!--</el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="hiddenDialog">取 消</el-button>
            <el-button type="primary" @click="_handleFromCommit">确 定</el-button>
        </div>
    </el-dialog>

</template>

<script>
    import {getGroup, addEmail} from '@/api/getData'

    export default {
        name: 'ProductAddEmailDialog',
        data() {
            return {
                dialogLoading:false,
                dialogFormVisible: false,
                form: {
                    name: '',
                    email: '',
                },
                options: [],
            }
        },

        props:[
            "type"
        ],

        computed: {

        },
        created() {
            this._getGroupData();
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
                    name : '',
                    email : '',
                }
            },

            _handleFromCommit() {
                this.dialogLoading = true;
                this._addProductEmail();
            },

            async _getGroupData() {

                const  res = await getGroup();
                this.loading = false;
                this.dialogLoading = false;

                console.log('res--',res);
                if (res.code == '200') {

                    this.hiddenDialog();
                    this.options =  res.data;
                } else {
                    this.$message(res.message);
                }
            },

            async _addProductEmail() {

                let _param = {
                    name:this.form.name,
                    email:this.form.email,
                    group: this.type,
                };

                const  res = await addEmail(_param);
                this.loading = false;
                this.dialogLoading = false;

                console.log('res--',res);
                if (res.code == '200') {

                    this.hiddenDialog();
                    //提交成功反馈给父组件
                    this.$emit('handleSuccessFn');

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

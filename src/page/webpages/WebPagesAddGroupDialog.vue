<template>

    <el-dialog title="新增类型" :visible.sync="dialogFormVisible" v-loading="dialogLoading">
        <el-form :model="form">
            <el-form-item label="类型名称" label-width="120px">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="类型标识" label-width="120px">
                <el-input v-model="form.tag" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="是否开启Https" prop="is_key_value" label-width="120px">
                <el-switch v-model="form.https"></el-switch>
            </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="hiddenDialog">取 消</el-button>
            <el-button type="primary" @click="_handleFromCommit">确 定</el-button>
        </div>
    </el-dialog>

</template>

<script>
import {addWebPagesType} from '@/api/getWebPagesData'

export default {
    name: 'WebPagesAddGroupDialog',
    data() {
        return {
            dialogLoading: false,
            dialogFormVisible: false,
            form: {
                name: '',
                type: '',
                https: false
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

        showDialog() {
            this.dialogFormVisible = true;
        },

        hiddenDialog() {
            this.dialogFormVisible = false;
            this.form = {
                name: '',
                tag: ''
            }
        },

        _handleFromCommit() {
            this.dialogLoading = true;
            this._addWebPagesGroup();
        },

        async _addWebPagesGroup() {

            let _param = {
                name: this.form.name,
                tag: this.form.tag,
                https: (this.form.https ? "1" : "0")
            };

            const res = await addWebPagesType(_param);
            this.loading = false;
            this.dialogLoading = false;

            console.log('res--', res);
            if (res.code == '200') {

                this.hiddenDialog();
                //提交成功反馈给父组件
                this.$emit('handleAddGroupSuccessFn');

            } else {
                this.$message(res.message);
            }
        },
    },
    components: {}
}
</script>

<style lang='less' type="text/less" scoped>

</style>

<template>
    <div style="margin-top: 40px; margin-left: 40px">

        <el-col :span="8">
        <el-form ref="form" :model="form">
            <el-form-item label="名称" label-width="120px">
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="域名" label-width="120px">
                <el-input v-model="form.domain" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="_handleFromCommit">确 定</el-button>
            </el-form-item>

        </el-form>

        </el-col>
    </div>
</template>

<script>
    import {adminGetSettings, adminSaveSettings} from '@/api/getData';

    export default {
        name: 'Settings',
        data() {
            return {
                form: {
                    name: '3333',
                    domain: '3333'
                },
            }
        },

        created() {
            this.adminGetSettings();
        },
        mounted(){

        },
        methods: {

            _handleFromCommit() {
                this.adminSaveSettings();
            },


            async adminSaveSettings() {
                let _param = {
                    name: this.form.name,
                    domain: this.form.domain,
                };

                const res = await adminSaveSettings(_param);

                if (res.code === '200') {
                    this.$message({
                        type: 'success',
                        message: '修改成功'
                    });
                }
                this.adminGetSettings();
                console.log('res--',res);
            },

            async adminGetSettings() {
                let _param = {
                };

                const res = await adminGetSettings(_param);
                this.form = res.data
                console.log('res--',res);
            }
        },
        components:{
        }
    }
</script>

<style lang='less' type="text/less" scoped>

</style>

<template>
    <div class='fillcontain'>

        <el-row style='margin-top: 50px;'  :gutter="20">
            <el-col :span="8" :offset="2">
                1. 触发重新签名最新发布包 <br>
                2. 签名成功后会给填入的邮件地址发送下载地址 <br>
            </el-col>
        </el-row>

        <el-row :gutter="20" style='margin-top: 30px;'>
            <el-col :span="8" :offset="1">
                <el-form :model="form" label-width="120px">
                    <el-form-item label="邮件地址" required>
                        <el-input v-model="form.email" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="产品组标识" required>
                        <el-input v-model="form.type" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="_handleFromCommit">确 定</el-button>
                        <el-button type="primary" @click="_handleFromCommit">确 定</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import {getStore} from '../config/mUtils'
import {resignIPA} from '@/api/getData'

export default {
    name: 'upload',
    data() {
        return {
            form: {
                email: '',
                type: 'toc',
            },
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
        _handleFromCommit() {
            this._triggerResign();
        },

        async _triggerResign() {

            let _param = {
                email:this.form.email,
                type:this.form.type,
            };

            const  res = await resignIPA(_param);

            console.log('res--',res);
            if (res.code == '200') {
                this.$message(res.message);
            } else {
                this.$message("触发失败,请联系开发人员进行查看");
            }
        },

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

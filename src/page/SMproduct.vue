<template>
    <div style='width:100%;'>

        <el-row  type="flex" style="margin-top: 20px;margin-left: 20px">
                <el-button type="primary" @click="_handleAddGroup">新增Group</el-button>
        </el-row>


        <product-group
            :appList='group'
            @handleSelectFn='handleSelect'
            @handleDeleteSelectFn="handleDeleteSelect"
        >
        </product-group>


        <ProductAddGroupDialog ref="productAddGroupDialog" @handleAddGroupSuccessFn="_callbackAddGroupSuccess"></ProductAddGroupDialog>
    </div>
</template>

<script>

    import {getProductType, removeGroup, adminGetSettings} from '@/api/getData'
    import productGroup from '../components/productGroup'
    import ProductAddGroupDialog from './ProductAddGroupDialog'

    import {mapActions, mapState,mapGetters} from 'vuex'


    export default {
        name: 'SMproduct',
        data() {
            return {
                group:[],
                domainSettings:{},
            }
        },
        computed: {

        },
        created() {
            // 此周期内 可以做数据处理
            this.getGroups();
        },
        mounted() {
            // dom 节点已经生成
        },
        methods: {

            async getGroups() {

                const resSettings = await adminGetSettings();
                this.domainSettings = resSettings.data;

                const res = await getProductType();
                console.log('产品种类',res);

                if(res.code == 200) {
                    let resData = res.data
                    for (let index in resData) {
                        resData[index].qrcode = "http://"+ this.domainSettings.domain +"/alps/download/" + resData[index].group_type
                    }
                    this.group = resData;
                } else if (res.detail) {
                    this.$message(res.detail);
                } else {
                    this.$message(res.message);
                }
            },
            async removeGroup(type) {

                let _param = {
                    type: type,
                };

                const res = await removeGroup(_param);

                if(res.code == 200) {
                    this.$message("操作成功");
                    this.getGroups();
                }else {
                    this.$message(res.message);
                }
            },


            _alertConfirm(method,param) {
                this.$confirm('是否继续删除操作?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    method(param);
                }).catch(() => {

                });
            },

            handleSelect(item) {
                console.log('当前选择的产品种类--',item.application_id);

                let type = item.type;

                if (type == "App") {
                    // this.applicationId = id;
                    this.$store.commit('SELECT_IOS_ANDROID',item.application_id);
                    // 如果是从面包屑 跳转过来的 那么选择完了 再跳转到对应的列表页

                    this.$router.push( {path:'/alps/product_list/'+ item.application_id })

                    if(this.flag) {
                        this.$router.push({path:this.flag,query:{source:'select'}});
                    }
                } else  if (type == "Email") {
                    this.$router.push( {path:'/alps/product_email_list/'+ item.group_type })
                } else if (type == "Download") {
                    this.$router.push( {path:'/alps/product_download_list/'+ item.group_type })
                } else {
                    throw new Error("类型错误");
                }
            },
            _handleAddGroup() {
                this.$refs.productAddGroupDialog.showDialog();
            },
            _callbackAddGroupSuccess() {
                this.getGroups();
            },
            handleDeleteSelect(item) {
                let type = item.group_type;

                this._alertConfirm(this.removeGroup, type);
            }

        },
        components: {productGroup, ProductAddGroupDialog}
    }
</script>

<style lang='less'>

</style>

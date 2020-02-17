<template>
    <div class='fillcontainer'>
        <div class='content'>
            <!--<search @searchFn='searchFn'></search>-->

            <el-row  type="flex">
                <el-col>
                    {{this.groupData.group_name}}
                    <el-button type="primary" @click="_handleAddEmail">新增</el-button>
                </el-col>
            </el-row>

            <div class='table_container'>
                <el-table
                    border
                    v-loading="loading"
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    :highlight-current-row=true
                    @selection-change="handleSelectionChange"
                    style="width:100%"
                >
                    <el-table-column
                        prop='id'
                        label='编号'
                        width ='50'>
                    </el-table-column>
                    <el-table-column
                        prop='name'
                        label='用户名'
                        width ='90'>
                    </el-table-column>
                    <el-table-column
                        prop='email'
                        label='邮件地址'
                        width='220'>
                    </el-table-column>
                    <el-table-column
                        prop='environment'
                        label='环境'
                        width='110'>
                    </el-table-column>
                    <el-table-column
                        prop='mobile_application_group'
                        label='所在组'>
                    </el-table-column>
                    <el-table-column
                        border
                        fixed="right"
                        width='100'
                        label='操作'
                        align='center'
                    >
                        <template slot-scope="scope">
                            <el-button
                                size="mini"
                                type="danger"
                                @click="deleteEmailData(scope.$index, scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class='Pagination' style='text-align: left;margin-top: 10px;'>
                    <el-pagination
                        :total='total'
                        :page-size='pageSize'
                        :current-page='pageNo'
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        layout='total, prev, pager, next'
                    >

                    </el-pagination>
                </div>
            </div>
        </div>

        <ProductAddEmailDialog :type="groupData.group_type"  @handleSuccessFn="_callbackAddEmailSuccess"  ref="productaddEmailDialog">

        </ProductAddEmailDialog>
    </div>
</template>

<script>

    import {getEmailList, deleteEmail} from '@/api/getData'
    import ProductAddEmailDialog from './ProductAddEmailDialog'

    export default {
        name: 'ProductEmailList',
        data() {
            return {
                loading: true,
                tableData:[],
                groupData:{},
                pageSize:10,
                pageNo:1,
                total:0,
            }
        },
        computed: {
            applicationId () {
                // 我们很快就会看到 `params` 是什么
                return this.$route.params.id
            },
        },
        created() {
            // 判断是否请求数据
            if( this.applicationId) {
                this._getEmailData();
            }
        },
        mounted() {
        window.m=this;
        },
        watch: {
        },
        methods: {

            async _getEmailData() {
                let _param = {
                    pageNo: this.pageNo - 1,
                    pageSize: this.pageSize,
                    applicationId: this.applicationId,
                };

                const res = await getEmailList(_param);
                this.loading = false;
                console.log('res--',res);
                this.groupData = res.data
                this.tableData = res.data.emails;
                this.total = res.total;

            },

            async _deleteEmailData(id) {

                let _param = {
                    id: id,
                };

                const res = await deleteEmail(_param);
                this.loading = false;
                console.log('res--',res);

                if (res.code == '200') {
                    this._getEmailData();
                } else {
                    this.$message(res.message);
                }

            },

            //alert confirm
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

            preView(index,row) { // 预览
                console.log('row--',row);
                let _url = row.url;
                this.$router.push("")
                window.open(_url,'_blank');

            },
            edit(index,row) { // 编辑
                console.log("点击了编辑")
//                let _url = row.upload_link;
//                window.open(_url,'_blank');
            },
            deleteEmailData(index,row) {
                this._alertConfirm(this._deleteEmailData, row.id);
                window.open(_url,'_blank');
            },
            handleSizeChange(val) {
                console.log(`每页${val}条`)
            },

            handleSelectionChange() {

            },
            handleSizeChange(val) {
                console.log(`每页${val}条`)
            },
            handleCurrentChange(val) {
                this.pageNo=val;
                this._getEmailData();
            },

            _handleAddEmail() {
                this.$refs.productaddEmailDialog.showDialog();
            },

            _callbackAddEmailSuccess() {
                this._getEmailData();
            }
        },
        components:{
            ProductAddEmailDialog
        }
    }
</script>

<style lang='less' type="text/less" scoped>
    @import '../../style/mixin';
    .fillcontainer {
        padding:20px;
        position: relative;
        .table_container {
            margin-top:20px;
            .el-table {
                .cell {
                    white-space: pre;
                }
            }
        }

    }

</style>
